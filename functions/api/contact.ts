/**
 * Приема контактната форма и я праща по SMTP към пощата на SuperHosting.
 *
 * Cloudflare Workers нямат готов SMTP клиент — има само суров TCP сокет, затова
 * протоколът е изписан на ръка отдолу. Свързваме се с ИМПЛИЦИТЕН TLS (порт 465),
 * а не със STARTTLS: така се спестява договарянето, което е най-крехката част.
 *
 * Единственото, което ЗАДЪЛЖИТЕЛНО се задава в Cloudflare
 * (Settings → Variables and secrets), е паролата:
 *   SMTP_PASS  паролата на кутията          ← Secret, НЕ Text
 *
 * Останалото има работещи стойности по подразбиране и се пипа само ако нещо се
 * промени — сървърът, кутията или адресът за запитвания:
 *   SMTP_HOST  по подразбиране mail.kastaventures.com
 *   SMTP_PORT  по подразбиране 465 (имплицитен TLS)
 *   SMTP_USER  по подразбиране sales@kastaventures.com — оттам се праща
 *   MAIL_TO    по подразбиране sales@kastaventures.com — там пристигат
 */

import { connect } from 'cloudflare:sockets'

interface Env {
  SMTP_HOST?: string
  SMTP_PORT?: string
  SMTP_USER?: string
  SMTP_PASS?: string
  MAIL_TO?: string
}

interface Payload {
  name?: string
  email?: string
  phone?: string
  model?: string
  message?: string
  company?: string
  lang?: string
}

const MAX = { name: 120, email: 190, phone: 40, model: 120, message: 5000 }

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })

/** Реже прекомерно дългите стойности и маха знаците за нов ред от заглавните полета. */
function clean(value: unknown, limit: number, singleLine = true): string {
  let text = typeof value === 'string' ? value.trim() : ''
  if (singleLine) text = text.replace(/[\r\n]+/g, ' ')
  return text.slice(0, limit)
}

/** Кодира заглавие по RFC 2047, за да оцелее кирилицата. */
function encodeHeader(value: string): string {
  // eslint-disable-next-line no-control-regex
  if (/^[\x00-\x7F]*$/.test(value)) return value
  const bytes = new TextEncoder().encode(value)
  let binary = ''
  bytes.forEach((byte) => { binary += String.fromCharCode(byte) })
  return `=?UTF-8?B?${btoa(binary)}?=`
}

function toBase64(value: string): string {
  const bytes = new TextEncoder().encode(value)
  let binary = ''
  bytes.forEach((byte) => { binary += String.fromCharCode(byte) })
  return btoa(binary)
}

class SmtpSession {
  private reader: ReadableStreamDefaultReader<Uint8Array>
  private writer: WritableStreamDefaultWriter<Uint8Array>
  private decoder = new TextDecoder()
  private encoder = new TextEncoder()
  private buffer = ''

  constructor(socket: { readable: ReadableStream<Uint8Array>; writable: WritableStream<Uint8Array> }) {
    this.reader = socket.readable.getReader()
    this.writer = socket.writable.getWriter()
  }

  /** Чете, докато не се събере пълен отговор (последният ред е "250 " а не "250-"). */
  async read(): Promise<string> {
    while (true) {
      const lines = this.buffer.split('\r\n').filter(Boolean)
      const last = lines[lines.length - 1]
      if (last && /^\d{3} /.test(last)) {
        const response = this.buffer
        this.buffer = ''
        return response
      }
      const { value, done } = await this.reader.read()
      if (done) throw new Error('SMTP: връзката се затвори неочаквано')
      this.buffer += this.decoder.decode(value, { stream: true })
    }
  }

  async send(command: string): Promise<void> {
    await this.writer.write(this.encoder.encode(command + '\r\n'))
  }

  /** Праща команда и се проваля, ако кодът не е измежду очакваните. */
  async expect(command: string | null, ...codes: string[]): Promise<string> {
    if (command !== null) await this.send(command)
    const response = await this.read()
    if (!codes.some((code) => response.startsWith(code))) {
      const shown = command?.startsWith('AUTH') ? 'AUTH …' : command ?? '<поздрав>'
      throw new Error(`SMTP отказа „${shown}“: ${response.trim().slice(0, 200)}`)
    }
    return response
  }

  async close(): Promise<void> {
    try { await this.send('QUIT') } catch { /* връзката вече може да е паднала */ }
    try { await this.writer.close() } catch { /* същото */ }
  }
}

/** Стойности по подразбиране: липсва само паролата, тя е тайна. */
const DEFAULTS = {
  host: 'mail.kastaventures.com',
  port: '465',
  user: 'sales@kastaventures.com',
  to: 'sales@kastaventures.com',
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const SMTP_HOST = env.SMTP_HOST || DEFAULTS.host
  const SMTP_PORT = env.SMTP_PORT || DEFAULTS.port
  const SMTP_USER = env.SMTP_USER || DEFAULTS.user
  const SMTP_PASS = env.SMTP_PASS
  if (!SMTP_PASS) {
    console.error('contact: липсва SMTP_PASS — формата не може да праща')
    return json({ error: 'not_configured' }, 503)
  }

  let payload: Payload
  try {
    payload = await request.json()
  } catch {
    return json({ error: 'bad_json' }, 400)
  }

  // Хората не виждат това поле; попълнено е само от бот. Отговаряме 200, за да
  // не му подскажем, че е разкрит.
  if (clean(payload.company, 100)) return json({ ok: true }, 200)

  const name = clean(payload.name, MAX.name)
  const email = clean(payload.email, MAX.email)
  const phone = clean(payload.phone, MAX.phone)
  const model = clean(payload.model, MAX.model)
  const message = clean(payload.message, MAX.message, false)

  if (!name || !email || !message) return json({ error: 'missing_fields' }, 400)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json({ error: 'bad_email' }, 400)

  const to = env.MAIL_TO || DEFAULTS.to
  const isBg = payload.lang !== 'en'
  const subject = encodeHeader(
    isBg ? `Запитване от сайта — ${name}` : `Website enquiry — ${name}`
  )

  const body = [
    isBg ? 'Ново запитване от kastaventures.com' : 'New enquiry from kastaventures.com',
    '',
    `${isBg ? 'Име' : 'Name'}: ${name}`,
    `${isBg ? 'Имейл' : 'Email'}: ${email}`,
    phone ? `${isBg ? 'Телефон' : 'Phone'}: ${phone}` : null,
    model ? `${isBg ? 'Модел' : 'Model'}: ${model}` : null,
    '',
    isBg ? 'Съобщение:' : 'Message:',
    message,
    '',
    '—',
    `${isBg ? 'Изпратено от' : 'Sent from'} ${request.headers.get('referer') || 'kastaventures.com'}`,
  ].filter((line) => line !== null).join('\r\n')

  // Точка в началото на ред приключва DATA — удвоява се по RFC 5321.
  const safeBody = body.replace(/\r\n\./g, '\r\n..')

  const headers = [
    `From: ${encodeHeader(isBg ? 'Сайт Kasta Ventures' : 'Kasta Ventures site')} <${SMTP_USER}>`,
    `To: <${to}>`,
    `Reply-To: ${encodeHeader(name)} <${email}>`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    `Date: ${new Date().toUTCString()}`,
  ].join('\r\n')

  let session: SmtpSession | null = null
  try {
    const socket = connect(
      { hostname: SMTP_HOST, port: Number(SMTP_PORT) || 465 },
      { secureTransport: 'on', allowHalfOpen: false }
    )
    session = new SmtpSession(socket)

    await session.expect(null, '220')
    await session.expect(`EHLO ${SMTP_HOST}`, '250')
    await session.expect('AUTH LOGIN', '334')
    await session.expect(toBase64(SMTP_USER), '334')
    await session.expect(toBase64(SMTP_PASS), '235')
    await session.expect(`MAIL FROM:<${SMTP_USER}>`, '250')
    await session.expect(`RCPT TO:<${to}>`, '250', '251')
    await session.expect('DATA', '354')
    await session.expect(`${headers}\r\n\r\n${safeBody}\r\n.`, '250')

    return json({ ok: true }, 200)
  } catch (error) {
    console.error('contact: SMTP се провали', error instanceof Error ? error.message : error)
    return json({ error: 'send_failed' }, 502)
  } finally {
    await session?.close()
  }
}

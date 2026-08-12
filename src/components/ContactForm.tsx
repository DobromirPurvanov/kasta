import { useId, useState } from 'react'
import { useLang } from '../hooks/useLang'
import { products } from '../data/products'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const copy = {
  bg: {
    title: 'Пиши ни',
    lead: 'Отговаряме в рамките на работния ден. Полетата със звездичка са задължителни.',
    name: 'Име',
    email: 'Имейл',
    phone: 'Телефон',
    phoneHint: 'по избор',
    model: 'Интересува ме модел',
    modelAny: 'Още не съм решил',
    message: 'Съобщение',
    messagePlaceholder: 'Кажи ни какво търсиш — тестово каране, регистрация, сервиз или доставка.',
    submit: 'Изпрати запитване',
    sending: 'Изпраща се…',
    sentTitle: 'Получихме запитването.',
    sentBody: 'Ще се свържем с теб на посочените координати.',
    again: 'Изпрати ново',
    errorTitle: 'Съобщението не тръгна.',
    errorBody: 'Пиши ни направо на office@kastaventures.com или се обади на +359 887 77 37 33.',
    required: 'Моля, попълни това поле.',
    badEmail: 'Провери имейл адреса.',
    consent: 'Изпращайки формата, се съгласяваш да обработим данните ти, за да ти отговорим.',
  },
  en: {
    title: 'Write to us',
    lead: 'We reply within the working day. Fields marked with an asterisk are required.',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    phoneHint: 'optional',
    model: 'Model I am interested in',
    modelAny: 'Not decided yet',
    message: 'Message',
    messagePlaceholder: 'Tell us what you are after — a test ride, registration, service or delivery.',
    submit: 'Send enquiry',
    sending: 'Sending…',
    sentTitle: 'We got your enquiry.',
    sentBody: 'We will get back to you using the details you left.',
    again: 'Send another',
    errorTitle: 'The message did not go through.',
    errorBody: 'Write to office@kastaventures.com or call +359 887 77 37 33.',
    required: 'Please fill in this field.',
    badEmail: 'Check the email address.',
    consent: 'By sending this form you agree that we process your details in order to reply.',
  },
} as const

const fieldClass =
  'w-full min-h-12 rounded-2xl border border-fg/15 bg-[var(--bg-elevated)] px-4 py-3 text-[15px] text-fg ' +
  'placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] ' +
  'focus:ring-2 focus:ring-[rgb(var(--accent-rgb)/0.25)] transition-colors'

const labelClass = 'block text-[11px] font-bold tracking-[0.13em] uppercase text-[var(--text-muted)] mb-2'

export default function ContactForm() {
  const { lang } = useLang()
  const t = copy[lang === 'bg' ? 'bg' : 'en']
  const uid = useId()

  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    const nextErrors: Record<string, string> = {}
    if (!name) nextErrors.name = t.required
    if (!email) nextErrors.email = t.required
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) nextErrors.email = t.badEmail
    if (!message) nextErrors.message = t.required

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus()
      return
    }

    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: String(data.get('phone') ?? '').trim(),
          model: String(data.get('model') ?? '').trim(),
          message,
          // Ботовете попълват всичко; хората не виждат това поле.
          company: String(data.get('company') ?? ''),
          lang,
        }),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="surface-card rounded-[1.5rem] sm:rounded-[2rem] p-7 sm:p-10 text-center" role="status" aria-live="polite">
        <span className="mx-auto w-14 h-14 rounded-2xl bg-[rgb(var(--accent-rgb)/0.1)] text-[var(--accent-text)] flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h3 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.03em] text-fg mt-5">{t.sentTitle}</h3>
        <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed mt-2">{t.sentBody}</p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-outline mt-6 mx-auto sm:w-auto">
          {t.again}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="surface-card rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-7 lg:p-8">
      <h3 className="text-[22px] sm:text-[26px] font-bold tracking-[-0.03em] text-fg">{t.title}</h3>
      <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mt-2 mb-6">{t.lead}</p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor={`${uid}-name`}>{t.name} *</label>
          <input
            id={`${uid}-name`} name="name" type="text" autoComplete="name" required
            className={fieldClass}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${uid}-name-err` : undefined}
          />
          {errors.name && <p id={`${uid}-name-err`} className="text-[12px] text-[var(--accent-text)] mt-1.5">{errors.name}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor={`${uid}-email`}>{t.email} *</label>
          <input
            id={`${uid}-email`} name="email" type="email" autoComplete="email" required
            className={fieldClass}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${uid}-email-err` : undefined}
          />
          {errors.email && <p id={`${uid}-email-err`} className="text-[12px] text-[var(--accent-text)] mt-1.5">{errors.email}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor={`${uid}-phone`}>
            {t.phone} <span className="normal-case tracking-normal font-medium">({t.phoneHint})</span>
          </label>
          <input id={`${uid}-phone`} name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor={`${uid}-model`}>{t.model}</label>
          <select id={`${uid}-model`} name="model" defaultValue="" className={fieldClass}>
            <option value="">{t.modelAny}</option>
            {products.map((product) => (
              <option key={product.slug} value={product.name}>{product.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className={labelClass} htmlFor={`${uid}-message`}>{t.message} *</label>
        <textarea
          id={`${uid}-message`} name="message" rows={5} required
          placeholder={t.messagePlaceholder}
          className={`${fieldClass} resize-y min-h-[132px]`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${uid}-message-err` : undefined}
        />
        {errors.message && <p id={`${uid}-message-err`} className="text-[12px] text-[var(--accent-text)] mt-1.5">{errors.message}</p>}
      </div>

      {/* Капан за ботове. Нарочно НЕ е поле, което браузърът би попълнил сам. */}
      <div aria-hidden="true" className="absolute w-px h-px -m-px overflow-hidden opacity-0 pointer-events-none">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input id={`${uid}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' && (
        <div role="alert" className="mt-5 rounded-2xl border border-[rgb(var(--accent-rgb)/0.3)] bg-[rgb(var(--accent-rgb)/0.07)] p-4">
          <strong className="block text-[14px] font-semibold text-fg">{t.errorTitle}</strong>
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mt-1">{t.errorBody}</p>
        </div>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn-accent w-full mt-6 disabled:opacity-60">
        {status === 'sending' ? t.sending : t.submit}
      </button>

      <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mt-3 text-center">{t.consent}</p>
    </form>
  )
}

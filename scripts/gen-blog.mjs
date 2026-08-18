// Прави статични HTML страници за блога от content/blog/*.md.
//
// Защо статични, а не React: сайтът е client-rendered SPA и статия, която се
// изгражда от JavaScript, тръгва с увреждане при индексиране. Pages сервира
// истинските файлове преди catch-all-а `/* /index.html 200`, тоест
// /blog/<slug>/ връща готов HTML, без да пипаме рутинга на приложението.
//
// ГРАФИК: публикува се само това, чието `date` е днес или в миналото. Бъдещите
// статии се пропускат и влизат при следващия билд след датата си — тоест за да
// излезе статия сама, трябва седмичен деплой (Cloudflare Pages → Deploy hook,
// пуснат от cron). Виж CONTENT.md, раздел „График".

import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { marked } from 'marked'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://kastaventures.com'
const SRC = join(root, 'content/blog')
const OUT = join(root, 'public/blog')

const today = (process.env.BLOG_TODAY || new Date().toISOString().slice(0, 10))

/** Чете frontmatter-а без зависимост: между първите два реда с --- . */
function parse(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!m) throw new Error('липсва frontmatter')
  const meta = {}
  let key = null
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (kv) {
      key = kv[1]
      const v = kv[2].trim().replace(/^"(.*)"$/, '$1')
      meta[key] = v === '' ? [] : v
    } else if (/^\s*-\s+/.test(line) && Array.isArray(meta[key])) {
      meta[key].push(line.replace(/^\s*-\s+/, '').trim())
    }
  }
  // Вътрешният чеклист не е част от статията.
  const body = m[2].split('\n## Преди публикуване')[0]
  return { meta, body }
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Въпросите от раздела ЧЗВ стават FAQPage schema. */
function faqSchema(body) {
  const section = body.split(/\n## Често задавани въпроси\n/)[1]
  if (!section) return null
  const items = []
  const re = /\*\*(.+?)\*\*\n([\s\S]*?)(?=\n\n\*\*|\n## |$)/g
  let m
  while ((m = re.exec(section.split('\n## ')[0]))) {
    const q = m[1].trim()
    const a = m[2].replace(/\s+/g, ' ').trim()
    if (q.endsWith('?') && a) items.push({ q, a })
  }
  if (!items.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

const CSS = `
:root{--bg:#f4f1ec;--fg:#111214;--muted:#5b5b63;--card:#fff;--line:#00000014;--accent:#d90429}
@media (prefers-color-scheme:dark){:root{--bg:#08090a;--fg:#f5f5f7;--muted:#92929b;--card:#14171a;--line:#ffffff14;--accent:#df0a30}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.7 ui-sans-serif,system-ui,"Inter",sans-serif;-webkit-font-smoothing:antialiased}
.wrap{max-width:44rem;margin:0 auto;padding:2rem 1.25rem 5rem}
nav{max-width:44rem;margin:0 auto;padding:1.25rem;display:flex;gap:1.25rem;font-size:.85rem}
nav a{color:var(--muted);text-decoration:none}nav a:hover{color:var(--fg)}
h1{font-size:clamp(1.7rem,4.4vw,2.6rem);line-height:1.15;letter-spacing:-.02em;margin:.6rem 0 1rem}
h2{font-size:1.35rem;line-height:1.25;letter-spacing:-.015em;margin:2.4rem 0 .8rem}
h3{font-size:1.1rem;margin:1.8rem 0 .6rem}
p,li{color:var(--fg)}
a{color:var(--accent)}
time{color:var(--muted);font-size:.85rem}
table{width:100%;border-collapse:collapse;margin:1.2rem 0;font-size:.93rem;display:block;overflow-x:auto}
th,td{border:1px solid var(--line);padding:.55rem .7rem;text-align:left}
th{background:var(--card)}
blockquote{border-left:3px solid var(--accent);margin:1.2rem 0;padding:.2rem 0 .2rem 1rem;color:var(--muted)}
hr{border:0;border-top:1px solid var(--line);margin:2.5rem 0}
ul,ol{padding-left:1.2rem}li{margin:.35rem 0}
.posts{list-style:none;padding:0}
.posts li{border-top:1px solid var(--line);padding:1.1rem 0}
.posts a{color:var(--fg);text-decoration:none;font-weight:600;font-size:1.05rem}
.posts p{color:var(--muted);margin:.35rem 0 0;font-size:.93rem}
.cta{display:inline-block;background:var(--accent);color:#fff;padding:.7rem 1.1rem;border-radius:999px;text-decoration:none;font-weight:600}
footer{border-top:1px solid var(--line);margin-top:3rem;padding-top:1.5rem;color:var(--muted);font-size:.85rem}
`

function page({ title, description, canonical, bodyHtml, schema }) {
  return `<!doctype html>
<html lang="bg">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="article">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE}/images/kasta/sr-offroad-main-v2.webp">
<meta property="og:locale" content="bg_BG">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="icon" type="image/png" href="/images/icon-192x192.png">
<style>${CSS}</style>
${schema.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
</head>
<body>
<nav><a href="/">Начало</a><a href="/models">Модели</a><a href="/blog/">Блог</a></nav>
<main class="wrap">
${bodyHtml}
</main>
<footer class="wrap">
Kasta Ventures — официален представител на E RIDE PRO за България ·
<a href="/">kastaventures.com</a>
</footer>
</body>
</html>
`
}

const files = existsSync(SRC) ? readdirSync(SRC).filter((f) => f.endsWith('.md')) : []
const all = files.map((f) => {
  const { meta, body } = parse(readFileSync(join(SRC, f), 'utf8'))
  return { file: f, ...meta, body }
})

const published = all
  .filter((p) => p.date <= today)
  .sort((a, b) => (a.date < b.date ? 1 : -1))
const scheduled = all.filter((p) => p.date > today).sort((a, b) => (a.date < b.date ? -1 : 1))

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })

for (const post of published) {
  const canonical = `${SITE}/blog/${post.slug}/`
  const html = marked.parse(post.body)
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.metaDescription,
      datePublished: post.date,
      inLanguage: 'bg',
      mainEntityOfPage: canonical,
      author: { '@type': 'Organization', name: 'Kasta Ventures' },
      publisher: { '@type': 'Organization', name: 'Kasta Ventures' },
    },
  ]
  const faq = faqSchema(post.body)
  if (faq) schema.push(faq)

  mkdirSync(join(OUT, post.slug), { recursive: true })
  writeFileSync(
    join(OUT, post.slug, 'index.html'),
    page({
      title: `${post.metaTitle || post.title} | Kasta Ventures`,
      description: post.metaDescription,
      canonical,
      schema,
      bodyHtml: `<time datetime="${post.date}">${post.date}</time>\n${html}`,
    })
  )
}

const list = published
  .map(
    (p) => `  <li><a href="/blog/${p.slug}/">${esc(p.title)}</a>
    <p>${esc(p.metaDescription)}</p>
    <time datetime="${p.date}">${p.date}</time></li>`
  )
  .join('\n')

writeFileSync(
  join(OUT, 'index.html'),
  page({
    title: 'Блог — електрически мотори, регистрация и поддръжка | Kasta Ventures',
    description:
      'Статии за електрически кросови мотори в България: регистрация и книжка, избор на модел, цени, поддръжка и къде законно се кара.',
    canonical: `${SITE}/blog/`,
    schema: [{ '@context': 'https://schema.org', '@type': 'Blog', name: 'Kasta Ventures', url: `${SITE}/blog/`, inLanguage: 'bg' }],
    bodyHtml: `<h1>Блог</h1>\n<p>Практични статии за електрическите кросови мотори в България — закон, избор, разходи и поддръжка.</p>\n<ul class="posts">\n${list}\n</ul>\n<p style="margin-top:2rem"><a class="cta" href="/models">Разгледай моделите →</a></p>`,
  })
)

// Списък за картата на сайта и за секцията „Блог" на началната страница.
// Така картите там показват реални статии, а не „очаквайте скоро".
writeFileSync(
  join(root, 'src/data/blog-posts.json'),
  JSON.stringify(
    published.map((p) => ({ slug: p.slug, title: p.title, excerpt: p.metaDescription, date: p.date })),
    null,
    2
  ) + '\n'
)

console.log(`blog: ${published.length} публикувани, ${scheduled.length} в график (днес ${today})`)
for (const p of scheduled) console.log(`  ${p.date} → ${p.slug}`)

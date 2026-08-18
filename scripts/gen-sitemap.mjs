// Генерира public/sitemap.xml от маршрутите в App.tsx и продуктите в products.ts.
// Върви преди всеки билд, за да не остарява lastmod (беше зациклил на 2026-07-15).
//
// Нарочно чете products.ts с регулярен израз вместо да го внася: кодът на най-горно
// ниво се изпълнява при import, а тук ни трябват само slug-овете.

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://kastaventures.com'

/** Статичните маршрути от App.tsx, с тежест спрямо ролята им. */
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/models', priority: '0.9', changefreq: 'weekly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/cookie-policy', priority: '0.3', changefreq: 'yearly' },
]

const productsSource = readFileSync(join(root, 'src/data/products.ts'), 'utf8')

// Всеки продуктов блок започва със `slug:` — режем на блокове, за да разберем
// кой от тях е `published: false`. Непубликуваните не влизат в картата на сайта:
// страницата им още няма цена и няма какво да прави в индекса.
const blocks = productsSource.split(/^\s*slug: '/gm).slice(1)
const slugs = blocks
  .map((block) => ({
    slug: block.slice(0, block.indexOf("'")),
    published: !/^\s*published: false/m.test(block),
  }))
  .filter((entry) => entry.published)
  .map((entry) => entry.slug)

if (slugs.length === 0) {
  throw new Error('gen-sitemap: не намерих нито един публикуван slug в src/data/products.ts')
}

const lastmod = new Date().toISOString().slice(0, 10)

// Статиите идват от gen-blog.mjs (върви преди този скрипт) — в картата влизат
// само вече публикуваните, не и тези, които чакат датата си.
let posts = []
try {
  posts = JSON.parse(readFileSync(join(root, 'src/data/blog-posts.json'), 'utf8'))
} catch {
  posts = []
}

const urls = [
  ...staticRoutes,
  ...(posts.length ? [{ path: '/blog/', priority: '0.7', changefreq: 'weekly' }] : []),
  ...slugs.map((slug) => ({ path: `/product/${slug}`, priority: '0.8', changefreq: 'monthly' })),
  ...posts.map((post) => ({ path: `/blog/${post.slug}/`, priority: '0.6', changefreq: 'monthly' })),
]

const body = urls
  .map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${SITE}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')

writeFileSync(
  join(root, 'public/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
)

console.log(`sitemap.xml: ${urls.length} адреса (${slugs.length} продукта), lastmod ${lastmod}`)

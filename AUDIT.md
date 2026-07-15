# Пълен одит — kastaventures.com (E RIDE PRO Bulgaria)

> **Статус 15.07.2026 (следобед):** По-долу описаните находки в мнозинството си са вече **поправени** в кода (виж git diff / следващия къмит): навигация + 404, медия компресия (–89%), динамични meta/canonical, security headers, достъпност (focus traps, контрасти, `<main>`, skip link), продуктови данни (77 km/h, BGN по фиксинг), cookie съответствие, self-hosted шрифтове, code splitting, чистка на хостинг останки.
>
> **Оставащи действия (изискват решение/данни от собственика):**
> 1. **DNS → Vercel** — домейнът все още сервира стария Squarespace сайт (apex A `76.76.21.21`, www CNAME `cname.vercel-dns.com`)
> 2. **ЕИК + правна форма** в Поверителност/Условия/Бисквитки + footer (нужни са реалните данни на фирмата)
> 3. **Блог статии** — картите са маркирани „Очаквайте скоро“; за SEO стойност трябват реални страници с 800+ думи
> 4. **Скорост на Mini R (77 km/h) срещу FAQ на SS 3.0** („най-бърз в гамата“ при 75) — да се потвърди с производителя
> 5. **Prerendering/SSG** — runtime meta е налице; за пълна SPA индексация обмисли vite-ssg/prerender при следваща итерация

**Дата:** 15.07.2026
**Обхват:** целият код в `dev/kasta` (src/, public/, конфигурации, dist/), плюс сравнение с живия сайт на https://kastaventures.com
**Метод:** 5 независими одита (код и архитектура, SEO и съдържание, производителност, достъпност и UX, сигурност и конфигурация) + верификация на спорните находки. `tsc` и `eslint` минават чисто; `npm audit` — 0 уязвимости.

---

## Резюме

| Област | Състояние | Основен проблем |
|---|---|---|
| Деплоймент | 🔴 | Домейнът сервира **друг сайт** (Squarespace) — репото не е живо |
| Навигация | 🔴 | Линковете „ЗА НАС“/„КОНТАКТ“ не скролират; няма 404 |
| Производителност | 🔴 | ~12.7 MB начална страница (може да е ~1.4 MB) |
| SEO | 🔴 | SPA без prerender + един canonical за всички страници |
| Правно/Сигурност | 🔴 | Без security headers; без ЕИК; Cookie Policy твърди неистини |
| Достъпност | 🟠 | Без `<main>`/skip link/focus traps; контрасти под AA |
| Код | 🟢 | Чист TS/ESLint, актуални версии, без секрети — добра основа |

---

## 🔴 Критични

### 1. Домейнът не сервира този сайт
`kastaventures.com` → 301 → `www.kastaventures.com` → **Squarespace** (потвърдено от 3 независими проверки: server header, DNS A записи 198.185.159.x, CNAME `ext-sq.squarespace.com`). Живият сайт е генеричен: заглавие на английски „E RIDE PRO | Explore Electric Models — Buy Now“, **0 броя `<h1>`**, `lang="en-US"`, Organization schema със `sameAs` към **Instagram на Squarespace** (не @erideprobulgaria), работно време различно от това в репото. Маршрутите на репото (`/models`, `/product/*`) връщат 404 на живо.

**Всичко останало в този одит е невидимо за посетители и Google, докато това не се реши.**

**Фикс:** насочете DNS към Vercel (apex A `76.76.21.21`, www CNAME `cname.vercel-dns.com`) и изберете **една** канонична версия (www или non-www) — репото ползва non-www навсякъде, а живият домейн 301-ва към www. Уеднаквете.

### 2. Счупена навигация в менюто
- `src/sections/Navigation.tsx:40,50` (+ мобилни 120–140), `src/sections/Footer.tsx:47-48`, `src/pages/ProductDetail.tsx:125` — линковете `/#about`, `/#contact`, `/#models` сменят URL-а, но **не скролират** до секцията: React Router прави `pushState`, а в проекта няма компонент, който чете `location.hash` (проверено с grep).
- `src/pages/Home.tsx` е единствената страница без `window.scrollTo(0,0)` — връщане от продукт към `/` оставя потребителя на произволна скрол позиция.
- `src/App.tsx:18-25` — **няма `<Route path="*">`**: непознат URL рендерира празна страница (само Navigation + Footer) без съобщение за грешка.

**Фикс:** един глобален ScrollManager в `App.tsx` (при hash → `scrollIntoView`, иначе scroll top) — решава първите две точки и позволява да се махнат 5-те дублирани ефекта по страниците; плюс `<Route path="*" element={<NotFound />} />` (UI-ът от `ProductDetail.tsx:100-113` може да се преизползва).

### 3. Производителност: ~12.7 MB начална страница
- **`public/videos/hero.mp4` = 9.0 MB** за 5-секунден 720p loop (~14.3 Mbps битрейт при нормални 1–2). `Hero.tsx:31-41` го зарежда с `autoPlay` без компресия. → `ffmpeg -crf 28` дава ~0.8 MB (–90%).
- **8-те PNG в `public/images/kasta/` = 3.1 MB** — фотографски PNG-та (642 KB най-големият), показвани в карти по ~400–600 px при 1000–1200 px реални. → WebP q80 дава ~320 KB общо. Внимание: OG таговете в `index.html` сочат същите файлове — за OG оставете PNG/JPG копие.
- **Hero poster** (`sr-offroad-main.png`, 357 KB) е LCP кандидатът — без preload, без оптимизация. → отделен ~50 KB WebP/JPEG + `<link rel="preload" as="image">`.
- **Един JS bundle 469 KB** (153 KB gzip) — всичките 6 маршрута са статични импорти в `App.tsx`, нула `React.lazy()`; GSAP+ScrollTrigger (~27 KB gzip) са в главния chunk.
- **Google Fonts:** заредени 3 семейства (Instrument Serif, Inter, JetBrains Mono), а `src/index.css` ползва **само Inter** — 2 семейства мъртъв товар, render-blocking stylesheet. + GDPR съображение (IP към Google без съгласие, практика LG München) → self-host на Inter.

| | Сега | След фиксове |
|---|---|---|
| hero.mp4 | 9.0 MB | ~0.8 MB |
| Изображения | ~3.4 MB | ~0.4 MB |
| JS (gzip) | 153 KB | ~105 KB |
| Шрифтове | ~150 KB | ~90 KB |
| **Общо** | **~12.7 MB** | **~1.4 MB (–89%)** |

### 4. SEO: SPA без prerender + канонизация на всичко към началната
- `vite.config.ts` няма prerender/SSG; `vercel.json` catch-all → всички маршрути връщат един HTML shell с празен `<div id="root">`. Продукти, цени, FAQ са невидими за скрейпъри без JS (FB/Twitter карти, част от AI кролърите) и бавно индексируеми от Google.
- `index.html:19` — **статичен `<link rel="canonical" href="https://kastaventures.com">` за всички страници**: `/models`, `/product/*`, легалните страници сигнализират на Google „индексирай само началната“.
- Title/description/OG са едни и същи за всички маршрути; `Home.tsx` не сетва title → връщане от продукт оставя продуктовото заглавие на таба.
- `index.html:2` е `lang="bg"`, но `useLang.tsx` никога не пише `document.documentElement.lang` при смяна на EN.

**Фикс:** prerender на 10-те URL от sitemap-а при build (vite-plugin-prerender / vite-ssg / миграция към Astro при желание) + динамични title/description/canonical на маршрут.

### 5. Правно и сигурност
- **Нула security headers** — `vercel.json` дефинира само Cache-Control. Липсват HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy (коментарът в `index.html:64` обещава „на CDN ниво“, но никога не е направено).
- **Липсва ЕИК, правна форма, ДДС номер, седалище** в трите правни страници и footer-а (проверено с grep — 0 съвпадения). „Kasta Ventures“ без ЕИК не идентифицира администратора на данни → изискване по ЗЕТ чл. 4 и GDPR чл. 13. Текстовете иначе са истински (BG+EN, с адрес/имейл/телефон/КЗЛД) — добра основа.
- **Cookie Policy твърди неистини:** `CookiePolicy.tsx:31,33` декларира „Google Analytics, Plausible“ и „Facebook Pixel, Google Ads“, а **в кода няма нито един tracking скрипт** (проверено). Банерът (`CookieConsent.tsx`) записва избор, който **никой не консумира** — event-ът `cookieconsent` няма слушатели. Добро: няма tracking преди съгласие. Лошо: невярно деклариране + мъртъв механизъм.
- **Escape в cookie банера извиква `rejectAll()`** и записва траен отказ в localStorage (`CookieConsent.tsx:159-168`) — затварянето не е информирано решение; и няма начин съгласието да се преразгледа по-късно, въпреки че политиката обещава обратното.

### 6. Достъпност: липсваща базова структура
- **Без `<main>` landmark** на всички страници освен ModelsPage (`Home.tsx:8-16`, `ProductDetail.tsx:116`, легалните) и **без skip link** — клавиатурен потребител минава през цялата навигация на всяка страница. Фикс: `<main>` около `<Routes>` в App.tsx + skip link.
- **Cookie банерът е `role="dialog" aria-modal="true"` без focus trap**, без начален фокус, без заключване на body скрола (`CookieConsent.tsx:179-184`) — Tab обхожда „скритата“ страница отдолу.
- **Мобилното меню** (`Navigation.tsx:113-148`) — същото: без focus trap, без Escape, без scroll lock, фокусът не се връща на хамбургера.

---

## 🟠 Важни

### 7. Невярна продуктова информация (публично видима)
- **Макс. скорост на 3 места с 3 стойности:** Hero казва **75** km/h (`Hero.tsx:92`), About и Contact казват **80** (`About.tsx:93`, `Contact.tsx:178`), а реалният максимум в данните е **77** (Mini R, `products.ts:48`). Верифицирано.
- **BGN конверсии не следват фиксинга 1.95583:** 7 499 € → „14 656 лв.“ (коректно 14 667), 6 399 € → 12 507 (12 516), 4 899 € → 9 576 (9 582), 5 390 € → 10 536 (10 542). Само Mini R е точен. Фикс: една числова EUR стойност + изчисляване.
- **`salePrice` е семантично обърнат** (`products.ts:11,184`): полето съдържа *старата* (зачертана) цена, а `price` е промоцията. Работи визуално, но гарантира бъдеща грешка при въвеждане → преименувайте на `originalPrice`.
- „7+ модела“ (`About.tsx:92`, `Contact.tsx:177`) при точно 7 продукта — приемливо, но „7 модела“ е по-честно.

### 8. Блогът е мъртъв UI
`src/sections/Blog.tsx:112-140` — 4 „статии“ с `cursor-pointer`, hover ефекти и „Прочети повече“, които **не водят наникъде** (без href/onClick/route, не са фокусируеми). Темите са добре подбрани по ключови думи („електрически мотокрос цена България“, „E RIDE PRO ревю“). Или създайте реални `/blog/:slug` страници с 800+ думи (реална SEO стойност), или махнете affordance-а.

### 9. i18n фрагментация
`src/hooks/useLang.tsx`: **~24 от ~40 ключа никога не се използват** (проверено с grep); съжителстват 4 модела на превод — `t()`, inline тернари, локални обекти в компоненти, ~200-редови обекти в тялото на легалните страници (пресъздавани при всеки рендер); `t(key: string)` без типова безопасност (правописна грешка → ключът се показва в UI); контекстната стойност не е мемоизирана; `?lang=en` работи **само при първо посещение** (localStorage има приоритет — `useLang.tsx:111-115`), което прави hreflang alternates от `index.html:23` практически невалидни. Фикс: един типизиран `t()` (`keyof typeof translations.bg`), URL > localStorage приоритет.

### 10. Structured data дефекти
- `index.html:74-75,123` + `public/sitemap.xml:19,24` — сочат **`eride-logo-real.jpg` / `kasta-logo-final.jpg`, а съществуват само .png** → 404 в Organization schema и image sitemap.
- `index.html:108-112` — `SearchAction` към `/models?q=`, но сайтът **няма търсене** — фиктивна schema, риск от санкция за структурирани данни. Премахнете.
- ItemList покрива 3 от 7 продукта, без `url`/`position`; продуктовите страници нямат собствена Product schema; има готово FAQ съдържание (`products.ts`) и breadcrumbs (`ProductDetail.tsx:118-134`) — **липсват FAQPage и BreadcrumbList schema** (лесни победи).
- Offer-ите без `priceValidUntil`, `itemCondition`, `url`.
- Несъществуващ продуктов slug връща HTTP 200 „Продуктът не е намерен“ (soft 404) — нужен `noindex` на not-found изгледа или истински 404.

### 11. Контрасти и фокус (WCAG AA)
- `text-white/30` ≈ 3.2:1 (Contact етикети, Blog „Прочети повече“), `text-white/40` ≈ 4.1:1 (cookie описания на 11px, правни линкове на 10px, Footer) — **под AA 4.5:1**. Минимум `text-white/60`.
- Акцентното червено `#e30613` върху `#0f0f0f` ≈ 3.9:1 — под AA за 12px секционни етикети → по-светло червено (напр. #ff4d5a) или по-едър текст.
- Focus стилове непоследователни: Hero/Models/Footer имат `focus-visible:ring`, но езиковият бутон, хамбургерът, мобилните линкове и cookie toggle-ите разчитат на browser default. Фикс: глобално `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px }`.
- Touch targets под 44px: Instagram икона 32px, cookie toggle 24px, 10px правни линкове.
- Анкерите се скриват под fixed header-а → `section[id] { scroll-margin-top: 80px }`.

### 12. GSAP и reduced motion
- `Models.tsx:50-57` — филтър анимацията ползва глобален селектор `.product-card` извън `gsap.context`, **без cleanup** (единствената в проекта; останалите секции са правилни). Фикс: `gsap.context(..., sectionRef)` + `ctx.revert()`.
- `Contact.tsx:13-40` и `Blog.tsx:75-91` — **не проверяват `prefers-reduced-motion`** (Hero/About/Models/ProductDetail го правят). Контактната карта стартира с inline `opacity:0` — ако ScrollTrigger не сработи, основната контактна информация на сайта остава невидима.
- `html { scroll-behavior: smooth }` без reduced-motion guard + `animate-bounce` в Hero; hero видеото няма бутон за пауза (WCAG 2.2.2) — при декоративна роля: `aria-hidden="true"` + пауза при reduced motion.

### 13. Tailwind латентен бъг
`tailwind.config.js:8,29-32` очаква HSL-тройки (`hsl(var(--border))`), а `index.css:14-15` дефинира hex/rgba → `* { @apply border-border }` компилира до невалиден CSS (пада до `currentColor`), а `bg-accent`/`text-accent` са счупени. Маскирано е, защото компонентите задават цветове явно. Правилните `--accent-hsl`/`--border-hsl` съществуват (`index.css:30,34`) — просто насочете конфига към тях.

### 14. Дребни UX/навигационни
- `Navigation.tsx:22-25,40,50` — NavLink „active“ свети постоянно за „ЗА НАС“ и „КОНТАКТ“ на началната (hash не участва в matching) → обикновен `<Link>` за котвите.
- `Contact.tsx:134-137,157` — имейл/телефон са plain текст, не `mailto:`/`tel:` (Footer ги има правилно); на мобилно не могат да се тапнат.
- Няма контактна форма, а `PrivacyPolicy.tsx:24` описва събиране на данни „чрез формите за контакт“ — несъответствие; mailto-only е задънена улица за мобилни без имейл клиент.
- `Footer.tsx:89` — Facebook линк към голо `https://facebook.com` (placeholder) → реалната страница или премахване.
- `ProductDetail.tsx:173` — mailto subject „Inquiry: E RIDE PRO“ без името на модела (лесна победа).
- Смяна на език на продуктова страница скролва потребителя най-горе (`ProductDetail.tsx:74-79` — обединен ефект с излишни deps; разделете на два).

---

## 🟡 Незначителни

- **Останки от 3 хостинга:** `_redirects` (Netlify), `404.html` + sessionStorage скрипт в `index.html:221-229` (GitHub Pages hack — мъртъв код на Vercel, пречи и на строг CSP), `UPLOAD.md` + къмитната `dist/`. Оставете само Vercel.
- **`vercel.json`:** self-rewrites за `/assets`, `/images` и т.н. са излишни (Vercel сервира съществуващи файлове преди rewrites) — достатъчен е catch-all; няма изрично правило за `index.html` (`max-age=0, must-revalidate` е по-предвидимо).
- **Зависимости:** `kimi-plugin-inspect-react` в `vite.config.ts` — debug плъгин, излишна supply-chain повърхност за продукция; `tailwindcss-animate` дублира ръчните keyframes в `index.css:181-205`; `tailwind.config.js` е пълен shadcn/ui конфиг без нито един shadcn компонент.
- **Дублиран код:** продуктовата карта (Models.tsx ↔ RelatedModels в ProductDetail), Instagram SVG (Navigation ↔ Footer), scroll/title ефекти (5 страници), prefersReducedMotion проверка (4 файла, нереактивна).
- **`main.tsx`** — липсва `<StrictMode>` (би хванал GSAP проблема от т.12).
- **robots.txt:** `Crawl-delay` се игнорира от Google; `Claude-Web`/`Anthropic-ai` са остарели имена (актуално `ClaudeBot`).
- **Favicon:** няма `.ico`/`.svg`, само 192px PNG — Google SERP favicon изисква 48x48-съвместим.
- **manifest.json:** `"purpose": "any maskable"` → отделни икони; screenshot размерите вероятно не съвпадат точно.
- **Лога:** `kasta-logo-final.png` 66 KB (1356×346 при дисплей ≤56px) → ~8 KB; `eride-logo-real.png` 39 KB → ~6 KB; `icon-512` може ~25 KB.
- **Заглавия:** `/models` няма `<h1>` (само h2); FAQ h4 след h2; Footer h4 — прескочени нива. Hero H1 „ОФИЦИАЛЕН ДИСТРИБУТОР ЗА БЪЛГАРИЯ“ без продуктова ключова дума.
- **Alt текстове** — добри, но само на английски при BG таргет (`altBg` поле).
- **Дребни:** meta keywords (шум), sitemap `lastmod` всичко „днес“, smooth scroll се вижда при page transitions (ползвайте `behavior:'instant'` за reset), Google Maps iframe прихваща touch скрола, 10–11px текст на много места, cookie банер `<a>` вместо `<Link>` към политиките (пълен reload).

---

## ✅ Позитиви

- TypeScript компилира чисто, ESLint чист, **npm audit: 0 уязвимости** (396 зависимости).
- **Няма секрети/API ключове** никъде; няма tracking преди съгласие (няма tracking изобщо).
- Актуални версии: React 19.2, Vite 7, Router 7.6, GSAP 3.15.
- Правните текстове са истински (BG+EN), не lorem — с адрес, контакти, КЗЛД.
- Добра TS хигиена (без `any`/`@ts-ignore`), истински `<button>`-и, `aria-expanded`/`role="switch"`, описателни alt текстове, reduced-motion уважен в 4 от 6 секции.
- Кеширане на `/assets` с `immutable` — правилно.

---

## 📋 План за действие (по приоритет)

| # | Действие | Усилие | Ефект |
|---|---|---|---|
| 1 | **Реши деплоймента**: DNS → Vercel + избери www/non-www | решение + 15 мин | Без това нищо друго не е видимо |
| 2 | **Медия**: hero.mp4 → ~0.8 MB (ffmpeg crf 28), 8 PNG → WebP, poster + preload | 1–2 ч | –89% тегло, LCP |
| 3 | **ScrollManager + 404 route + title/lang sync** в App.tsx | 1–2 ч | Поправя цялата навигация |
| 4 | **Security headers във vercel.json + ЕИК в правните страници + Cookie Policy → реалност** | 1–2 ч | Правно съответствие |
| 5 | **Продуктови данни**: скорости (77), BGN по фиксинг, `salePrice`→`originalPrice` | 1 ч | Вярна публична информация |
| 6 | **Prerender + динамични title/canonical/meta** на маршрут | 0.5–1 ден | Индексиране на всички страници |
| 7 | **A11y пакет**: `<main>`+skip link, focus traps (cookie+меню), контрасти, focus стилове | 0.5–1 ден | WCAG AA |
| 8 | **Schema**: .jpg→.png, ItemList 7/7, +FAQPage, +BreadcrumbList, –SearchAction | 2–3 ч | Rich results |
| 9 | **Блог**: реални `/blog/:slug` страници (4-те теми са добри) или махни affordance | решение | SEO съдържание |
| 10 | **Чистка**: хостинг останки, 2 шрифта, kimi-plugin, code splitting, i18n консолидация | 0.5 ден | Поддръжка |

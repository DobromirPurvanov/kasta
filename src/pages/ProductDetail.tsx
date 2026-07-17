import { Link, useParams } from 'react-router'
import { useLang } from '../hooks/useLang'
import { usePageMeta } from '../hooks/usePageMeta'
import { getProductBySlug, products, type Product } from '../data/products'

const keySpecLabels = ['TOP SPEED', 'MOTOR POWER', 'RANGE', 'CHARGING TIME'] as const

function getSpec(product: Product, label: string) {
  return product.specs.find((spec) => spec.label.includes(label))
}

function getKeySpecs(product: Product) {
  return keySpecLabels.flatMap((label) => {
    const spec = getSpec(product, label)
    return spec ? [spec] : []
  })
}

function getDisplaySpecValue(value: string, isBg: boolean) {
  if (!isBg) return value

  return value
    .replace(/SUBJECT TO TERRAIN VARIATIONS/gi, 'СПОРЕД ТЕРЕНА')
    .replace(/SAMSUNG REPLACEABLE LITHIUM/gi, 'SAMSUNG СМЕНЯЕМА ЛИТИЕВА')
    .replace(/ADJUSTABLE SPORT SUSPENSION/gi, 'РЕГУЛИРУЕМО СПОРТНО ОКАЧВАНЕ')
    .replace(/LONG-TRAVEL FRONT & REAR/gi, 'ДЪЛГОХОДОВО ПРЕДНО И ЗАДНО')
    .replace(/REGENERATIVE BRAKING/gi, 'РЕГЕНЕРАТИВНО СПИРАНЕ')
    .replace(/Fat off-road knobby/gi, 'Широки офроуд гуми')
    .replace(/Lightweight aluminum/gi, 'Лек алуминий')
    .replace(/Moped/gi, 'Мопед')
    .replace(/limited/gi, 'ограничена')
    .replace(/category/gi, 'категория')
    .replace(/HOURS/gi, 'ЧАСА')
    .replace(/PEAK/gi, 'ПИКОВА')
}

function getCompactSpecValue(value: string, isBg: boolean) {
  return getDisplaySpecValue(value, isBg)
    .replace(/\s+SUBJECT TO TERRAIN VARIATIONS/i, '')
    .replace(/\s+СПОРЕД ТЕРЕНА/i, '')
    .replace(/\s+\((limited|ограничена)\)/i, '')
}

function ModelTypeBadge({ product, isBg }: { product: Product; isBg: boolean }) {
  const isRoadLegal = product.filters.includes('road-legal') || product.filters.includes('l1e')

  return (
    <span className="inline-flex min-h-9 items-center gap-2 rounded-full border border-fg/15 bg-fg/[0.055] px-3.5 text-[10px] font-extrabold uppercase tracking-[0.13em] text-fg/75">
      <span
        className={`h-2 w-2 rounded-full ${isRoadLegal ? 'bg-emerald-500' : 'bg-[var(--accent)]'}`}
        aria-hidden="true"
      />
      {isRoadLegal
        ? (isBg ? 'Пътно легален · L1e' : 'Road legal · L1e')
        : (isBg ? 'Офроуд модел' : 'Off-road model')}
    </span>
  )
}

function RelatedModels({ currentProduct }: { currentProduct: Product }) {
  const { lang } = useLang()
  const isBg = lang === 'bg'

  const related = products
    .filter(
      (product) =>
        product.id !== currentProduct.id &&
        (product.category === currentProduct.category ||
          product.filters.some((filter) => currentProduct.filters.includes(filter)))
    )
    .slice(0, 3)

  if (related.length === 0) return null

  return (
    <section className="relative overflow-hidden border-t border-fg/[0.08] py-16 sm:py-20 lg:py-28" aria-labelledby="related-models-title">
      <div className="technical-grid pointer-events-none absolute inset-x-0 top-0 h-[30rem] opacity-40" aria-hidden="true" />
      <div className="section-shell relative">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="section-eyebrow mb-4">{isBg ? 'Продължи избора' : 'Keep exploring'}</span>
            <h2 id="related-models-title" className="text-display text-[clamp(2.2rem,5vw,4.5rem)] uppercase text-fg">
              {isBg ? 'Подобни машини.' : 'Related machines.'}
            </h2>
          </div>
          <Link
            to="/models"
            className="group inline-flex min-h-11 items-center gap-2 self-start rounded-full text-[11px] font-bold uppercase tracking-[0.13em] text-[var(--accent-text)] sm:self-auto"
          >
            {isBg ? 'Виж цялата гама' : 'View the full range'}
            <svg className="transition-transform duration-300 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {related.map((product) => {
            const speed = getSpec(product, 'TOP SPEED')
            const range = getSpec(product, 'RANGE')

            return (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                className="group surface-card card-hover overflow-hidden rounded-[1.5rem] sm:rounded-[1.75rem]"
              >
                <div className="media-tile relative flex aspect-[4/3] items-center justify-center overflow-hidden p-5 sm:p-6">
                  <div className="absolute inset-x-[20%] bottom-[12%] h-[20%] rounded-full bg-[rgb(var(--accent-rgb)/0.1)] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                  <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between gap-3">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[var(--accent-text)]">
                      {product.category}
                    </span>
                    <ModelTypeBadge product={product} isBg={isBg} />
                  </div>
                  <img
                    src={product.image}
                    alt={product.alt}
                    loading="lazy"
                    width="1100"
                    height="922"
                    className="relative h-full w-full object-contain drop-shadow-2xl transition-transform duration-500 ease-premium group-hover:-translate-y-1 group-hover:scale-[1.055] dark:brightness-125 dark:contrast-125"
                    onError={(event) => { event.currentTarget.style.opacity = '0.12' }}
                  />
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-[20px] font-bold leading-[1.1] tracking-[-0.035em] text-fg transition-colors group-hover:text-[var(--accent-text)] sm:text-[22px]">
                    {isBg ? product.nameBg : product.name}
                  </h3>

                  <dl className="mt-5 grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-fg/[0.08] bg-fg/[0.045] px-3 py-3">
                      <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-fg/65">{isBg ? 'Скорост' : 'Speed'}</dt>
                      <dd className="mt-1 text-[13px] font-bold text-fg">{speed ? getCompactSpecValue(speed.value, isBg) : '—'}</dd>
                    </div>
                    <div className="rounded-xl border border-fg/[0.08] bg-fg/[0.045] px-3 py-3">
                      <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-fg/65">{isBg ? 'Обхват' : 'Range'}</dt>
                      <dd className="mt-1 line-clamp-1 text-[13px] font-bold text-fg">{range ? getCompactSpecValue(range.value, isBg) : '—'}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex items-end justify-between gap-4 border-t border-fg/[0.08] pt-5">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      {product.originalPrice && <span className="text-[12px] text-fg/65 line-through">{product.originalPrice}</span>}
                      <span className="text-[21px] font-extrabold tracking-[-0.04em] text-fg">{product.price}</span>
                      <span className="text-[11px] text-fg/65">{product.priceBgn}</span>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-fg/10 bg-fg/[0.06] text-fg/75 transition-all duration-300 group-hover:rotate-[-35deg] group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white" aria-hidden="true">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { lang } = useLang()
  const product = getProductBySlug(slug || '')
  const isBg = lang === 'bg'

  usePageMeta({
    title: product
      ? (isBg ? product.titleBg : product.title)
      : isBg ? 'Продуктът не е намерен | Kasta Ventures' : 'Product Not Found | Kasta Ventures',
    description: product ? (isBg ? product.metaDescBg : product.metaDesc) : undefined,
    path: product ? `/product/${product.slug}` : undefined,
    noindex: !product,
  })

  if (!product) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg)] px-6 pt-[76px]">
        <div className="technical-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="relative max-w-lg text-center">
          <span className="section-eyebrow mb-5">404</span>
          <h1 className="text-display text-[clamp(2.6rem,8vw,5rem)] uppercase text-fg">
            {isBg ? 'Моделът не е намерен.' : 'Model not found.'}
          </h1>
          <p className="mx-auto mt-5 max-w-[45ch] text-[15px] leading-relaxed text-fg/70">
            {isBg ? 'Разгледай актуалната E RIDE PRO гама и намери точната машина за теб.' : 'Explore the current E RIDE PRO range and find the right machine for you.'}
          </p>
          <Link to="/models" className="btn-accent mt-8 sm:w-auto">
            {isBg ? 'Виж моделите' : 'View models'}
          </Link>
        </div>
      </div>
    )
  }

  const keySpecs = getKeySpecs(product)
  const inquiryHref = `mailto:office@kastaventures.com?subject=${encodeURIComponent(
    (isBg ? 'Запитване: ' : 'Inquiry: ') + product.name
  )}`
  const description = (isBg ? product.descriptionBg : product.description).split('\n\n')

  return (
    <div className="min-h-screen bg-[var(--bg)] pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-16 text-fg sm:pt-[76px] lg:pb-0">
      {/* Compact breadcrumb keeps the route context without competing with the product hero. */}
      <div className="border-b border-fg/[0.08]">
        <div className="section-shell overflow-x-auto scrollbar-hide">
          <nav className="flex min-w-max items-center gap-2 text-[12px]" aria-label={isBg ? 'Навигационна пътека' : 'Breadcrumb'}>
            <Link to="/" className="inline-flex min-h-11 items-center rounded-sm text-fg/65 transition-colors hover:text-fg">
              {isBg ? 'Начало' : 'Home'}
            </Link>
            <span className="text-fg/35" aria-hidden="true">/</span>
            <Link to="/models" className="inline-flex min-h-11 items-center rounded-sm text-fg/65 transition-colors hover:text-fg">
              {isBg ? 'Модели' : 'Models'}
            </Link>
            <span className="text-fg/35" aria-hidden="true">/</span>
            <span className="max-w-[190px] truncate font-semibold text-fg/80 sm:max-w-none" aria-current="page">
              {isBg ? product.nameBg : product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Product story: one honest media stage plus a sticky conversion summary. */}
      <section className="relative overflow-clip py-7 sm:py-10 lg:py-14 xl:py-16" aria-labelledby="product-title">
        <h1 id="product-title" className="sr-only">{isBg ? product.nameBg : product.name}</h1>
        <div className="technical-grid pointer-events-none absolute inset-x-0 top-0 h-[48rem] opacity-55" aria-hidden="true" />
        <div className="accent-orb pointer-events-none absolute -right-52 top-[-10rem] h-[36rem] w-[36rem] opacity-40" aria-hidden="true" />

        <div className="section-shell relative grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.32fr)_minmax(350px,.68fr)] lg:gap-9 xl:grid-cols-[minmax(0,1.4fr)_minmax(390px,.6fr)] xl:gap-12">
          <aside className="order-1 lg:order-2 lg:sticky lg:top-[104px]" aria-label={isBg ? 'Обобщение и запитване' : 'Product summary and inquiry'}>
            <div className="glass-panel rounded-[1.65rem] p-5 sm:rounded-[2rem] sm:p-7 lg:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[var(--accent-text)]">E RIDE PRO · {product.category}</span>
                <ModelTypeBadge product={product} isBg={isBg} />
              </div>

              <p aria-hidden="true" className="text-display mt-5 text-[clamp(2.5rem,5vw,4.25rem)] uppercase text-fg lg:text-[clamp(2.75rem,4.4vw,4rem)]">
                {isBg ? product.nameBg : product.name}
              </p>
              <p className="mt-5 text-[15px] font-medium leading-[1.7] text-fg/70">
                {isBg ? product.taglineBg : product.tagline}
              </p>

              <div className="my-6 border-y border-fg/[0.1] py-5 sm:my-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-fg/65">{isBg ? 'Цена' : 'Price'}</p>
                <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  {product.originalPrice && <span className="text-[15px] text-fg/65 line-through">{product.originalPrice}</span>}
                  <span className="text-[30px] font-extrabold tracking-[-0.045em] text-fg sm:text-[34px]">{product.price}</span>
                  <span className="text-[13px] font-medium text-fg/65">{product.priceBgn}</span>
                </div>
              </div>

              <dl className="grid grid-cols-2 gap-2.5" aria-label={isBg ? 'Ключови характеристики' : 'Key specifications'}>
                {keySpecs.map((spec) => (
                  <div key={spec.label} className="min-h-[88px] rounded-2xl border border-fg/[0.09] bg-fg/[0.045] px-3.5 py-3.5">
                    <dt className="text-[9px] font-extrabold uppercase tracking-[0.13em] text-fg/65">
                      {isBg ? spec.labelBg : spec.label}
                    </dt>
                    <dd className="mt-1.5 break-words text-[13px] font-bold leading-snug text-fg">
                      {getCompactSpecValue(spec.value, isBg)}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 grid gap-2.5">
                <a href={inquiryHref} className="btn-accent group w-full">
                  {isBg ? 'Изпрати запитване' : 'Send an inquiry'}
                  <svg className="transition-transform duration-300 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
                <a href="tel:+359887773733" className="btn-outline w-full">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>
                  +359 887 77 37 33
                </a>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-fg/[0.1] pt-5 text-[11px] font-semibold leading-relaxed text-fg/70">
                <span className="flex items-start gap-2">
                  <svg className="mt-0.5 shrink-0 text-[var(--accent-text)]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>
                  {isBg ? '2 години гаранция' : '2-year warranty'}
                </span>
                <span className="flex items-start gap-2">
                  <svg className="mt-0.5 shrink-0 text-[var(--accent-text)]" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s7-5 7-12a7 7 0 1 0-14 0c0 7 7 12 7 12Z" /><circle cx="12" cy="9" r="2" /></svg>
                  {isBg ? 'Сервиз в София' : 'Service in Sofia'}
                </span>
              </div>
            </div>
          </aside>

          <div className="order-2 min-w-0 lg:order-1">
            {/* The source data contains one image, so this is deliberately a media stage—not a faux gallery. */}
            <figure className="surface-card media-tile relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-[1.65rem] p-5 sm:min-h-[500px] sm:rounded-[2rem] sm:p-9 lg:min-h-[620px] xl:min-h-[690px] xl:p-12">
              <div className="technical-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
              <span className="pointer-events-none absolute -right-5 top-5 text-[clamp(5rem,16vw,13rem)] font-extrabold leading-none tracking-[-0.09em] text-fg/[0.035]" aria-hidden="true">
                {product.category}
              </span>
              <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between gap-4 sm:left-6 sm:right-6 sm:top-6">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-fg/65">
                  {isBg ? 'Продуктов изглед' : 'Product view'}
                </span>
                <span className="inline-flex min-h-9 items-center rounded-full border border-fg/10 bg-[var(--glass)] px-3 text-[10px] font-bold tracking-[0.12em] text-fg/70 backdrop-blur-md">
                  01 / 01
                </span>
              </div>
              <div className="pointer-events-none absolute inset-x-[18%] bottom-[12%] h-[26%] rounded-full bg-[rgb(var(--accent-rgb)/0.12)] blur-3xl" aria-hidden="true" />
              <img
                src={product.image}
                alt={product.alt}
                width="1100"
                height="922"
                fetchPriority="high"
                className="relative h-full max-h-[590px] w-full object-contain drop-shadow-[0_36px_38px_rgba(0,0,0,0.3)] dark:brightness-125 dark:contrast-125"
                onError={(event) => { event.currentTarget.style.opacity = '0.12' }}
              />
              <figcaption className="absolute bottom-4 left-4 z-10 text-[10px] font-bold uppercase tracking-[0.12em] text-fg/65 sm:bottom-6 sm:left-6">
                E RIDE PRO · {product.category}
              </figcaption>
            </figure>

            <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="product-story-title">
              <div className="grid gap-7 md:grid-cols-[180px_minmax(0,1fr)] md:gap-12">
                <div>
                  <span className="section-eyebrow">01 · {isBg ? 'Характер' : 'Character'}</span>
                </div>
                <div className="max-w-[76ch]">
                  <h2 id="product-story-title" className="sr-only">{isBg ? 'За модела' : 'About this model'}</h2>
                  {description.map((paragraph, index) => (
                    <p
                      key={paragraph}
                      className={index === 0
                        ? 'text-[20px] font-semibold leading-[1.55] tracking-[-0.025em] text-fg sm:text-[24px]'
                        : 'mt-5 text-[15px] leading-[1.8] text-fg/70 sm:text-[16px]'}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </section>

            <section id="specs" className="border-t border-fg/[0.08] py-16 sm:py-20 lg:py-24" aria-labelledby="technical-specifications-title">
              <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="section-eyebrow mb-4">02 · {isBg ? 'Данни' : 'Data'}</span>
                  <h2 id="technical-specifications-title" className="text-display text-[clamp(2.2rem,5vw,4.5rem)] uppercase text-fg">
                    {isBg ? 'Технически данни.' : 'Technical data.'}
                  </h2>
                </div>
                <p className="max-w-[34ch] text-[13px] leading-relaxed text-fg/65 sm:text-right">
                  {isBg ? 'Ключовите параметри на модела на едно място.' : 'The model’s key parameters in one place.'}
                </p>
              </div>

              <dl className="surface-card grid overflow-hidden rounded-[1.5rem] bg-fg/[0.08] sm:grid-cols-2 sm:rounded-[1.75rem]">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="min-h-[96px] border-b border-r border-fg/[0.08] bg-[var(--bg-card)] p-5 sm:p-6">
                    <dt className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-fg/65">
                      {isBg ? spec.labelBg : spec.label}
                    </dt>
                    <dd className="mt-2 break-words text-[14px] font-bold leading-relaxed text-fg sm:text-[15px]">
                      {getDisplaySpecValue(spec.value, isBg)}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="border-t border-fg/[0.08] py-16 sm:py-20 lg:py-24" aria-labelledby="product-faq-title">
              <div className="mb-8 sm:mb-10">
                <span className="section-eyebrow mb-4">03 · {isBg ? 'Отговори' : 'Answers'}</span>
                <h2 id="product-faq-title" className="text-display text-[clamp(2.2rem,5vw,4.5rem)] uppercase text-fg">
                  {isBg ? 'Въпроси за модела.' : 'Model questions.'}
                </h2>
              </div>

              <div className="space-y-3">
                {product.faq.map((item) => (
                  <details key={item.q} className="group surface-card overflow-hidden rounded-2xl">
                    <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-left text-[15px] font-bold leading-snug text-fg transition-colors hover:text-[var(--accent-text)] sm:min-h-[80px] sm:px-6 [&::-webkit-details-marker]:hidden">
                      <span>{isBg ? item.qBg : item.q}</span>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-fg/10 bg-fg/[0.05] text-fg/75 transition-transform duration-300 ease-premium group-open:rotate-45" aria-hidden="true">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                      </span>
                    </summary>
                    <div className="border-t border-fg/[0.08] px-5 pb-6 pt-5 sm:px-6">
                      <p className="max-w-[68ch] text-[14px] leading-[1.75] text-fg/70 sm:text-[15px]">
                        {isBg ? item.aBg : item.a}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>

        </div>
      </section>

      <RelatedModels currentProduct={product} />

      <section className="dark relative overflow-hidden bg-[var(--bg-deep)] py-16 sm:py-20 lg:py-24" aria-labelledby="product-contact-title">
        <div className="technical-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="accent-orb pointer-events-none absolute -bottom-64 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 opacity-55" aria-hidden="true" />
        <div className="section-shell relative grid gap-8 text-center lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:text-left">
          <div>
            <span className="section-eyebrow mb-5">{isBg ? 'Следващата стъпка' : 'The next step'}</span>
            <h2 id="product-contact-title" className="text-display text-[clamp(2.7rem,6vw,6rem)] uppercase text-white">
              {isBg ? <>Усети машината<br /><span className="text-white/40">на живо.</span></> : <>Experience the machine<br /><span className="text-white/40">in person.</span></>}
            </h2>
            <p className="mx-auto mt-5 max-w-[58ch] text-[15px] leading-[1.75] text-white/70 lg:mx-0 sm:text-[16px]">
              {isBg
                ? 'Свържи се с Kasta Ventures за въпроси относно модела или тестово каране.'
                : 'Contact Kasta Ventures with questions about the model or to arrange a test ride.'}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a href={inquiryHref} className="btn-accent sm:w-auto">{isBg ? 'Изпрати запитване' : 'Send an inquiry'}</a>
            <a href="tel:+359887773733" className="btn-outline !border-white/30 !text-white hover:!border-white/60 sm:w-auto">{isBg ? 'Обади се' : 'Call us'}</a>
          </div>
        </div>
      </section>

      {/* Persistent mobile actions remain reachable without covering content or the safe area. */}
      <div className="glass-panel fixed inset-x-0 bottom-0 z-20 border-x-0 border-b-0 px-3 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-3 lg:hidden" aria-label={isBg ? 'Бързи действия' : 'Quick actions'}>
        <div className="mx-auto flex max-w-xl gap-2.5">
          <a href={inquiryHref} className="btn-accent !min-h-12 !w-auto flex-1 !px-4">
            {isBg ? 'Запитване' : 'Inquiry'}
          </a>
          <a href="tel:+359887773733" className="inline-flex min-h-12 min-w-12 flex-1 items-center justify-center gap-2 rounded-full border border-fg/20 bg-[var(--bg-card)] px-4 text-[11px] font-bold uppercase tracking-[0.08em] text-fg transition-colors hover:border-fg/40">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>
            {isBg ? 'Обади се' : 'Call'}
          </a>
        </div>
      </div>
    </div>
  )
}

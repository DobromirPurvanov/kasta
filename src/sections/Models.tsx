import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../hooks/useLang'
import {
  familyLabels,
  familyOrder,
  findSpec,
  publishedProducts,
  versionLabels,
  type FamilyKey,
  type FilterKey,
  type Product,
} from '../data/products'

gsap.registerPlugin(ScrollTrigger)

const filters: { key: FilterKey; label: string; labelBg: string }[] = [
  { key: 'all', label: 'All', labelBg: 'Всички' },
  { key: 'ss-25', label: 'SS 2.5', labelBg: 'SS 2.5' },
  { key: 'ss-30', label: 'SS 3.0', labelBg: 'SS 3.0' },
  { key: 'sr', label: 'SR', labelBg: 'SR' },
  { key: 'mini', label: 'Mini', labelBg: 'Mini' },
  { key: 'off-road', label: 'Off Road', labelBg: 'Офроуд' },
  { key: 'l1e', label: 'L1e', labelBg: 'L1e' },
  { key: 'l3e', label: 'L3e', labelBg: 'L3e' },
]

/**
 * Редовете, които всяка карта показва, еднакви за всички модели, за да могат
 * да се сравняват. За 2.5 е публикувана само номиналната мощност, затова
 * търсим по списък и взимаме първото, което го има.
 */
const cardSpecs = [
  { labels: ['Top speed'], short: 'Speed', shortBg: 'Скорост' },
  { labels: ['Peak power', 'Rated power'], short: 'Power', shortBg: 'Мощност' },
  { labels: ['Range'], short: 'Range', shortBg: 'Обхват' },
  { labels: ['Battery'], short: 'Battery', shortBg: 'Батерия' },
] as const

/** Обхватът и батерията носят пояснения, които не се побират в тясна плочка. */
function short(value: string) {
  return value.split(/ · | при | at /)[0]
}

const familyBlurb: Record<FamilyKey, { bg: string; en: string }> = {
  'ss-25': {
    bg: 'Най-лекият в гамата и най-прощаващият. Същата 72V система като на големите.',
    en: 'The lightest in the range and the most forgiving. Same 72V system as the big ones.',
  },
  'ss-30': {
    bg: 'Голямата батерия и шасито на SR, на по-достъпна цена. Повечето хора се спират на него.',
    en: 'The big battery and the SR chassis for less money. Most people end up here.',
  },
  sr: {
    bg: 'Най-мощният. 25 kW пик, 630 Nm на колелото, от място до 48 km/h за 1,8 секунди.',
    en: 'The most powerful one. 25 kW peak, 630 Nm at the wheel, 0 to 48 km/h in 1.8 seconds.',
  },
  mini: {
    bg: 'Пит байк за възрастни и първи мотор за деца. Мощността се настройва. Само офроуд.',
    en: 'A pit bike for adults and a first bike for kids. The power is adjustable. Off-road only.',
  },
}

function ProductCard({ product, isBg }: { product: Product; isBg: boolean }) {
  const version = versionLabels[product.version]
  const licence = findSpec(product, 'Licence')

  return (
    <Link
      to={`/product/${product.slug}`}
      className="product-card group surface-card card-hover flex flex-col overflow-hidden rounded-[1.4rem] sm:rounded-[1.75rem]"
    >
      <div className="media-tile relative flex aspect-[4/3] items-center justify-center overflow-hidden p-4 sm:p-6">
        <span className="absolute left-4 top-4 z-10 inline-flex min-h-8 items-center gap-2 rounded-full border border-fg/10 bg-[var(--glass)] px-3 text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--text-secondary)] backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
          {isBg ? version.labelBg : version.label}
        </span>
        <div className="pointer-events-none absolute inset-x-[18%] bottom-[12%] h-[22%] rounded-full bg-[rgb(var(--accent-rgb)/0.1)] opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
        <img
          src={product.image}
          alt={product.alt}
          loading="lazy"
          width="1600"
          height="1200"
          className="relative h-full w-full object-contain drop-shadow-2xl transition-transform duration-300 ease-premium group-hover:-translate-y-1 group-hover:scale-[1.055]"
          onError={(event) => { event.currentTarget.style.opacity = '0.12' }}
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h4 className="text-[17px] font-bold leading-[1.15] tracking-[-0.03em] text-fg transition-colors group-hover:text-[var(--accent-text)] sm:text-[19px]">
          {isBg ? product.nameBg : product.name}
        </h4>
        {licence && (
          <p className="mt-2 text-[12px] leading-snug text-[var(--text-secondary)]">
            {isBg ? licence.valueBg ?? licence.value : licence.value}
          </p>
        )}

        <dl className="mt-5 divide-y divide-fg/[0.07] border-y border-fg/[0.07]">
          {cardSpecs.map((item) => {
            const row = item.labels.reduce<ReturnType<typeof findSpec>>(
              (found, label) => found ?? findSpec(product, label),
              undefined
            )
            if (!row) return null

            return (
              <div key={item.short} className="flex items-baseline justify-between gap-3 py-2">
                <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  {isBg ? item.shortBg : item.short}
                </dt>
                <dd className="text-right text-[12.5px] font-bold leading-snug text-fg">
                  {short(isBg ? row.valueBg ?? row.value : row.value)}
                </dd>
              </div>
            )
          })}
        </dl>

        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            {product.originalPrice && (
              <span className="text-[12px] text-[var(--text-muted)] line-through">{product.originalPrice}</span>
            )}
            {product.price ? (
              <span className="text-[20px] font-extrabold tracking-[-0.04em] text-fg">{product.price}</span>
            ) : (
              <span className="text-[13px] font-bold text-[var(--text-secondary)]">
                {isBg ? 'Цена по запитване' : 'Price on request'}
              </span>
            )}
          </div>
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-fg/10 bg-fg/[0.06] text-[var(--text-secondary)] transition-all duration-200 group-hover:rotate-[-35deg] group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)]"
            aria-hidden="true"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

interface ModelsProps {
  showHeader?: boolean
}

export default function Models({ showHeader = true }: ModelsProps) {
  const { lang } = useLang()
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const sectionRef = useRef<HTMLElement>(null)
  const isBg = lang === 'bg'
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const filtered = useMemo(
    () => publishedProducts.filter((product) => activeFilter === 'all' || product.filters.includes(activeFilter)),
    [activeFilter]
  )

  // Гамата се чете по модел, а не като разбъркан списък: всяко семейство
  // държи версиите си заедно, за да се вижда кое от кое се различава.
  const groups = useMemo(
    () =>
      familyOrder
        .map((family) => ({ family, items: filtered.filter((product) => product.family === family) }))
        .filter((group) => group.items.length > 0),
    [filtered]
  )

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.models-heading', {
        opacity: 0,
        y: 24,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.product-card', {
        opacity: 0,
        y: 12,
        duration: 0.3,
        stagger: 0.035,
        ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [activeFilter, prefersReducedMotion])

  return (
    <section
      id="models"
      ref={sectionRef}
      className={`light-section section-light-gradient relative overflow-hidden ${showHeader ? 'section-pad' : 'py-14 sm:py-20 lg:py-24'}`}
      aria-labelledby={showHeader ? 'models-title' : undefined}
    >
      <div className="technical-grid absolute inset-x-0 top-0 h-[34rem] opacity-45 pointer-events-none" aria-hidden="true" />
      <div className="section-shell relative">
        {showHeader && (
          <div className="models-heading grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,440px)] gap-6 lg:gap-14 items-end mb-9 sm:mb-12">
            <div>
              <span className="section-eyebrow mb-5">{isBg ? 'Гамата' : 'The lineup'}</span>
              <h2 id="models-title" className="text-display text-fg uppercase text-[clamp(2.55rem,6vw,5.25rem)]">
                {isBg ? <>Избери своята<br /><span className="text-[var(--accent-text)]">машина.</span></> : <>Choose your<br /><span className="text-[var(--accent-text)]">machine.</span></>}
              </h2>
            </div>
            <div className="lg:pb-1">
              <p className="text-[15px] sm:text-[16px] text-[var(--text-secondary)] leading-[1.75] max-w-[52ch]">
                {isBg
                  ? 'Три модела: SS 2.5, SS 3.0 и SR. Всеки идва в три версии — офроуд, L1e като мопед и L3e като лек мотоциклет. Mini е само офроуд.'
                  : 'Three models: SS 2.5, SS 3.0 and SR. Each comes in three versions, off-road, L1e as a moped and L3e as a light motorcycle. The Mini is off-road only.'}
              </p>
              {/* Беше 18px висока — под минимума за палец. Видът не се мени,
                  зоната за докосване става 44px. */}
              <Link to="/models" className="group inline-flex items-center gap-2 mt-3 min-h-11 text-[11px] font-bold tracking-[0.13em] uppercase text-[var(--accent-text)]">
                {isBg ? 'Сравни цялата гама' : 'Compare the full range'}
                <svg className="transition-transform duration-300 group-hover:translate-x-1" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
          </div>
        )}

        <div className="models-heading flex items-center justify-between gap-5 mb-5 sm:mb-6">
          <div className="relative min-w-0 flex-1 after:absolute after:right-0 after:top-0 after:h-11 after:w-12 after:bg-gradient-to-l after:from-[var(--bg)] after:to-transparent after:pointer-events-none sm:after:hidden">
            <div
              className="flex flex-nowrap gap-2 overflow-x-auto pr-10 pb-1 scrollbar-hide snap-x sm:flex-wrap sm:pr-0"
              role="group"
              aria-label={isBg ? 'Филтри на модели' : 'Model filters'}
            >
              {filters.map((filter) => (
                <button
                  type="button"
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`filter-pill snap-start whitespace-nowrap ${activeFilter === filter.key ? 'active' : ''}`}
                  aria-pressed={activeFilter === filter.key}
                >
                  {isBg ? filter.labelBg : filter.label}
                </button>
              ))}
            </div>
          </div>
          <p className="shrink-0 text-[11px] font-bold tracking-[0.12em] uppercase text-[var(--text-muted)]" aria-live="polite" aria-atomic="true">
            {filtered.length} {isBg ? (filtered.length === 1 ? 'модел' : 'модела') : (filtered.length === 1 ? 'model' : 'models')}
          </p>
        </div>

        <div className="space-y-10 sm:space-y-14">
          {groups.map(({ family, items }) => (
            <div key={family}>
              <div className="mb-4 flex flex-col gap-1.5 border-b border-fg/[0.1] pb-4 sm:mb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                <h3 className="text-[26px] font-extrabold leading-none tracking-[-0.04em] text-fg sm:text-[32px]">
                  E RIDE PRO <span className="text-[var(--accent-text)]">{familyLabels[family]}</span>
                </h3>
                <p className="max-w-[56ch] text-[13px] leading-relaxed text-[var(--text-secondary)] sm:text-right">
                  {isBg ? familyBlurb[family].bg : familyBlurb[family].en}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} isBg={isBg} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

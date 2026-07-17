import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../hooks/useLang'
import { products, type FilterKey, type Product } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

const filters: { key: FilterKey; label: string; labelBg: string }[] = [
  { key: 'all', label: 'All', labelBg: 'Всички' },
  { key: 'mini', label: 'Mini', labelBg: 'Mini' },
  { key: 'road-legal', label: 'Road Legal', labelBg: 'Пътни' },
  { key: 'off-road-fatty', label: 'Off Road', labelBg: 'Офроуд' },
  { key: 'sr', label: 'SR', labelBg: 'SR' },
  { key: 'ss-30', label: 'SS 3.0', labelBg: 'SS 3.0' },
  { key: 'ss-25', label: 'SS 2.5', labelBg: 'SS 2.5' },
  { key: 'l1e', label: 'L1e', labelBg: 'L1e' },
]

function getSpec(product: Product, label: string) {
  return product.specs.find((spec) => spec.label.includes(label))?.value.replace(' (limited)', '')
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

  const filtered = products.filter(
    (product) => activeFilter === 'all' || product.filters.includes(activeFilter)
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
                  ? 'От първото офроуд преживяване до пътно легална ежедневна мобилност — намери точния баланс между мощност, обхват и контрол.'
                  : 'From your first off-road experience to road-legal everyday mobility — find the right balance of power, range and control.'}
              </p>
              <Link to="/models" className="group inline-flex items-center gap-2 mt-5 text-[11px] font-bold tracking-[0.13em] uppercase text-[var(--accent-text)]">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((product, index) => {
            const topSpeed = getSpec(product, 'TOP SPEED')
            const range = getSpec(product, 'RANGE')
            const isRoadLegal = product.filters.includes('road-legal')
            const isFeatured = activeFilter === 'all' && product.slug === 'sr-off-road'

            return (
              <Link
                key={product.id}
                to={`/product/${product.slug}`}
                className={`product-card group surface-card rounded-[1.4rem] sm:rounded-[1.75rem] overflow-hidden card-hover ${
                  isFeatured ? 'lg:col-span-2 lg:grid lg:grid-cols-[minmax(0,1.22fr)_minmax(280px,.78fr)]' : ''
                }`}
              >
                <div className={`relative media-tile overflow-hidden flex items-center justify-center p-4 sm:p-6 ${isFeatured ? 'aspect-[4/3] lg:aspect-auto lg:min-h-[490px]' : 'aspect-[4/3]'}`}>
                  <span className="absolute top-4 left-4 z-10 text-[10px] font-bold tracking-[0.14em] text-fg/45" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 min-h-8 px-3 rounded-full border border-fg/10 bg-[var(--glass)] backdrop-blur-md text-[9px] font-bold tracking-[0.1em] uppercase text-[var(--text-secondary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                    {isRoadLegal ? 'L1e' : isBg ? 'Офроуд' : 'Off road'}
                  </span>
                  <div className="absolute inset-x-[18%] bottom-[12%] h-[22%] bg-[rgb(var(--accent-rgb)/0.1)] blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                  <img
                    src={product.image}
                    alt={product.alt}
                    loading="lazy"
                    width="1100"
                    height="922"
                    className="relative w-full h-full object-contain transition-transform duration-300 ease-premium group-hover:scale-[1.055] group-hover:-translate-y-1 drop-shadow-2xl"
                    onError={(event) => { event.currentTarget.style.opacity = '0.12' }}
                  />
                </div>

                <div className="p-5 sm:p-6 lg:p-7 flex flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-extrabold tracking-[0.16em] text-[var(--accent-text)] uppercase">{product.category}</span>
                    {isFeatured && (
                      <span className="text-[9px] font-bold tracking-[0.13em] uppercase text-[var(--text-muted)]">{isBg ? 'Препоръчан' : 'Featured'}</span>
                    )}
                  </div>
                  <h3 className={`leading-[1.08] font-bold tracking-[-0.035em] text-fg mt-2 group-hover:text-[var(--accent-text)] transition-colors ${isFeatured ? 'text-[24px] lg:text-[30px]' : 'text-[19px] sm:text-[21px]'}`}>
                    {isBg ? product.nameBg : product.name}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] leading-[1.65] text-[var(--text-secondary)] mt-3 line-clamp-2">
                    {isBg ? product.taglineBg : product.tagline}
                  </p>

                  <dl className="grid grid-cols-2 gap-2 mt-5">
                    <div className="rounded-xl bg-fg/[0.045] border border-fg/[0.06] px-3 py-3">
                      <dt className="text-[9px] font-bold tracking-[0.12em] uppercase text-[var(--text-muted)]">{isBg ? 'Скорост' : 'Speed'}</dt>
                      <dd className="text-[13px] font-bold text-fg mt-1">{topSpeed || '—'}</dd>
                    </div>
                    <div className="rounded-xl bg-fg/[0.045] border border-fg/[0.06] px-3 py-3">
                      <dt className="text-[9px] font-bold tracking-[0.12em] uppercase text-[var(--text-muted)]">{isBg ? 'Обхват' : 'Range'}</dt>
                      <dd className="text-[13px] font-bold text-fg mt-1">{range || '—'}</dd>
                    </div>
                  </dl>

                  <div className="flex items-end justify-between gap-4 mt-auto pt-6">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      {product.originalPrice && <span className="text-[12px] text-[var(--text-muted)] line-through">{product.originalPrice}</span>}
                      <span className="text-[21px] font-extrabold tracking-[-0.04em] text-fg">{product.price}</span>
                      <span className="text-[11px] text-[var(--text-muted)]">{product.priceBgn}</span>
                    </div>
                    <span className="w-11 h-11 shrink-0 rounded-full bg-fg/[0.06] border border-fg/10 flex items-center justify-center text-[var(--text-secondary)] group-hover:bg-[var(--accent)] group-hover:text-[var(--accent-ink)] group-hover:border-[var(--accent)] transition-all duration-200 group-hover:rotate-[-35deg]" aria-hidden="true">
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

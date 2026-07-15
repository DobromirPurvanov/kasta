import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../hooks/useLang'
import { products, type FilterKey } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

const filters: { key: FilterKey; label: string; labelBg: string }[] = [
  { key: 'all', label: 'All', labelBg: 'Всички' },
  { key: 'mini', label: 'Mini', labelBg: 'Mini' },
  { key: 'road-legal', label: 'Road Legal', labelBg: 'Пътен' },
  { key: 'off-road-fatty', label: 'Off Road', labelBg: 'Офроуд' },
  { key: 'sr', label: 'SR', labelBg: 'SR' },
  { key: 'ss-30', label: 'SS 3.0', labelBg: 'SS 3.0' },
  { key: 'ss-25', label: 'SS 2.5', labelBg: 'SS 2.5' },
  { key: 'l1e', label: 'L1e', labelBg: 'L1e' },
]

export default function Models() {
  const { lang, t } = useLang()
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const sectionRef = useRef<HTMLElement>(null)
  const isBg = lang === 'bg'
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const filtered = products.filter(
    (p) => activeFilter === 'all' || p.filters.includes(activeFilter)
  )

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.models-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [prefersReducedMotion])

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.product-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [activeFilter, prefersReducedMotion])

  return (
    <section id="models" ref={sectionRef} className="bg-[var(--bg)] py-16 sm:py-20 lg:py-28">
      <div className="section-shell">
        <div
          className="models-title mb-8 sm:mb-10"
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
        >
          <div className="flex items-end justify-between gap-5 mb-8">
            <div>
            <span className="section-eyebrow mb-4">
              {t('models_title')}
            </span>
            <h2 className="text-display text-white text-[32px] sm:text-[40px] md:text-[clamp(42px,5vw,64px)]">
              {isBg ? 'ИЗБЕРИ СВОЯ МОДЕЛ' : 'CHOOSE YOUR MODEL'}
            </h2>
            </div>
            <p className="hidden sm:block shrink-0 text-[12px] font-semibold tracking-[0.12em] uppercase text-white/50" aria-live="polite">
              {filtered.length} {isBg ? (filtered.length === 1 ? 'модел' : 'модела') : (filtered.length === 1 ? 'model' : 'models')}
            </p>
          </div>
          <div
            className="flex flex-nowrap gap-2 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto pb-2 scrollbar-hide snap-x"
            role="group"
            aria-label={isBg ? 'Филтри на модели' : 'Model filters'}
          >
            {filters.map((f) => (
              <button
                type="button"
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`filter-pill snap-start whitespace-nowrap ${
                  activeFilter === f.key ? 'active' : ''
                }`}
                aria-pressed={activeFilter === f.key}
              >
                {isBg ? f.labelBg : f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="product-card group surface-card rounded-2xl sm:rounded-3xl overflow-hidden card-hover"
              style={{ opacity: prefersReducedMotion ? 1 : 0 }}
            >
              <div className="relative aspect-[4/3] bg-[radial-gradient(circle_at_center,_#4a4a4d_0%,_#29292c_42%,_#151517_76%)] overflow-hidden flex items-center justify-center p-4 sm:p-5">
                <img
                  src={product.image}
                  alt={product.alt}
                  loading="lazy"
                  width="600"
                  height="600"
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.04] drop-shadow-2xl brightness-125 contrast-115"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
                <div className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none">
                  <span className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[var(--accent)] text-white text-[10px] sm:text-[11px] font-bold tracking-wider uppercase rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 shadow-xl">
                    {t('quick_view')}
                  </span>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <span className="text-[10px] font-bold tracking-[0.15em] text-[var(--accent-text)] uppercase">
                  {product.category}
                </span>
                <h3 className="text-[16px] leading-snug font-semibold text-white mt-1.5 group-hover:text-[var(--accent-text)] transition-colors">
                  {isBg ? product.nameBg : product.name}
                </h3>
                <p className="text-[13px] leading-relaxed text-white/60 mt-2.5 line-clamp-2 min-h-[42px]">
                  {isBg ? product.taglineBg : product.tagline}
                </p>
                <div className="flex items-end justify-between gap-4 mt-5 pt-4 border-t border-white/[0.08]">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    {product.originalPrice && (
                      <span className="text-[12px] text-white/55 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                    <span className="text-[19px] font-bold text-white">
                      {product.price}
                    </span>
                    <span className="text-[11px] text-white/60">
                      {product.priceBgn}
                    </span>
                  </div>
                  <span className="w-10 h-10 shrink-0 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/70 group-hover:bg-[var(--accent)] group-hover:text-white group-hover:border-[var(--accent)] transition-colors" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

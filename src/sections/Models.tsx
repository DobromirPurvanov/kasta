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
    if (prefersReducedMotion) return
    gsap.fromTo(
      '.product-card',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' }
    )
  }, [activeFilter, prefersReducedMotion])

  return (
    <section id="models" ref={sectionRef} className="bg-[#0f0f0f] py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div
          className="models-title flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
        >
          <div>
            <span className="text-[var(--accent)] text-[12px] font-bold tracking-[0.15em] uppercase mb-3 block">
              {t('models_title')}
            </span>
            <h2 className="text-display text-white text-[28px] sm:text-[32px] md:text-[clamp(40px,5vw,56px)]">
              {isBg ? 'ИЗБЕРИ СВОЯ МОДЕЛ' : 'CHOOSE YOUR MODEL'}
            </h2>
          </div>
          <div
            className="flex flex-wrap md:flex-nowrap gap-2 -mx-1 px-1 md:mx-0 md:px-0 overflow-x-auto pb-2 md:pb-0 scrollbar-hide"
            role="group"
            aria-label={isBg ? 'Филтри на модели' : 'Model filters'}
          >
            {filters.map((f) => (
              <button
                type="button"
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`filter-pill whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                  activeFilter === f.key ? 'active' : ''
                }`}
                aria-pressed={activeFilter === f.key}
              >
                {isBg ? f.labelBg : f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="product-card group bg-[#1a1a1a] border border-white/[0.06] rounded-2xl overflow-hidden card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              style={{ opacity: prefersReducedMotion ? 1 : 0 }}
            >
              <div className="relative aspect-square bg-[radial-gradient(circle_at_center,_#555555_0%,_#333333_35%,_#1a1a1a_70%)] overflow-hidden flex items-center justify-center p-4 sm:p-6">
                <img
                  src={product.image}
                  alt={product.alt}
                  loading="lazy"
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl brightness-125 contrast-115"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[var(--accent)] text-white text-[10px] sm:text-[11px] font-bold tracking-wider uppercase rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 shadow-xl">
                    {t('quick_view')}
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <span className="text-[10px] font-semibold tracking-[0.15em] text-white/50 uppercase">
                  {product.category}
                </span>
                <h3 className="text-[15px] font-semibold text-white mt-1 group-hover:text-[var(--accent)] transition-colors">
                  {isBg ? product.nameBg : product.name}
                </h3>
                <p className="text-[13px] text-white/60 mt-2 line-clamp-2">
                  {isBg ? product.taglineBg : product.tagline}
                </p>
                <div className="flex items-baseline gap-2 mt-4">
                  {product.salePrice && (
                    <span className="text-[13px] text-white/40 line-through">
                      {product.salePrice}
                    </span>
                  )}
                  <span className="text-[18px] font-bold text-white">
                    {product.price}
                  </span>
                  <span className="text-[12px] text-white/50">
                    {product.priceBgn}
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

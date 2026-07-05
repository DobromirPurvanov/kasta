import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../hooks/useLang'
import { products } from '../data/products'
import type { FilterKey } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

const filters: { key: FilterKey; label: string; labelBg: string }[] = [
  { key: 'all', label: 'All', labelBg: 'Всички' },
  { key: 'mini', label: 'Mini', labelBg: 'Mini' },
  { key: 'road-legal', label: 'Road Legal', labelBg: 'Road Legal' },
  { key: 'sr', label: 'SR', labelBg: 'SR' },
  { key: 'ss-30', label: 'SS 3.0', labelBg: 'SS 3.0' },
  { key: 'ss-25', label: 'SS 2.5', labelBg: 'SS 2.5' },
  { key: 'l1e', label: 'L1e', labelBg: 'L1e' },
]

export default function Models() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const sectionRef = useRef<HTMLDivElement>(null)

  const filtered = products.filter(p => activeFilter === 'all' || p.filters?.includes(activeFilter))

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.models-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }})
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    gsap.fromTo('.product-card', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' })
  }, [activeFilter])

  const isBg = lang === 'bg'

  return (
    <section id="models" ref={sectionRef} className="bg-[#0f0f0f] py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="models-title flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12" style={{ opacity: 0 }}>
          <div>
            <span className="text-[var(--accent)] text-[12px] font-bold tracking-[0.15em] uppercase mb-3 block">{isBg ? 'МОДЕЛИ' : 'OUR MODELS'}</span>
            <h2 className="text-display text-white" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
              {isBg ? 'ИЗБЕРИ СВОЯ МОДЕЛ' : 'CHOOSE YOUR MODEL'}
            </h2>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button key={f.key} onClick={() => setActiveFilter(f.key)} className={`filter-pill ${activeFilter === f.key ? 'active' : ''}`}>
                {isBg ? f.labelBg : f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <div key={product.id} onClick={() => navigate(`/product/${product.slug}`)}
              className="product-card group cursor-pointer bg-[#1a1a1a] border border-white/[0.06] rounded-2xl overflow-hidden card-hover"
              style={{ opacity: 0 }}>
              {/* Image */}
              <div className="relative aspect-square bg-[#141414] p-6 overflow-hidden">
                <img src={product.image} alt={product.alt} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="px-5 py-2.5 bg-[var(--accent)] text-white text-[11px] font-bold tracking-wider uppercase rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 shadow-xl">
                    {isBg ? 'БЪРЗ ПРЕГЛЕД' : 'QUICK VIEW'}
                  </span>
                </div>
                {product.salePrice && (
                  <span className="absolute top-4 left-4 bg-[var(--accent)] text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full">
                    SALE
                  </span>
                )}
              </div>
              {/* Info */}
              <div className="p-6">
                <span className="text-[10px] font-semibold tracking-[0.15em] text-white/25 uppercase">{product.category}</span>
                <h3 className="text-[16px] font-semibold text-white mt-1 mb-3 group-hover:text-[var(--accent)] transition-colors">
                  {isBg ? product.nameBg : product.name}
                </h3>
                <div className="flex items-baseline gap-3">
                  <span className="text-[20px] font-bold text-white">{product.price}</span>
                  <span className="text-[13px] text-white/25">{product.priceBgn}</span>
                  {product.salePrice && <span className="text-[13px] text-white/15 line-through">{product.salePrice}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

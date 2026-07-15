import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../hooks/useLang'
import { getProductBySlug, products } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

function RelatedModels({ currentProduct }: { currentProduct: ReturnType<typeof getProductBySlug> }) {
  const { lang } = useLang()
  const isBg = lang === 'bg'

  if (!currentProduct) return null
  const related = products
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        (p.category === currentProduct.category ||
          p.filters.some((f) => currentProduct.filters.includes(f)))
    )
    .slice(0, 3)

  if (related.length === 0) return null

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 border-t border-white/[0.04]">
      <h2 className="text-[13px] font-bold tracking-[0.1em] text-[var(--accent)] uppercase mb-8">
        {isBg ? 'Подобни модели' : 'Related Models'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {related.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.slug}`}
            className="group bg-[#1a1a1a] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/15 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <div className="aspect-square bg-[radial-gradient(circle_at_center,_#2a2a2a_0%,_#1a1a1a_45%,_#0f0f0f_80%)] p-6 overflow-hidden">
              <img
                src={p.image}
                alt={p.alt}
                loading="lazy"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
            <div className="p-5">
              <span className="text-[10px] font-semibold tracking-[0.15em] text-white/50 uppercase">
                {p.category}
              </span>
              <h3 className="text-[14px] font-semibold text-white mt-1 group-hover:text-[var(--accent)] transition-colors">
                {isBg ? p.nameBg : p.name}
              </h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-[16px] font-bold text-white">{p.price}</span>
                <span className="text-[12px] text-white/50">{p.priceBgn}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { lang } = useLang()
  const sectionRef = useRef<HTMLDivElement>(null)
  const product = getProductBySlug(slug || '')
  const isBg = lang === 'bg'
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = isBg
      ? product?.titleBg ?? 'Продукт | Kasta Ventures'
      : product?.title ?? 'Product | Kasta Ventures'
  }, [slug, lang, product, isBg])

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.pd-anim',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.1,
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [slug, prefersReducedMotion])

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center pt-[72px]">
        <div className="text-center">
          <h1 className="text-xl font-light mb-4 text-white/60">
            {isBg ? 'Продуктът не е намерен' : 'Product Not Found'}
          </h1>
          <Link to="/" className="btn-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
            {isBg ? 'Назад' : 'Back'}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#0f0f0f] pt-[72px]">
      {/* Breadcrumb */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-3">
          <nav className="flex items-center gap-2 text-[12px]" aria-label="Breadcrumb">
            <Link to="/" className="text-white/50 hover:text-white transition-colors">
              {isBg ? 'Начало' : 'Home'}
            </Link>
            <span className="text-white/20">/</span>
            <Link to="/#models" className="text-white/50 hover:text-white transition-colors">
              {isBg ? 'МОДЕЛИ' : 'MODELS'}
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white/80 font-medium" aria-current="page">
              {isBg ? product.nameBg : product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Product hero */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Image gallery */}
          <div className="pd-anim flex gap-3" style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
            <div className="flex-1 aspect-square bg-[radial-gradient(circle_at_center,_#2a2a2a_0%,_#1a1a1a_45%,_#0f0f0f_80%)] rounded-2xl overflow-hidden flex items-center justify-center p-6 md:p-10">
              <img
                src={product.image}
                alt={product.alt}
                className="w-full h-full object-contain drop-shadow-2xl"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
          </div>

          {/* Info */}
          <div className="pd-anim" style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
            <span className="text-[11px] font-semibold tracking-[0.15em] text-white/50 uppercase">
              {product.category}
            </span>
            <h1 className="text-display text-white mt-2 mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              {isBg ? product.nameBg : product.name}
            </h1>
            <p className="text-[16px] text-[var(--accent)] font-medium mb-6">
              {isBg ? product.taglineBg : product.tagline}
            </p>
            <div className="flex items-baseline gap-3 mb-8">
              {product.salePrice && (
                <span className="text-[18px] text-white/40 line-through">
                  {product.salePrice}
                </span>
              )}
              <span className="text-[32px] font-bold text-white">{product.price}</span>
              <span className="text-[14px] text-white/50">{product.priceBgn}</span>
            </div>

            <a
              href="mailto:office@kastaventures.com?subject=Inquiry: E RIDE PRO"
              className="btn-accent mb-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f]"
            >
              {isBg ? 'Запитване' : 'Make Inquiry'}
            </a>

            <div className="space-y-4">
              {(isBg ? product.descriptionBg : product.description)
                .split('\n\n')
                .map((para, idx) => (
                  <p key={idx} className="text-[15px] text-white/70 leading-[1.85]">
                    {para}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Specs */}
      <div id="specs" className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <div className="pd-anim" style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
          <h2 className="text-[13px] font-bold tracking-[0.1em] text-[var(--accent)] uppercase mb-6">
            {isBg ? 'Технически спецификации' : 'Technical Specifications'}
          </h2>
          <div className="border-t border-white/[0.06]">
            {product.specs.map((spec, idx) => (
              <div key={idx} className="spec-row">
                <span className="text-[13px] text-white/50 font-medium">
                  {isBg ? spec.labelBg : spec.label}
                </span>
                <span className="text-[13px] text-white font-semibold text-right">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 border-t border-white/[0.04]">
        <div className="pd-anim" style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
          <h2 className="text-[13px] font-bold tracking-[0.1em] text-[var(--accent)] uppercase mb-8">
            {isBg ? 'Често задавани въпроси' : 'FAQ'}
          </h2>
          <div className="space-y-3 max-w-[800px]">
            {product.faq.map((item, idx) => (
              <div key={idx} className="faq-item">
                <h4 className="text-[15px] font-semibold text-white mb-1.5">
                  {isBg ? item.qBg : item.q}
                </h4>
                <p className="text-[14px] text-white/60 leading-relaxed">
                  {isBg ? item.aBg : item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <RelatedModels currentProduct={product} />

      {/* CTA */}
      <div className="bg-[var(--accent)] py-16">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 text-center pd-anim" style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
          <h3
            className="text-display text-white mb-3"
            style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}
          >
            {isBg ? 'Интересуваш ли се?' : 'Interested?'}
          </h3>
          <p className="text-white/80 text-[15px] mb-8 max-w-md mx-auto">
            {isBg
              ? 'Свържи се с нас за повече информация, тестово каране или запитване.'
              : 'Contact us for more info, a test ride, or to make an inquiry.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:office@kastaventures.com"
              className="inline-flex items-center justify-center gap-2 bg-white text-[var(--accent)] px-8 py-3 rounded-full text-[13px] font-semibold uppercase tracking-wider hover:bg-white/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--accent)]"
            >
              {isBg ? 'Изпрати запитване' : 'Send Inquiry'}
            </a>
            <a
              href="tel:+359887773733"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-3 rounded-full text-[13px] font-semibold uppercase tracking-wider border border-white/40 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--accent)]"
            >
              {isBg ? 'Обади се' : 'Call Us'}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

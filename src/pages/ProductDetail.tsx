import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../hooks/useLang'
import { usePageMeta } from '../hooks/usePageMeta'
import { getProductBySlug, products, type Product } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

function RelatedModels({ currentProduct }: { currentProduct: Product }) {
  const { lang } = useLang()
  const isBg = lang === 'bg'

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
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 py-14 sm:py-16 border-t border-white/[0.06]">
      <span className="section-eyebrow mb-7">
        {isBg ? 'Подобни модели' : 'Related Models'}
      </span>
      <div className="grid grid-flow-col auto-cols-[82%] sm:auto-cols-[48%] md:grid-flow-row md:auto-cols-auto md:grid-cols-3 gap-4 overflow-x-auto md:overflow-visible pb-3 md:pb-0 snap-x scrollbar-hide">
        {related.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.slug}`}
            className="group surface-card rounded-2xl sm:rounded-3xl overflow-hidden card-hover snap-start"
          >
            <div className="aspect-[4/3] bg-[radial-gradient(circle_at_center,_#4a4a4d_0%,_#29292c_42%,_#151517_76%)] p-4 sm:p-5 overflow-hidden">
              <img
                src={p.image}
                alt={p.alt}
                loading="lazy"
                width="600"
                height="600"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-xl brightness-125 contrast-115"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
            <div className="p-4 sm:p-5">
              <span className="text-[10px] font-semibold tracking-[0.15em] text-white/60 uppercase">
                {p.category}
              </span>
              <h3 className="text-[14px] font-semibold text-white mt-1 group-hover:text-[var(--accent-text)] transition-colors">
                {isBg ? p.nameBg : p.name}
              </h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-[16px] font-bold text-white">{p.price}</span>
                <span className="text-[12px] text-white/60">{p.priceBgn}</span>
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

  usePageMeta({
    title: product
      ? (isBg ? product.titleBg : product.title)
      : isBg ? 'Продуктът не е намерен | Kasta Ventures' : 'Product Not Found | Kasta Ventures',
    description: product ? (isBg ? product.metaDescBg : product.metaDesc) : undefined,
    path: product ? `/product/${product.slug}` : undefined,
    noindex: !product,
  })

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
    <div ref={sectionRef} className="min-h-screen bg-[var(--bg)] pt-16 sm:pt-[72px]">
      {/* Breadcrumb */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 py-3 overflow-x-auto scrollbar-hide">
          <nav className="flex items-center gap-2 text-[12px] whitespace-nowrap min-w-max" aria-label="Breadcrumb">
            <Link to="/" className="text-white/50 hover:text-white transition-colors">
              {isBg ? 'Начало' : 'Home'}
            </Link>
            <span className="text-white/20">/</span>
            <Link to="/#models" className="text-white/50 hover:text-white transition-colors">
              {isBg ? 'МОДЕЛИ' : 'MODELS'}
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-white/75 font-medium max-w-[180px] sm:max-w-none truncate" aria-current="page">
              {isBg ? product.nameBg : product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Product hero */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start">
          {/* Image gallery */}
          <div className="pd-anim flex gap-3" style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
            <div className="flex-1 aspect-[4/3] lg:aspect-square bg-[radial-gradient(circle_at_center,_#4a4a4d_0%,_#29292c_42%,_#151517_76%)] rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-10 border border-white/[0.08]">
              <img
                src={product.image}
                alt={product.alt}
                width="800"
                height="800"
                className="w-full h-full object-contain drop-shadow-2xl brightness-125 contrast-115"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
          </div>

          {/* Info */}
          <div className="pd-anim" style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
            <span className="text-[11px] font-bold tracking-[0.15em] text-[var(--accent-text)] uppercase">
              {product.category}
            </span>
            <h1 className="text-display text-white mt-2 mb-4 text-[32px] sm:text-[38px] md:text-[clamp(40px,4vw,56px)]">
              {isBg ? product.nameBg : product.name}
            </h1>
            <p className="text-[15px] sm:text-[16px] text-white/70 font-medium mb-6 leading-relaxed">
              {isBg ? product.taglineBg : product.tagline}
            </p>
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-8">
              {product.originalPrice && (
                <span className="text-[16px] sm:text-[18px] text-white/60 line-through">
                  {product.originalPrice}
                </span>
              )}
              <span className="text-[28px] sm:text-[32px] font-bold text-white">{product.price}</span>
              <span className="text-[13px] sm:text-[14px] text-white/60">{product.priceBgn}</span>
            </div>

            <a
              href={`mailto:office@kastaventures.com?subject=${encodeURIComponent(
                (isBg ? 'Запитване: ' : 'Inquiry: ') + product.name
              )}`}
              className="btn-accent sm:w-auto mb-9 sm:mb-10"
            >
              {isBg ? 'Запитване' : 'Make Inquiry'}
            </a>

            <div className="space-y-4">
              {(isBg ? product.descriptionBg : product.description)
                .split('\n\n')
                .map((para, idx) => (
                  <p key={idx} className="text-[15px] text-white/70 leading-[1.8] max-w-[68ch]">
                    {para}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Specs */}
      <div id="specs" className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 py-14 sm:py-16">
        <div className="pd-anim" style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
          <h2 className="section-eyebrow mb-7">
            {isBg ? 'Технически спецификации' : 'Technical Specifications'}
          </h2>
          <div className="surface-card rounded-2xl sm:rounded-3xl px-5 sm:px-7">
            {product.specs.map((spec, idx) => (
              <div key={idx} className="spec-row">
                <span className="text-[12px] text-white/55 font-semibold tracking-[0.04em] uppercase">
                  {isBg ? spec.labelBg : spec.label}
                </span>
                <span className="text-[14px] text-white font-semibold sm:text-right break-words">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 py-14 sm:py-16 border-t border-white/[0.06]">
        <div className="pd-anim" style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
          <h2 className="section-eyebrow mb-7">
            {isBg ? 'Често задавани въпроси' : 'FAQ'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-[1000px]">
            {product.faq.map((item, idx) => (
              <div key={idx} className="faq-item">
                <h3 className="text-[15px] font-semibold text-white mb-1.5">
                  {isBg ? item.qBg : item.q}
                </h3>
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
      <div className="bg-[var(--accent)] py-14 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 text-center pd-anim" style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
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
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a
              href="mailto:office@kastaventures.com"
              className="min-h-12 inline-flex items-center justify-center gap-2 bg-white text-[var(--accent)] px-8 py-3 rounded-full text-[12px] font-bold uppercase tracking-wider hover:bg-white/90 transition-colors"
            >
              {isBg ? 'Изпрати запитване' : 'Send Inquiry'}
            </a>
            <a
              href="tel:+359887773733"
              className="min-h-12 inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-3 rounded-full text-[12px] font-bold uppercase tracking-wider border border-white/50 hover:bg-white/10 transition-colors"
            >
              {isBg ? 'Обади се' : 'Call Us'}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

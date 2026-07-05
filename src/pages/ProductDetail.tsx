import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import gsap from 'gsap'
import { getProductBySlug } from '../data/products'
import { useLang } from '../hooks/useLang'
import RelatedProducts from '../sections/RelatedProducts'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { lang } = useLang()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeImg, setActiveImg] = useState(0)

  const product = getProductBySlug(slug || '')

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.fromTo('.pd-anim', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.1 })
    }, sectionRef)
    return () => ctx.revert()
  }, [slug])

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center pt-[72px]">
        <div className="text-center">
          <h1 className="text-xl font-light mb-4 text-white/40">{lang === 'bg' ? 'Продуктът не е намерен' : 'Product Not Found'}</h1>
          <button onClick={() => navigate('/')} className="btn-accent">{lang === 'bg' ? 'Назад' : 'Back'}</button>
        </div>
      </div>
    )
  }

  const isBg = lang === 'bg'
  const galleryImages = [product.image, product.image, product.image]

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#0f0f0f] pt-[72px]">
      {/* Breadcrumb */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-3">
          <nav className="flex items-center gap-2 text-[12px]">
            <button onClick={() => navigate('/')} className="text-white/20 hover:text-white transition-colors">{isBg ? 'Начало' : 'Home'}</button>
            <span className="text-white/10">/</span>
            <button onClick={() => { navigate('/'); setTimeout(() => document.querySelector('#models')?.scrollIntoView({ behavior: 'smooth' }), 150) }} className="text-white/20 hover:text-white transition-colors">MODELS</button>
            <span className="text-white/10">/</span>
            <span className="text-white/60 font-medium">{isBg ? product.nameBg : product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Hero */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Image Gallery */}
          <div className="pd-anim flex gap-3" style={{ opacity: 0 }}>
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-2 w-20 flex-shrink-0">
              {galleryImages.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)} className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-[var(--accent)]' : 'border-transparent hover:border-white/20'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {/* Main */}
            <div className="flex-1 bg-[#1a1a1a] rounded-2xl p-6 md:p-10 flex items-center justify-center aspect-square">
              <img src={product.image} alt={product.alt} className="w-full max-w-[400px] object-contain" />
            </div>
          </div>

          {/* Product Info */}
          <div className="pd-anim lg:pt-4" style={{ opacity: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-white/[0.05] text-white/40 text-[11px] font-semibold tracking-wider uppercase rounded-full border border-white/[0.06]">
                {product.category}
              </span>
              {product.salePrice && (
                <span className="px-3 py-1 bg-[var(--accent)] text-white text-[11px] font-bold tracking-wider uppercase rounded-full">SALE</span>
              )}
            </div>

            <h1 className="text-display text-white mb-2" style={{ fontSize: 'clamp(26px, 3vw, 40px)' }}>
              {isBg ? product.nameBg : product.name}
            </h1>

            {/* Tagline */}
            <p className="text-[14px] text-[var(--accent)] italic mb-6">{isBg ? product.taglineBg : product.tagline}</p>

            {/* Price dual */}
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-6 pb-6 border-b border-white/[0.06]">
              <span className="text-[32px] font-bold text-white tracking-tight">{product.price}</span>
              <span className="text-[16px] text-white/25">{product.priceBgn}</span>
              {product.salePrice && <span className="text-[16px] text-white/15 line-through ml-2">{product.salePrice}</span>}
            </div>

            {/* Quick specs */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {product.specs.slice(0, 3).map((s, i) => (
                <div key={i} className="bg-[#1a1a1a] border border-white/[0.06] rounded-xl p-3 text-center">
                  <p className="text-[10px] tracking-[0.1em] text-white/20 uppercase font-bold">{isBg ? s.labelBg : s.label}</p>
                  <p className="text-[14px] text-white font-semibold mt-1">{s.value}</p>
                </div>
              ))}
            </div>

            <p className="text-[14px] text-white/40 leading-relaxed mb-8">{isBg ? product.metaDescBg : product.metaDesc}</p>

            <div className="flex flex-wrap gap-3">
              <button onClick={() => { navigate('/'); setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 150) }} className="btn-accent flex-1 min-w-[160px]">
                {isBg ? 'СВЪРЖИ СЕ С НАС' : 'CONTACT US'}
              </button>
              <button className="btn-outline flex-1 min-w-[160px]">{isBg ? 'ПРОВЕРИ НАЛИЧНОСТ' : 'CHECK AVAILABILITY'}</button>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-[#0a0a0a] py-16 border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="pd-anim max-w-[720px]" style={{ opacity: 0 }}>
            <h2 className="text-[13px] font-bold tracking-[0.1em] text-[var(--accent)] uppercase mb-6">{isBg ? 'Описание' : 'Description'}</h2>
            {(isBg ? product.descriptionBg : product.description).split('\n\n').map((para, i) => (
              <p key={i} className="text-[15px] text-white/50 leading-[1.85] mb-5">{para}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Full Specifications */}
      <div id="specs" className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <div className="pd-anim" style={{ opacity: 0 }}>
          <h2 className="text-[13px] font-bold tracking-[0.1em] text-[var(--accent)] uppercase mb-6">{isBg ? 'Технически спецификации' : 'Technical Specifications'}</h2>
          <div className="border-t border-white/[0.06]">
            {product.specs.map((spec, i) => (
              <div key={i} className="spec-row">
                <span className="text-[13px] text-white/30 font-medium">{isBg ? spec.labelBg : spec.label}</span>
                <span className="text-[13px] text-white font-semibold text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 border-t border-white/[0.04]">
        <div className="pd-anim" style={{ opacity: 0 }}>
          <h2 className="text-[13px] font-bold tracking-[0.1em] text-[var(--accent)] uppercase mb-8">{isBg ? 'Често задавани въпроси' : 'FAQ'}</h2>
          <div className="space-y-3 max-w-[800px]">
            {product.faq.map((item, i) => (
              <div key={i} className="faq-item">
                <h4 className="text-[15px] font-semibold text-white mb-1.5">{isBg ? item.qBg : item.q}</h4>
                <p className="text-[14px] text-white/40 leading-relaxed">{isBg ? item.aBg : item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {product && <RelatedProducts currentProduct={product} />}

      {/* CTA Banner */}
      <div className="bg-[var(--accent)] py-16">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 text-center pd-anim" style={{ opacity: 0 }}>
          <h3 className="text-display text-white mb-3" style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}>{isBg ? 'Интересуваш ли се?' : 'Interested?'}</h3>
          <p className="text-white/60 text-[15px] mb-8 max-w-md mx-auto">{isBg ? 'Свържи се с нас за повече информация, тестово каране или запитване.' : 'Contact us for more info, a test ride, or to make an inquiry.'}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => { navigate('/'); setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 150) }} className="btn-outline-accent border-white text-white hover:bg-white hover:text-[var(--accent)]">
              {isBg ? 'СВЪРЖИ СЕ С НАС' : 'CONTACT US'}
            </button>
            <button className="btn-outline border-white/30 text-white hover:bg-white/10">
              {isBg ? 'ПРОВЕРИ НАЛИЧНОСТ' : 'CHECK AVAILABILITY'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

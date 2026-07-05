import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../hooks/useLang'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const { lang } = useLang()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.bento-item', { opacity: 0, y: 30, scale: 0.97 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const isBg = lang === 'bg'

  return (
    <section id="about" ref={sectionRef} className="bg-[#0f0f0f] py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section label */}
        <div className="text-center mb-12">
          <span className="text-[var(--accent)] text-[12px] font-bold tracking-[0.15em] uppercase mb-3 block">
            {isBg ? 'ЗА НАС' : 'OUR ETHOS'}
          </span>
          <h2 className="text-display text-white" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            {isBg ? 'ИСТОРИЯ НА КАЧЕСТВОТО' : 'HISTORY OF QUALITY'}
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {/* Big image - spans 2x2 */}
          <div className="bento-item md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden relative group" style={{ opacity: 0 }}>
            <img src="./images/kasta/hero-stoika.png" alt="E RIDE PRO" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="text-[var(--accent)] text-[48px] md:text-[72px] font-extrabold leading-none">100+</span>
              <p className="text-white/60 text-[12px] tracking-wider uppercase mt-1">
                {isBg ? 'магазина по света' : 'Stores Worldwide'}
              </p>
            </div>
          </div>

          {/* OEM Engineering card */}
          <div className="bento-item bg-[#1a1a1a] border border-white/[0.06] rounded-2xl p-6 flex flex-col justify-center" style={{ opacity: 0 }}>
            <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <h3 className="text-[15px] font-bold text-white mb-2">
              {isBg ? 'OEM ИНЖЕНЕРИНГ' : 'OEM ENGINEERING'}
            </h3>
            <p className="text-[13px] text-white/40 leading-relaxed">
              {isBg ? 'Професионално инженерство и производство от най-висок клас.' : 'Professional engineering and top-tier manufacturing.'}
            </p>
          </div>

          {/* Warranty card */}
          <div className="bento-item bg-[var(--accent)] rounded-2xl p-6 flex flex-col justify-center" style={{ opacity: 0 }}>
            <span className="text-[48px] font-extrabold text-white leading-none">2</span>
            <p className="text-white/80 text-[13px] font-medium mt-2">
              {isBg ? 'ГОДИШНА ГАРАНЦИЯ' : 'YEAR WARRANTY'}
            </p>
            <p className="text-white/50 text-[11px] mt-1">
              {isBg ? 'Пълно покритие от Kasta Ventures' : 'Full coverage from Kasta Ventures'}
            </p>
          </div>

          {/* Performance card */}
          <div className="bento-item bg-[#1a1a1a] border border-white/[0.06] rounded-2xl p-6 flex flex-col justify-center md:col-span-1 lg:col-span-2" style={{ opacity: 0 }}>
            <h3 className="text-[15px] font-bold text-white mb-2">
              {isBg ? 'ДОКАЗАНА ОФРОУД ПРОИЗВОДИТЕЛНОСТ' : 'PERFORMANCE PROVEN OFF-ROAD EXCELLENCE'}
            </h3>
            <p className="text-[13px] text-white/40 leading-relaxed">
              {isBg 
                ? 'Всеки модел е тестван в най-екстремните условия — от планинските пътеки на Рила до пустинните терени.'
                : 'Every model is tested in the most extreme conditions — from Rila mountain trails to desert terrain.'}
            </p>
          </div>

          {/* Stats row */}
          <div className="bento-item md:col-span-3 lg:col-span-4 bg-[#1a1a1a] border border-white/[0.06] rounded-2xl p-6 md:p-8" style={{ opacity: 0 }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { num: '7+', label: isBg ? 'Модела' : 'Models' },
                { num: '80', label: 'km/h ' + (isBg ? 'макс.' : 'top') },
                { num: '8', label: 'kW ' + (isBg ? 'пик' : 'peak') },
                { num: '120', label: 'km ' + (isBg ? 'обхват' : 'range') },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-[clamp(32px,5vw,56px)] font-extrabold text-white leading-none tracking-tighter">{s.num}</div>
                  <div className="text-[11px] text-white/30 tracking-[0.15em] uppercase mt-2 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

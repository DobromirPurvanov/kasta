import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../hooks/useLang'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const { lang } = useLang()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isBg = lang === 'bg'
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.bento-item', { opacity: 0, y: 30, scale: 0.97 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section id="about" ref={sectionRef} className="bg-[var(--bg)] py-16 sm:py-20 lg:py-28">
      <div className="section-shell">
        {/* Section label */}
        <div className="mb-9 sm:mb-12 lg:mb-14">
          <span className="section-eyebrow mb-4">
            {isBg ? 'ЗА НАС' : 'OUR ETHOS'}
          </span>
          <h2 className="text-display max-w-[760px] text-fg text-[32px] sm:text-[40px] md:text-[clamp(42px,5vw,64px)]">
            {isBg ? 'ИСТОРИЯ НА КАЧЕСТВОТО' : 'HISTORY OF QUALITY'}
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-auto lg:auto-rows-[210px]">
          {/* Big image - spans 2x2 */}
          <div className="bento-item sm:col-span-2 lg:row-span-2 min-h-[360px] sm:min-h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden relative group" style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
            <img
              src="/images/kasta/hero-stoika-bg.jpg"
              alt={isBg ? 'Ездач на E RIDE PRO електрически мотокрос' : 'Rider on an E RIDE PRO electric dirt bike'}
              loading="lazy"
              width="1200"
              height="1006"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/15" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <span className="text-[var(--accent-text)] text-[52px] sm:text-[72px] font-extrabold leading-none tracking-[-0.05em]">100+</span>
              <p className="text-white/75 text-[11px] tracking-[0.16em] uppercase mt-2 font-semibold">
                {isBg ? 'магазина по света' : 'Stores Worldwide'}
              </p>
            </div>
          </div>

          {/* OEM Engineering card */}
          <div className="bento-item surface-card min-h-[210px] rounded-2xl sm:rounded-3xl p-6 flex flex-col justify-center" style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
            <div className="w-11 h-11 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center mb-5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <h3 className="text-[15px] font-bold text-fg mb-2">
              {isBg ? 'OEM ИНЖЕНЕРИНГ' : 'OEM ENGINEERING'}
            </h3>
            <p className="text-[14px] text-fg/65 leading-relaxed">
              {isBg ? 'Професионално инженерство и производство от най-висок клас.' : 'Professional engineering and top-tier manufacturing.'}
            </p>
          </div>

          {/* Warranty card */}
          <div className="bento-item min-h-[210px] bg-[var(--accent)] rounded-2xl sm:rounded-3xl p-6 flex flex-col justify-center shadow-[0_24px_70px_rgba(227,6,19,0.18)]" style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
            <span className="text-[56px] font-extrabold text-white leading-none tracking-[-0.05em]">2</span>
            <p className="text-white text-[13px] font-bold tracking-[0.08em] mt-3">
              {isBg ? 'ГОДИШНА ГАРАНЦИЯ' : 'YEAR WARRANTY'}
            </p>
            <p className="text-white/75 text-[12px] mt-1.5">
              {isBg ? 'Пълно покритие от Kasta Ventures' : 'Full coverage from Kasta Ventures'}
            </p>
          </div>

          {/* Performance card */}
          <div className="bento-item surface-card sm:col-span-2 min-h-[210px] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-center" style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
            <h3 className="text-[15px] font-bold text-fg mb-2">
              {isBg ? 'ДОКАЗАНА ОФРОУД ПРОИЗВОДИТЕЛНОСТ' : 'PERFORMANCE PROVEN OFF-ROAD EXCELLENCE'}
            </h3>
            <p className="text-[14px] text-fg/65 leading-relaxed max-w-[620px]">
              {isBg
                ? 'Всеки модел е тестван в най-екстремните условия — от планинските пътеки на Рила до пустинните терени.'
                : 'Every model is tested in the most extreme conditions — from Rila mountain trails to desert terrain.'}
            </p>
          </div>

          {/* Stats row */}
          <div className="bento-item sm:col-span-2 lg:col-span-4 surface-card rounded-2xl sm:rounded-3xl p-3 sm:p-4" style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {[
                { num: '7', label: isBg ? 'Модела' : 'Models' },
                { num: '77', label: 'km/h ' + (isBg ? 'макс.' : 'top') },
                { num: '8', label: 'kW ' + (isBg ? 'пик' : 'peak') },
                { num: '120', label: 'km ' + (isBg ? 'обхват' : 'range') },
              ].map((s, i) => (
                <div key={i} className={`text-center px-3 py-6 sm:py-7 ${i % 2 === 0 ? 'border-r border-fg/10' : ''} ${i < 2 ? 'border-b border-fg/10 lg:border-b-0' : ''} ${i === 1 ? 'lg:border-r' : ''}`}>
                  <div className="text-[32px] sm:text-[38px] lg:text-[48px] font-extrabold text-fg leading-none tracking-[-0.05em]">{s.num}</div>
                  <div className="text-[10px] sm:text-[11px] text-fg/60 tracking-[0.15em] uppercase mt-2 font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

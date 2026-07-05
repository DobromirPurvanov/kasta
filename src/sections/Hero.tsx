import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLang } from '../hooks/useLang'

export default function Hero() {
  const { lang } = useLang()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-logo', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 })
      gsap.fromTo('.hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.8 })
      gsap.fromTo('.hero-stats', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.2 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const isBg = lang === 'bg'

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#0f0f0f] overflow-hidden flex flex-col">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="./images/kasta/sr-offroad-main.jpg"
        >
          <source src="./videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-[#0f0f0f]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-[#0f0f0f]/60" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col justify-center px-6 md:px-10 pt-[100px] pb-8 max-w-[1400px] mx-auto w-full">
        {/* Logos */}
        <div className="hero-logo flex items-center gap-4 mb-10" style={{ opacity: 0 }}>
          {/* Real E RIDE PRO logo */}
          <img
            src="./images/eride-logo-real.jpg"
            alt="E RIDE PRO"
            className="w-20 h-20 object-contain"
          />
          {/* KaSta VENTURES */}
          <div className="flex flex-col">
            <span className="text-[28px] font-bold text-[#4a7fb5] tracking-[0.02em] leading-none">KaSta</span>
            <span className="text-[9px] font-semibold text-[#4a7fb5] tracking-[0.35em] leading-none mt-0.5">VENTURES</span>
          </div>
        </div>

        {/* Big title */}
        <div className="hero-title mb-8" style={{ opacity: 0 }}>
          <h1 className="text-display text-white mb-4" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
            {isBg ? 'ОФИЦИАЛЕН ДИСТРИБУТОР ЗА БЪЛГАРИЯ' : 'OFFICIAL DISTRIBUTOR FOR BULGARIA'}
          </h1>
          <p className="text-white/40 text-[16px] leading-relaxed max-w-[600px]">
            {isBg 
              ? 'E RIDE PRO електрически мото крос. Дистрибуция, сервиз и гаранция от Kasta Ventures.'
              : 'E RIDE PRO electric dirt bikes. Distribution, service and warranty by Kasta Ventures.'}
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          <a href="#models" className="btn-accent">{isBg ? 'ВИЖ МОДЕЛИТЕ' : 'VIEW MODELS'}</a>
          <a href="#specs" className="btn-outline">{isBg ? 'СПЕЦИФИКАЦИИ' : 'SPECIFICATIONS'}</a>
        </div>

        {/* Quick specs */}
        <div className="hero-stats flex flex-wrap gap-8 md:gap-12" style={{ opacity: 0 }}>
          {[
            { num: '8', label: 'kW ' + (isBg ? 'пик' : 'peak') },
            { num: '75', label: 'km/h' },
            { num: '120', label: isBg ? 'км обхват' : 'km range' },
            { num: '2', label: isBg ? 'год. гаранция' : 'yr warranty' },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-[clamp(28px,4vw,48px)] font-extrabold text-white leading-none tracking-tighter">{s.num}</div>
              <div className="text-[11px] text-white/30 tracking-[0.15em] uppercase mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative pb-8 text-center">
        <div className="flex flex-col items-center gap-2 text-white/20">
          <span className="text-[10px] tracking-[0.2em] uppercase">{isBg ? 'Разгледай' : 'Explore'}</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="animate-bounce">
            <path d="M8 4v12M4 14l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  )
}

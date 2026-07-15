import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLang } from '../hooks/useLang'

export default function Hero() {
  const { lang } = useLang()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      const elements = sectionRef.current?.querySelectorAll('.hero-logo, .hero-title, .hero-stats')
      elements?.forEach((el) => { (el as HTMLElement).style.opacity = '1' })
      return
    }

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
          poster="/images/kasta/sr-offroad-main.png"
          aria-label={isBg ? 'Видео на E RIDE PRO мотоциклет' : 'E RIDE PRO motorcycle video'}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/70 to-[#0f0f0f]/30 sm:via-[#0f0f0f]/80 sm:to-[#0f0f0f]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-[#0f0f0f]/50 sm:to-[#0f0f0f]/60" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col justify-center px-5 sm:px-6 md:px-10 pt-[92px] sm:pt-[100px] pb-6 sm:pb-8 max-w-[1400px] mx-auto w-full">
        {/* Logos */}
        <div className="hero-logo flex items-center gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10" style={{ opacity: 0 }}>
          <img
            src="/images/eride-logo-real.jpg"
            alt="E RIDE PRO"
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain rounded-lg"
            width="80"
            height="80"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <img
            src="/images/kasta-logo-final.png"
            alt="Kasta Ventures"
            className="h-9 sm:h-10 md:h-14 object-contain brightness-150 contrast-125"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>

        {/* Big title */}
        <div className="hero-title mb-6 sm:mb-8" style={{ opacity: 0 }}>
          <h1 className="text-display text-white mb-3 sm:mb-4 text-[28px] leading-[1.05] tracking-[-0.02em] sm:text-[32px] md:text-[clamp(40px,5vw,64px)]">
            {isBg ? 'ОФИЦИАЛЕН ДИСТРИБУТОР ЗА БЪЛГАРИЯ' : 'OFFICIAL DISTRIBUTOR FOR BULGARIA'}
          </h1>
          <p className="text-white/80 sm:text-white/70 text-[15px] md:text-[16px] leading-relaxed max-w-[560px]">
            {isBg
              ? 'E RIDE PRO електрически мото крос. Дистрибуция, сервиз и гаранция от Kasta Ventures.'
              : 'E RIDE PRO electric dirt bikes. Distribution, service and warranty by Kasta Ventures.'}
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
          <a href="#models" className="btn-accent text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f]">
            {isBg ? 'ВИЖ МОДЕЛИТЕ' : 'VIEW MODELS'}
          </a>
          <a href="#contact" className="btn-outline text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f]">
            {isBg ? 'КОНТАКТ' : 'CONTACT'}
          </a>
        </div>

        {/* Quick specs */}
        <div className="hero-stats flex flex-wrap gap-5 sm:gap-8 md:gap-12" style={{ opacity: 0 }}>
          {[
            { num: '8', label: 'kW ' + (isBg ? 'пик' : 'peak') },
            { num: '75', label: 'km/h' },
            { num: '120', label: isBg ? 'км обхват' : 'km range' },
            { num: '2', label: isBg ? 'год. гаранция' : 'yr warranty' },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-[24px] sm:text-[26px] md:text-[clamp(28px,4vw,48px)] font-extrabold text-white leading-none tracking-tighter">{s.num}</div>
              <div className="text-[10px] md:text-[11px] text-white/60 tracking-[0.15em] uppercase mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative pb-8 text-center">
        <a href="#models" className="inline-flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg px-2">
          <span className="text-[10px] tracking-[0.2em] uppercase">{isBg ? 'Разгледай' : 'Explore'}</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="animate-bounce" aria-hidden="true">
            <path d="M8 4v12M4 14l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useLang } from '../hooks/useLang'

export default function Hero() {
  const { lang } = useLang()
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoPaused, setVideoPaused] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      const elements = sectionRef.current?.querySelectorAll('.hero-logo, .hero-title, .hero-stats')
      elements?.forEach((el) => { (el as HTMLElement).style.opacity = '1' })
      videoRef.current?.pause()
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-logo', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 })
      gsap.fromTo('.hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 })
      gsap.fromTo('.hero-stats', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1 })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const toggleVideo = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setVideoPaused(false)
    } else {
      video.pause()
      setVideoPaused(true)
    }
  }

  const isBg = lang === 'bg'

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] bg-[var(--bg)] overflow-hidden flex flex-col">
      {/* Video background (decorative) */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/kasta/hero-poster.jpg"
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/videos/hero.mp4" type="video/mp4" media="(min-width: 640px)" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/35 sm:from-[var(--bg)] sm:via-[var(--bg)]/75 sm:to-[var(--bg)]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-black/45" />
      </div>

      {/* Pause/play control for the background video (WCAG 2.2.2) */}
      <button
        type="button"
        onClick={toggleVideo}
        className="absolute top-20 right-4 sm:top-auto sm:bottom-6 sm:right-6 md:right-10 z-20 w-11 h-11 rounded-full border border-white/20 bg-black/55 backdrop-blur-sm hidden sm:flex items-center justify-center text-white/75 hover:text-white hover:border-white/40 transition-all"
        aria-label={videoPaused ? (isBg ? 'Пусни видеото' : 'Play video') : (isBg ? 'Спри видеото' : 'Pause video')}
      >
        {videoPaused ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>
        )}
      </button>

      {/* Content */}
      <div className="relative flex-1 flex flex-col justify-end sm:justify-center pt-28 pb-8 sm:pt-[112px] sm:pb-12 section-shell">
        {/* Logos */}
        <div className="hero-logo hidden sm:flex items-center gap-3 md:gap-4 mb-7 md:mb-9" style={{ opacity: 0 }}>
          <img
            src="/images/eride-logo-small.png"
            alt=""
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain rounded-lg"
            width="80"
            height="80"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <img
            src="/images/kasta-logo-small.png"
            alt=""
            className="h-9 sm:h-10 md:h-14 object-contain brightness-150 contrast-125"
            width="220"
            height="56"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>

        {/* Big title */}
        <div className="hero-title mb-6 sm:mb-8" style={{ opacity: 0 }}>
          <p className="section-eyebrow mb-4">
            {isBg ? 'Официален дистрибутор за България' : 'Official Distributor for Bulgaria'}
          </p>
          <h1 className="text-display text-white mb-4 sm:mb-5 text-[clamp(2.35rem,11vw,3.25rem)] sm:text-[48px] md:text-[clamp(54px,6vw,82px)] max-w-[1040px]">
            E RIDE PRO
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
              {isBg ? 'ЕЛЕКТРИЧЕСКИ МОТОКРОС' : 'ELECTRIC DIRT BIKES'}
            </span>
          </h1>
          <p className="text-white/75 text-[15px] sm:text-[16px] leading-relaxed max-w-[600px]">
            {isBg
              ? 'Пълната гама E RIDE PRO модели — с дистрибуция, сервиз и 2 години гаранция от Kasta Ventures.'
              : 'The full E RIDE PRO range — with distribution, service and a 2-year warranty by Kasta Ventures.'}
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-7 sm:mb-10">
          <a href="#models" className="btn-accent text-center sm:w-auto">
            {isBg ? 'ВИЖ МОДЕЛИТЕ' : 'VIEW MODELS'}
          </a>
          <a href="#contact" className="btn-outline text-center sm:w-auto">
            {isBg ? 'КОНТАКТ' : 'CONTACT'}
          </a>
        </div>

        {/* Quick specs */}
        <div className="hero-stats grid grid-cols-2 sm:flex sm:flex-wrap surface-card sm:bg-transparent sm:border-0 rounded-2xl sm:rounded-none overflow-hidden sm:overflow-visible sm:gap-8 md:gap-12" style={{ opacity: 0 }}>
          {[
            { num: '8', label: 'kW ' + (isBg ? 'пик' : 'peak') },
            { num: '77', label: isBg ? 'км/ч макс.' : 'km/h top' },
            { num: '120', label: isBg ? 'км обхват' : 'km range' },
            { num: '2', label: isBg ? 'год. гаранция' : 'yr warranty' },
          ].map((s, i) => (
            <div key={i} className={`px-4 py-4 sm:p-0 ${i % 2 === 0 ? 'border-r border-white/10 sm:border-0' : ''} ${i < 2 ? 'border-b border-white/10 sm:border-0' : ''}`}>
              <div className="text-[26px] sm:text-[30px] md:text-[clamp(30px,4vw,48px)] font-extrabold text-white leading-none tracking-[-0.05em]">{s.num}</div>
              <div className="text-[10px] md:text-[11px] text-white/60 tracking-[0.13em] uppercase mt-1.5 font-semibold">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative hidden sm:block pb-8 text-center">
        <a href="#models" className="inline-flex flex-col items-center gap-2 text-white/60 hover:text-white/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg px-2 py-1">
          <span className="text-[10px] tracking-[0.2em] uppercase">{isBg ? 'Разгледай' : 'Explore'}</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="animate-bounce" aria-hidden="true">
            <path d="M8 4v12M4 14l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  )
}

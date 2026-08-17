import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import SectionLink from '../components/SectionLink'
import { useLang } from '../hooks/useLang'
import { findSpec, getProductBySlug } from '../data/products'

export default function Hero() {
  const { lang } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoPaused, setVideoPaused] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const isBg = lang === 'bg'

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      videoRef.current?.pause()
      return
    }

    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', {
        opacity: 0,
        y: 30,
        duration: 0.56,
        stagger: 0.08,
        ease: 'power3.out',
      })
      gsap.from('.hero-featured', {
        opacity: 0,
        x: 28,
        scale: 0.97,
        duration: 0.62,
        ease: 'power3.out',
        delay: 0.16,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggleVideo = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      void video.play().then(() => setVideoPaused(false)).catch(() => setVideoPaused(true))
    } else {
      video.pause()
      setVideoPaused(true)
    }
  }

  // Числата се четяха като „гамата може толкова“, а всъщност са на един модел.
  // Затова вече идват от самия SR и носят името му над себе си.
  const flagship = getProductBySlug('sr-off-road')
  const statFor = (label: string) => {
    const row = flagship && findSpec(flagship, label)
    if (!row) return '—'
    // В лентата има място само за числото — уточненията са в таблицата на модела.
    return (isBg ? row.valueBg ?? row.value : row.value).split(/ · | при | at /)[0]
  }

  const stats = [
    { value: statFor('Peak power'), label: isBg ? 'пикова мощност' : 'peak power' },
    { value: statFor('Top speed'), label: isBg ? 'макс. скорост' : 'top speed' },
    { value: statFor('Range'), label: isBg ? 'обхват' : 'range' },
  ]

  return (
    <section ref={sectionRef} className="dark relative min-h-[100svh] overflow-hidden bg-[var(--bg)] text-fg flex flex-col">
      {/* Cinematic media layer */}
      <div className="absolute inset-0" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-[1.015]"
          poster="/images/kasta/hero-poster-eride-dust-v2.jpg"
          preload="metadata"
          tabIndex={-1}
        >
          {/* Официалният кадър на E RIDE PRO — истинският мотор, не рендер.
              Широкият вариант е първи и с media, за да го хванат и браузърите,
              които изобщо не четат media при <source> (иначе телефонният кадър
              щеше да отиде на десктопа). Вторият е без media и затова служи и
              като резерва — под 640px нямаше нито един съвпадащ източник и
              видеото стоеше замръзнало на постера. */}
          <source src="/videos/hero-eride-dust-v2.mp4" type="video/mp4" media="(min-width: 640px)" />
          <source src="/videos/hero-eride-dust-v2-portrait.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay-side absolute inset-0" />
        <div className="hero-overlay-vertical absolute inset-0" />
        <div className="technical-grid absolute inset-0 opacity-55" />
        <div className="accent-orb absolute -left-32 bottom-[-18rem] w-[38rem] h-[38rem] opacity-70" />
      </div>

      {/* Accessible control for all automatically moving media */}
      <button
        type="button"
        onClick={toggleVideo}
        className="glass-panel absolute top-[5.25rem] right-4 sm:top-auto sm:bottom-7 sm:right-7 z-30 w-11 h-11 rounded-full hidden sm:flex items-center justify-center text-[var(--text-secondary)] hover:text-fg hover:scale-105 transition-all duration-200"
        aria-label={videoPaused ? (isBg ? 'Пусни видеото' : 'Play video') : (isBg ? 'Спри видеото' : 'Pause video')}
      >
        {videoPaused ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
        )}
      </button>

      <div className="relative z-10 flex-1 flex items-end pt-28 pb-8 sm:pt-32 sm:pb-10 lg:pt-36 lg:pb-12">
        <div className="section-shell grid lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px] gap-10 lg:gap-14 items-end">
          <div className="min-w-0">
            <div className="hero-reveal inline-flex items-center gap-3 min-h-9 px-3.5 rounded-full border border-white/10 bg-white/[0.055] backdrop-blur-md mb-5 sm:mb-7">
              <span className="status-pulse w-1.5 h-1.5 rounded-full bg-[var(--accent-light)]" aria-hidden="true" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase text-[var(--text-secondary)]">
                {isBg ? 'Официален представител // България' : 'Official representative // Bulgaria'}
              </span>
            </div>

            {/* Долната граница на clamp беше 3.05rem и печелеше под ~690px ширина —
                при 390px „ЕЛЕКТРИЧЕСКИ“ искаше 375px в кутия от 295px и се режеше.
                1.9rem побира най-тесния екран (320px). Над 430px нищо не се
                променя спрямо vw частта, тоест десктопът е непокътнат. */}
            <h1 className="hero-reveal text-display uppercase max-w-[940px]" style={{ fontSize: 'clamp(1.9rem, 7.1vw, 7rem)' }}>
              <span className="block text-fg">{isBg ? 'Електрически' : 'Electric dirt'}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-light)] to-[var(--accent)]">
                {isBg ? 'мотокрос.' : 'bikes.'}
              </span>
            </h1>

            <div className="hero-reveal mt-5 sm:mt-7 flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
              <p className="max-w-[600px] text-[15px] sm:text-[17px] leading-[1.7] text-[var(--text-secondary)]">
                {isBg
                  ? 'Цялата гама E RIDE PRO, с 2 години гаранция и сервиз в София. Частите ги имаме на място, не се чакат по месец.'
                  : 'The full E RIDE PRO range, with a 2-year warranty and service in Sofia. We keep parts in stock, so you are not waiting a month for them.'}
              </p>
              <span className="hidden md:block w-px h-12 bg-white/15" aria-hidden="true" />
              <p className="hidden md:block shrink-0 text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--text-muted)] leading-loose">
                {isBg ? <>София<br />България</> : <>Sofia<br />Bulgaria</>}
              </p>
            </div>

            <div className="hero-reveal flex flex-col sm:flex-row gap-3 mt-7 sm:mt-9">
              <Link to="/models" className="btn-accent group sm:w-auto">
                {isBg ? 'Разгледай моделите' : 'Explore models'}
                <svg className="transition-transform duration-300 group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
              <SectionLink section="contact" className="btn-outline sm:w-auto">
                {isBg ? 'Запази тестово каране' : 'Book a test ride'}
              </SectionLink>
            </div>

            <div className="hero-reveal max-w-[690px] mt-8 sm:mt-11">
              <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.16em] uppercase text-[var(--text-muted)] mb-2">
                {isBg ? 'Данни за SR Офроуд · флагманът' : 'SR Off Road figures · the flagship'}
              </p>
              <dl className="grid grid-cols-3 border-y border-white/10">
                {stats.map((stat, index) => (
                  <div key={stat.label} className={`py-4 sm:py-5 ${index > 0 ? 'pl-4 sm:pl-7 border-l border-white/10' : ''}`}>
                    <dt className="text-[9px] sm:text-[10px] font-bold tracking-[0.13em] uppercase text-[var(--text-muted)] mb-1.5">{stat.label}</dt>
                    <dd className="text-[16px] sm:text-[21px] font-bold tracking-[-0.035em] text-fg">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Featured product card creates a direct path from emotion to product detail. */}
          <Link
            to="/product/sr-off-road"
            className="hero-featured glass-panel group relative hidden lg:flex min-h-[430px] rounded-[2rem] p-5 overflow-hidden flex-col focus-visible:outline-none"
            aria-label={isBg ? 'Виж E RIDE PRO SR Off Road' : 'View E RIDE PRO SR Off Road'}
          >
            <div className="absolute -right-8 top-12 text-[150px] font-extrabold leading-none tracking-[-0.09em] text-white/[0.035]" aria-hidden="true">SR</div>
            <div className="absolute inset-x-10 top-24 h-36 rounded-full bg-[rgb(var(--accent-rgb)/0.18)] blur-3xl group-hover:bg-[rgb(var(--accent-rgb)/0.26)] transition-colors duration-300" aria-hidden="true" />

            <div className="relative flex items-center justify-between gap-4">
              <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-[var(--text-muted)]">
                {isBg ? 'Флагмански модел' : 'Flagship model'}
              </span>
              <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.12em] uppercase text-[var(--text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-light)]" /> 01
              </span>
            </div>

            <div className="relative flex-1 flex items-center justify-center py-4">
              <img
                src="/images/kasta/sr-offroad-main-v2.webp"
                alt=""
                width="1600"
                height="1200"
                className="w-full object-contain drop-shadow-2xl transition-transform duration-300 ease-premium group-hover:scale-[1.07] group-hover:-translate-y-2"
              />
            </div>

            <div className="relative border-t border-white/10 pt-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.14em] font-bold text-[var(--accent-text)]">E RIDE PRO</p>
                  <h2 className="text-[20px] font-bold tracking-[-0.035em] text-fg mt-1">SR Off Road</h2>
                  <p className="text-[12px] text-[var(--text-muted)] mt-1">{statFor('Top speed')} · {statFor('Peak power')}</p>
                </div>
                <span className="w-11 h-11 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] flex items-center justify-center transition-transform duration-300 group-hover:rotate-[-35deg]" aria-hidden="true">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}

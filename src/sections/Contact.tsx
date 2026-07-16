import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../hooks/useLang'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const { t, lang } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const isBg = lang === 'bg'
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-card',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )
      gsap.fromTo(
        '.contact-stat',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-stats-row', start: 'top 90%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section id="contact" ref={sectionRef} className="bg-[var(--bg)] pt-16 sm:pt-20 lg:pt-28">
      <div className="section-shell mb-9 sm:mb-12">
        <span className="section-eyebrow mb-4">
          {t('contact_title')}
        </span>
        <h2 className="text-display text-fg text-[32px] sm:text-[40px] md:text-[clamp(42px,5vw,64px)]">
          {isBg ? 'СВЪРЖИ СЕ С НАС' : 'GET IN TOUCH'}
        </h2>
      </div>

      <div className="relative w-full flex flex-col gap-4 md:block">
        <div className="contact-overlay relative z-10 mx-4 sm:mx-6 md:mx-0 md:absolute md:left-10 md:top-1/2 md:-translate-y-1/2">
          <div className="contact-card surface-card bg-[var(--bg-elevated)]/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-7 max-w-full md:max-w-[380px] shadow-2xl" style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[var(--accent)] rounded-lg flex items-center justify-center">
                <span className="text-white font-extrabold text-[7px] tracking-wider leading-tight text-center">
                  E
                  <br />
                  RIDE
                  <br />
                  PRO
                </span>
              </div>
              <div>
                <span className="text-[16px] font-bold text-fg">KaSta</span>
                <span className="text-[10px] font-bold text-fg/40 ml-1">
                  VENTURES
                </span>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-fg/[0.05] border border-fg/[0.06] flex items-center justify-center flex-shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.1em] text-fg/60 uppercase font-semibold">
                    {t('location_title')}
                  </p>
                  <p className="text-[14px] text-fg/80">{t('location_address')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-fg/[0.05] border border-fg/[0.06] flex items-center justify-center flex-shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                  >
                    <path d="M22 17H2a3 3 0 003-3V9a7 7 0 0114 0v5a3 3 0 003 3zm-8.5 4h-3a1.5 1.5 0 00-1.5 1.5V23h6v-.5A1.5 1.5 0 0013.5 21z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.1em] text-fg/60 uppercase font-semibold">
                    {t('contact_email_label')}
                  </p>
                  <a
                    href="mailto:office@kastaventures.com"
                    className="text-[14px] text-fg/80 hover:text-fg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm"
                  >
                    office@kastaventures.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-fg/[0.05] border border-fg/[0.06] flex items-center justify-center flex-shrink-0">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.1em] text-fg/60 uppercase font-semibold">
                    {t('contact_phone_label')}
                  </p>
                  <a
                    href="tel:+359887773733"
                    className="text-[14px] text-fg/80 hover:text-fg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm"
                  >
                    +359 887 77 37 33
                  </a>
                </div>
              </div>
            </div>

            <a
              href="mailto:office@kastaventures.com"
              className="btn-accent w-full mt-7"
            >
              {t('make_inquiry')}
            </a>
          </div>
        </div>

        <div className="h-[340px] sm:h-[420px] md:h-[clamp(480px,56vh,620px)] overflow-hidden border-y border-fg/[0.08]">
          <iframe
            title={isBg ? 'Местоположение на Kasta Ventures' : 'Kasta Ventures location'}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.0!2d23.27323!3d42.648462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDM4JzU0LjUiTiAyM8KwMTYnMjMuNiJF!5e0!3m2!1sen!2sbg!4v1700000000000!5m2!1sen!2sbg"
            width="100%"
            height="100%"
            className="map-frame"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="contact-stats-row bg-[var(--bg-deep)]">
        <div className="section-shell py-5 sm:py-7">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { num: '2', label: isBg ? 'год. гаранция' : 'year warranty' },
              { num: '7', label: isBg ? 'модела' : 'models' },
              { num: '77', label: isBg ? 'км/ч макс.' : 'km/h top' },
              { num: '2', label: isBg ? 'часа зареждане' : 'hours charging' },
            ].map((s, i) => (
              <div key={i} className={`contact-stat text-center px-2 py-5 sm:py-6 ${i % 2 === 0 ? 'border-r border-fg/10' : ''} ${i < 2 ? 'border-b border-fg/10 md:border-b-0' : ''} ${i === 1 ? 'md:border-r' : ''}`} style={{ opacity: prefersReducedMotion ? 1 : 0 }}>
                <div className="text-[30px] sm:text-[38px] lg:text-[46px] font-extrabold text-fg leading-none tracking-[-0.05em]">
                  {s.num}
                </div>
                <div className="text-[10px] sm:text-[11px] text-fg/60 tracking-[0.14em] uppercase mt-2 font-semibold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

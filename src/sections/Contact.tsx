import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../hooks/useLang'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const { t, lang } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const isBg = lang === 'bg'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-overlay',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
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
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="bg-[#0f0f0f] pt-20 md:pt-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-12">
        <span className="text-[var(--accent)] text-[12px] font-bold tracking-[0.15em] uppercase mb-3 block">
          {t('contact_title')}
        </span>
        <h2
          className="text-display text-white"
          style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
        >
          {isBg ? 'СВЪРЖИ СЕ С НАС' : 'GET IN TOUCH'}
        </h2>
      </div>

      <div
        className="relative w-full"
        style={{ height: 'clamp(400px, 50vh, 600px)' }}
      >
        <iframe
          title="Kasta Ventures Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.0!2d23.27323!3d42.648462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDM4JzU0LjUiTiAyM8KwMTYnMjMuNiJF!5e0!3m2!1sen!2sbg!4v1700000000000!5m2!1sen!2sbg"
          width="100%"
          height="100%"
          style={{
            border: 0,
            filter: 'grayscale(100%) invert(92%) hue-rotate(180deg) contrast(85%)',
            borderRadius: 0,
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div
          className="contact-overlay absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-10"
          style={{ opacity: 0 }}
        >
          <div className="bg-[#0f0f0f]/95 backdrop-blur-md border border-white/[0.08] rounded-2xl p-6 md:p-8 max-w-[340px] shadow-2xl">
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
                <span className="text-[16px] font-bold text-white">KaSta</span>
                <span className="text-[10px] font-bold text-white/40 ml-1">
                  VENTURES
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center flex-shrink-0 mt-0.5">
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
                  <p className="text-[10px] tracking-[0.1em] text-white/30 uppercase font-semibold">
                    {t('location_title')}
                  </p>
                  <p className="text-[14px] text-white/70">{t('location_address')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center flex-shrink-0 mt-0.5">
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
                  <p className="text-[10px] tracking-[0.1em] text-white/30 uppercase font-semibold">
                    {t('contact_email_label')}
                  </p>
                  <p className="text-[14px] text-white/70">
                    office@kastaventures.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center flex-shrink-0 mt-0.5">
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
                  <p className="text-[10px] tracking-[0.1em] text-white/30 uppercase font-semibold">
                    {t('contact_phone_label')}
                  </p>
                  <p className="text-[14px] text-white/70">+359 887 77 37 33</p>
                </div>
              </div>
            </div>

            <a
              href="mailto:office@kastaventures.com"
              className="btn-accent w-full mt-6 text-[12px] py-3"
            >
              {t('make_inquiry')}
            </a>
          </div>
        </div>
      </div>

      <div className="contact-stats-row border-t border-white/[0.06] bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '2', label: isBg ? 'год. гаранция' : 'year warranty' },
              { num: '7+', label: isBg ? 'модела' : 'models' },
              { num: '80', label: isBg ? 'км/ч макс.' : 'km/h top' },
              { num: '2', label: isBg ? 'часа зареждане' : 'hours charging' },
            ].map((s, i) => (
              <div key={i} className="contact-stat text-center" style={{ opacity: 0 }}>
                <div className="text-[clamp(28px,4vw,48px)] font-extrabold text-white leading-none tracking-tighter">
                  {s.num}
                </div>
                <div className="text-[11px] text-white/30 tracking-[0.15em] uppercase mt-2 font-medium">
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

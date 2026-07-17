import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../hooks/useLang'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const { t, lang } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const isBg = lang === 'bg'
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        opacity: 0,
        y: 22,
        duration: 0.5,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [prefersReducedMotion])

  const directionsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('ул. Даскал Стоян Попандреев 28, София')

  return (
    <section id="contact" ref={sectionRef} className="dark relative overflow-hidden bg-[var(--bg)] text-white section-pad">
      <div className="technical-grid absolute inset-0 opacity-55" aria-hidden="true" />
      <div className="accent-orb absolute -right-44 -bottom-52 w-[42rem] h-[42rem] opacity-55" aria-hidden="true" />

      <div className="section-shell relative">
        <div className="contact-reveal grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,470px)] gap-6 lg:gap-16 items-end mb-10 sm:mb-14">
          <div>
            <span className="section-eyebrow mb-5">{isBg ? 'Свържи се с нас' : 'Get in touch'}</span>
            <h2 className="text-display uppercase text-white text-[clamp(3.05rem,7vw,6.75rem)]">
              {isBg ? <>Следващото<br /><span className="text-white/35">каране започва тук.</span></> : <>Your next ride<br /><span className="text-white/35">starts here.</span></>}
            </h2>
          </div>
          <p className="text-[15px] sm:text-[17px] text-white/65 leading-[1.75] lg:pb-2">
            {isBg
              ? 'Избери модел, запази тестово каране или ни попитай за регистрация, сервиз и доставка. Ще ти помогнем да намериш правилната машина.'
              : 'Choose a model, book a test ride or ask about registration, service and delivery. We will help you find the right machine.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(320px,.78fr)_minmax(0,1.22fr)] gap-4 sm:gap-5 items-stretch">
          <div className="contact-reveal glass-panel rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-7 lg:p-8 flex flex-col">
            <div className="flex items-center gap-3 pb-6 border-b border-white/10">
              <img src="/images/eride-logo-small.png" alt="E RIDE PRO" width="48" height="48" className="w-12 h-12 rounded-xl object-contain" />
              <img src="/images/kasta-logo-small.png" alt="Kasta Ventures" width="160" height="40" className="h-9 w-auto object-contain logo-ink" />
            </div>

            <div className="space-y-1 py-5">
              <a href="tel:+359887773733" className="group min-h-[72px] flex items-center gap-4 border-b border-white/10">
                <span className="w-11 h-11 shrink-0 rounded-2xl border border-white/10 bg-white/[0.045] flex items-center justify-center text-[var(--accent-text)] group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                </span>
                <span>
                  <small className="block text-[9px] font-bold tracking-[0.14em] uppercase text-white/55">{t('contact_phone_label')}</small>
                  <strong className="block text-[16px] font-semibold text-white mt-1">+359 887 77 37 33</strong>
                </span>
                <svg className="ml-auto text-white/35 group-hover:text-white group-hover:translate-x-1 transition-all" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>

              <a href="mailto:office@kastaventures.com" className="group min-h-[72px] flex items-center gap-4 border-b border-white/10">
                <span className="w-11 h-11 shrink-0 rounded-2xl border border-white/10 bg-white/[0.045] flex items-center justify-center text-[var(--accent-text)] group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16v16H4z" /><path d="m4 6 8 6 8-6" /></svg>
                </span>
                <span className="min-w-0">
                  <small className="block text-[9px] font-bold tracking-[0.14em] uppercase text-white/55">{t('contact_email_label')}</small>
                  <strong className="block text-[14px] sm:text-[16px] font-semibold text-white mt-1 break-all">office@kastaventures.com</strong>
                </span>
                <svg className="ml-auto shrink-0 text-white/35 group-hover:text-white group-hover:translate-x-1 transition-all" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <span className="block text-[9px] font-bold tracking-[0.13em] uppercase text-white/50">{isBg ? 'Работно време' : 'Opening hours'}</span>
                <strong className="block text-[13px] text-white mt-2">{isBg ? 'Пон–Пет' : 'Mon–Fri'}</strong>
                <span className="block text-[12px] text-white/60 mt-0.5">09:00–18:00</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <span className="block text-[9px] font-bold tracking-[0.13em] uppercase text-white/50">{isBg ? 'Локация' : 'Location'}</span>
                <strong className="block text-[13px] text-white mt-2">Sofia</strong>
                <span className="block text-[12px] text-white/60 mt-0.5">Bulgaria</span>
              </div>
            </div>

            <a href="mailto:office@kastaventures.com?subject=E%20RIDE%20PRO%20test%20ride" className="btn-accent w-full mt-5">
              {isBg ? 'Запази тестово каране' : 'Book a test ride'}
            </a>
          </div>

          <div className="contact-reveal relative min-h-[430px] lg:min-h-[620px] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-white/10 bg-[#101013]">
            {mapLoaded ? (
              <iframe
                title={isBg ? 'Местоположение на Kasta Ventures' : 'Kasta Ventures location'}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.0!2d23.27323!3d42.648462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDM4JzU0LjUiTiAyM8KwMTYnMjMuNiJF!5e0!3m2!1sen!2sbg!4v1700000000000!5m2!1sen!2sbg"
                width="100%"
                height="100%"
                className="map-frame absolute inset-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                <div className="technical-grid absolute inset-0 opacity-70" aria-hidden="true" />
                <div className="absolute w-72 h-72 rounded-full bg-[rgb(var(--accent-rgb)/0.12)] blur-[80px]" aria-hidden="true" />
                <div className="relative max-w-[390px]">
                  <span className="mx-auto w-16 h-16 rounded-[1.4rem] border border-white/10 bg-white/[0.045] flex items-center justify-center text-[var(--accent-text)]">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
                  </span>
                  <h3 className="text-[24px] sm:text-[30px] font-bold tracking-[-0.045em] text-white mt-6">{isBg ? 'Посети ни в София' : 'Visit us in Sofia'}</h3>
                  <p className="text-[14px] text-white/60 leading-relaxed mt-3">{t('location_address')}</p>
                  <button type="button" onClick={() => setMapLoaded(true)} className="btn-outline !text-white !border-white/20 mt-6 mx-auto sm:w-auto">
                    {isBg ? 'Покажи картата' : 'Load the map'}
                  </button>
                  <p className="text-[10px] text-white/45 leading-relaxed mt-4">
                    {isBg ? 'Картата се зарежда от Google само след твоя избор.' : 'Google Maps loads only after you choose to view it.'}
                  </p>
                </div>
              </div>
            )}

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel absolute left-4 right-4 sm:left-auto sm:right-5 bottom-5 min-h-12 px-5 rounded-full inline-flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.12em] uppercase text-white hover:bg-white/10 transition-colors"
            >
              {isBg ? 'Отвори упътвания' : 'Open directions'}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../hooks/useLang'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const { lang } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const isBg = lang === 'bg'
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        opacity: 0,
        y: 24,
        scale: 0.985,
        duration: 0.5,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [prefersReducedMotion])

  const journey = isBg
    ? [
        ['01', 'Избор', 'Модел според стила и терена ти'],
        ['02', 'Тест', 'Реално усещане преди решение'],
        ['03', 'Поддръжка', 'Сервиз, части и локална гаранция'],
      ]
    : [
        ['01', 'Select', 'A model matched to your ride and terrain'],
        ['02', 'Experience', 'A real test ride before the decision'],
        ['03', 'Support', 'Service, parts and local warranty'],
      ]

  return (
    <section id="about" ref={sectionRef} className="relative bg-[var(--bg-deep)] section-pad overflow-hidden">
      <div className="absolute -left-44 top-20 w-[32rem] h-[32rem] rounded-full bg-[var(--accent)]/[0.055] blur-[100px]" aria-hidden="true" />
      <div className="section-shell relative">
        <div className="about-reveal grid lg:grid-cols-[minmax(0,1fr)_minmax(320px,520px)] gap-6 lg:gap-16 items-end mb-10 sm:mb-14">
          <div>
            <span className="section-eyebrow mb-5">{isBg ? 'За Kasta Ventures' : 'About Kasta Ventures'}</span>
            <h2 className="text-display uppercase text-fg text-[clamp(2.55rem,6vw,5.25rem)]">
              {isBg ? <>Глобална машина.<br /><span className="text-fg/35">Локална грижа.</span></> : <>Global machine.<br /><span className="text-fg/35">Local care.</span></>}
            </h2>
          </div>
          <p className="text-[15px] sm:text-[16px] text-fg/65 leading-[1.8] lg:pb-1">
            {isBg
              ? 'Kasta Ventures е официалният E RIDE PRO партньор за България — от първата консултация и тестовото каране до гаранционния сервиз и резервните части.'
              : 'Kasta Ventures is the official E RIDE PRO partner for Bulgaria — from the first consultation and test ride to warranty service and spare parts.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
          <div className="about-reveal lg:col-span-7 lg:row-span-2 min-h-[390px] sm:min-h-[520px] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden relative group">
            <img
              src="/images/kasta/hero-stoika-bg.jpg"
              alt={isBg ? 'E RIDE PRO електрически мотокрос на изложбена стойка' : 'E RIDE PRO electric dirt bike on a display stand'}
              loading="lazy"
              width="1200"
              height="1006"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-premium group-hover:scale-[1.045]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/20" />
            <div className="technical-grid absolute inset-0 opacity-20" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
              <span className="inline-flex min-h-8 items-center px-3 rounded-full border border-white/15 bg-black/30 backdrop-blur-md text-[9px] font-bold tracking-[0.14em] uppercase text-white/70">
                E RIDE PRO // {isBg ? 'Създаден за контрол' : 'Engineered for control'}
              </span>
              <h3 className="text-display text-white uppercase text-[clamp(2.1rem,4vw,4rem)] mt-5 max-w-[600px]">
                {isBg ? 'Производителност, която усещаш веднага.' : 'Performance you feel instantly.'}
              </h3>
            </div>
          </div>

          <div className="about-reveal lg:col-span-5 relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] min-h-[250px] bg-[linear-gradient(135deg,var(--accent-light),var(--accent))] p-6 sm:p-8 text-white shadow-[0_30px_80px_-35px_rgb(var(--accent-rgb)/0.85)]">
            <div className="absolute -right-8 -bottom-14 text-[12rem] font-extrabold leading-none text-white/[0.07]" aria-hidden="true">2</div>
            <div className="relative h-full flex flex-col justify-between gap-10">
              <span className="w-12 h-12 rounded-2xl border border-white/20 bg-white/10 flex items-center justify-center">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3 5 6v5c0 4.6 2.9 8 7 10 4.1-2 7-5.4 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg>
              </span>
              <div>
                <strong className="block text-[54px] sm:text-[66px] font-extrabold leading-none tracking-[-0.07em]">2</strong>
                <h3 className="text-[14px] font-bold tracking-[0.08em] uppercase mt-3">{isBg ? 'Години гаранция' : 'Year warranty'}</h3>
                <p className="text-[13px] text-white/75 mt-2 max-w-[34ch]">{isBg ? 'Локално обслужване без прехвърляне на отговорността.' : 'Local support without passing the responsibility elsewhere.'}</p>
              </div>
            </div>
          </div>

          <div className="about-reveal lg:col-span-5 surface-card rounded-[1.5rem] sm:rounded-[2rem] min-h-[250px] p-6 sm:p-8 flex flex-col justify-between gap-8">
            <div className="flex items-center justify-between gap-4">
              <span className="w-12 h-12 rounded-2xl bg-fg/[0.055] border border-fg/[0.08] flex items-center justify-center text-[var(--accent-text)]">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m14.7 6.3 3-3a4.2 4.2 0 0 1-5.3 5.3l-6.8 6.8a2.1 2.1 0 1 0 3 3l6.8-6.8a4.2 4.2 0 0 1 5.3-5.3l-3 3" /></svg>
              </span>
              <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-fg/60">Sofia // BG</span>
            </div>
            <div>
              <h3 className="text-[24px] sm:text-[28px] font-bold tracking-[-0.04em] text-fg">{isBg ? 'Сервизът е част от продукта.' : 'Service is part of the product.'}</h3>
              <p className="text-[14px] text-fg/65 leading-relaxed mt-3">{isBg ? 'Поддръжка, диагностика и оригинални части на едно място.' : 'Maintenance, diagnostics and original parts in one place.'}</p>
            </div>
          </div>

          <div className="about-reveal lg:col-span-12 surface-card rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-7 lg:p-8">
            <div className="grid md:grid-cols-3">
              {journey.map(([number, title, text], index) => (
                <div key={number} className={`group py-4 md:px-7 first:pl-0 last:pr-0 ${index < journey.length - 1 ? 'border-b md:border-b-0 md:border-r border-fg/10' : ''}`}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[10px] font-extrabold tracking-[0.14em] text-[var(--accent-text)]">{number}</span>
                    <span className="h-px flex-1 bg-fg/10 group-hover:bg-[rgb(var(--accent-rgb)/0.4)] transition-colors" aria-hidden="true" />
                  </div>
                  <h3 className="text-[18px] font-bold tracking-[-0.025em] text-fg">{title}</h3>
                  <p className="text-[13px] text-fg/65 mt-2">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

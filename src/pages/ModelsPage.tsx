import Models from '../sections/Models'
import { useLang } from '../hooks/useLang'
import { usePageMeta } from '../hooks/usePageMeta'

export default function ModelsPage() {
  const { lang } = useLang()
  const isBg = lang === 'bg'

  usePageMeta({
    title: isBg
      ? 'Модели — E RIDE PRO електрически мотокрос | Kasta Ventures'
      : 'Models — E RIDE PRO Electric Dirt Bikes | Kasta Ventures',
    description: isBg
      ? 'Всички E RIDE PRO модели в България: Mini R, SR, SS 2.5 и SS 3.0 — офроуд и пътно легални (L1e) електрически мотокроси с 2 години гаранция.'
      : 'All E RIDE PRO models in Bulgaria: Mini R, SR, SS 2.5 and SS 3.0 — off-road and road-legal (L1e) electric dirt bikes with a 2-year warranty.',
    path: '/models',
  })

  return (
    <div>
      <header className="dark relative overflow-hidden bg-[var(--bg)] text-white pt-28 sm:pt-36 pb-14 sm:pb-20 lg:pb-24 border-b border-white/[0.08]">
        <div className="technical-grid absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="accent-orb absolute -right-24 -top-40 w-[36rem] h-[36rem] opacity-55" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_50%,rgba(255,255,255,0.055),transparent_31rem)]" aria-hidden="true" />

        <div className="section-shell relative grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,560px)] items-center gap-8 lg:gap-16">
          <div>
            <span className="section-eyebrow mb-6">E RIDE PRO // {isBg ? 'Гама 2026' : '2026 lineup'}</span>
            <h1 className="text-display uppercase text-[clamp(3.25rem,7.5vw,7.25rem)] max-w-[900px]">
              {isBg ? <>Всички модели.<br /><span className="text-white/35">Един стандарт.</span></> : <>Every model.<br /><span className="text-white/35">One standard.</span></>}
            </h1>
            <p className="text-[15px] sm:text-[17px] text-white/70 leading-[1.75] max-w-[600px] mt-6 sm:mt-8">
              {isBg
                ? 'Сравни офроуд и L1e моделите по мощност, скорост и обхват. Всеки E RIDE PRO идва с локален сервиз, части и 2 години гаранция.'
                : 'Compare off-road and L1e models by power, speed and range. Every E RIDE PRO comes with local service, parts and a 2-year warranty.'}
            </p>
            <a href="#models" className="btn-accent mt-7 sm:w-auto">
              {isBg ? 'Към моделите' : 'Browse the lineup'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
            </a>
          </div>

          <div className="relative min-h-[270px] sm:min-h-[380px] lg:min-h-[470px] flex items-center justify-center">
            <span className="absolute text-[clamp(9rem,22vw,20rem)] leading-none font-extrabold tracking-[-0.1em] text-white/[0.025]" aria-hidden="true">07</span>
            <div className="absolute inset-x-[12%] bottom-[18%] h-[30%] bg-[rgb(var(--accent-rgb)/0.2)] blur-[70px] rounded-full" aria-hidden="true" />
            <img
              src="/images/kasta/ss30-offroad-main.png"
              alt={isBg ? 'E RIDE PRO SS 3.0 офроуд електрически мотокрос' : 'E RIDE PRO SS 3.0 off-road electric dirt bike'}
              width="1100"
              height="922"
              className="relative w-full max-h-[470px] object-contain drop-shadow-[0_35px_40px_rgba(0,0,0,0.75)] dark:brightness-125 dark:contrast-125"
            />
            <div className="glass-panel absolute right-0 sm:right-3 bottom-0 rounded-2xl p-4 min-w-[150px]">
              <span className="block text-[9px] font-bold tracking-[0.15em] uppercase text-white/55">{isBg ? 'Пълна гама' : 'Complete range'}</span>
              <strong className="block text-[28px] font-extrabold tracking-[-0.05em] mt-1">7 <span className="text-[12px] tracking-normal text-white/60">{isBg ? 'модела' : 'models'}</span></strong>
            </div>
          </div>
        </div>
      </header>

      <Models showHeader={false} />
    </div>
  )
}

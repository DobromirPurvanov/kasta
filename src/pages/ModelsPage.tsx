import Models from '../sections/Models'
import { scrollToSection } from '../lib/scrollToSection'
import { publishedProducts } from '../data/products'
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
      ? 'Всички E RIDE PRO модели в България: SS 2.5, SS 3.0, SR и Mini — офроуд, L1e мопед и L3e лек мотоциклет, с 2 години гаранция.'
      : 'All E RIDE PRO models in Bulgaria: SS 2.5, SS 3.0, SR and Mini — off-road, L1e moped and L3e light motorcycle, with a 2-year warranty.',
    path: '/models',
  })

  return (
    <div>
      <header className="dark relative overflow-hidden bg-[var(--bg)] text-fg pt-28 sm:pt-36 pb-14 sm:pb-20 lg:pb-24 border-b border-fg/[0.08]">
        <div className="technical-grid absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="accent-orb absolute -right-24 -top-40 w-[36rem] h-[36rem] opacity-55" aria-hidden="true" />
        <div className="hero-surface-glow absolute inset-0" aria-hidden="true" />

        <div className="section-shell relative grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,560px)] items-center gap-8 lg:gap-16">
          <div>
            <span className="section-eyebrow mb-6">E RIDE PRO // {isBg ? 'Гама 2026' : '2026 lineup'}</span>
            <h1 className="text-display uppercase text-[clamp(3.25rem,7.5vw,7.25rem)] max-w-[900px]">
              {isBg ? <>Всички модели.<br /><span className="text-[var(--accent-text)]">Един стандарт.</span></> : <>Every model.<br /><span className="text-[var(--accent-text)]">One standard.</span></>}
            </h1>
            <p className="text-[15px] sm:text-[17px] text-[var(--text-secondary)] leading-[1.75] max-w-[600px] mt-6 sm:mt-8">
              {isBg
                ? 'Три модела, всеки в три версии: офроуд, L1e мопед и L3e лек мотоциклет. Сравни ги по мощност, скорост и обхват. Всеки идва с 2 години гаранция и сервиз в София.'
                : 'Three models, each in three versions: off-road, L1e moped and L3e light motorcycle. Compare them by power, speed and range. Every one comes with a 2-year warranty and service in Sofia.'}
            </p>
            <button type="button" onClick={() => scrollToSection('models')} className="btn-accent mt-7 sm:w-auto">
              {isBg ? 'Към моделите' : 'Browse the lineup'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
            </button>
          </div>

          <div className="relative min-h-[270px] sm:min-h-[380px] lg:min-h-[470px] flex items-center justify-center">
            <span className="absolute text-[clamp(9rem,22vw,20rem)] leading-none font-extrabold tracking-[-0.1em] text-fg/[0.025]" aria-hidden="true">07</span>
            <div className="absolute inset-x-[12%] bottom-[18%] h-[30%] bg-[rgb(var(--accent-rgb)/0.2)] blur-[70px] rounded-full" aria-hidden="true" />
            <img
              src="/images/kasta/ss30-offroad-main.webp"
              alt={isBg ? 'E RIDE PRO SS 3.0 офроуд електрически мотокрос' : 'E RIDE PRO SS 3.0 off-road electric dirt bike'}
              width="1600"
              height="1200"
              className="relative w-full max-h-[470px] object-contain drop-shadow-2xl dark:brightness-125 dark:contrast-125"
            />
            <div className="glass-panel absolute right-0 sm:right-3 bottom-0 rounded-2xl p-4 min-w-[150px]">
              <span className="block text-[9px] font-bold tracking-[0.15em] uppercase text-[var(--text-muted)]">{isBg ? 'Пълна гама' : 'Complete range'}</span>
              <strong className="block text-[28px] font-extrabold tracking-[-0.05em] mt-1">{publishedProducts.length} <span className="text-[12px] tracking-normal text-[var(--text-secondary)]">{isBg ? 'модела' : 'models'}</span></strong>
            </div>
          </div>
        </div>
      </header>

      <Models showHeader={false} />
    </div>
  )
}

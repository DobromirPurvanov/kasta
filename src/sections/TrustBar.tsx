import { useLang } from '../hooks/useLang'

const icons = [
  <path key="shield" d="M12 3l7 3v5c0 4.6-2.9 8-7 10-4.1-2-7-5.4-7-10V6l7-3Z" />,
  <path key="warranty" d="M12 2v20M5.5 5.5l13 13M2 12h20M5.5 18.5l13-13" />,
  <path key="service" d="m14.7 6.3 3-3a4.2 4.2 0 0 1-5.3 5.3l-6.8 6.8a2.1 2.1 0 1 0 3 3l6.8-6.8a4.2 4.2 0 0 1 5.3-5.3l-3 3" />,
  <g key="road"><path d="M8 21 10.5 3h3L16 21" /><path d="M12 6v3m0 3v3m0 3v2" /></g>,
]

export default function TrustBar() {
  const { lang } = useLang()
  const isBg = lang === 'bg'
  const items = isBg
    ? [
        ['Официален дистрибутор', 'Директно за България'],
        ['2 години гаранция', 'Пълно локално покритие'],
        ['Сервиз и части', 'Поддръжка в София'],
        ['L1e съдействие', 'Документи за регистрация'],
      ]
    : [
        ['Official distributor', 'Direct for Bulgaria'],
        ['2-year warranty', 'Complete local coverage'],
        ['Service & parts', 'Support based in Sofia'],
        ['L1e assistance', 'Registration documents'],
      ]

  return (
    <section className="dark relative bg-[var(--bg-deep)] border-y border-white/[0.08]" aria-label={isBg ? 'Предимства' : 'Customer benefits'}>
      <div className="section-shell grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([title, subtitle], index) => (
          <div
            key={title}
            className={`group flex items-center gap-4 min-h-[102px] py-5 sm:px-5 lg:px-7 first:pl-0 last:pr-0 border-white/[0.08] ${
              index < items.length - 1 ? 'border-b sm:border-b-0 sm:border-r' : ''
            } ${index === 1 ? 'sm:border-r-0 lg:border-r' : ''}`}
          >
            <span className="w-11 h-11 shrink-0 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-[var(--accent-text)] group-hover:bg-[var(--accent)] group-hover:text-white group-hover:border-[var(--accent)] transition-all duration-300">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {icons[index]}
              </svg>
            </span>
            <span>
              <strong className="block text-[12px] font-bold tracking-[0.08em] uppercase text-white">{title}</strong>
              <span className="block text-[12px] text-white/60 mt-1">{subtitle}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

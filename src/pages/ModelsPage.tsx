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
    <div className="pt-16 sm:pt-[72px]">
      <h1 className="sr-only">
        {isBg ? 'Модели E RIDE PRO — електрически мотокрос България' : 'E RIDE PRO Models — Electric Dirt Bikes Bulgaria'}
      </h1>
      <Models />
    </div>
  )
}

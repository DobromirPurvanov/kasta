import { useEffect } from 'react'
import Models from '../sections/Models'
import { useLang } from '../hooks/useLang'

export default function ModelsPage() {
  const { lang } = useLang()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title =
      lang === 'bg'
        ? 'Модели | Kasta Ventures - E RIDE PRO Bulgaria'
        : 'Models | Kasta Ventures - E RIDE PRO Bulgaria'
  }, [lang])

  return (
    <main className="pt-[72px]">
      <Models />
    </main>
  )
}

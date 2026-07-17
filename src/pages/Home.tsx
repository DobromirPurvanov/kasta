import Hero from '../sections/Hero'
import TrustBar from '../sections/TrustBar'
import About from '../sections/About'
import Models from '../sections/Models'
import Contact from '../sections/Contact'
import { useLang } from '../hooks/useLang'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Home() {
  const { lang } = useLang()
  const isBg = lang === 'bg'

  usePageMeta({
    title: isBg
      ? 'E RIDE PRO България — Електрически мотокрос | Kasta Ventures'
      : 'E RIDE PRO Bulgaria | Electric Dirt Bikes & Moto Cross | Kasta Ventures',
    description: isBg
      ? 'Официален дистрибутор на E RIDE PRO електрически мотокрос за България. Разгледай моделите Mini R, SS 2.5, SS 3.0 и SR. 2 години гаранция, сервиз и части.'
      : 'Official distributor of E RIDE PRO electric dirt bikes and moto cross in Bulgaria. Explore Mini R, SS 2.5, SS 3.0, SR models. 2-year warranty, service & parts.',
    path: '/',
  })

  return (
    <>
      <Hero />
      <TrustBar />
      <Models />
      <About />
      <Contact />
    </>
  )
}

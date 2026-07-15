import { Link } from 'react-router'
import { useLang } from '../hooks/useLang'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  const { lang } = useLang()
  const isBg = lang === 'bg'

  usePageMeta({
    title: isBg ? 'Страницата не е намерена | Kasta Ventures' : 'Page Not Found | Kasta Ventures',
    noindex: true,
  })

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center pt-[72px] px-6">
      <div className="text-center">
        <p className="text-[var(--accent-text)] text-[12px] font-bold tracking-[0.15em] uppercase mb-4">
          {isBg ? 'Грешка 404' : 'Error 404'}
        </p>
        <h1 className="text-display text-white text-[64px] sm:text-[96px] leading-none mb-4">404</h1>
        <p className="text-white/60 text-[15px] mb-8 max-w-[400px] mx-auto">
          {isBg
            ? 'Страницата, която търсиш, не съществува или е преместена.'
            : 'The page you are looking for does not exist or has been moved.'}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-accent">
            {isBg ? 'Начало' : 'Back Home'}
          </Link>
          <Link to="/models" className="btn-outline">
            {isBg ? 'Виж моделите' : 'View Models'}
          </Link>
        </div>
      </div>
    </div>
  )
}

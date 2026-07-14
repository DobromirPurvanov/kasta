import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useLang } from '../hooks/useLang'

export default function Navigation() {
  const { lang, setLang, t } = useLang()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (path: string, hash?: string) => {
    setMobileOpen(false)
    if (!isHome) {
      navigate('/')
      if (hash) {
        setTimeout(() => {
          const el = document.querySelector(hash)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 200)
      }
    } else if (hash) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else if (path !== '/') {
      navigate(path)
    }
  }

  const navLinkClass = (isActive: boolean) =>
    `text-[12px] font-medium tracking-[0.12em] uppercase transition-colors ${
      isActive ? 'text-[var(--accent)] font-semibold' : 'text-white/40 hover:text-white'
    }`

  const isModelsPage = location.pathname === '/models'

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/[0.06]' : 'bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
          {/* Left nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => goTo('/', '#about')} className={navLinkClass(false)}>
              {t('nav_about')}
            </button>
            <button onClick={() => isModelsPage ? window.scrollTo({ top: 0, behavior: 'smooth' }) : navigate('/models')} className={navLinkClass(isModelsPage)}>
              {t('nav_models')}
            </button>
            <button onClick={() => goTo('/', '#contact')} className={navLinkClass(false)}>
              {t('nav_contact')}
            </button>
          </div>

          {/* Center logos */}
          <button onClick={() => navigate('/')} className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
            <img src="./images/eride-logo-real.jpg" alt="E RIDE PRO" className="h-8 w-8 object-contain" />
            <img src="./images/kasta-logo-final.jpg" alt="Kasta Ventures" className="h-7 object-contain" />
          </button>

          {/* Right */}
          <div className="hidden md:flex items-center gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
            <button onClick={() => setLang(lang === 'bg' ? 'en' : 'bg')} className="text-[11px] font-semibold tracking-wider text-white/40 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/5 transition-all">
              {lang === 'bg' ? 'EN' : 'BG'}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5" onClick={() => setMobileOpen(!mobileOpen)}>
            <span className={`block h-[2px] bg-white transition-all ${mobileOpen ? 'w-5 rotate-45 translate-y-[5px]' : 'w-5'}`} />
            <span className={`block h-[2px] bg-white transition-all ${mobileOpen ? 'w-5 -rotate-45 -translate-y-[3px]' : 'w-5'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-[99] bg-[#0f0f0f] transition-all duration-500 md:hidden flex flex-col items-center justify-center gap-8 ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <button onClick={() => goTo('/', '#about')} className="text-2xl font-light text-white/80">{t('nav_about')}</button>
        <button onClick={() => isModelsPage ? window.scrollTo({ top: 0, behavior: 'smooth' }) : navigate('/models')} className={`text-2xl ${isModelsPage ? 'font-semibold text-[var(--accent)]' : 'font-light text-white/80'}`}>{t('nav_models')}</button>
        <button onClick={() => goTo('/', '#contact')} className="text-2xl font-light text-white/80">{t('nav_contact')}</button>
        <button onClick={() => { setLang(lang === 'bg' ? 'en' : 'bg'); setMobileOpen(false) }} className="text-lg text-white/30">{lang === 'bg' ? 'English' : 'Bulgarian'}</button>
      </div>
    </>
  )
}

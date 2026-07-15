import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { useLang } from '../hooks/useLang'

export default function Navigation() {
  const { lang, setLang, t } = useLang()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleLang = () => setLang(lang === 'bg' ? 'en' : 'bg')
  const isBg = lang === 'bg'

  const isModelsPage = location.pathname === '/models'

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[12px] font-medium tracking-[0.12em] uppercase transition-colors ${
      isActive ? 'text-[var(--accent)] font-semibold' : 'text-white/70 hover:text-white'
    }`

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          scrolled
            ? 'bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 h-[64px] sm:h-[72px] flex items-center justify-between">
          {/* Left nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/#about" className={navLinkClass}>
              {t('nav_about')}
            </NavLink>
            <NavLink
              to="/models"
              className={navLinkClass}
              aria-current={isModelsPage ? 'page' : undefined}
            >
              {t('nav_models')}
            </NavLink>
            <NavLink to="/#contact" className={navLinkClass}>
              {t('nav_contact')}
            </NavLink>
          </div>

          {/* Center logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg">
            <img
              src="/images/eride-logo-real.png"
              alt="E RIDE PRO"
              className="h-7 w-7 sm:h-8 sm:w-8 object-contain rounded-md"
              width="32"
              height="32"
            />
            <img
              src="/images/kasta-logo-final.png"
              alt="Kasta Ventures"
              className="h-6 sm:h-7 object-contain brightness-150 contrast-125"
              height="28"
            />
          </Link>

          {/* Right */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://instagram.com/erideprobulgaria"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
              aria-label="Instagram"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="5"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <button
              type="button"
              onClick={toggleLang}
              className="text-[11px] font-semibold tracking-wider text-white/60 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/10 transition-all"
              aria-label={isBg ? 'Switch to English' : 'Превключи на български'}
            >
              {lang === 'bg' ? 'EN' : 'BG'}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden w-10 h-10 -mr-1 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`block h-[2px] bg-white transition-all ${mobileOpen ? 'w-6 rotate-45 translate-y-[5px]' : 'w-6'}`} />
            <span className={`block h-[2px] bg-white transition-all ${mobileOpen ? 'w-6 -rotate-45 -translate-y-[3px]' : 'w-6'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[99] bg-[#0f0f0f] transition-all duration-500 md:hidden flex flex-col items-center justify-center gap-8 ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <Link
          to="/#about"
          onClick={() => setMobileOpen(false)}
          className="text-2xl font-light text-white/80 hover:text-white"
        >
          {t('nav_about')}
        </Link>
        <Link
          to="/models"
          onClick={() => setMobileOpen(false)}
          className={`text-2xl ${isModelsPage ? 'font-semibold text-[var(--accent)]' : 'font-light text-white/80'}`}
        >
          {t('nav_models')}
        </Link>
        <Link
          to="/#contact"
          onClick={() => setMobileOpen(false)}
          className="text-2xl font-light text-white/80 hover:text-white"
        >
          {t('nav_contact')}
        </Link>
        <button
          type="button"
          onClick={() => { toggleLang(); setMobileOpen(false) }}
          className="text-lg text-white/40 hover:text-white/70"
        >
          {lang === 'bg' ? 'English' : 'Bulgarian'}
        </button>
      </div>
    </>
  )
}

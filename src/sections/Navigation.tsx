import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { useLang } from '../hooks/useLang'
import { useTheme } from '../hooks/useTheme'

const anchorLinkClass =
  'min-h-11 inline-flex items-center text-[12px] font-medium tracking-[0.12em] uppercase transition-colors text-[var(--text-secondary)] hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm'

function ThemeToggle({ onToggle, isDark, label, className = '' }: { onToggle: () => void; isDark: boolean; label: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-11 h-11 rounded-full border border-fg/20 flex items-center justify-center text-[var(--text-secondary)] hover:text-fg hover:border-fg/40 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${className}`}
      aria-label={label}
      title={label}
    >
      {isDark ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

export default function Navigation() {
  const { lang, setLang, t } = useLang()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const updateScrollState = () => {
      frame = 0
      setScrolled(window.scrollY > 40)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0)
    }
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updateScrollState)
    }
    updateScrollState()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  // Mobile menu: lock body scroll, close on Escape, move focus in and back out
  useEffect(() => {
    if (!mobileOpen) return
    const burger = burgerRef.current
    document.body.style.overflow = 'hidden'
    menuRef.current?.querySelector<HTMLElement>('a, button')?.focus()
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        return
      }
      if (e.key !== 'Tab' || !menuRef.current) return

      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
      burger?.focus()
    }
  }, [mobileOpen])

  const toggleLang = () => setLang(lang === 'bg' ? 'en' : 'bg')
  const isBg = lang === 'bg'
  const isDark = theme === 'dark'
  const isModelsPage = location.pathname === '/models'
  const isHome = location.pathname === '/'
  // Over the hero video the nav sits on dark imagery regardless of theme —
  // force the dark scope so text/icons stay light until the page is scrolled.
  const overHero = (isHome || isModelsPage) && !scrolled && !mobileOpen
  const themeLabel = isDark
    ? (isBg ? 'Светла тема' : 'Switch to light theme')
    : (isBg ? 'Тъмна тема' : 'Switch to dark theme')
  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${overHero ? 'dark' : ''} ${
          scrolled || mobileOpen
            ? 'nav-solid backdrop-blur-md border-b border-fg/[0.08]'
            : 'bg-transparent'
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 h-[64px] sm:h-[76px] flex items-center justify-between">
          {/* Left nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/#about" className={anchorLinkClass}>
              {t('nav_about')}
            </Link>
            <NavLink
              to="/models"
              className={({ isActive }) =>
                `min-h-11 inline-flex items-center text-[12px] font-medium tracking-[0.12em] uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm ${
                  isActive ? 'text-[var(--accent-text)] font-semibold' : 'text-[var(--text-secondary)] hover:text-fg'
                }`
              }
              aria-current={isModelsPage ? 'page' : undefined}
            >
              {t('nav_models')}
            </NavLink>
            <Link to="/#contact" className={anchorLinkClass}>
              {t('nav_contact')}
            </Link>
          </div>

          {/* Center logo */}
          <Link to="/" className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 min-h-11 px-1 flex items-center gap-2 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg">
            <img
              src="/images/eride-logo-small.png"
              alt="E RIDE PRO"
              className="h-7 w-7 sm:h-8 sm:w-8 object-contain rounded-md"
              width="32"
              height="32"
            />
            <img
              src="/images/kasta-logo-small.png"
              alt="Kasta Ventures"
              className="hidden min-[380px]:block h-6 sm:h-7 object-contain logo-ink"
              width="110"
              height="28"
            />
          </Link>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/#contact"
              className="btn-accent hidden lg:inline-flex !min-h-11 !w-auto !px-5 !py-2.5 !text-[10px] !tracking-[0.12em]"
            >
              {isBg ? 'Тестово каране' : 'Test ride'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
            <ThemeToggle onToggle={toggleTheme} isDark={isDark} label={themeLabel} />
            <button
              type="button"
              onClick={toggleLang}
              className="min-h-11 text-[11px] font-semibold tracking-wider text-[var(--text-secondary)] hover:text-fg px-4 py-2.5 rounded-full hover:bg-fg/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label={isBg ? 'Switch to English' : 'Превключи на български'}
            >
              {lang === 'bg' ? 'EN' : 'BG'}
            </button>
          </div>

          {/* Mobile: theme, language + menu */}
          <div className="md:hidden ml-auto flex items-center gap-1">
            <ThemeToggle onToggle={toggleTheme} isDark={isDark} label={themeLabel} className="border-transparent" />
            <button
              type="button"
              onClick={toggleLang}
              className="min-h-11 min-w-10 px-2 text-[11px] font-bold tracking-[0.1em] text-[var(--text-secondary)] hover:text-fg rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label={isBg ? 'Switch to English' : 'Превключи на български'}
            >
              {lang === 'bg' ? 'EN' : 'BG'}
            </button>
            <button
              ref={burgerRef}
              type="button"
              className="w-11 h-11 -mr-1 flex flex-col justify-center items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={`block h-[2px] bg-fg transition-all ${mobileOpen ? 'w-6 rotate-45 translate-y-[5px]' : 'w-6'}`} />
              <span className={`block h-[2px] bg-fg transition-all ${mobileOpen ? 'w-6 -rotate-45 -translate-y-[3px]' : 'w-6'}`} />
            </button>
          </div>
        </div>
        <span
          className="absolute inset-x-0 bottom-0 h-px bg-[var(--accent)] origin-left will-change-transform"
          style={{ transform: `scaleX(${scrollProgress})` }}
          aria-hidden="true"
        />
      </nav>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`fixed inset-0 z-30 bg-[var(--bg)] transition-all duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        role="dialog"
        aria-modal="true"
        aria-label={isBg ? 'Мобилно меню' : 'Mobile menu'}
      >
        <div className="section-shell h-full pt-24 pb-[max(2rem,env(safe-area-inset-bottom))] flex flex-col">
          <p className="section-eyebrow mb-7">{isBg ? 'Меню' : 'Menu'}</p>
          <nav className="border-t border-fg/10" aria-label={isBg ? 'Мобилна навигация' : 'Mobile navigation'}>
            {[
              { to: '/#about', number: '01', label: t('nav_about'), active: false },
              { to: '/models', number: '02', label: t('nav_models'), active: isModelsPage },
              { to: '/#contact', number: '03', label: t('nav_contact'), active: false },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="group min-h-[76px] flex items-center gap-4 border-b border-fg/10"
              >
                <span className="text-[10px] font-bold tracking-[0.14em] text-[var(--text-muted)]">{item.number}</span>
                <span className={`text-[clamp(1.55rem,8vw,2.15rem)] leading-none font-semibold tracking-[-0.035em] ${item.active ? 'text-[var(--accent-text)]' : 'text-fg'}`}>
                  {item.label}
                </span>
                <svg className="ml-auto text-[var(--text-muted)] group-hover:text-fg transition-colors" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <div className="flex flex-col gap-2 mb-6 text-[14px] text-[var(--text-secondary)]">
              <a href="tel:+359887773733" className="min-h-11 inline-flex items-center">+359 887 77 37 33</a>
              <a href="mailto:office@kastaventures.com" className="min-h-11 inline-flex items-center">office@kastaventures.com</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

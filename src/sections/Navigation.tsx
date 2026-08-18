import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import SectionLink from '../components/SectionLink'
import { useLang } from '../hooks/useLang'
import { useTheme } from '../hooks/useTheme'
import posts from '../data/blog-posts.json'

const anchorLinkClass =
  'min-h-11 inline-flex items-center text-[12px] font-medium tracking-[0.12em] uppercase transition-colors text-[var(--text-secondary)] hover:text-fg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-sm'

const tireTreadAngles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330] as const

function ThemeToggle({ onToggle, isDark, label }: { onToggle: () => void; isDark: boolean; label: string }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="theme-toggle"
      aria-label={label}
      aria-pressed={isDark}
      title={label}
    >
      <svg className="theme-toggle__wheel" viewBox="0 0 44 44" fill="none" aria-hidden="true">
        <g className="theme-toggle__rubber">
          <circle className="theme-toggle__tyre" cx="22" cy="22" r="16" />
          <g className="theme-toggle__grooves">
            {tireTreadAngles.map((angle) => (
              <path
                key={angle}
                d="M19.5 5.7 23 10.4"
                transform={`rotate(${angle} 22 22)`}
              />
            ))}
          </g>
          <circle className="theme-toggle__rim" cx="22" cy="22" r="10.5" />
          <circle className="theme-toggle__valve" cx="29.4" cy="14.6" r="1.25" />
        </g>

        <circle className="theme-toggle__hub" cx="22" cy="22" r="7.25" />
        {isDark ? (
          <g className="theme-toggle__mode">
            <circle cx="22" cy="22" r="2.65" />
            <path d="M22 15.3v2M22 26.7v2M15.3 22h2M26.7 22h2M17.3 17.3l1.4 1.4M25.3 25.3l1.4 1.4M17.3 26.7l1.4-1.4M25.3 18.7l1.4-1.4" />
          </g>
        ) : (
          <path className="theme-toggle__mode" d="M25.9 24.4a5.25 5.25 0 1 1-6.3-6.3 4.25 4.25 0 0 0 6.3 6.3Z" />
        )}
      </svg>
    </button>
  )
}

// Блогът се показва в менюто само когато има поне една публикувана статия —
// иначе /blog/ още не съществува като файл.
const hasPosts = posts.length > 0

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
            <SectionLink section="about" className={anchorLinkClass}>
              {t('nav_about')}
            </SectionLink>
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
            {hasPosts && (
              /* Блогът е статичен HTML в /blog, не React маршрут — затова <a>.
                 С <Link> рутерът щеше да го поеме и да върне SPA-то. */
              <a href="/blog/" className={anchorLinkClass}>
                {t('nav_blog')}
              </a>
            )}
            <SectionLink section="contact" className={anchorLinkClass}>
              {t('nav_contact')}
            </SectionLink>
          </div>

          {/* Center logo */}
          <Link to="/" className="brand-lockup absolute left-4 sm:left-1/2 sm:-translate-x-1/2 min-h-11 px-1 flex items-center gap-2.5 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg">
            <img
              src="/images/eride-logo-small.png"
              alt="E RIDE PRO"
              className="brand-logo-eride h-7 w-7 sm:h-8 sm:w-8"
              width="32"
              height="32"
            />
            <img
              src="/images/kasta-logo-small.png"
              alt="Kasta Ventures"
              className="brand-logo-kasta hidden min-[380px]:block h-6 sm:h-7 w-auto logo-ink"
              width="110"
              height="28"
            />
          </Link>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            <SectionLink
              section="contact"
              className="btn-accent hidden lg:inline-flex !min-h-11 !w-auto !px-5 !py-2.5 !text-[10px] !tracking-[0.12em]"
            >
              {isBg ? 'Тестово каране' : 'Test ride'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </SectionLink>
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
          {/* Тема, EN и меню стоят един до друг. При 4px (и 0px под 360px, както
              бях сложил) палецът лесно улучва „EN“ вместо менюто, а това сменя
              езика на целия сайт. 8px е минимумът, който ги разделя надеждно —
              трите цели по 44px плюс отстоянията се събират и на 320px. */}
          <div className="md:hidden ml-auto flex items-center gap-2">
            <ThemeToggle onToggle={toggleTheme} isDark={isDark} label={themeLabel} />
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
              { key: 'about', section: 'about', number: '01', label: t('nav_about'), active: false },
              { key: 'models', to: '/models', number: '02', label: t('nav_models'), active: isModelsPage },
              ...(hasPosts ? [{ key: 'blog', href: '/blog/', number: '03', label: t('nav_blog'), active: false }] : []),
              { key: 'contact', section: 'contact', number: hasPosts ? '04' : '03', label: t('nav_contact'), active: false },
            ].map((item) => {
              const rowClass = 'group min-h-[76px] flex w-full items-center gap-4 border-b border-fg/10 text-left'
              const body = (
                <>
                  <span className="text-[10px] font-bold tracking-[0.14em] text-[var(--text-muted)]">{item.number}</span>
                  <span className={`text-[clamp(1.55rem,8vw,2.15rem)] leading-none font-semibold tracking-[-0.035em] ${item.active ? 'text-[var(--accent-text)]' : 'text-fg'}`}>
                    {item.label}
                  </span>
                  <svg className="ml-auto text-[var(--text-muted)] group-hover:text-fg transition-colors" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </>
              )

              if (item.href) {
                return (
                  <a key={item.key} href={item.href} className={rowClass}>
                    {body}
                  </a>
                )
              }

              return item.section ? (
                <SectionLink key={item.key} section={item.section} onNavigate={() => setMobileOpen(false)} className={rowClass}>
                  {body}
                </SectionLink>
              ) : (
                <Link key={item.key} to={item.to!} onClick={() => setMobileOpen(false)} className={rowClass}>
                  {body}
                </Link>
              )
            })}
          </nav>

          {/* Бутонът „Тестово каране“ в лентата е скрит под md, а в менюто го
              нямаше изобщо — на телефон главното действие просто липсваше.
              Обаждането също беше обикновен текст най-долу. */}
          <div className="mt-auto pt-8">
            <SectionLink
              section="contact-form"
              onNavigate={() => setMobileOpen(false)}
              className="btn-accent w-full"
            >
              {isBg ? 'Запази тестово каране' : 'Book a test ride'}
            </SectionLink>
            <a href="tel:+359887773733" className="btn-outline w-full mt-2.5">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mr-2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +359 887 77 37 33
            </a>
            <a
              href="mailto:office@kastaventures.com"
              className="min-h-11 mt-3 flex items-center justify-center text-[13px] text-[var(--text-secondary)] hover:text-fg transition-colors"
            >
              office@kastaventures.com
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

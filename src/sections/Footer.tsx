import type { ReactNode } from 'react'
import { useLang } from '../hooks/useLang'
import { useTheme } from '../hooks/useTheme'
import { Link, useLocation } from 'react-router'

const footerLinkClass = 'min-h-11 inline-flex items-center text-[14px] text-[var(--text-secondary)] hover:text-fg transition-colors rounded-sm'
const preferenceButtonClass = 'min-h-11 inline-flex items-center justify-center gap-2 rounded-full border border-fg/20 bg-fg/[0.04] px-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--text-secondary)] transition-colors duration-200 hover:border-[var(--accent)] hover:bg-[rgb(var(--accent-rgb)/0.1)] hover:text-fg'

function NavItem({ to, hash, isHome, children }: { to?: string; hash?: string; isHome: boolean; children: ReactNode }) {
  if (hash && isHome) {
    return (
      <a href={hash} className={footerLinkClass}>
        {children}
      </a>
    )
  }
  if (hash && !isHome) {
    return (
      <Link to={`/${hash}`} className={footerLinkClass}>
        {children}
      </Link>
    )
  }
  return (
    <Link to={to || '/'} className={footerLinkClass}>
      {children}
    </Link>
  )
}

export default function Footer() {
  const { t, lang, setLang } = useLang()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isBg = lang === 'bg'
  const isDark = theme === 'dark'
  const themeActionLabel = isDark
    ? (isBg ? 'Светла тема' : 'Light theme')
    : (isBg ? 'Тъмна тема' : 'Dark theme')
  const languageActionLabel = isBg ? 'English' : 'Български'

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const openCookieSettings = () => window.dispatchEvent(new Event('open-cookie-settings'))
  const toggleLang = () => setLang(isBg ? 'en' : 'bg')

  return (
    <footer className="dark bg-[var(--bg-deep)] border-t border-fg/[0.08]">
      <div className="section-shell py-12 sm:py-16 lg:py-20">
        <div className="flex items-end justify-between gap-6 pb-10 sm:pb-14 mb-10 sm:mb-14 border-b border-fg/10 overflow-hidden">
          <p className="text-display uppercase text-fg text-[clamp(3rem,8vw,7.5rem)]">
            {isBg ? <>Карай <span className="text-[var(--accent-text)]">електрически.</span></> : <>Ride <span className="text-[var(--accent-text)]">electric.</span></>}
          </p>
          <span className="hidden sm:block w-3 h-3 rounded-full bg-[var(--accent)] mb-2 status-pulse" aria-hidden="true" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Column 1 - Navigation */}
          <div>
            <h2 className="text-[11px] font-bold tracking-[0.15em] text-[var(--text-muted)] uppercase mb-6">
              {isBg ? 'НАВИГАЦИЯ' : 'NAVIGATION'}
            </h2>
            <nav className="grid grid-cols-2 sm:grid-cols-1 gap-x-5" aria-label="Footer navigation">
              <NavItem to="/" isHome={isHome}>{isBg ? 'Начало' : 'Home'}</NavItem>
              <NavItem to="/models" isHome={isHome}>{t('nav_models')}</NavItem>
              <NavItem hash="#about" isHome={isHome}>{t('nav_about')}</NavItem>
              <NavItem hash="#contact" isHome={isHome}>{t('nav_contact')}</NavItem>
            </nav>
          </div>

          {/* Column 2 - Logo */}
          <div className="order-first sm:col-span-2 lg:order-none lg:col-span-1 flex flex-col items-start lg:items-center lg:justify-center">
            <div className="flex items-center gap-4 mb-5">
              <img
                src="/images/eride-logo-small.png"
                alt="E RIDE PRO"
                className="w-14 h-14 object-contain rounded-xl"
                width="56"
                height="56"
              />
              <img
                src="/images/kasta-logo-small.png"
                alt="Kasta Ventures"
                className="h-12 object-contain logo-ink"
                width="188"
                height="48"
              />
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] text-left lg:text-center max-w-[300px] leading-relaxed">
              {t('footer_official')}
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://instagram.com/erideprobulgaria"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-fg/20 flex items-center justify-center text-[var(--text-secondary)] hover:text-fg hover:border-fg/40 transition-all"
                aria-label="Instagram"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 3 - Contact */}
          <div className="sm:text-right">
            <h2 className="text-[11px] font-bold tracking-[0.15em] text-[var(--text-muted)] uppercase mb-6">
              {isBg ? 'КОНТАКТ' : 'CONTACT'}
            </h2>
            <div>
              <a href="mailto:office@kastaventures.com" className="min-h-11 flex sm:justify-end items-center text-[14px] text-[var(--text-secondary)] hover:text-fg transition-colors">
                office@kastaventures.com
              </a>
              <a href="tel:+359887773733" className="min-h-11 flex sm:justify-end items-center text-[14px] text-[var(--text-secondary)] hover:text-fg transition-colors">
                +359 887 77 37 33
              </a>
              <p className="text-[13px] text-[var(--text-muted)] mt-2">{t('location_address')}</p>
            </div>
            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 min-h-11 inline-flex items-center gap-2 text-[12px] text-[var(--text-secondary)] hover:text-fg transition-colors group"
            >
              <span className="uppercase tracking-wider">{isBg ? 'Нагоре' : 'Back to Top'}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:-translate-y-1 transition-transform" aria-hidden="true">
                <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="mt-7 pt-6 border-t border-fg/10">
              <h3 className="text-[10px] font-bold tracking-[0.14em] text-[var(--text-muted)] uppercase mb-3">
                {isBg ? 'Изглед и език' : 'Display & language'}
              </h3>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className={preferenceButtonClass}
                  aria-label={themeActionLabel}
                >
                  {isDark ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="4" />
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                    </svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  )}
                  <span>{themeActionLabel}</span>
                </button>
                <button
                  type="button"
                  onClick={toggleLang}
                  className={preferenceButtonClass}
                  aria-label={isBg ? 'Switch to English' : 'Превключи на български'}
                >
                  <span className="text-[10px] text-[var(--accent-text)]" aria-hidden="true">{isBg ? 'EN' : 'BG'}</span>
                  <span>{languageActionLabel}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-fg/[0.04]">
        <div className="section-shell py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[12px] text-[var(--text-muted)]">{t('footer_rights')}</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-[var(--text-muted)]" aria-label="Legal links">
            <Link to="/privacy-policy" className="min-h-11 inline-flex items-center hover:text-fg transition-colors">{isBg ? 'Поверителност' : 'Privacy'}</Link>
            <Link to="/terms" className="min-h-11 inline-flex items-center hover:text-fg transition-colors">{isBg ? 'Условия' : 'Terms'}</Link>
            <Link to="/cookie-policy" className="min-h-11 inline-flex items-center hover:text-fg transition-colors">{isBg ? 'Бисквитки' : 'Cookies'}</Link>
            <button type="button" onClick={openCookieSettings} className="min-h-11 inline-flex items-center hover:text-fg transition-colors">
              {isBg ? 'Настройки' : 'Settings'}
            </button>
          </nav>
        </div>
      </div>
    </footer>
  )
}

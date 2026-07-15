import type { ReactNode } from 'react'
import { useLang } from '../hooks/useLang'
import { Link, useLocation } from 'react-router'

const footerLinkClass = 'min-h-11 inline-flex items-center text-[14px] text-white/70 hover:text-white transition-colors rounded-sm'

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
  const { t, lang } = useLang()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isBg = lang === 'bg'

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="bg-[#080809] border-t border-white/[0.08]">
      <div className="section-shell py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Column 1 - Navigation */}
          <div>
            <h2 className="text-[11px] font-bold tracking-[0.15em] text-white/60 uppercase mb-6">
              {isBg ? 'НАВИГАЦИЯ' : 'NAVIGATION'}
            </h2>
            <nav className="grid grid-cols-2 sm:grid-cols-1 gap-x-5" aria-label="Footer navigation">
              <NavItem to="/" isHome={isHome}>{isBg ? 'Начало' : 'Home'}</NavItem>
              <NavItem to="/models" isHome={isHome}>{t('nav_models')}</NavItem>
              <NavItem hash="#about" isHome={isHome}>{t('nav_about')}</NavItem>
              <NavItem hash="#contact" isHome={isHome}>{t('nav_contact')}</NavItem>
              <NavItem to="/privacy-policy" isHome={isHome}>{isBg ? 'Поверителност' : 'Privacy Policy'}</NavItem>
              <NavItem to="/terms" isHome={isHome}>{isBg ? 'Условия за ползване' : 'Terms of Service'}</NavItem>
              <NavItem to="/cookie-policy" isHome={isHome}>{isBg ? 'Политика за бисквитки' : 'Cookie Policy'}</NavItem>
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
                className="h-12 object-contain brightness-150 contrast-125"
                width="188"
                height="48"
              />
            </div>
            <p className="text-[13px] text-white/60 text-left lg:text-center max-w-[300px] leading-relaxed">
              {t('footer_official')}
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://instagram.com/erideprobulgaria"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white/65 hover:text-white hover:border-white/40 transition-all"
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
            <h2 className="text-[11px] font-bold tracking-[0.15em] text-white/60 uppercase mb-6">
              {isBg ? 'КОНТАКТ' : 'CONTACT'}
            </h2>
            <div>
              <a href="mailto:office@kastaventures.com" className="min-h-11 flex sm:justify-end items-center text-[14px] text-white/70 hover:text-white transition-colors">
                office@kastaventures.com
              </a>
              <a href="tel:+359887773733" className="min-h-11 flex sm:justify-end items-center text-[14px] text-white/70 hover:text-white transition-colors">
                +359 887 77 37 33
              </a>
              <p className="text-[13px] text-white/60 mt-2">{t('location_address')}</p>
            </div>
            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 min-h-11 inline-flex items-center gap-2 text-[12px] text-white/60 hover:text-white transition-colors group"
            >
              <span className="uppercase tracking-wider">{isBg ? 'Нагоре' : 'Back to Top'}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:-translate-y-1 transition-transform" aria-hidden="true">
                <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="section-shell py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[12px] text-white/60">{t('footer_rights')}</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-white/60" aria-label="Legal links">
            <Link to="/privacy-policy" className="min-h-11 inline-flex items-center hover:text-white/80 transition-colors">{isBg ? 'Поверителност' : 'Privacy'}</Link>
            <Link to="/terms" className="min-h-11 inline-flex items-center hover:text-white/80 transition-colors">{isBg ? 'Условия' : 'Terms'}</Link>
            <Link to="/cookie-policy" className="min-h-11 inline-flex items-center hover:text-white/80 transition-colors">{isBg ? 'Бисквитки' : 'Cookies'}</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

import type { ReactNode } from 'react'
import { useLang } from '../hooks/useLang'
import { Link, useLocation } from 'react-router'

function NavItem({ to, hash, isHome, children }: { to?: string; hash?: string; isHome: boolean; children: ReactNode }) {
  if (hash && isHome) {
    return (
      <a href={hash} className="block text-[14px] text-white/70 hover:text-white transition-colors">
        {children}
      </a>
    )
  }
  if (hash && !isHome) {
    return (
      <Link to={`/${hash}`} className="block text-[14px] text-white/70 hover:text-white transition-colors">
        {children}
      </Link>
    )
  }
  return (
    <Link to={to || '/'} className="block text-[14px] text-white/70 hover:text-white transition-colors">
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
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1 - Navigation */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.15em] text-white/50 uppercase mb-6">
              {isBg ? 'НАВИГАЦИЯ' : 'NAVIGATION'}
            </h4>
            <nav className="space-y-3" aria-label="Footer navigation">
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
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[var(--accent)] rounded-xl flex items-center justify-center">
                <span className="text-white font-extrabold text-[10px] tracking-wider leading-tight text-center">
                  E<br/>RIDE<br/>PRO
                </span>
              </div>
              <img
                src="/images/kasta-logo-final.jpg"
                alt="Kasta Ventures"
                className="h-12 object-contain"
                height="48"
              />
            </div>
            <p className="text-[12px] text-white/50 text-center max-w-[240px] leading-relaxed">
              {t('footer_official')}
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
                aria-label="Instagram"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
                aria-label="Facebook"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 3 - Contact */}
          <div className="md:text-right">
            <h4 className="text-[11px] font-bold tracking-[0.15em] text-white/50 uppercase mb-6">
              {isBg ? 'КОНТАКТ' : 'CONTACT'}
            </h4>
            <div className="space-y-3">
              <a href="mailto:office@kastaventures.com" className="block text-[14px] text-white/70 hover:text-white transition-colors">
                office@kastaventures.com
              </a>
              <a href="tel:+359887773733" className="block text-[14px] text-white/70 hover:text-white transition-colors">
                +359 887 77 37 33
              </a>
              <p className="text-[13px] text-white/50">{t('location_address')}</p>
            </div>
            <button
              onClick={scrollToTop}
              className="mt-8 inline-flex items-center gap-2 text-[12px] text-white/50 hover:text-white transition-colors group"
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
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-white/40">{t('footer_rights')}</p>
          <nav className="flex gap-6 text-[11px] text-white/50" aria-label="Legal links">
            <Link to="/privacy-policy" className="hover:text-white/80 transition-colors">{isBg ? 'Поверителност' : 'Privacy'}</Link>
            <Link to="/terms" className="hover:text-white/80 transition-colors">{isBg ? 'Условия' : 'Terms'}</Link>
            <Link to="/cookie-policy" className="hover:text-white/80 transition-colors">{isBg ? 'Бисквитки' : 'Cookies'}</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

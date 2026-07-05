import { useLang } from '../hooks/useLang'
import { useNavigate, useLocation } from 'react-router'

export default function Footer() {
  const { t, lang } = useLang()
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isBg = lang === 'bg'

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const goTo = (hash: string) => {
    if (!isHome) {
      navigate('/')
      setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 200)
    } else {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1 - Navigation */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.15em] text-white/20 uppercase mb-6">{isBg ? 'НАВИГАЦИЯ' : 'NAVIGATION'}</h4>
            <nav className="space-y-3">
              <button onClick={() => navigate('/')} className="block text-[14px] text-white/50 hover:text-white transition-colors">{isBg ? 'Начало' : 'Home'}</button>
              <button onClick={() => navigate('/models')} className="block text-[14px] text-white/50 hover:text-white transition-colors">{t('nav_models')}</button>
              <button onClick={() => goTo('#about')} className="block text-[14px] text-white/50 hover:text-white transition-colors">{t('nav_about')}</button>
              <button onClick={() => goTo('#contact')} className="block text-[14px] text-white/50 hover:text-white transition-colors">{t('nav_contact')}</button>
              <button onClick={() => navigate('/privacy-policy')} className="block text-[14px] text-white/50 hover:text-white transition-colors">{isBg ? 'Поверителност' : 'Privacy Policy'}</button>
              <button onClick={() => navigate('/terms')} className="block text-[14px] text-white/50 hover:text-white transition-colors">{isBg ? 'Условия за ползване' : 'Terms of Service'}</button>
              <button onClick={() => navigate('/cookie-policy')} className="block text-[14px] text-white/50 hover:text-white transition-colors">{isBg ? 'Политика за бисквитки' : 'Cookie Policy'}</button>
            </nav>
          </div>

          {/* Column 2 - Logo */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-4 mb-6">
              {/* E RIDE PRO red logo */}
              <div className="w-14 h-14 bg-[var(--accent)] rounded-xl flex items-center justify-center">
                <span className="text-white font-extrabold text-[10px] tracking-wider leading-tight text-center">
                  E<br/>RIDE<br/>PRO
                </span>
              </div>
              {/* KaSta VENTURES logo */}
              <img src="./images/kasta-logo-final.jpg" alt="Kasta Ventures" className="h-12 object-contain" />
            </div>
            <p className="text-[12px] text-white/20 text-center max-w-[240px] leading-relaxed">
              {t('footer_official')}
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 3 - Contact */}
          <div className="md:text-right">
            <h4 className="text-[11px] font-bold tracking-[0.15em] text-white/20 uppercase mb-6">{isBg ? 'КОНТАКТ' : 'CONTACT'}</h4>
            <div className="space-y-3">
              <p className="text-[14px] text-white/50">office@kastaventures.com</p>
              <p className="text-[14px] text-white/50">+359 887 77 37 33</p>
              <p className="text-[13px] text-white/30">{t('location_address')}</p>
            </div>
            <button onClick={scrollToTop} className="mt-8 inline-flex items-center gap-2 text-[12px] text-white/30 hover:text-white transition-colors group">
              <span className="uppercase tracking-wider">{isBg ? 'Нагоре' : 'Back to Top'}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:-translate-y-1 transition-transform">
                <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-white/15">{t('footer_rights')}</p>
          <div className="flex gap-6 text-[11px] text-white/20">
            <button onClick={() => navigate('/privacy-policy')} className="hover:text-white/50 transition-colors">{isBg ? 'Поверителност' : 'Privacy'}</button>
            <button onClick={() => navigate('/terms')} className="hover:text-white/50 transition-colors">{isBg ? 'Условия' : 'Terms'}</button>
            <button onClick={() => navigate('/cookie-policy')} className="hover:text-white/50 transition-colors">{isBg ? 'Бисквитки' : 'Cookies'}</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

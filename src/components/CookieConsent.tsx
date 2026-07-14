import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useLang } from '../hooks/useLang'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
}

function getStoredConsent(): { accepted: boolean; preferences: CookiePreferences; timestamp?: string } | null {
  try {
    const stored = localStorage.getItem('cookie_consent')
    if (stored) return JSON.parse(stored)
  } catch { /* ignore */ }
  return null
}

function storeConsent(accepted: boolean, preferences: CookiePreferences) {
  const data = {
    accepted,
    preferences,
    timestamp: new Date().toISOString(),
    version: '1.0',
  }
  localStorage.setItem('cookie_consent', JSON.stringify(data))
}

export default function CookieConsent() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const isBg = lang === 'bg'
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return getStoredConsent() === null
  })
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    if (typeof window === 'undefined') return defaultPreferences
    return getStoredConsent()?.preferences ?? defaultPreferences
  })

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    }
    setPreferences(allAccepted)
    storeConsent(true, allAccepted)
    setVisible(false)
    window.dispatchEvent(new Event('cookieconsent'))
  }

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    }
    setPreferences(onlyNecessary)
    storeConsent(true, onlyNecessary)
    setVisible(false)
    window.dispatchEvent(new Event('cookieconsent'))
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

  if (!visible) return null

  const translations = {
    bg: {
      title: 'Ние използваме бисквитки',
      description: 'Използваме бисквитки, за да подобрим вашето изживяване, да анализираме трафика и да персонализираме съдържание. Можете да управлявате предпочитанията си по всяко време.',
      acceptAll: 'Приеми всички',
      rejectAll: 'Отхвърли всички',
      customize: 'Настройки',
      savePreferences: 'Запази предпочитания',
      necessary: 'Необходими',
      necessaryDesc: 'Тези бисквитки са задължителни за работата на уебсайта и не могат да бъдат изключени.',
      analytics: 'Аналитични',
      analyticsDesc: 'Помагат ни да разберем как използвате уебсайта, за да го подобрим.',
      marketing: 'Маркетингови',
      marketingDesc: 'Използват се за персонализирани реклами и маркетингови кампании.',
      preferences: 'Предпочитания',
      preferencesDesc: 'Запомнят вашите настройки и предпочитания за по-добро изживяване.',
      privacyLink: 'Поверителност',
      cookiePolicy: 'Бисквитки',
    },
    en: {
      title: 'We use cookies',
      description: 'We use cookies to enhance your experience, analyze traffic, and personalize content. You can manage your preferences at any time.',
      acceptAll: 'Accept All',
      rejectAll: 'Reject All',
      customize: 'Settings',
      savePreferences: 'Save Preferences',
      necessary: 'Necessary',
      necessaryDesc: 'These cookies are essential for the website to function and cannot be disabled.',
      analytics: 'Analytics',
      analyticsDesc: 'Help us understand how you use the website to improve it.',
      marketing: 'Marketing',
      marketingDesc: 'Used for personalized ads and marketing campaigns.',
      preferences: 'Preferences',
      preferencesDesc: 'Remember your settings and preferences for a better experience.',
      privacyLink: 'Privacy',
      cookiePolicy: 'Cookies',
    },
  }

  const t = translations[isBg ? 'bg' : 'en']

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 pointer-events-auto transition-opacity"
        onClick={() => setVisible(false)}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-[640px] mx-4 mb-4 sm:mb-0 bg-[#1a1a1a] border border-white/[0.06] rounded-2xl shadow-2xl pointer-events-auto overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
                <path d="M8.5 8.5v.01"/>
                <path d="M16 15.5v.01"/>
                <path d="M12 12v.01"/>
                <path d="M11 17v.01"/>
                <path d="M7 14v.01"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">{t.title}</h3>
          </div>
          <p className="text-[14px] text-white/50 leading-relaxed">{t.description}</p>
        </div>

        {/* Cookie Categories */}
        {showDetails && (
          <div className="px-6 pb-4 space-y-3 border-t border-white/[0.04] pt-4">
            {/* Necessary - Always On */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 w-10 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                <div className="w-4 h-4 rounded-full bg-white translate-x-1 transition-transform" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-medium text-white">{t.necessary}</span>
                  <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider">{isBg ? 'Задължителни' : 'Required'}</span>
                </div>
                <p className="text-[12px] text-white/30 mt-0.5">{t.necessaryDesc}</p>
              </div>
            </div>

            {/* Analytics */}
            <div className="flex items-start gap-3">
              <button 
                onClick={() => togglePreference('analytics')}
                className={`mt-0.5 w-10 h-6 rounded-full flex items-center flex-shrink-0 transition-colors ${preferences.analytics ? 'bg-[var(--accent)]' : 'bg-white/10'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${preferences.analytics ? 'translate-x-1' : '-translate-x-1'}`} />
              </button>
              <div className="flex-1">
                <span className="text-[14px] font-medium text-white">{t.analytics}</span>
                <p className="text-[12px] text-white/30 mt-0.5">{t.analyticsDesc}</p>
              </div>
            </div>

            {/* Marketing */}
            <div className="flex items-start gap-3">
              <button 
                onClick={() => togglePreference('marketing')}
                className={`mt-0.5 w-10 h-6 rounded-full flex items-center flex-shrink-0 transition-colors ${preferences.marketing ? 'bg-[var(--accent)]' : 'bg-white/10'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${preferences.marketing ? 'translate-x-1' : '-translate-x-1'}`} />
              </button>
              <div className="flex-1">
                <span className="text-[14px] font-medium text-white">{t.marketing}</span>
                <p className="text-[12px] text-white/30 mt-0.5">{t.marketingDesc}</p>
              </div>
            </div>

            {/* Preferences */}
            <div className="flex items-start gap-3">
              <button 
                onClick={() => togglePreference('preferences')}
                className={`mt-0.5 w-10 h-6 rounded-full flex items-center flex-shrink-0 transition-colors ${preferences.preferences ? 'bg-[var(--accent)]' : 'bg-white/10'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${preferences.preferences ? 'translate-x-1' : '-translate-x-1'}`} />
              </button>
              <div className="flex-1">
                <span className="text-[14px] font-medium text-white">{t.preferences}</span>
                <p className="text-[12px] text-white/30 mt-0.5">{t.preferencesDesc}</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-white/[0.04]">
          <div className="flex flex-col sm:flex-row flex-wrap gap-2">
            <button onClick={acceptAll} className="btn-accent flex-1 min-w-[120px] text-[12px] py-3">
              {t.acceptAll}
            </button>
            <button onClick={rejectAll} className="btn-outline flex-1 min-w-[120px] text-[12px] py-3">
              {t.rejectAll}
            </button>
            <button onClick={() => showDetails ? (storeConsent(true, preferences), setVisible(false), window.dispatchEvent(new Event('cookieconsent'))) : setShowDetails(true)} className="btn-outline flex-1 min-w-[120px] text-[12px] py-3">
              {showDetails ? t.savePreferences : t.customize}
            </button>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={() => { setVisible(false); navigate('/privacy-policy') }} className="text-[11px] text-white/30 hover:text-white/60 transition-colors underline">
              {t.privacyLink}
            </button>
            <button onClick={() => { setVisible(false); navigate('/cookie-policy') }} className="text-[11px] text-white/30 hover:text-white/60 transition-colors underline">
              {t.cookiePolicy}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

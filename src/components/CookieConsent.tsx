import { useState, useEffect } from 'react'
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
    version: '1.1',
  }
  localStorage.setItem('cookie_consent', JSON.stringify(data))
  window.dispatchEvent(new Event('cookieconsent'))
}

function Toggle({
  active,
  onClick,
  disabled,
  ariaLabel,
}: {
  active: boolean
  onClick?: () => void
  disabled?: boolean
  ariaLabel?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-checked={active}
      role="switch"
      aria-label={ariaLabel}
      className={`relative w-10 h-6 rounded-full flex items-center flex-shrink-0 transition-colors ${
        active ? 'bg-[var(--accent)]' : 'bg-white/10'
      } ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
    >
      <span
        className={`block w-4 h-4 rounded-full bg-white transition-transform ${
          active ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

export default function CookieConsent() {
  const { lang } = useLang()
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
  }

  const savePreferences = () => {
    storeConsent(true, preferences)
    setVisible(false)
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
  }

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
      required: 'Задължителни',
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
      required: 'Required',
    },
  }

  const t = translations[isBg ? 'bg' : 'en']

  useEffect(() => {
    if (!visible) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        rejectAll()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [visible])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 transition-opacity"
        aria-hidden="true"
      />

      <div
        className="relative w-full max-w-[640px] mx-4 mb-4 sm:mb-0 bg-[#1a1a1a] border border-white/[0.06] rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
      >
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
            <h3 id="cookie-title" className="text-lg font-semibold text-white">{t.title}</h3>
          </div>
          <p className="text-[14px] text-white/60 leading-relaxed">{t.description}</p>
        </div>

        {showDetails && (
          <div className="px-6 pb-4 space-y-3 border-t border-white/[0.04] pt-4">
            <div className="flex items-start gap-3">
              <Toggle active disabled ariaLabel={t.necessary} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-medium text-white">{t.necessary}</span>
                  <span className="text-[11px] font-semibold text-[var(--accent)] uppercase tracking-wider">{t.required}</span>
                </div>
                <p className="text-[12px] text-white/40 mt-0.5">{t.necessaryDesc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Toggle active={preferences.analytics} onClick={() => togglePreference('analytics')} ariaLabel={t.analytics} />
              <div className="flex-1">
                <span className="text-[14px] font-medium text-white">{t.analytics}</span>
                <p className="text-[12px] text-white/40 mt-0.5">{t.analyticsDesc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Toggle active={preferences.marketing} onClick={() => togglePreference('marketing')} ariaLabel={t.marketing} />
              <div className="flex-1">
                <span className="text-[14px] font-medium text-white">{t.marketing}</span>
                <p className="text-[12px] text-white/40 mt-0.5">{t.marketingDesc}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Toggle active={preferences.preferences} onClick={() => togglePreference('preferences')} ariaLabel={t.preferences} />
              <div className="flex-1">
                <span className="text-[14px] font-medium text-white">{t.preferences}</span>
                <p className="text-[12px] text-white/40 mt-0.5">{t.preferencesDesc}</p>
              </div>
            </div>
          </div>
        )}

        <div className="p-6 pt-4 border-t border-white/[0.04]">
          <div className="flex flex-col sm:flex-row flex-wrap gap-2">
            <button type="button" onClick={acceptAll} className="btn-accent flex-1 min-w-[120px] text-[12px] py-3">
              {t.acceptAll}
            </button>
            <button type="button" onClick={rejectAll} className="btn-outline flex-1 min-w-[120px] text-[12px] py-3">
              {t.rejectAll}
            </button>
            {showDetails ? (
              <button type="button" onClick={savePreferences} className="btn-outline flex-1 min-w-[120px] text-[12px] py-3">
                {t.savePreferences}
              </button>
            ) : (
              <button type="button" onClick={() => setShowDetails(true)} className="btn-outline flex-1 min-w-[120px] text-[12px] py-3">
                {t.customize}
              </button>
            )}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <a href="/privacy-policy" className="text-[11px] text-white/40 hover:text-white/70 transition-colors underline">
              {t.privacyLink}
            </a>
            <a href="/cookie-policy" className="text-[11px] text-white/40 hover:text-white/70 transition-colors underline">
              {t.cookiePolicy}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

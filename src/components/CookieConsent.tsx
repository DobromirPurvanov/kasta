import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { useLang } from '../hooks/useLang'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

interface StoredConsent {
  accepted: boolean
  preferences: CookiePreferences
  timestamp?: string
  version?: string
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
}

const allPreferences: CookiePreferences = {
  necessary: true,
  analytics: true,
  marketing: true,
  preferences: true,
}

const translations = {
  bg: {
    bannerTitle: 'Вашата поверителност',
    bannerDescription:
      'Използваме необходими технологии за основните функции на сайта. Допълнителните категории се включват само с вашето съгласие.',
    settingsTitle: 'Настройки за поверителност',
    settingsDescription:
      'Изберете кои допълнителни категории разрешавате. Можете да промените решението си по всяко време.',
    acceptAll: 'Приеми всички',
    rejectAll: 'Отхвърли всички',
    customize: 'Настройки',
    savePreferences: 'Запази предпочитания',
    closeSettings: 'Затвори настройките',
    necessary: 'Необходими',
    necessaryDesc:
      'Тези технологии са задължителни за работата на уебсайта и не могат да бъдат изключени.',
    analytics: 'Аналитични',
    analyticsDesc: 'Помагат ни да разберем как използвате уебсайта, за да го подобрим.',
    marketing: 'Маркетингови',
    marketingDesc: 'Използват се за персонализирани реклами и маркетингови кампании.',
    preferences: 'Предпочитания',
    preferencesDesc: 'Запомнят вашите настройки за по-последователно изживяване.',
    privacyLink: 'Поверителност',
    cookiePolicy: 'Политика за бисквитки',
    required: 'Задължителни',
  },
  en: {
    bannerTitle: 'Your privacy',
    bannerDescription:
      'We use necessary technologies for the site’s core functions. Optional categories are enabled only with your consent.',
    settingsTitle: 'Privacy settings',
    settingsDescription:
      'Choose which optional categories you allow. You can change your decision at any time.',
    acceptAll: 'Accept all',
    rejectAll: 'Reject all',
    customize: 'Settings',
    savePreferences: 'Save preferences',
    closeSettings: 'Close settings',
    necessary: 'Necessary',
    necessaryDesc:
      'These technologies are essential for the website to function and cannot be disabled.',
    analytics: 'Analytics',
    analyticsDesc: 'Help us understand how you use the website so we can improve it.',
    marketing: 'Marketing',
    marketingDesc: 'Used for personalized ads and marketing campaigns.',
    preferences: 'Preferences',
    preferencesDesc: 'Remember your settings for a more consistent experience.',
    privacyLink: 'Privacy',
    cookiePolicy: 'Cookie policy',
    required: 'Required',
  },
} as const

const choiceButtonClass =
  'min-h-12 w-full inline-flex items-center justify-center rounded-full border border-fg/25 bg-fg/[0.04] px-3 sm:px-5 text-[11px] sm:text-[12px] font-bold tracking-[0.04em] uppercase text-fg transition-colors duration-200 hover:border-fg/45 hover:bg-fg/[0.09] cursor-pointer'

function isCookiePreferences(value: unknown): value is CookiePreferences {
  if (typeof value !== 'object' || value === null) return false

  const preferences = value as Partial<CookiePreferences>
  return (
    preferences.necessary === true &&
    typeof preferences.analytics === 'boolean' &&
    typeof preferences.marketing === 'boolean' &&
    typeof preferences.preferences === 'boolean'
  )
}

function getStoredConsent(): StoredConsent | null {
  if (typeof window === 'undefined') return null

  try {
    const stored = window.localStorage.getItem('cookie_consent')
    if (!stored) return null

    const parsed: unknown = JSON.parse(stored)
    if (typeof parsed !== 'object' || parsed === null) return null

    const consent = parsed as Partial<StoredConsent>
    if (typeof consent.accepted !== 'boolean' || !isCookiePreferences(consent.preferences)) {
      return null
    }

    return {
      accepted: consent.accepted,
      preferences: consent.preferences,
      timestamp: typeof consent.timestamp === 'string' ? consent.timestamp : undefined,
      version: typeof consent.version === 'string' ? consent.version : undefined,
    }
  } catch {
    return null
  }
}

function storeConsent(accepted: boolean, preferences: CookiePreferences) {
  if (typeof window === 'undefined') return

  const data: StoredConsent = {
    accepted,
    preferences,
    timestamp: new Date().toISOString(),
    version: '1.2',
  }

  try {
    window.localStorage.setItem('cookie_consent', JSON.stringify(data))
  } catch {
    // Consent still applies for this page view when storage is unavailable.
  }

  window.dispatchEvent(new CustomEvent<StoredConsent>('cookieconsent', { detail: data }))
}

function CookieIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
      <path d="M8.5 8.5v.01M16 15.5v.01M12 12v.01M11 17v.01M7 14v.01" />
    </svg>
  )
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
  ariaLabel: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-checked={active}
      role="switch"
      aria-label={ariaLabel}
      className={[
        'relative w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-light)]',
        disabled ? 'cursor-default opacity-80' : 'cursor-pointer',
      ].join(' ')}
    >
      <span
        className={[
          'relative block w-10 h-6 rounded-full transition-colors duration-200',
          active ? 'bg-[var(--accent)]' : 'bg-fg/15',
        ].join(' ')}
      >
        <span
          className={[
            'absolute top-1 left-1 block w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200',
            active ? 'translate-x-4' : 'translate-x-0',
          ].join(' ')}
        />
      </span>
    </button>
  )
}

export default function CookieConsent() {
  const { lang } = useLang()
  const isBg = lang === 'bg'
  const t = translations[isBg ? 'bg' : 'en']

  const [initialConsent] = useState<StoredConsent | null>(() => getStoredConsent())
  const [bannerVisible, setBannerVisible] = useState(initialConsent === null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(
    initialConsent?.preferences ?? defaultPreferences
  )

  const dialogRef = useRef<HTMLDivElement>(null)
  const modalRootRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  const openSettings = useCallback(() => {
    if (settingsOpen) return

    returnFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null

    const storedConsent = getStoredConsent()
    setPreferences(storedConsent?.preferences ?? defaultPreferences)
    setSettingsOpen(true)
  }, [settingsOpen])

  const closeSettings = useCallback(() => {
    setSettingsOpen(false)
  }, [])

  const completeConsent = (accepted: boolean, nextPreferences: CookiePreferences) => {
    setPreferences(nextPreferences)
    storeConsent(accepted, nextPreferences)
    setBannerVisible(false)
    setSettingsOpen(false)
  }

  const acceptAll = () => {
    completeConsent(true, allPreferences)
  }

  const rejectAll = () => {
    completeConsent(false, defaultPreferences)
  }

  const savePreferences = () => {
    const optionalConsent =
      preferences.analytics || preferences.marketing || preferences.preferences
    completeConsent(optionalConsent, preferences)
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return
    setPreferences((current) => ({ ...current, [key]: !current[key] }))
  }

  useEffect(() => {
    const handleOpenSettings = () => openSettings()
    window.addEventListener('open-cookie-settings', handleOpenSettings)
    return () => window.removeEventListener('open-cookie-settings', handleOpenSettings)
  }, [openSettings])

  // Only the settings view is modal: contain focus, lock scroll, hide siblings,
  // and return focus to the control that opened it.
  useEffect(() => {
    if (!settingsOpen) return

    const previousOverflow = document.body.style.overflow
    const modalRoot = modalRootRef.current
    const parent = modalRoot?.parentElement
    const siblingStates =
      parent && modalRoot
        ? Array.from(parent.children)
            .filter((element): element is HTMLElement => element !== modalRoot && element instanceof HTMLElement)
            .map((element) => ({
              element,
              hadInert: element.hasAttribute('inert'),
              ariaHidden: element.getAttribute('aria-hidden'),
            }))
        : []

    document.body.style.overflow = 'hidden'
    siblingStates.forEach(({ element }) => {
      element.setAttribute('inert', '')
      element.setAttribute('aria-hidden', 'true')
    })
    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeSettings()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'
        )
      )
      if (focusableElements.length === 0) return

      const first = focusableElements[0]
      const last = focusableElements[focusableElements.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      siblingStates.forEach(({ element, hadInert, ariaHidden }) => {
        if (!hadInert) element.removeAttribute('inert')
        if (ariaHidden === null) {
          element.removeAttribute('aria-hidden')
        } else {
          element.setAttribute('aria-hidden', ariaHidden)
        }
      })

      const returnTarget = returnFocusRef.current
      window.requestAnimationFrame(() => {
        if (returnTarget?.isConnected) {
          returnTarget.focus()
        } else {
          document.getElementById('main')?.focus()
        }
      })
    }
  }, [closeSettings, settingsOpen])

  return (
    <>
      {bannerVisible && (
        <div
          className={[
            'fixed inset-x-0 bottom-0 z-40 pointer-events-none px-3 sm:px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]',
            'transition-opacity duration-200',
            settingsOpen ? 'opacity-0 invisible' : 'opacity-100 visible',
          ].join(' ')}
        >
          <section
            className="pointer-events-auto surface-card bg-[var(--bg-card)] backdrop-blur-xl max-w-[1120px] mx-auto rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xl"
            role="region"
            aria-live="polite"
            aria-labelledby="cookie-banner-title"
            aria-describedby="cookie-banner-description"
          >
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[rgb(var(--accent-rgb)/0.1)] text-[var(--accent-text)] flex items-center justify-center flex-shrink-0">
                  <CookieIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h2 id="cookie-banner-title" className="text-[15px] sm:text-[16px] font-semibold text-fg mb-1">
                    {t.bannerTitle}
                  </h2>
                  <p
                    id="cookie-banner-description"
                    className="text-[13px] sm:text-[14px] text-fg/70 leading-relaxed max-w-[680px]"
                  >
                    {t.bannerDescription}
                  </p>
                  <div className="flex flex-wrap gap-x-5 mt-1">
                    <Link
                      to="/privacy-policy"
                      className="min-h-11 inline-flex items-center text-[12px] text-fg/65 hover:text-fg transition-colors underline underline-offset-4"
                    >
                      {t.privacyLink}
                    </Link>
                    <Link
                      to="/cookie-policy"
                      className="min-h-11 inline-flex items-center text-[12px] text-fg/65 hover:text-fg transition-colors underline underline-offset-4"
                    >
                      {t.cookiePolicy}
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={rejectAll} className={choiceButtonClass}>
                    {t.rejectAll}
                  </button>
                  <button type="button" onClick={acceptAll} className={choiceButtonClass}>
                    {t.acceptAll}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={openSettings}
                  className="min-h-11 w-full inline-flex items-center justify-center gap-2 text-[12px] font-semibold text-fg/70 hover:text-fg transition-colors cursor-pointer"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M10 14v6" />
                  </svg>
                  {t.customize}
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {settingsOpen && (
        <div
          ref={modalRootRef}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
        >
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px]" aria-hidden="true" />

          <div
            ref={dialogRef}
            className="relative w-full max-w-[680px] bg-[var(--bg-card)] border border-fg/10 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300 max-h-[calc(100dvh-0.5rem)] sm:max-h-[90dvh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
            aria-describedby="cookie-settings-description"
          >
            <div className="p-5 sm:p-6 border-b border-fg/[0.08]">
              <div className="flex items-start gap-3 pr-12">
                <div className="w-10 h-10 rounded-xl bg-[rgb(var(--accent-rgb)/0.1)] text-[var(--accent-text)] flex items-center justify-center flex-shrink-0">
                  <CookieIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h2 id="cookie-settings-title" className="text-[18px] sm:text-[20px] font-semibold text-fg mb-1.5">
                    {t.settingsTitle}
                  </h2>
                  <p id="cookie-settings-description" className="text-[13px] sm:text-[14px] text-fg/70 leading-relaxed">
                    {t.settingsDescription}
                  </p>
                </div>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeSettings}
                className="absolute top-4 right-4 w-11 h-11 rounded-full border border-fg/15 bg-fg/[0.04] flex items-center justify-center text-fg/65 hover:text-fg hover:border-fg/35 transition-colors cursor-pointer"
                aria-label={t.closeSettings}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-3">
              <div className="surface-card rounded-2xl p-3 sm:p-4 flex items-start gap-3">
                <Toggle active disabled ariaLabel={t.necessary} />
                <div className="flex-1 min-w-0 pt-1.5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[14px] font-semibold text-fg">{t.necessary}</span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-[var(--accent-text)] uppercase tracking-wider flex-shrink-0">
                      {t.required}
                    </span>
                  </div>
                  <p className="text-[12px] sm:text-[13px] text-fg/65 leading-relaxed mt-1">
                    {t.necessaryDesc}
                  </p>
                </div>
              </div>

              <div className="surface-card rounded-2xl p-3 sm:p-4 flex items-start gap-3">
                <Toggle
                  active={preferences.analytics}
                  onClick={() => togglePreference('analytics')}
                  ariaLabel={t.analytics}
                />
                <div className="flex-1 min-w-0 pt-1.5">
                  <span className="text-[14px] font-semibold text-fg">{t.analytics}</span>
                  <p className="text-[12px] sm:text-[13px] text-fg/65 leading-relaxed mt-1">
                    {t.analyticsDesc}
                  </p>
                </div>
              </div>

              <div className="surface-card rounded-2xl p-3 sm:p-4 flex items-start gap-3">
                <Toggle
                  active={preferences.marketing}
                  onClick={() => togglePreference('marketing')}
                  ariaLabel={t.marketing}
                />
                <div className="flex-1 min-w-0 pt-1.5">
                  <span className="text-[14px] font-semibold text-fg">{t.marketing}</span>
                  <p className="text-[12px] sm:text-[13px] text-fg/65 leading-relaxed mt-1">
                    {t.marketingDesc}
                  </p>
                </div>
              </div>

              <div className="surface-card rounded-2xl p-3 sm:p-4 flex items-start gap-3">
                <Toggle
                  active={preferences.preferences}
                  onClick={() => togglePreference('preferences')}
                  ariaLabel={t.preferences}
                />
                <div className="flex-1 min-w-0 pt-1.5">
                  <span className="text-[14px] font-semibold text-fg">{t.preferences}</span>
                  <p className="text-[12px] sm:text-[13px] text-fg/65 leading-relaxed mt-1">
                    {t.preferencesDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6 pt-4 border-t border-fg/[0.08] pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={rejectAll} className={choiceButtonClass}>
                  {t.rejectAll}
                </button>
                <button type="button" onClick={acceptAll} className={choiceButtonClass}>
                  {t.acceptAll}
                </button>
              </div>
              <button type="button" onClick={savePreferences} className="btn-accent w-full mt-2">
                {t.savePreferences}
              </button>
              <div className="flex justify-center gap-5 mt-2">
                <Link
                  to="/privacy-policy"
                  onClick={closeSettings}
                  className="min-h-11 inline-flex items-center text-[12px] text-fg/65 hover:text-fg transition-colors underline underline-offset-4"
                >
                  {t.privacyLink}
                </Link>
                <Link
                  to="/cookie-policy"
                  onClick={closeSettings}
                  className="min-h-11 inline-flex items-center text-[12px] text-fg/65 hover:text-fg transition-colors underline underline-offset-4"
                >
                  {t.cookiePolicy}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

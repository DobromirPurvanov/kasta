/**
 * Google Analytics 4, вързан за банера за бисквитки.
 *
 * Банерът обещава, че допълнителните категории се включват само със съгласие,
 * затова gtag НЕ се зарежда предварително — скриптът се дърпа чак когато
 * посетителят разреши категория „Аналитични“. Ако откаже, към Google не
 * тръгва нито една заявка.
 *
 * При оттегляне на съгласието не можем да „раззаредим“ вече изпълнен скрипт,
 * затова минаваме през Consent Mode: `analytics_storage: denied` спира
 * записването и събирането до следващото разрешение.
 */

const MEASUREMENT_ID = 'G-BJ6XFH45S9'

interface ConsentDetail {
  accepted: boolean
  preferences: { analytics?: boolean }
}

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

let scriptRequested = false

function ensureGtag() {
  if (window.gtag) return
  window.dataLayer = window.dataLayer || []
  // Използва `arguments`, а не масив — gtag разчита на самия обект arguments.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }
}

function loadScript() {
  if (scriptRequested) return
  scriptRequested = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.gtag?.('js', new Date())
  window.gtag?.('config', MEASUREMENT_ID, {
    // Пътищата се сменят от React Router, а не от презареждане — изпращаме
    // прегледите ръчно, за да не се броят по два пъти.
    send_page_view: false,
    anonymize_ip: true,
  })
}

function apply(granted: boolean) {
  ensureGtag()

  window.gtag?.('consent', granted ? 'update' : 'default', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })

  if (granted) {
    loadScript()
    sendPageView(window.location.pathname + window.location.search)
  }
}

function readStoredConsent(): boolean {
  try {
    const raw = window.localStorage.getItem('cookie_consent')
    if (!raw) return false
    const parsed = JSON.parse(raw) as ConsentDetail
    return parsed?.preferences?.analytics === true
  } catch {
    return false
  }
}

export function sendPageView(path: string) {
  if (!scriptRequested) return
  window.gtag?.('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  })
}

export function initAnalytics() {
  if (typeof window === 'undefined') return

  // Отказът е изходната позиция, докато не видим обратното.
  apply(readStoredConsent())

  window.addEventListener('cookieconsent', (event) => {
    const detail = (event as CustomEvent<ConsentDetail>).detail
    apply(detail?.preferences?.analytics === true)
  })
}

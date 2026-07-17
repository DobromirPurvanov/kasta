import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import { LangProvider, useLang } from './hooks/useLang'
import ScrollManager from './components/ScrollManager'
import Navigation from './sections/Navigation'
import Home from './pages/Home'
import Footer from './sections/Footer'
import CookieConsent from './components/CookieConsent'

const ModelsPage = lazy(() => import('./pages/ModelsPage'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const Terms = lazy(() => import('./pages/Terms'))
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'))
const NotFound = lazy(() => import('./pages/NotFound'))

function RouteFallback() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center pt-[72px]" aria-busy="true">
      <div className="w-8 h-8 rounded-full border-2 border-fg/10 border-t-[var(--accent)] animate-spin" />
    </div>
  )
}

function SkipLink() {
  const { lang } = useLang()
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-3 focus:bg-[var(--accent)] focus:text-white focus:rounded-full focus:text-[13px] focus:font-semibold"
    >
      {lang === 'bg' ? 'Към съдържанието' : 'Skip to content'}
    </a>
  )
}

export default function App() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-[var(--bg)] text-fg">
        <SkipLink />
        <ScrollManager />
        <Navigation />
        <main id="main" tabIndex={-1}>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/models" element={<ModelsPage />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </LangProvider>
  )
}

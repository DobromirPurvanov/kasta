import { Routes, Route } from 'react-router'
import { LangProvider } from './hooks/useLang'
import Navigation from './sections/Navigation'
import Home from './pages/Home'
import ModelsPage from './pages/ModelsPage'
import ProductDetail from './pages/ProductDetail'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import CookiePolicy from './pages/CookiePolicy'
import Footer from './sections/Footer'
import CookieConsent from './components/CookieConsent'

export default function App() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-[#0f0f0f] text-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/models" element={<ModelsPage />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
        </Routes>
        <Footer />
        <CookieConsent />
      </div>
    </LangProvider>
  )
}
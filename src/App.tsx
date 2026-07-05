import { Routes, Route } from 'react-router'
import { LangProvider } from './hooks/useLang'
import Navigation from './sections/Navigation'
import Home from './pages/Home'
import ModelsPage from './pages/ModelsPage'
import ProductDetail from './pages/ProductDetail'
import Footer from './sections/Footer'

export default function App() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-[#0f0f0f] text-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/models" element={<ModelsPage />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </div>
    </LangProvider>
  )
}
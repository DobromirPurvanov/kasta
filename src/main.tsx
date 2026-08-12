import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
// Вариативен Inter: един файл покрива тегла 100–900. Петте статични тегла
// теглеха 10 файла и 157KB (кирилица + латиница на всяко тегло); вариативният
// е 65KB в 2 файла. Забележимо на телефон.
import '@fontsource-variable/inter/wght.css'
import './index.css'
import App from './App.tsx'
import { initAnalytics } from './lib/analytics'

initAnalytics()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

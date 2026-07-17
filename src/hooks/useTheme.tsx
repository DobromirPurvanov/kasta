import { useCallback, useEffect, useRef, useState } from 'react'

export type Theme = 'light' | 'dark'

const THEME_COLORS: Record<Theme, string> = {
  light: '#f3f3f1',
  dark: '#070708',
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  try {
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
  } catch { /* ignore */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const isFirstRender = useRef(true)

  useEffect(() => {
    const root = document.documentElement
    // The inline script in index.html already applied the class before paint —
    // skip the cross-fade on the initial render.
    if (!isFirstRender.current) {
      root.classList.add('theme-transition')
    }
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLORS[theme])
    try {
      localStorage.setItem('theme', theme)
    } catch { /* ignore */ }

    const timer = setTimeout(() => root.classList.remove('theme-transition'), 350)
    isFirstRender.current = false
    return () => clearTimeout(timer)
  }, [theme])

  // Follow OS changes while the user hasn't made an explicit choice.
  useEffect(() => {
    let hasStored = false
    try {
      hasStored = localStorage.getItem('theme') !== null
    } catch { /* ignore */ }
    if (hasStored) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => setTheme(e.matches ? 'dark' : 'light')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    []
  )

  return { theme, toggleTheme }
}

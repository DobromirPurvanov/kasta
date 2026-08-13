import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sendPageView } from '../lib/analytics'
import { scrollToSection } from '../lib/scrollToSection'

/** Колко дълго пазим позицията, преди да оставим страницата на посетителя. */
const GUARD_MS = 2000

// React Router's pushState navigation neither scrolls to section targets
// nor resets the scroll position — this component does both globally.
export default function ScrollManager() {
  const { pathname, hash, state } = useLocation()

  // Маршрутите се сменят с pushState, без презареждане — ако не изпратим
  // прегледа ръчно, GA4 отчита само страницата, на която е влязъл посетителят.
  // Заглавието се задава от usePageMeta, затова изчакваме една рисунка.
  useEffect(() => {
    const id = window.requestAnimationFrame(() => sendPageView(pathname + window.location.search))
    return () => window.cancelAnimationFrame(id)
  }, [pathname])

  useEffect(() => {
    // Секциите вече се подават през state, за да няма „#“ в адреса. Хешът
    // остава разпознат, защото стари връзки и отметки още го носят.
    const target = (state as { scrollTo?: string } | null)?.scrollTo ?? (hash ? hash.slice(1) : null)

    let cancelled = false
    let released = false
    const timers: ReturnType<typeof setTimeout>[] = []

    const apply = () => {
      if (cancelled) return
      if (!target) {
        window.scrollTo({ top: 0, behavior: 'auto' })
        return
      }
      scrollToSection(target, 'auto')
    }

    /**
     * ScrollTrigger помни скрола и го връща след всеки свой `refresh()`, а
     * refresh се пуска и при всяка доуредена снимка. След смяна на маршрут
     * запомненото е позицията от предишната страница — точно заради това
     * продуктовата страница се отваряше по средата на списъка.
     *
     * Затова заставаме след него: докато посетителят не превърти сам (или до
     * `GUARD_MS`), всеки refresh се последва от нашата позиция.
     */
    const release = () => {
      released = true
    }
    const afterRefresh = () => {
      if (!released) apply()
    }

    apply()
    ScrollTrigger.addEventListener('refresh', afterRefresh)
    window.addEventListener('wheel', release, { passive: true })
    window.addEventListener('touchmove', release, { passive: true })
    window.addEventListener('keydown', release)
    // Влаченето на скролбара не праща wheel — затова пускаме и при докосване.
    window.addEventListener('pointerdown', release, { passive: true })
    timers.push(setTimeout(release, GUARD_MS))

    // Секцията може още да не е в DOM-а, ако маршрутът се зарежда мързеливо.
    if (target) {
      let attempts = 0
      const retry = () => {
        if (cancelled || scrollToSection(target, 'auto')) return
        attempts += 1
        if (attempts < 12) timers.push(setTimeout(retry, 60))
        else window.scrollTo({ top: 0, behavior: 'auto' })
      }
      timers.push(setTimeout(retry, 60))
    }

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
      ScrollTrigger.removeEventListener('refresh', afterRefresh)
      window.removeEventListener('wheel', release)
      window.removeEventListener('touchmove', release)
      window.removeEventListener('keydown', release)
      window.removeEventListener('pointerdown', release)
    }
  }, [pathname, hash, state])

  return null
}

import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { sendPageView } from '../lib/analytics'
import { scrollToSection } from '../lib/scrollToSection'

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
    const timers: ReturnType<typeof setTimeout>[] = []
    const frames: number[] = []

    const apply = () => {
      if (cancelled) return
      if (!target) {
        window.scrollTo({ top: 0, behavior: 'auto' })
        return
      }
      scrollToSection(target, 'auto')
    }

    // ScrollTrigger освежава позициите си на следващия кадър и при това връща
    // скрола, който помни — заради него продуктовата страница се отваряше по
    // средата, а секциите не се достигаха. Затова не скролваме веднъж, а
    // настояваме и през следващите два кадъра, тоест и след неговия refresh.
    apply()
    frames.push(
      window.requestAnimationFrame(() => {
        apply()
        frames.push(window.requestAnimationFrame(apply))
      })
    )

    // Секцията може още да не е в DOM-а, ако маршрутът се зарежда мързеливо.
    if (target) {
      let attempts = 0
      const retry = () => {
        if (cancelled) return
        if (scrollToSection(target, 'auto')) return
        attempts += 1
        if (attempts < 10) timers.push(setTimeout(retry, 60))
        else window.scrollTo({ top: 0, behavior: 'auto' })
      }
      timers.push(setTimeout(retry, 60))
    }

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
      frames.forEach(window.cancelAnimationFrame)
    }
  }, [pathname, hash, state])

  return null
}

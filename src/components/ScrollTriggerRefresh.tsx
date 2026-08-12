import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Секциите се разкриват с `gsap.from({ opacity: 0 })`, което веднага скрива
 * елемента и разчита ScrollTrigger да го върне. ScrollTrigger обаче мери
 * позициите веднъж и не ги преизчислява сам — а на този сайт три неща ги
 * обезсилват:
 *
 *   1. мързеливо заредените снимки в галериите променят височините;
 *   2. шрифтът се сменя след първата рисунка и текстът мени височина;
 *   3. смяната на маршрут в SPA-то подменя цялото съдържание.
 *
 * При остарели позиции задействането може изобщо да не се случи и секцията
 * остава полупрозрачна или невидима завинаги. Затова освежаваме при всяко от
 * трите събития.
 */
export default function ScrollTriggerRefresh() {
  const { pathname } = useLocation()

  // Смяна на маршрут: изчакваме браузъра да нарисува новото съдържание.
  useEffect(() => {
    const id = window.requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => window.cancelAnimationFrame(id)
  }, [pathname])

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()

    // Шрифтовете местят текста, след като страницата вече е нарисувана.
    document.fonts?.ready.then(refresh).catch(() => {})

    // Снимките и останалите ресурси.
    if (document.readyState === 'complete') refresh()
    else window.addEventListener('load', refresh)

    // Всяка снимка, която се доуреди по-късно, също мени височината.
    const images = Array.from(document.images).filter((img) => !img.complete)
    images.forEach((img) => {
      img.addEventListener('load', refresh)
      img.addEventListener('error', refresh)
    })

    return () => {
      window.removeEventListener('load', refresh)
      images.forEach((img) => {
        img.removeEventListener('load', refresh)
        img.removeEventListener('error', refresh)
      })
    }
  }, [pathname])

  return null
}

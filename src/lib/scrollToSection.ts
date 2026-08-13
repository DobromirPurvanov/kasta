/**
 * Скролва до секция по id и връща дали секцията изобщо е на страницата.
 *
 * Нарочно не ползва `element.scrollIntoView`: с `behavior: 'smooth'` той просто
 * не помръдва на този сайт (`body` носи `overflow`, а `html` — собствен
 * `scroll-behavior`), докато `window.scrollTo` работи. Затова смятаме позицията
 * сами и вадим `scroll-margin-top`, което държи секцията изпод фиксираната лента.
 *
 * Скролът е моментален, а не плавен, и това е нарочно: ScrollTrigger освежава
 * позициите си при всяка доуредена снимка и при това връща скрола там, където
 * го помни — което убива всяко плавно скролване по средата. Моменталното
 * приключва в същия кадър и няма какво да го прекъсне.
 */
export function scrollToSection(id: string, behavior: ScrollBehavior = 'auto') {
  const el = document.getElementById(id)
  if (!el) return false

  const margin = parseFloat(window.getComputedStyle(el).scrollMarginTop) || 0
  const top = Math.max(0, window.scrollY + el.getBoundingClientRect().top - margin)
  window.scrollTo({ top, behavior })
  return true
}

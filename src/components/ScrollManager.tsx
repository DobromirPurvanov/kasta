import { useEffect } from 'react'
import { useLocation } from 'react-router'

// React Router's pushState navigation neither scrolls to #hash targets
// nor resets the scroll position — this component does both globally.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        // Instant: a CSS smooth scroll gets cancelled by ScrollTrigger.refresh()
        // (fired on image load) and strands the user between sections.
        el.scrollIntoView({ behavior: 'instant', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

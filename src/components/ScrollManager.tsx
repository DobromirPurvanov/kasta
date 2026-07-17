import { useEffect } from 'react'
import { useLocation } from 'react-router'

// React Router's pushState navigation neither scrolls to #hash targets
// nor resets the scroll position — this component does both globally.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      let attempts = 0
      let timer: ReturnType<typeof setTimeout> | undefined
      const findTarget = () => {
        const el = document.getElementById(hash.slice(1))
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' })
          return
        }
        attempts += 1
        if (attempts < 10) timer = setTimeout(findTarget, 60)
        else window.scrollTo({ top: 0, behavior: 'auto' })
      }
      findTarget()
      return () => clearTimeout(timer)
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

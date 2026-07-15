import { useEffect } from 'react'

const SITE_URL = 'https://kastaventures.com'
const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

function upsertMeta(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.name = name
    document.head.appendChild(el)
  }
  el.content = content
}

interface PageMeta {
  title: string
  description?: string
  /** Route path used for the canonical URL, e.g. "/models" */
  path?: string
  noindex?: boolean
}

// SPA: index.html ships one static title/description/canonical for every
// route — this hook keeps them in sync with the page actually shown.
export function usePageMeta({ title, description, path, noindex }: PageMeta) {
  useEffect(() => {
    document.title = title

    if (description) upsertMeta('description', description)
    upsertMeta('robots', noindex ? 'noindex, nofollow' : DEFAULT_ROBOTS)

    if (path !== undefined) {
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = path === '/' ? SITE_URL : SITE_URL + path
    }
  }, [title, description, path, noindex])
}

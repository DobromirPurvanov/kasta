import { useEffect } from 'react'

const SITE_URL = 'https://kastaventures.com'
const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
const DEFAULT_DESCRIPTION = 'E RIDE PRO electric dirt bikes in Bulgaria — official distribution, local service, parts and a 2-year warranty from Kasta Ventures.'

function upsertMeta(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.name = name
    document.head.appendChild(el)
  }
  el.content = content
}

function upsertProperty(property: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
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
    const pageDescription = description || DEFAULT_DESCRIPTION
    const canonicalPath = path ?? window.location.pathname
    const canonicalUrl = canonicalPath === '/' ? SITE_URL : SITE_URL + canonicalPath

    document.title = title
    upsertMeta('title', title)
    upsertMeta('description', pageDescription)
    upsertMeta('robots', noindex ? 'noindex, nofollow' : DEFAULT_ROBOTS)

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = canonicalUrl

    // Keep social previews aligned with client-side routes as users navigate.
    upsertProperty('og:title', title)
    upsertProperty('og:description', pageDescription)
    upsertProperty('og:url', canonicalUrl)
    upsertMeta('twitter:title', title)
    upsertMeta('twitter:description', pageDescription)
    upsertMeta('twitter:url', canonicalUrl)
  }, [title, description, path, noindex])
}

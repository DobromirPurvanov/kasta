import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router'
import { scrollToSection } from '../lib/scrollToSection'

/**
 * „За нас“ и „Контакт“ са секции на началната страница, не отделни страници.
 * Досега водеха към `/#about` и `/#contact`, тоест адресът се пълнеше с „#“
 * адреси, които изглеждат като страници, а не са.
 *
 * Затова връзката работи по два начина, но никога не пипа адреса:
 *   • на началната страница просто скролва до секцията;
 *   • от друга страница отива на „/“ и казва накъде да скролне през state.
 */

interface SectionLinkProps {
  section: string
  className?: string
  /** Мобилното меню се затваря, преди да скролнем. */
  onNavigate?: () => void
  children: ReactNode
}

export default function SectionLink({ section, className, onNavigate, children }: SectionLinkProps) {
  const { pathname } = useLocation()

  if (pathname === '/') {
    return (
      <button
        type="button"
        className={className}
        onClick={() => {
          onNavigate?.()
          scrollToSection(section)
        }}
      >
        {children}
      </button>
    )
  }

  return (
    <Link to="/" state={{ scrollTo: section }} className={className} onClick={() => onNavigate?.()}>
      {children}
    </Link>
  )
}

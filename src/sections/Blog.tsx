import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../hooks/useLang'
import posts from '../data/blog-posts.json'

gsap.registerPlugin(ScrollTrigger)

export default function Blog() {
  const { lang, t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const isBg = lang === 'bg'
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blog-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [prefersReducedMotion])

  if (posts.length === 0) return null

  const [featured, ...others] = posts
  const rest = others.slice(0, 3)
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(isBg ? 'bg-BG' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--bg)] py-16 sm:py-20 lg:py-28 border-t border-fg/[0.06]"
    >
      <div className="section-shell">
        <div className="mb-9 sm:mb-12 lg:mb-14">
          <span className="section-eyebrow mb-4">
            {t('blog_title')}
          </span>
          <h2 className="text-display text-fg text-[32px] sm:text-[40px] md:text-[clamp(42px,5vw,64px)]">
            {t('blog_subtitle')}
          </h2>
        </div>

        {/* Първата статия е витрината — тя е и най-новата. Останалите вървят
            по-дребно отдолу, за да не изглежда секцията празна с една статия. */}
        <a
          href={`/blog/${featured.slug}/`}
          className="blog-item surface-card card-hover group relative block overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-9 lg:p-11"
          style={{ opacity: prefersReducedMotion ? 1 : 0 }}
        >
          <div
            className="absolute -right-24 -top-24 w-[26rem] h-[26rem] rounded-full opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
            style={{ background: 'radial-gradient(circle, rgb(var(--accent-rgb) / 0.16), transparent 68%)' }}
            aria-hidden="true"
          />
          <div className="relative flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-12">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="inline-flex items-center min-h-8 px-3 rounded-full bg-[rgb(var(--accent-rgb)/0.1)] border border-[rgb(var(--accent-rgb)/0.15)] text-[var(--accent-text)] text-[10px] font-bold tracking-wider uppercase">
                  {isBg ? 'Нова статия' : 'New article'}
                </span>
                <time dateTime={featured.date} className="text-[11px] font-semibold tracking-[0.12em] text-[var(--text-muted)] uppercase">
                  {formatDate(featured.date)}
                </time>
              </div>
              <h3 className="text-[22px] sm:text-[28px] lg:text-[34px] leading-[1.15] font-semibold tracking-[-0.03em] text-fg max-w-[22ch]">
                {featured.title}
              </h3>
              <p className="mt-4 max-w-[62ch] text-[14px] sm:text-[15px] leading-relaxed text-[var(--text-secondary)]">
                {featured.excerpt}
              </p>
            </div>
            <span className="shrink-0 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--accent-text)]">
              {isBg ? 'Прочети' : 'Read'}
              <span className="w-10 h-10 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </span>
          </div>
        </a>

        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
            {rest.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="blog-item surface-card card-hover min-h-[190px] p-5 sm:p-6 rounded-2xl flex flex-col"
                style={{ opacity: prefersReducedMotion ? 1 : 0 }}
              >
                <time dateTime={post.date} className="text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--text-muted)]">
                  {formatDate(post.date)}
                </time>
                <h3 className="mt-3 text-[17px] leading-snug font-semibold text-fg">{post.title}</h3>
                <span className="mt-auto pt-5 text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--accent-text)]">
                  {isBg ? 'Прочети' : 'Read'} →
                </span>
              </a>
            ))}
          </div>
        )}

        <div className="mt-8">
          <a href="/blog/" className="btn-outline sm:w-auto">
            {isBg ? 'Всички статии' : 'All articles'}
          </a>
        </div>
      </div>
    </section>
  )
}

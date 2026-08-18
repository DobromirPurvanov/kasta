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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {posts.map((post, index) => (
            /* Статиите са статичен HTML в /public/blog, затова е <a>, а не Link:
               React Router щеше да ги хване от страна на браузъра и да върне
               SPA-то вместо готовата страница. */
            <a
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="blog-item surface-card card-hover min-h-[220px] p-5 sm:p-7 rounded-2xl sm:rounded-3xl flex flex-col"
              style={{ opacity: prefersReducedMotion ? 1 : 0 }}
            >
              <div className="flex items-center justify-between gap-4 mb-8">
                <span className="inline-flex items-center min-h-8 px-3 rounded-full bg-[rgb(var(--accent-rgb)/0.1)] border border-[rgb(var(--accent-rgb)/0.15)] text-[var(--accent-text)] text-[10px] font-bold tracking-wider uppercase">
                  {new Date(post.date).toLocaleDateString(isBg ? 'bg-BG' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <span className="text-[11px] font-semibold tracking-[0.12em] text-fg/45" aria-hidden="true">
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-[19px] sm:text-[21px] leading-snug font-semibold text-fg mb-3">
                {post.title}
              </h3>
              <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <span className="mt-auto text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--accent-text)]">
                {isBg ? 'Прочети' : 'Read'} →
              </span>
            </a>
          ))}
        </div>

        {posts.length > 1 && (
          <div className="mt-8">
            <a href="/blog/" className="btn-outline">
              {isBg ? 'Всички статии' : 'All articles'}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

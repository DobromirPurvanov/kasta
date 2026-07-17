import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../hooks/useLang'

gsap.registerPlugin(ScrollTrigger)

interface BlogPost {
  title: string
  excerpt: string
  tag: string
}

const postsByLang: Record<string, BlogPost[]> = {
  bg: [
    {
      title: 'Електрически мото крос цена България',
      excerpt:
        'Колко струва електрически мото крос в България? Разгледайте цените на E RIDE PRO моделите — от €3,960 за Mini R до €7,499 за SR.',
      tag: 'Цени',
    },
    {
      title: 'E RIDE PRO ревю — реален тест',
      excerpt:
        'Пълно ревю на E RIDE PRO електрическите мото крос модели. Производителност, обхват, зареждане и реални впечатления от тестово каране.',
      tag: 'Ревю',
    },
    {
      title: 'Предимства на електрическите мото крос',
      excerpt:
        'Нулеви емисии, мигновен въртящ момент, безшумна работа и минимална поддръжка — защо електрическият мото крос е бъдещето.',
      tag: 'Съвети',
    },
    {
      title: 'Как да избереш електрически мото крос',
      excerpt:
        'Ръководство за избор на правилния електрически мото крос — разлики между моделите, лицензи и за кого е подходящ всеки модел.',
      tag: 'Ръководство',
    },
  ],
  en: [
    {
      title: 'Electric Dirt Bike Price Bulgaria',
      excerpt:
        'How much does an electric dirt bike cost in Bulgaria? Check out E RIDE PRO model prices — from €3,960 for Mini R to €7,499 for SR.',
      tag: 'Prices',
    },
    {
      title: 'E RIDE PRO Review — Real Test',
      excerpt:
        'Full review of E RIDE PRO electric dirt bike models. Performance, range, charging and real riding impressions from our test ride.',
      tag: 'Review',
    },
    {
      title: 'Advantages of Electric Dirt Bikes',
      excerpt:
        'Zero emissions, instant torque, silent operation and minimal maintenance — why electric dirt bikes are the future of off-road riding.',
      tag: 'Tips',
    },
    {
      title: 'How to Choose an Electric Dirt Bike',
      excerpt:
        'Guide to choosing the right electric dirt bike — differences between models, licenses and who each model is suitable for.',
      tag: 'Guide',
    },
  ],
}

export default function Blog() {
  const { lang, t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const isBg = lang === 'bg'
  const posts = postsByLang[isBg ? 'bg' : 'en']
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
            <article
              key={index}
              className="blog-item surface-card min-h-[220px] p-5 sm:p-7 rounded-2xl sm:rounded-3xl flex flex-col"
              style={{ opacity: prefersReducedMotion ? 1 : 0 }}
            >
              <div className="flex items-center justify-between gap-4 mb-8">
                <span className="inline-flex items-center min-h-8 px-3 rounded-full bg-[rgb(var(--accent-rgb)/0.1)] border border-[rgb(var(--accent-rgb)/0.15)] text-[var(--accent-text)] text-[10px] font-bold tracking-wider uppercase">
                  {post.tag}
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
              <span className="mt-auto text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--text-muted)]">
                {t('coming_soon')}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

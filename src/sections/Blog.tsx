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
      className="bg-[#0f0f0f] py-20 md:py-28 border-t border-white/[0.04]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <span className="text-[var(--accent)] text-[12px] font-bold tracking-[0.15em] uppercase mb-3 block">
            {t('blog_title')}
          </span>
          <h2
            className="text-display text-white"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
          >
            {t('blog_subtitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {posts.map((post, index) => (
            <article
              key={index}
              className="blog-item group p-6 bg-[#1a1a1a] border border-white/[0.06] rounded-2xl hover:border-white/15 transition-all focus-within:border-white/15 focus-within:ring-2 focus-within:ring-[var(--accent)]"
              style={{ opacity: prefersReducedMotion ? 1 : 0 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-bold tracking-wider uppercase mb-4">
                {post.tag}
              </span>
              <h3 className="text-[17px] font-semibold text-white mb-2">
                {post.title}
              </h3>
              <p className="text-[13px] text-white/60 leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-white/50 group-hover:text-[var(--accent)] transition-colors">
                <span>{t('read_more')}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <span className="sr-only">{isBg ? ' — скоро' : ' — coming soon'}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

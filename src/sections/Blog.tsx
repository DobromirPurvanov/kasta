import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../hooks/useLang'

gsap.registerPlugin(ScrollTrigger)

export default function Blog() {
  const { lang } = useLang()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-item', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const isBg = lang === 'bg'

  const articles = isBg ? [
    {
      title: 'Електрически мото крос цена България',
      excerpt: 'Колко струва електрически мото крос в България? Разгледайте цените на E RIDE PRO моделите — от €3,960 за Mini R до €7,499 за SR.',
      tag: 'Цени',
    },
    {
      title: 'E RIDE PRO ревю — реален тест',
      excerpt: 'Пълно ревю на E RIDE PRO електрическите мото крос модели. Производителност, обхват, зареждане и реални впечатления от тестово каране.',
      tag: 'Ревю',
    },
    {
      title: 'Предимства на електрическите мото крос',
      excerpt: 'Нулеви емисии, мигновен въртящ момент, безшумна работа и минимална поддръжка — защо електрическият мото крос е бъдещето.',
      tag: 'Съвети',
    },
    {
      title: 'Как да избереш електрически мото крос',
      excerpt: 'Ръководство за избор на правилния електрически мото крос — разлики между моделите, лицензи и за кого е подходящ всеки модел.',
      tag: 'Ръководство',
    },
  ] : [
    {
      title: 'Electric Dirt Bike Price Bulgaria',
      excerpt: 'How much does an electric dirt bike cost in Bulgaria? Check out E RIDE PRO model prices — from €3,960 for Mini R to €7,499 for SR.',
      tag: 'Prices',
    },
    {
      title: 'E RIDE PRO Review — Real Test',
      excerpt: 'Full review of E RIDE PRO electric dirt bike models. Performance, range, charging and real riding impressions from our test ride.',
      tag: 'Review',
    },
    {
      title: 'Advantages of Electric Dirt Bikes',
      excerpt: 'Zero emissions, instant torque, silent operation and minimal maintenance — why electric dirt bikes are the future of off-road riding.',
      tag: 'Tips',
    },
    {
      title: 'How to Choose an Electric Dirt Bike',
      excerpt: 'Guide to choosing the right electric dirt bike — differences between models, licenses and who each model is suitable for.',
      tag: 'Guide',
    },
  ]

  return (
    <section ref={sectionRef} className="bg-[#0f0f0f] py-20 md:py-28 border-t border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <span className="text-[var(--accent)] text-[12px] font-bold tracking-[0.15em] uppercase mb-3 block">
            {isBg ? 'БЛОГ' : 'BLOG'}
          </span>
          <h2 className="text-display text-white" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            {isBg ? 'ПОЛЕЗНА ИНФОРМАЦИЯ' : 'USEFUL INFORMATION'}
          </h2>
          <p className="text-white/30 mt-3 max-w-lg mx-auto text-[15px]">
            {isBg ? 'Статии за електрическите мото крос и E RIDE PRO.' : 'Articles about electric dirt bikes and E RIDE PRO.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {articles.map((a, i) => (
            <div key={i} className="blog-item group cursor-pointer bg-[#1a1a1a] border border-white/[0.06] rounded-2xl p-6 hover:border-[var(--accent)]/30 transition-all" style={{ opacity: 0 }}>
              <span className="text-[10px] font-bold tracking-[0.15em] text-[var(--accent)] uppercase">{a.tag}</span>
              <h3 className="text-[16px] font-semibold text-white mt-3 mb-3 leading-snug group-hover:text-[var(--accent)] transition-colors">
                {a.title}
              </h3>
              <p className="text-[13px] text-white/35 leading-relaxed">{a.excerpt}</p>
              <div className="mt-4 flex items-center gap-1 text-[12px] text-[var(--accent)] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>{isBg ? 'Прочети' : 'Read'}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

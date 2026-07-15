import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type Lang = 'bg' | 'en'

const bg = {
  nav_about: 'ЗА НАС',
  nav_contact: 'КОНТАКТ',
  nav_models: 'МОДЕЛИ',
  models_title: 'МОДЕЛИ',
  quick_view: 'Бърз преглед',
  contact_title: 'КОНТАКТ',
  location_title: 'Адрес',
  location_address: 'ул. Даскал Стоян Попандреев 28, София',
  contact_email_label: 'Имейл',
  contact_phone_label: 'Телефон',
  footer_official: 'E RIDE PRO - Официален представител за България',
  footer_rights: '© 2026 Kasta Ventures. Всички права запазени.',
  blog_title: 'БЛОГ',
  blog_subtitle: 'Полезни статии и ревюта',
  read_more: 'Прочети повече',
  coming_soon: 'Очаквайте скоро',
  make_inquiry: 'Запитване',
} as const

type TKey = keyof typeof bg

const en: Record<TKey, string> = {
  nav_about: 'ABOUT',
  nav_contact: 'CONTACT',
  nav_models: 'MODELS',
  models_title: 'MODELS',
  quick_view: 'Quick View',
  contact_title: 'CONTACT',
  location_title: 'Location',
  location_address: '28 Daskal Stoyan Popandreev Str., Sofia',
  contact_email_label: 'Email',
  contact_phone_label: 'Phone',
  footer_official: 'E RIDE PRO - Official Representative for Bulgaria',
  footer_rights: '© 2026 Kasta Ventures. All rights reserved.',
  blog_title: 'BLOG',
  blog_subtitle: 'Useful articles and reviews',
  read_more: 'Read more',
  coming_soon: 'Coming soon',
  make_inquiry: 'Make Inquiry',
}

const translations: Record<Lang, Record<TKey, string>> = { bg, en }

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: TKey) => string
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      // URL wins over the stored preference so shared ?lang= links always work
      const urlLang = new URLSearchParams(window.location.search).get('lang')
      if (urlLang === 'en' || urlLang === 'bg') return urlLang
      const saved = localStorage.getItem('kasta_lang')
      if (saved === 'en' || saved === 'bg') return saved
    }
    return 'bg'
  })

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang: (newLang: Lang) => {
        setLang(newLang)
        localStorage.setItem('kasta_lang', newLang)
      },
      t: (key: TKey) => translations[lang][key],
    }),
    [lang]
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}

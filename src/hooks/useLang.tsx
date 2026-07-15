import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

type Lang = 'bg' | 'en'

interface Translations {
  [key: string]: string
}

const translations: Record<Lang, Translations> = {
  bg: {
    nav_about: 'ЗА НАС',
    nav_contact: 'КОНТАКТ',
    nav_models: 'МОДЕЛИ',
    hero_subtitle: 'Официален представител за България',
    models_title: 'МОДЕЛИ',
    quick_view: 'Бърз преглед',
    about_title: 'ЗА НАС',
    blog_title: 'БЛОГ',
    blog_subtitle: 'Полезни статии и ревюта',
    read_more: 'Прочети повече',
    related_models: 'Подобни модели',
    make_inquiry: 'Запитване',
    specs: 'Спецификации',
    faq: 'Често задавани въпроси',
    not_found_title: 'Продуктът не е намерен',
    back_home: 'Начало',
    contact_title: 'КОНТАКТ',
    location_title: 'Адрес',
    location_address: 'ул. Даскал Стоян Попандреев 28',
    contact_email_label: 'Имейл',
    contact_phone_label: 'Телефон',
    footer_official: 'E RIDE PRO - Официален представител за България',
    footer_rights: '© 2026 Kasta Ventures. Всички права запазени.',
    price_from: 'от',
    explore: 'Разгледай',
    buy_now: 'Купи сега',
    official_importer: 'Официален вносител на E RIDE PRO електрически мото крос в България',
  },
  en: {
    nav_about: 'ABOUT',
    nav_contact: 'CONTACT',
    nav_models: 'MODELS',
    hero_subtitle: 'Official Representative for Bulgaria',
    models_title: 'MODELS',
    quick_view: 'Quick View',
    about_title: 'ABOUT',
    blog_title: 'BLOG',
    blog_subtitle: 'Useful articles and reviews',
    read_more: 'Read more',
    related_models: 'Related Models',
    make_inquiry: 'Make Inquiry',
    specs: 'Specifications',
    faq: 'FAQ',
    not_found_title: 'Product Not Found',
    back_home: 'Back Home',
    contact_title: 'CONTACT',
    location_title: 'Location',
    location_address: '28 Daskal Stoyan Popandreev Str., Sofia',
    contact_email_label: 'Email',
    contact_phone_label: 'Phone',
    footer_official: 'E RIDE PRO - Official Representative for Bulgaria',
    footer_rights: '© 2026 Kasta Ventures. All rights reserved.',
    price_from: 'from',
    explore: 'Explore',
    buy_now: 'Buy Now',
    official_importer: 'Official importer of E RIDE PRO electric dirt bikes in Bulgaria',
  },
}

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string) => string
}

const LangContext = createContext<LangContextValue | null>(null)

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'bg'
  const saved = localStorage.getItem('kasta_lang')
  if (saved === 'en' || saved === 'bg') return saved
  const urlParams = new URLSearchParams(window.location.search)
  const urlLang = urlParams.get('lang')
  if (urlLang === 'en') return 'en'
  return 'bg'
}

function updateUrlLang(lang: Lang) {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  if (lang === 'en') {
    url.searchParams.set('lang', 'en')
  } else {
    url.searchParams.delete('lang')
  }
  window.history.replaceState(null, '', url.toString())
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  useEffect(() => {
    updateUrlLang(lang)
  }, [lang])

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('kasta_lang', newLang)
      updateUrlLang(newLang)
    }
  }, [])

  const t = useCallback((key: string) => translations[lang][key] || key, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}

import { createContext, useContext, useState, type ReactNode } from 'react'

type Lang = 'bg' | 'en'

interface Translations {
  [key: string]: string
}

const translations: Record<Lang, Translations> = {
  bg: {
    nav_about: 'ЗА НАС',
    nav_contact: 'КОНТАКТ',
    nav_models: 'МОДЕЛИ',
    nav_login: 'Вход',
    hero_subtitle: 'Официален представител за България',
    models_title: 'МОДЕЛИ',
    filter_all: 'Всички',
    filter_mini: 'Mini',
    filter_road: 'Road Legal',
    filter_ss25: 'SS 2.5',
    filter_ss30: 'SS 3.0',
    filter_sr: 'SR',
    filter_l1e: 'L1e',
    filter_offroad: 'Off Road Fatty',
    quick_view: 'Бърз преглед',
    about_title: 'ЗА НАС',
    about_h2: 'E RIDE PRO - Официален представител за България',
    about_p1:
      'Kasta Ventures е официалният вносител на E RIDE PRO електрически мото крос за България. Ние предлагаме пълната гама от електрически мото крос модели - от компактния Mini R до мощния SS 3.0.',
    about_p2:
      'Всеки модел представлява върхът на инженерното майсторство в електрическата мобилност. Основана със страст към устойчивия транспорт и офроуд приключенията, Kasta Ventures предоставя пълна подкрепа за продажби, сервиз и гаранция за целия асортимент E RIDE PRO в България.',
    contact_title: 'КОНТАКТ',
    contact_label: 'Контакт',
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
    blog_title: 'БЛОГ',
    blog_subtitle: 'Полезни статии и ревюта',
    read_more: 'Прочети повече',
    related_models: 'Подобни модели',
    make_inquiry: 'Запитване',
    specs: 'Спецификации',
    faq: 'Често задавани въпроси',
    not_found_title: 'Продуктът не е намерен',
    back_home: 'Начало',
  },
  en: {
    nav_about: 'ABOUT',
    nav_contact: 'CONTACT',
    nav_models: 'MODELS',
    nav_login: 'Login',
    hero_subtitle: 'Official Representative for Bulgaria',
    models_title: 'MODELS',
    filter_all: 'All',
    filter_mini: 'Mini',
    filter_road: 'Road Legal',
    filter_ss25: 'SS 2.5',
    filter_ss30: 'SS 3.0',
    filter_sr: 'SR',
    filter_l1e: 'L1e',
    filter_offroad: 'Off Road Fatty',
    quick_view: 'Quick View',
    about_title: 'ABOUT',
    about_h2: 'E RIDE PRO - Official Representative for Bulgaria',
    about_p1:
      'Kasta Ventures is the official importer of E RIDE PRO electric dirt bikes for Bulgaria. We offer the full range of electric dirt bikes - from the compact Mini R to the powerful SS 3.0.',
    about_p2:
      'Every model represents the pinnacle of engineering in electric mobility. Founded with a passion for sustainable transportation and off-road adventures, Kasta Ventures provides full sales, service and warranty support for the entire E RIDE PRO range in Bulgaria.',
    contact_title: 'CONTACT',
    contact_label: 'Contact',
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
    blog_title: 'BLOG',
    blog_subtitle: 'Useful articles and reviews',
    read_more: 'Read more',
    related_models: 'Related Models',
    make_inquiry: 'Make Inquiry',
    specs: 'Specifications',
    faq: 'FAQ',
    not_found_title: 'Product Not Found',
    back_home: 'Back Home',
  },
}

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: string) => string
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kasta_lang')
      if (saved === 'en' || saved === 'bg') return saved
      const urlParams = new URLSearchParams(window.location.search)
      const urlLang = urlParams.get('lang')
      if (urlLang === 'en') return 'en'
    }
    return 'bg'
  })

  const handleSetLang = (newLang: Lang) => {
    setLang(newLang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('kasta_lang', newLang)
    }
  }

  const t = (key: string) => translations[lang][key] || key

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang, t }}>
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

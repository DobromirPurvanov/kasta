import { Link } from 'react-router'
import { useLang } from '../hooks/useLang'
import { usePageMeta } from '../hooks/usePageMeta'

export default function CookiePolicy() {
  const { lang } = useLang()
  const isBg = lang === 'bg'

  usePageMeta({
    title: isBg ? 'Политика за бисквитки | Kasta Ventures' : 'Cookie Policy | Kasta Ventures',
    path: '/cookie-policy',
  })

  const t = {
    bg: {
      title: 'Политика за бисквитки',
      lastUpdated: 'Последна актуализация: 5 юли 2026 г.',
      intro: 'Тази Политика за бисквитки обяснява какво са бисквитките, как ги използваме на нашия уебсайт и как можете да управлявате предпочитанията си.',
      sections: [
        {
          title: 'Какво са бисквитки?',
          content: 'Бисквитките са малки текстови файлове, които се съхраняват на вашето устройство (компютър, таблет или мобилен телефон), когато посещавате уебсайт. Те се използват широко за правилното функциониране на уебсайтовете, както и за събиране на информация за поведението на посетителите.\n\nБисквитките могат да бъдат:\n• Сесийни бисквитки – временни бисквитки, които се изтриват, когато затворите браузъра\n• Постоянни бисквитки – остават на вашето устройство за определен период от време\n• Първа страница – зададени от уебсайта, който посещавате\n• Трети страница – зададени от домейн, различен от този, който посещавате',
        },
        {
          title: 'Какви бисквитки използваме?',
          content: '',
          table: [
            { category: 'Необходими', purpose: 'Тези бисквитки са от съществено значение за правилното функциониране на уебсайта. Те ви позволяват да навигирате в сайта и да използвате неговите функции.', examples: 'Сесийни бисквитки, CSRF защита, предпочитания за език', duration: 'Сесия до 1 година' },
            { category: 'Аналитични', purpose: 'Тези бисквитки биха ни помогнали да разберем как посетителите взаимодействат с уебсайта. Понастоящем не използваме аналитични инструменти — ако това се промени, те ще се активират само след вашето изрично съгласие.', examples: 'Google Analytics, Plausible (не се използват в момента)', duration: 'До 26 месеца' },
            { category: 'Предпочитания', purpose: 'Тези бисквитки позволяват на уебсайта да запомни изборите, които правите (като език или регион), и да предостави подобрени, по-персонализирани функции.', examples: 'Езикови настройки, тема, потребителски предпочитания', duration: 'До 1 година' },
            { category: 'Маркетингови', purpose: 'Тези бисквитки биха се използвали за показване на релевантни реклами. Понастоящем не използваме маркетингови инструменти за проследяване — ако това се промени, те ще се активират само след вашето изрично съгласие.', examples: 'Facebook Pixel, Google Ads (не се използват в момента)', duration: 'До 2 години' },
          ],
        },
        {
          title: 'Как да управлявате бисквитките?',
          content: 'Можете да управлявате бисквитките по няколко начина:\n\n1. Чрез нашия банер за съгласие – при първото посещение на уебсайта ще видите банер, който ви позволява да изберете кои категории бисквитки да приемете.\n\n2. Чрез настройките на браузъра – повечето уеб браузъри ви позволяват да контролирате бисквитките чрез настройките си:\n   • Chrome: Настройки > Поверителност и сигурност > Бисквитки\n   • Firefox: Настройки > Поверителност и сигурност > Бисквитки\n   • Safari: Настройки > Поверителност > Бисквитки\n   • Edge: Настройки > Бисквитки и разрешения за сайтове\n\n3. Чрез инструменти на трети страни – можете да използвате инструменти като Your Online Choices или Network Advertising Initiative за управление на рекламните бисквитки.',
        },
        {
          title: 'Последици от изключване на бисквитки',
          content: 'Ако изключите определени бисквитки, някои функции на уебсайта може да не работят правилно:\n\n• Необходими: Уебсайтът може да не функционира коректно\n• Аналитични: Няма да можем да подобрим сайта въз основа на използването\n• Предпочитания: Ще трябва да избирате език и други настройки при всяко посещение\n• Маркетингови: Ще виждате по-малко релевантни реклами',
        },
        {
          title: 'Актуализации на тази политика',
          content: 'Можем да актуализираме тази Политика за бисквитки периодично, за да отразим промени в технологиите, законодателството или нашите практики. Препоръчваме ви периодично да преглеждате тази страница.\n\nПри значителни промени ще ви уведомим чрез банер на уебсайта или по имейл.',
        },
        {
          title: 'Контакт',
          content: 'Ако имате въпроси относно нашата Политика за бисквитки, моля свържете се с нас:\n\n• Имейл: office@kastaventures.com\n• Телефон: +359 887 77 37 33\n• Адрес: ул. Даскал Стоян Попандреев 28, София, България',
        },
      ],
    },
    en: {
      title: 'Cookie Policy',
      lastUpdated: 'Last updated: July 5, 2026',
      intro: 'This Cookie Policy explains what cookies are, how we use them on our website, and how you can manage your preferences.',
      sections: [
        {
          title: 'What Are Cookies?',
          content: 'Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used for the proper functioning of websites, as well as for collecting information about visitor behavior.\n\nCookies can be:\n• Session cookies – temporary cookies that are deleted when you close your browser\n• Persistent cookies – remain on your device for a specified period of time\n• First-party – set by the website you are visiting\n• Third-party – set by a domain different from the one you are visiting',
        },
        {
          title: 'What Cookies Do We Use?',
          content: '',
          table: [
            { category: 'Necessary', purpose: 'These cookies are essential for the proper functioning of the website. They enable you to navigate the site and use its features.', examples: 'Session cookies, CSRF protection, language preferences', duration: 'Session to 1 year' },
            { category: 'Analytics', purpose: 'These cookies would help us understand how visitors interact with the website. We currently do not use any analytics tools — if this changes, they will only be activated after your explicit consent.', examples: 'Google Analytics, Plausible (not currently in use)', duration: 'Up to 26 months' },
            { category: 'Preferences', purpose: 'These cookies allow the website to remember choices you make (such as language or region) and provide enhanced, more personalized features.', examples: 'Language settings, theme, user preferences', duration: 'Up to 1 year' },
            { category: 'Marketing', purpose: 'These cookies would be used to display relevant ads. We currently do not use any marketing tracking tools — if this changes, they will only be activated after your explicit consent.', examples: 'Facebook Pixel, Google Ads (not currently in use)', duration: 'Up to 2 years' },
          ],
        },
        {
          title: 'How to Manage Cookies',
          content: 'You can manage cookies in several ways:\n\n1. Through our consent banner – when you first visit the website, you will see a banner that allows you to choose which cookie categories to accept.\n\n2. Through browser settings – most web browsers allow you to control cookies through their settings:\n   • Chrome: Settings > Privacy and security > Cookies\n   • Firefox: Settings > Privacy & Security > Cookies\n   • Safari: Settings > Privacy > Cookies\n   • Edge: Settings > Cookies and site permissions\n\n3. Through third-party tools – you can use tools like Your Online Choices or Network Advertising Initiative to manage advertising cookies.',
        },
        {
          title: 'Consequences of Disabling Cookies',
          content: 'If you disable certain cookies, some website features may not work properly:\n\n• Necessary: The website may not function correctly\n• Analytics: We will not be able to improve the site based on usage\n• Preferences: You will need to select language and other settings on each visit\n• Marketing: You will see less relevant advertisements',
        },
        {
          title: 'Updates to This Policy',
          content: 'We may update this Cookie Policy periodically to reflect changes in technology, legislation, or our practices. We recommend that you review this page periodically.\n\nFor significant changes, we will notify you via a banner on the website or by email.',
        },
        {
          title: 'Contact',
          content: 'If you have questions about our Cookie Policy, please contact us:\n\n• Email: office@kastaventures.com\n• Phone: +359 887 77 37 33\n• Address: 28 Daskal Stoyan Popandreev Str., Sofia, Bulgaria',
        },
      ],
    },
  }

  const content = t[isBg ? 'bg' : 'en']

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-[72px]">
      {/* Breadcrumb */}
      <div className="border-b border-fg/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-3">
          <nav className="flex items-center gap-2 text-[12px]" aria-label="Breadcrumb">
            <Link to="/" className="text-fg/50 hover:text-fg transition-colors">{isBg ? 'Начало' : 'Home'}</Link>
            <span className="text-fg/20">/</span>
            <span className="text-fg/80 font-medium" aria-current="page">{isBg ? 'Бисквитки' : 'Cookies'}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 md:px-10 py-16">
        <h1 className="text-display text-fg mb-2" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
          {content.title}
        </h1>
        <p className="text-[13px] text-fg/50 mb-10">{content.lastUpdated}</p>

        <p className="text-[15px] text-fg/70 leading-relaxed mb-12">{content.intro}</p>

        <div className="space-y-10">
          {content.sections.map((section, i) => (
            <div key={i} className="border-t border-fg/[0.06] pt-8">
              <h2 className="text-[18px] font-semibold text-fg mb-4">{section.title}</h2>
              {section.table ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="border-b border-fg/[0.08]">
                        <th className="text-left py-3 pr-4 text-fg/70 font-medium">{isBg ? 'Категория' : 'Category'}</th>
                        <th className="text-left py-3 pr-4 text-fg/70 font-medium">{isBg ? 'Цел' : 'Purpose'}</th>
                        <th className="text-left py-3 pr-4 text-fg/70 font-medium">{isBg ? 'Примери' : 'Examples'}</th>
                        <th className="text-left py-3 text-fg/70 font-medium">{isBg ? 'Валидност' : 'Duration'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.map((row, j) => (
                        <tr key={j} className="border-b border-fg/[0.04]">
                          <td className="py-4 pr-4 text-fg font-medium align-top">{row.category}</td>
                          <td className="py-4 pr-4 text-fg/60 align-top leading-relaxed">{row.purpose}</td>
                          <td className="py-4 pr-4 text-fg/60 align-top">{row.examples}</td>
                          <td className="py-4 text-fg/60 align-top whitespace-nowrap">{row.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-[14px] text-fg/60 leading-[1.85] whitespace-pre-line">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Back button */}
        <div className="mt-16 pt-8 border-t border-fg/[0.06]">
          <Link to="/" className="btn-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-fg">
            {isBg ? '← Обратно към началото' : '← Back to Home'}
          </Link>
        </div>
      </div>
    </div>
  )
}

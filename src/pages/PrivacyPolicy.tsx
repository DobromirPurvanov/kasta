import { Link } from 'react-router'
import { useLang } from '../hooks/useLang'
import { usePageMeta } from '../hooks/usePageMeta'

export default function PrivacyPolicy() {
  const { lang } = useLang()
  const isBg = lang === 'bg'

  usePageMeta({
    title: isBg ? 'Политика за поверителност | Kasta Ventures' : 'Privacy Policy | Kasta Ventures',
    path: '/privacy-policy',
  })

  const t = {
    bg: {
      title: 'Политика за поверителност',
      lastUpdated: 'Последна актуализация: 5 юли 2026 г.',
      intro: 'Kasta Ventures ("ние", "нас" или "нашият") се ангажира да защитава вашата неприкосновеност. Тази Политика за поверителност описва как събираме, използваме и защитаваме вашата лична информация, когато използвате нашия уебсайт kastaventures.com.',
      sections: [
        {
          title: '1. Информация, която събираме',
          content: 'Можем да събираме следните видове информация:\n\n• Лична информация: име, имейл адрес, телефонен номер, която ни предоставяте доброволно чрез формите за контакт.\n• Автоматично събрана информация: IP адрес, тип браузър, операционна система, препращащи страници, дата и час на достъп.\n• Бисквитки и подобни технологии: използваме бисквитки за подобряване на потребителското изживяване и анализ на трафика.',
        },
        {
          title: '2. Как използваме вашата информация',
          content: 'Използваме събраната информация за:\n\n• Отговаряне на вашите запитвания и предоставяне на клиентска подкрепа\n• Подобряване на нашия уебсайт и услуги\n• Изпращане на маркетингови комуникации (с ваше съгласие)\n• Спазване на правни задължения\n• Защита срещу измами и злоупотреби',
        },
        {
          title: '3. Правно основание за обработка (GDPR)',
          content: 'Съгласно Общия регламент за защита на данните (GDPR), обработваме вашите лични данни на следните правни основания:\n\n• Съгласие – когато сте дали изрично съгласие\n• Договор – за изпълнение на договорни задължения\n• Правно задължение – когато сме задължени по закон\n• Легитимен интерес – за подобряване на нашите услуги',
        },
        {
          title: '4. Споделяне на информация',
          content: 'Ние не продаваме, не търгуваме и не прехвърляме вашата лична информация на трети страни, освен в следните случаи:\n\n• Доставчици на услуги, които ни помагат да оперираме уебсайта\n• Правоприлагащи органи, когато сме задължени по закон\n• Потенциални купувачи при сливане или придобиване',
        },
        {
          title: '5. Защита на данните',
          content: 'Прилагаме подходящи технически и организационни мерки за защита на вашата лична информация:\n\n• SSL/TLS криптиране на всички данни\n• Редовни актуализации на сигурността\n• Ограничен достъп до лични данни\n• Сигурно съхранение на данните',
        },
        {
          title: '6. Вашите права',
          content: 'Съгласно GDPR, имате следните права:\n\n• Право на достъп до вашите лични данни\n• Право на корекция на неточни данни\n• Право на изтриване ("право да бъдеш забравен")\n• Право на ограничаване на обработката\n• Право на преносимост на данни\n• Право на възражение срещу обработката\n• Право да оттеглите съгласието си по всяко време',
        },
        {
          title: '7. Бисквитки',
          content: 'Използваме бисквитки и подобни технологии за:\n\n• Необходими бисквитки: за правилното функциониране на уебсайта\n• Аналитични бисквитки: за анализ на трафика и поведението\n• Предпочитания: за запомняне на вашите настройки\n\nМожете да управлявате предпочитанията си за бисквитки чрез нашия банер за съгласие.',
        },
        {
          title: '8. Съхранение на данни',
          content: 'Съхраняваме вашата лична информация само толкова дълго, колкото е необходимо за целите, за които е събрана, или както се изисква от приложимото законодателство. Обикновено това означава:\n\n• Данни за контакт: до 3 години след последното взаимодействие\n• Аналитични данни: до 26 месеца\n• Данни за транзакции: до 10 години (съгласно данъчното законодателство)',
        },
        {
          title: '9. Международни трансфери',
          content: 'Вашите данни се съхраняват и обработват в Европейския съюз. При необходимост от трансфер извън ЕС/ЕИП, ние гарантираме, че са налице подходящи механизми за защита, съгласно изискванията на GDPR.',
        },
        {
          title: '10. Промени в тази политика',
          content: 'Можем да актуализираме тази Политика за поверителност периодично. Ще публикуваме всякакви промени на тази страница с актуализирана дата. Препоръчваме ви периодично да преглеждате тази политика.',
        },
        {
          title: '11. Контакт',
          content: 'Ако имате въпроси относно тази Политика за поверителност или искате да упражните вашите права, моля свържете се с нас:\n\n• Имейл: office@kastaventures.com\n• Телефон: +359 887 77 37 33\n• Адрес: ул. Даскал Стоян Попандреев 28, София, България\n\nМожете също да се свържете с Комисията за защита на личните данни на България, ако считате, че правата ви са нарушени.',
        },
      ],
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: July 5, 2026',
      intro: 'Kasta Ventures ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy describes how we collect, use, and protect your personal information when you use our website kastaventures.com.',
      sections: [
        {
          title: '1. Information We Collect',
          content: 'We may collect the following types of information:\n\n• Personal Information: name, email address, phone number that you voluntarily provide through contact forms.\n• Automatically Collected Information: IP address, browser type, operating system, referring pages, date and time of access.\n• Cookies and Similar Technologies: we use cookies to enhance user experience and analyze traffic.',
        },
        {
          title: '2. How We Use Your Information',
          content: 'We use the collected information to:\n\n• Respond to your inquiries and provide customer support\n• Improve our website and services\n• Send marketing communications (with your consent)\n• Comply with legal obligations\n• Protect against fraud and abuse',
        },
        {
          title: '3. Legal Basis for Processing (GDPR)',
          content: 'Under the General Data Protection Regulation (GDPR), we process your personal data on the following legal bases:\n\n• Consent – when you have given explicit consent\n• Contract – for performance of contractual obligations\n• Legal Obligation – when required by law\n• Legitimate Interest – for improving our services',
        },
        {
          title: '4. Sharing of Information',
          content: 'We do not sell, trade, or transfer your personal information to third parties except in the following cases:\n\n• Service providers who help us operate the website\n• Law enforcement agencies when required by law\n• Potential buyers in case of merger or acquisition',
        },
        {
          title: '5. Data Security',
          content: 'We implement appropriate technical and organizational measures to protect your personal information:\n\n• SSL/TLS encryption of all data\n• Regular security updates\n• Restricted access to personal data\n• Secure data storage',
        },
        {
          title: '6. Your Rights',
          content: 'Under GDPR, you have the following rights:\n\n• Right to access your personal data\n• Right to rectification of inaccurate data\n• Right to erasure ("right to be forgotten")\n• Right to restriction of processing\n• Right to data portability\n• Right to object to processing\n• Right to withdraw consent at any time',
        },
        {
          title: '7. Cookies',
          content: 'We use cookies and similar technologies for:\n\n• Necessary cookies: for proper website functionality\n• Analytics cookies: for traffic and behavior analysis\n• Preferences: to remember your settings\n\nYou can manage your cookie preferences through our consent banner.',
        },
        {
          title: '8. Data Retention',
          content: 'We retain your personal information only for as long as necessary for the purposes for which it was collected, or as required by applicable law. Typically this means:\n\n• Contact data: up to 3 years after last interaction\n• Analytics data: up to 26 months\n• Transaction data: up to 10 years (per tax legislation)',
        },
        {
          title: '9. International Transfers',
          content: 'Your data is stored and processed within the European Union. If transfer outside the EU/EEA is necessary, we ensure that appropriate safeguards are in place as required by GDPR.',
        },
        {
          title: '10. Changes to This Policy',
          content: 'We may update this Privacy Policy periodically. We will post any changes on this page with an updated date. We recommend that you review this policy periodically.',
        },
        {
          title: '11. Contact Us',
          content: 'If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:\n\n• Email: office@kastaventures.com\n• Phone: +359 887 77 37 33\n• Address: 28 Daskal Stoyan Popandreev Str., Sofia, Bulgaria\n\nYou may also contact the Bulgarian Commission for Personal Data Protection if you believe your rights have been violated.',
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
            <Link to="/" className="text-[var(--text-secondary)] hover:text-fg transition-colors">{isBg ? 'Начало' : 'Home'}</Link>
            <span className="text-fg/20">/</span>
            <span className="text-fg font-medium" aria-current="page">{isBg ? 'Поверителност' : 'Privacy'}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 md:px-10 py-16">
        <h1 className="text-display text-fg mb-2" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
          {content.title}
        </h1>
        <p className="text-[13px] text-[var(--text-muted)] mb-10">{content.lastUpdated}</p>

        <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed mb-12">{content.intro}</p>

        <div className="space-y-10">
          {content.sections.map((section, i) => (
            <div key={i} className="border-t border-fg/[0.06] pt-8">
              <h2 className="text-[18px] font-semibold text-fg mb-4">{section.title}</h2>
              <div className="text-[16px] text-[var(--text-secondary)] leading-[1.85] whitespace-pre-line">
                {section.content}
              </div>
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

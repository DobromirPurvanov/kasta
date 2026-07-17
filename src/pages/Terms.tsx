import { Link } from 'react-router'
import { useLang } from '../hooks/useLang'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Terms() {
  const { lang } = useLang()
  const isBg = lang === 'bg'

  usePageMeta({
    title: isBg ? 'Условия за ползване | Kasta Ventures' : 'Terms of Service | Kasta Ventures',
    path: '/terms',
  })

  const t = {
    bg: {
      title: 'Условия за ползване',
      lastUpdated: 'Последна актуализация: 5 юли 2026 г.',
      intro: 'Моля, прочетете внимателно тези Условия за ползване преди да използвате уебсайта kastaventures.com. С достъпа и използването на този уебсайт вие се съгласявате да бъдете обвързани от тези условия.',
      sections: [
        {
          title: '1. Приемане на условията',
          content: 'С достъпа до този уебсайт вие потвърждавате, че сте прочели, разбрали и се съгласявате да спазвате тези Условия за ползване и нашата Политика за поверителност. Ако не сте съгласни с някоя част от тези условия, моля не използвайте нашия уебсайт.',
        },
        {
          title: '2. Използване на уебсайта',
          content: 'Този уебсайт е предназначен за лична и некомерсиална употреба. Вие се съгласявате да използвате уебсайта само за законни цели и по начин, който не нарушава правата на други лица или ограничава или възпрепятства тяхното използване на уебсайта.\n\nЗабранено е:\n• Използване на уебсайта по начин, който може да причини вреда на уебсайта или да наруши наличността или достъпността му\n• Извършване на неоторизиран достъп до свързани с уебсайта сървъри или бази данни\n• Използване на автоматизирани средства за достъп до уебсайта без изрично писмено съгласие',
        },
        {
          title: '3. Интелектуална собственост',
          content: 'Цялото съдържание на този уебсайт, включително но не само текст, графики, лога, изображения, видео, аудио, софтуер и код, е собственост на Kasta Ventures или неговите лицензодатели и е защитено от законите за авторското право и търговските марки.\n\nНе се разрешава:\n• Възпроизвеждане, разпространение или модифициране на съдържанието без предварително писмено съгласие\n• Използване на търговските марки "E RIDE PRO" и "Kasta Ventures" без разрешение\n• Премахване на авторски права или други права на собственост от съдържанието',
        },
        {
          title: '4. Продукти и цени',
          content: 'Цялата информация за продуктите, включително спецификации, цени и наличност, е предмет на промяна без предизвестие. Ние полагаме разумни усилия за осигуряване на точността на информацията, но не гарантираме, че описанията на продуктите или друго съдържание са точни, пълни, надеждни или без грешки.\n\nЦените са посочени в евро (EUR) и български лева (BGN) и може да не включват доставка, данъци или други такси, освен ако не е изрично посочено друго.',
        },
        {
          title: '5. Гаранция',
          content: 'Всички модели E RIDE PRO, продавани от Kasta Ventures, идват с 2-годишна производителна гаранция. Гаранцията покрива:\n\n• Производствени дефекти в материалите и изработката\n• Електрически компоненти (мотор, контролер, батерия)\n• Рамка и окачване\n\nГаранцията не покрива:\n• Нормално износване (гуми, накладки, вериги)\n• Повреди от неправилна употреба или злополуки\n• Модификации или неоторизиран ремонт\n• Щети от естествени бедствия',
        },
        {
          title: '6. Ограничение на отговорността',
          content: 'В максималната степен, разрешена от приложимото законодателство, Kasta Ventures не носи отговорност за:\n\n• Преки, непреки, случайни, специални или последващи щети\n• Загуба на данни, печалби или възможности за бизнес\n• Щети, произтичащи от използването или невъзможността за използване на уебсайта\n• Щети, произтичащи от неоторизиран достъп до нашите сървъри или лична информация',
        },
        {
          title: '7. Връзки към трети страни',
          content: 'Този уебсайт може да съдържа връзки към уебсайтове на трети страни. Тези връзки са предоставени само за ваше удобство. Kasta Ventures няма контрол над съдържанието на тези уебсайтове и не носи отговорност за тях или за каквито и да е загуби или щети, произтичащи от използването им.',
        },
        {
          title: '8. Промени в условията',
          content: 'Ние си запазваме правото да променяме тези Условия за ползване по всяко време. Всякакви промени ще влязат в сила незабавно след публикуването им на тази страница. Вашето продължаващо използване на уебсайта след публикуването на промените представлява приемане на новите условия.',
        },
        {
          title: '9. Приложимо право',
          content: 'Тези Условия за ползване се уреждат от законите на Република България. Всякакви спорове, произтичащи от или свързани с тези условия, ще бъдат решавани от компетентните съдилища в София, България.',
        },
        {
          title: '10. Контакт',
          content: 'Ако имате въпроси относно тези Условия за ползване, моля свържете се с нас:\n\n• Имейл: office@kastaventures.com\n• Телефон: +359 887 77 37 33\n• Адрес: ул. Даскал Стоян Попандреев 28, София, България',
        },
      ],
    },
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated: July 5, 2026',
      intro: 'Please read these Terms of Service carefully before using the website kastaventures.com. By accessing and using this website, you agree to be bound by these terms.',
      sections: [
        {
          title: '1. Acceptance of Terms',
          content: 'By accessing this website, you confirm that you have read, understood, and agree to comply with these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, please do not use our website.',
        },
        {
          title: '2. Use of Website',
          content: 'This website is intended for personal and non-commercial use. You agree to use the website only for lawful purposes and in a way that does not infringe the rights of others or restrict or inhibit their use of the website.\n\nProhibited:\n• Using the website in a way that may cause harm to the website or impair its availability or accessibility\n• Unauthorized access to servers or databases connected to the website\n• Using automated means to access the website without express written consent',
        },
        {
          title: '3. Intellectual Property',
          content: 'All content on this website, including but not limited to text, graphics, logos, images, video, audio, software, and code, is the property of Kasta Ventures or its licensors and is protected by copyright and trademark laws.\n\nNot permitted:\n• Reproducing, distributing, or modifying content without prior written consent\n• Using the trademarks "E RIDE PRO" and "Kasta Ventures" without permission\n• Removing copyright or other proprietary notices from content',
        },
        {
          title: '4. Products and Pricing',
          content: 'All product information, including specifications, prices, and availability, is subject to change without notice. We make reasonable efforts to ensure the accuracy of information, but do not guarantee that product descriptions or other content are accurate, complete, reliable, or error-free.\n\nPrices are listed in euros (EUR) and Bulgarian lev (BGN) and may not include shipping, taxes, or other fees unless expressly stated otherwise.',
        },
        {
          title: '5. Warranty',
          content: 'All E RIDE PRO models sold by Kasta Ventures come with a 2-year manufacturer warranty. The warranty covers:\n\n• Manufacturing defects in materials and workmanship\n• Electrical components (motor, controller, battery)\n• Frame and suspension\n\nThe warranty does not cover:\n• Normal wear and tear (tires, brake pads, chains)\n• Damage from improper use or accidents\n• Modifications or unauthorized repair\n• Damage from natural disasters',
        },
        {
          title: '6. Limitation of Liability',
          content: 'To the maximum extent permitted by applicable law, Kasta Ventures shall not be liable for:\n\n• Direct, indirect, incidental, special, or consequential damages\n• Loss of data, profits, or business opportunities\n• Damages arising from the use or inability to use the website\n• Damages arising from unauthorized access to our servers or personal information',
        },
        {
          title: '7. Third-Party Links',
          content: 'This website may contain links to third-party websites. These links are provided for your convenience only. Kasta Ventures has no control over the content of these websites and is not responsible for them or for any loss or damage arising from their use.',
        },
        {
          title: '8. Changes to Terms',
          content: 'We reserve the right to change these Terms of Service at any time. Any changes will take effect immediately upon posting on this page. Your continued use of the website after posting changes constitutes acceptance of the new terms.',
        },
        {
          title: '9. Governing Law',
          content: 'These Terms of Service are governed by the laws of the Republic of Bulgaria. Any disputes arising from or relating to these terms shall be resolved by the competent courts in Sofia, Bulgaria.',
        },
        {
          title: '10. Contact',
          content: 'If you have questions about these Terms of Service, please contact us:\n\n• Email: office@kastaventures.com\n• Phone: +359 887 77 37 33\n• Address: 28 Daskal Stoyan Popandreev Str., Sofia, Bulgaria',
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
            <span className="text-fg font-medium" aria-current="page">{isBg ? 'Условия' : 'Terms'}</span>
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

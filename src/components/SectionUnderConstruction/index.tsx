import type { AppLocale } from '@/i18n/locales'

import styles from './styles.module.css'

const messages = {
  ru: {
    notice: 'В настоящее время мы занимаемся разработкой и наполнением данной страницы',
    returnLater: 'Пожалуйста, возвращайтесь позже',
  },
  en: {
    notice: 'We’re currently building this page and preparing its content',
    returnLater: 'Please check back later',
  },
  fr: {
    notice: 'Nous préparons actuellement cette page et son contenu',
    returnLater: 'Merci de revenir plus tard',
  },
  kk: {
    notice: 'Қазір бұл бетті әзірлеп, оған материалдар қосып жатырмыз',
    returnLater: 'Кейінірек қайта кіріңіз',
  },
  zh: {
    notice: '我们正在建设此页面并准备相关内容',
    returnLater: '请稍后再来查看',
  },
} satisfies Record<AppLocale, { notice: string; returnLater: string }>

export function SectionUnderConstruction({ locale }: { locale: AppLocale }) {
  const { notice, returnLater } = messages[locale]

  return (
    <div className="container pt-10">
      <div className={styles.banner}>
        <p className={styles.notice}>{notice}</p>
        <p className="mt-4 text-sm font-semibold text-foreground">{returnLater}</p>
      </div>
    </div>
  )
}

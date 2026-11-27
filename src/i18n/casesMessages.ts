import type { AppLocale } from './locales'

type CasesMessages = {
  title: string
  description: string
}

export const casesMessages: Record<AppLocale, CasesMessages> = {
  ru: {
    title: 'Кейсы',
    description: 'Кейсы Runway Trans. Раздел готовится к публикации.',
  },
  en: {
    title: 'Cases',
    description: 'Runway Trans case studies. This section is under development.',
  },
  fr: {
    title: 'Cas clients',
    description: 'Cas clients de Runway Trans. Cette rubrique est en préparation.',
  },
  kk: {
    title: 'Кейстер',
    description: 'Runway Trans кейстері. Бөлім жариялануға дайындалып жатыр.',
  },
  zh: {
    title: '案例',
    description: 'Runway Trans 客户案例。本栏目正在筹备中。',
  },
}

export function getCaseExamples(_locale: AppLocale): readonly unknown[] {
  return []
}

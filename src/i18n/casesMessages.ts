import type { AppLocale } from './locales'
import { pageMessages } from './pageMessages'

type CaseExample = {
  id: string
  title: string
  route: string
  period: string
  duration?: string
}

type CasesMessages = {
  title: string
  examplesTitle: string
  description: string
}

export const casesMessages: Record<AppLocale, CasesMessages> = {
  ru: {
    title: 'Кейсы',
    examplesTitle: 'Примеры перевозок',
    description: 'Примеры маршрутов и сроков перевозок Runway Trans.',
  },
  en: {
    title: 'Cases',
    examplesTitle: 'Transport examples',
    description: 'Examples of transport routes and delivery times from Runway Trans.',
  },
  fr: {
    title: 'Cas clients',
    examplesTitle: 'Exemples de transport',
    description: 'Exemples d’itinéraires et de délais de transport de Runway Trans.',
  },
  kk: {
    title: 'Кейстер',
    examplesTitle: 'Тасымалдау мысалдары',
    description: 'Runway Trans тасымалдау бағыттары мен мерзімдерінің мысалдары.',
  },
  zh: {
    title: '案例',
    examplesTitle: '运输示例',
    description: 'Runway Trans 运输路线和时效示例。',
  },
}

// The Geography fallback entries do not have a Kazakh translation.
const kazakhExamples: CaseExample[] = [
  {
    id: 'vankor-all-terrain',
    title: 'Ванкорға жол талғамайтын көлікпен жүк жеткізу',
    route: '(Ярцево – Игарка – Байкаловск)',
    period: '2025 жылғы қаңтар – наурыз',
    duration: '3 күн',
  },
  {
    id: 'pipeline-service',
    title: 'Мұнай құбырына қызмет көрсету',
    route: '(Караул – Таналау)',
    period: '2025 жылғы қаңтар – мамыр',
  },
]

export function getCaseExamples(locale: AppLocale): CaseExample[] {
  return locale === 'kk' ? kazakhExamples : pageMessages[locale].geography.fallbackDeliveries
}

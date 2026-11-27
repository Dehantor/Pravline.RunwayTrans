import type { AppLocale } from './locales'

export const officeAddresses: Record<AppLocale, string> = {
  ru: 'Красноярск, ул. Парижской Коммуны, 1',
  en: '1 Parizhskoy Kommuny St., Krasnoyarsk',
  fr: '1, rue Parizhskoy Kommuny, Krasnoïarsk',
  kk: 'Красноярск, Париж Коммунасы көшесі, 1',
  zh: '克拉斯诺亚尔斯克，巴黎公社街1号',
}

export const mainPhone = { href: 'tel:+79130303030', label: '8-913-030-30-30' }

export const companyEmail = { href: 'mailto:info@rwt.ru', label: 'info@rwt.ru' }

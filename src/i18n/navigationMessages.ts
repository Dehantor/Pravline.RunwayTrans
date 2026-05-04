import type { AppLocale } from './locales'

type NavLink = {
  href: string
  label: string
}

type HeaderMessages = {
  callbackLabel: string
  companyLabel: string
  mainNavAria: string
  noPages: string
  serviceLinePrimary: string
  serviceLineSecondary: string
  companyDropdownLinks: NavLink[]
  topLevelLinks: NavLink[]
}

export const headerMessages: Record<AppLocale, HeaderMessages> = {
  ru: {
    callbackLabel: 'Заказать звонок',
    companyLabel: 'Компания',
    mainNavAria: 'Основная навигация',
    noPages: 'Нет страниц',
    serviceLinePrimary: 'Грузоперевозки',
    serviceLineSecondary: 'Вездеходные и автомобильные',
    companyDropdownLinks: [
      { href: '/ranvey-trans-segodnya', label: 'Ранвей Транс сегодня' },
      { href: '/istoriya', label: 'История' },
      { href: '/rukovodstvo', label: 'Руководство' },
      { href: '/vacancies', label: 'Вакансии' },
      { href: '/tehnika', label: 'Техника' },
    ],
    topLevelLinks: [
      { href: '/uslugi', label: 'Услуги' },
      { href: '/geografiya', label: 'География' },
      { href: '/reviews', label: 'Кейсы' },
      { href: '/partners', label: 'Партнеры' },
      { href: '/contacts', label: 'Контакты' },
    ],
  },
  en: {
    callbackLabel: 'Request a call',
    companyLabel: 'Company',
    mainNavAria: 'Main navigation',
    noPages: 'No pages',
    serviceLinePrimary: 'Cargo transportation',
    serviceLineSecondary: 'All-terrain and road transport',
    companyDropdownLinks: [
      { href: '/ranvey-trans-segodnya', label: 'Runway Trans Today' },
      { href: '/istoriya', label: 'History' },
      { href: '/rukovodstvo', label: 'Management' },
      { href: '/vacancies', label: 'Vacancies' },
      { href: '/tehnika', label: 'Equipment' },
    ],
    topLevelLinks: [
      { href: '/uslugi', label: 'Services' },
      { href: '/geografiya', label: 'Geography' },
      { href: '/reviews', label: 'Cases' },
      { href: '/partners', label: 'Partners' },
      { href: '/contacts', label: 'Contacts' },
    ],
  },
  de: {
    callbackLabel: 'Ruckruf anfordern',
    companyLabel: 'Unternehmen',
    mainNavAria: 'Hauptnavigation',
    noPages: 'Keine Seiten',
    serviceLinePrimary: 'Gutertransporte',
    serviceLineSecondary: 'Gelande- und Strassentransport',
    companyDropdownLinks: [
      { href: '/ranvey-trans-segodnya', label: 'Runway Trans heute' },
      { href: '/istoriya', label: 'Geschichte' },
      { href: '/rukovodstvo', label: 'Management' },
      { href: '/vacancies', label: 'Stellenangebote' },
      { href: '/tehnika', label: 'Technik' },
    ],
    topLevelLinks: [
      { href: '/uslugi', label: 'Leistungen' },
      { href: '/geografiya', label: 'Geografie' },
      { href: '/reviews', label: 'Projekte' },
      { href: '/partners', label: 'Partner' },
      { href: '/contacts', label: 'Kontakte' },
    ],
  },
  fr: {
    callbackLabel: 'Demander un appel',
    companyLabel: 'Entreprise',
    mainNavAria: 'Navigation principale',
    noPages: 'Aucune page',
    serviceLinePrimary: 'Transport de marchandises',
    serviceLineSecondary: 'Transport tout-terrain et routier',
    companyDropdownLinks: [
      { href: '/ranvey-trans-segodnya', label: "Runway Trans aujourd'hui" },
      { href: '/istoriya', label: 'Histoire' },
      { href: '/rukovodstvo', label: 'Direction' },
      { href: '/vacancies', label: 'Postes vacants' },
      { href: '/tehnika', label: 'Materiel' },
    ],
    topLevelLinks: [
      { href: '/uslugi', label: 'Services' },
      { href: '/geografiya', label: 'Geographie' },
      { href: '/reviews', label: 'Cas clients' },
      { href: '/partners', label: 'Partenaires' },
      { href: '/contacts', label: 'Contacts' },
    ],
  },
  zh: {
    callbackLabel: '请求回电',
    companyLabel: '公司',
    mainNavAria: '主导航',
    noPages: '暂无页面',
    serviceLinePrimary: '货物运输',
    serviceLineSecondary: '全地形和公路运输',
    companyDropdownLinks: [
      { href: '/ranvey-trans-segodnya', label: '今日 Runway Trans' },
      { href: '/istoriya', label: '历史' },
      { href: '/rukovodstvo', label: '管理层' },
      { href: '/vacancies', label: '职位空缺' },
      { href: '/tehnika', label: '设备' },
    ],
    topLevelLinks: [
      { href: '/uslugi', label: '服务' },
      { href: '/geografiya', label: '运输区域' },
      { href: '/reviews', label: '案例' },
      { href: '/partners', label: '合作伙伴' },
      { href: '/contacts', label: '联系方式' },
    ],
  },
}

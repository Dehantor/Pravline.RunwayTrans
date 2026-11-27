import type { AppLocale } from './locales'

type NavLink = {
  href: string
  label: string
}

export const casesPageSlug = 'cases'
const casesPagePath = `/${casesPageSlug}`

type HeaderMessages = {
  callbackLabel: string
  callLabel: string
  companyLabel: string
  homeLabel: string
  languageLabel: string
  languageOptionsLabel: string
  mainNavAria: string
  openMenuLabel: string
  closeMenuLabel: string
  noPages: string
  serviceLinePrimary: string
  serviceLineSecondary: string
  companyDropdownLinks: NavLink[]
  topLevelLinks: NavLink[]
}

export const headerMessages: Record<AppLocale, HeaderMessages> = {
  ru: {
    callbackLabel: 'Заказать звонок',
    callLabel: 'Позвонить',
    companyLabel: 'Компания',
    homeLabel: 'Runway Trans — на главную',
    languageLabel: 'Язык сайта',
    languageOptionsLabel: 'Выберите язык',
    mainNavAria: 'Основная навигация',
    openMenuLabel: 'Открыть меню',
    closeMenuLabel: 'Закрыть меню',
    noPages: 'Нет страниц',
    serviceLinePrimary: 'Грузоперевозки',
    serviceLineSecondary: 'Автомобильная, вездеходная и специализированная техника',
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
      { href: casesPagePath, label: 'Кейсы' },
      { href: '/partners', label: 'Партнёры' },
      { href: '/reviews', label: 'Отзывы' },
      { href: '/contacts', label: 'Контакты' },
    ],
  },
  en: {
    callbackLabel: 'Request a call',
    callLabel: 'Call',
    companyLabel: 'Company',
    homeLabel: 'Runway Trans home',
    languageLabel: 'Site language',
    languageOptionsLabel: 'Choose a language',
    mainNavAria: 'Main navigation',
    openMenuLabel: 'Open menu',
    closeMenuLabel: 'Close menu',
    noPages: 'No pages',
    serviceLinePrimary: 'Cargo transportation',
    serviceLineSecondary: 'Road, all-terrain and specialised vehicles',
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
      { href: casesPagePath, label: 'Cases' },
      { href: '/partners', label: 'Partners' },
      { href: '/reviews', label: 'Reviews' },
      { href: '/contacts', label: 'Contacts' },
    ],
  },
  kk: {
    callbackLabel: 'Қоңырауға тапсырыс беру',
    callLabel: 'Қоңырау шалу',
    companyLabel: 'Компания',
    homeLabel: 'Runway Trans — басты бет',
    languageLabel: 'Сайт тілі',
    languageOptionsLabel: 'Тілді таңдаңыз',
    mainNavAria: 'Негізгі навигация',
    openMenuLabel: 'Мәзірді ашу',
    closeMenuLabel: 'Мәзірді жабу',
    noPages: 'Беттер жоқ',
    serviceLinePrimary: 'Жүк тасымалы',
    serviceLineSecondary: 'Автомобильдер, жол талғамайтын көліктер және арнайы техника',
    companyDropdownLinks: [
      { href: '/ranvey-trans-segodnya', label: 'Runway Trans бүгін' },
      { href: '/istoriya', label: 'Тарих' },
      { href: '/rukovodstvo', label: 'Басшылық' },
      { href: '/vacancies', label: 'Бос жұмыс орындары' },
      { href: '/tehnika', label: 'Техника' },
    ],
    topLevelLinks: [
      { href: '/uslugi', label: 'Қызметтер' },
      { href: '/geografiya', label: 'География' },
      { href: casesPagePath, label: 'Кейстер' },
      { href: '/partners', label: 'Серіктестер' },
      { href: '/reviews', label: 'Пікірлер' },
      { href: '/contacts', label: 'Байланыстар' },
    ],
  },
  fr: {
    callbackLabel: 'Demander un appel',
    callLabel: 'Appeler',
    companyLabel: 'Entreprise',
    homeLabel: 'Accueil de Runway Trans',
    languageLabel: 'Langue du site',
    languageOptionsLabel: 'Choisir la langue',
    mainNavAria: 'Navigation principale',
    openMenuLabel: 'Ouvrir le menu',
    closeMenuLabel: 'Fermer le menu',
    noPages: 'Aucune page',
    serviceLinePrimary: 'Transport de marchandises',
    serviceLineSecondary: 'Véhicules routiers, tout-terrain et spécialisés',
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
      { href: casesPagePath, label: 'Cas clients' },
      { href: '/partners', label: 'Partenaires' },
      { href: '/reviews', label: 'Avis' },
      { href: '/contacts', label: 'Contacts' },
    ],
  },
  zh: {
    callbackLabel: '请求回电',
    callLabel: '拨打电话',
    companyLabel: '公司',
    homeLabel: 'Runway Trans 首页',
    languageLabel: '网站语言',
    languageOptionsLabel: '选择语言',
    mainNavAria: '主导航',
    openMenuLabel: '打开菜单',
    closeMenuLabel: '关闭菜单',
    noPages: '暂无页面',
    serviceLinePrimary: '货物运输',
    serviceLineSecondary: '公路车辆、全地形车辆及专用设备',
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
      { href: casesPagePath, label: '案例' },
      { href: '/partners', label: '合作伙伴' },
      { href: '/reviews', label: '评价' },
      { href: '/contacts', label: '联系方式' },
    ],
  },
}

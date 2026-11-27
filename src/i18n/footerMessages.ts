import type { AppLocale } from './locales'

type FooterMessages = {
  services: string
  emergency: string
  contacts: string
  requisites: string
  social: string
  links: string
  theme: { label: string; auto: string; light: string; dark: string }
}

export const footerMessages: Record<AppLocale, FooterMessages> = {
  ru: {
    services: 'Услуги',
    emergency: 'Аварийный комплекс',
    contacts: 'Контакты',
    requisites: 'Реквизиты компании',
    social: 'Присоединяйтесь к нам в соцсетях',
    links: 'Дополнительные ссылки',
    theme: { label: 'Тема сайта', auto: 'Системная', light: 'Светлая', dark: 'Тёмная' },
  },
  en: {
    services: 'Services',
    emergency: 'Emergency response unit',
    contacts: 'Contacts',
    requisites: 'Company details',
    social: 'Follow us on social media',
    links: 'More links',
    theme: { label: 'Site theme', auto: 'System', light: 'Light', dark: 'Dark' },
  },
  fr: {
    services: 'Services',
    emergency: 'Unité d’intervention d’urgence',
    contacts: 'Contacts',
    requisites: 'Informations sur l’entreprise',
    social: 'Suivez-nous sur les réseaux sociaux',
    links: 'Autres liens',
    theme: { label: 'Thème du site', auto: 'Système', light: 'Clair', dark: 'Sombre' },
  },
  kk: {
    services: 'Қызметтер',
    emergency: 'Авариялық кешен',
    contacts: 'Байланыс',
    requisites: 'Компания деректемелері',
    social: 'Бізге әлеуметтік желілерде қосылыңыз',
    links: 'Қосымша сілтемелер',
    theme: { label: 'Сайт тақырыбы', auto: 'Жүйелік', light: 'Жарық', dark: 'Қараңғы' },
  },
  zh: {
    services: '服务',
    emergency: '应急救援设备',
    contacts: '联系方式',
    requisites: '公司资料',
    social: '在社交媒体上关注我们',
    links: '更多链接',
    theme: { label: '网站主题', auto: '跟随系统', light: '浅色', dark: '深色' },
  },
}

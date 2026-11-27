import type { AppLocale } from '@/i18n/locales'

export type HomeBannerContent = {
  title: readonly [string, string]
  description: readonly string[]
  actions: readonly [{ label: string; path: `/${string}` }, { label: string; path: `/${string}` }?]
}

type BannerImage = `/${string}`

export const homeBannerImages = [
  '/media/home-banner-vityaz-snow.webp',
  '/media/image-2.png',
] satisfies readonly [
  BannerImage,
  BannerImage?,
  BannerImage?,
  BannerImage?,
  BannerImage?,
  BannerImage?,
  BannerImage?,
]

export const homeBannerContent: Record<AppLocale, HomeBannerContent> = {
  ru: {
    title: ['Грузоперевозки', 'В труднодоступные районы Севера'],
    description: [
      'Самые проходимые вездеходы в мире!',
      'Самые ответственные витязисты!',
      'Самое надёжное и стопроцентное.',
    ],
    actions: [
      { label: 'Вездепроходимые Витязи', path: '/tehnika' },
      { label: 'Задать вопрос', path: '/contacts#callback-form' },
    ],
  },
  en: {
    title: ['Freight transport', 'To remote regions of the North'],
    description: [
      'The most capable all-terrain vehicles in the world!',
      'Vityaz crews you can count on!',
      'Reliability you can trust.',
    ],
    actions: [
      { label: 'Vityaz all-terrain vehicles', path: '/tehnika' },
      { label: 'Ask a question', path: '/contacts#callback-form' },
    ],
  },
  fr: {
    title: ['Transport de fret', 'Vers les régions isolées du Nord'],
    description: [
      'Les véhicules tout-terrain les plus performants au monde !',
      'Des équipages Vityaz sur lesquels vous pouvez compter !',
      'Une fiabilité à toute épreuve.',
    ],
    actions: [
      { label: 'Véhicules tout-terrain Vityaz', path: '/tehnika' },
      { label: 'Poser une question', path: '/contacts#callback-form' },
    ],
  },
  kk: {
    title: ['Жүк тасымалы', 'Солтүстіктің жетуі қиын аудандарына'],
    description: [
      'Әлемдегі ең өтімді жол талғамайтын көліктер!',
      'Ең жауапты «Витязь» жүргізушілері!',
      'Сенімділікке толық кепілдік.',
    ],
    actions: [
      { label: '«Витязь» жол талғамайтын көліктері', path: '/tehnika' },
      { label: 'Сұрақ қою', path: '/contacts#callback-form' },
    ],
  },
  zh: {
    title: ['货物运输', '直达北方偏远地区'],
    description: ['全球通行能力最强的全地形车！', '值得信赖的“勇士”车队！', '运输可靠，值得托付。'],
    actions: [
      { label: '“勇士”全地形车', path: '/tehnika' },
      { label: '咨询我们', path: '/contacts#callback-form' },
    ],
  },
}

export const bannerControls = {
  ru: {
    region: 'Баннеры главной страницы',
    previous: 'Предыдущий баннер',
    next: 'Следующий баннер',
    slide: 'Баннер',
  },
  en: {
    region: 'Homepage banners',
    previous: 'Previous banner',
    next: 'Next banner',
    slide: 'Banner',
  },
  fr: {
    region: 'Bannières de la page d’accueil',
    previous: 'Bannière précédente',
    next: 'Bannière suivante',
    slide: 'Bannière',
  },
  kk: {
    region: 'Басты бет баннерлері',
    previous: 'Алдыңғы баннер',
    next: 'Келесі баннер',
    slide: 'Баннер',
  },
  zh: {
    region: '首页横幅',
    previous: '上一张横幅',
    next: '下一张横幅',
    slide: '横幅',
  },
} satisfies Record<AppLocale, Record<'region' | 'previous' | 'next' | 'slide', string>>

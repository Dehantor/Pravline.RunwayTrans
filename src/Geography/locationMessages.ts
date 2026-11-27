import type { AppLocale } from '@/i18n/locales'

import type { GeographyMapPoint } from './mapPointTypes'

const defaultPointCoordinates = [
  { id: 'krasnoyarsk-office', kind: 'office', coordinates: [56.008209, 92.881071] },
  { id: 'krasnoyarsk-repair', kind: 'repairBase', coordinates: [56.0153, 92.8932] },
  { id: 'dudinka-repair', kind: 'repairBase', coordinates: [69.4, 86.1833] },
  { id: 'vankor-field', kind: 'field', coordinates: [67.8009, 83.499] },
] satisfies GeographyMapPointCoordinates[]

type GeographyMapPointCoordinates = Pick<GeographyMapPoint, 'kind' | 'coordinates'> & {
  id: 'krasnoyarsk-office' | 'krasnoyarsk-repair' | 'dudinka-repair' | 'vankor-field'
}

type LocationMessages = {
  introduction: string
  locations: [office: string, mainBase: string, otherBase: string]
  operations: string
  regions: [tomsk: string, sakha: string, krasnoyarsk: string, nenets: string, yamal: string]
  map: { label: string; loading: string; unavailable: string; close: string }
  conclusion: string
  cta: string
  defaultPoints: Record<
    GeographyMapPointCoordinates['id'],
    Pick<GeographyMapPoint, 'title' | 'description'>
  >
}

export const geographyLocationMessages: Record<AppLocale, LocationMessages> = {
  ru: {
    introduction: 'Мы способны работать в любой точке планеты!',
    locations: [
      'Офис находится в Красноярске.',
      'Основная ремонтно-производственная база располагается в Красноярске с 2026 года.',
      'Другая ремонтная база в Дудинке.',
    ],
    operations:
      'А работаем в ключевых нефтегазовых регионах Сибири. Самые сложные проекты, условия бездорожья, критические температуры — наша стихия.',
    regions: [
      'Томская область — Северо-Останинское месторождение, доставка грузов на Витязях.',
      'Якутия — вахтовые перевозки.',
      'Красноярский край — Ванкорское месторождение, постройка нефтепровода.',
      'Ненецкий АО — доставка грузов на Витязях.',
      'Ямало-Ненецкий АО — доставка грузов на Витязях.',
    ],
    map: {
      label: 'Карта офиса, ремонтных баз и месторождения',
      loading: 'Карта загружается…',
      unavailable: 'Подложка карты загрузилась не полностью. Метки доступны.',
      close: 'Закрыть описание метки',
    },
    conclusion: 'Готовы работать в любой точке планеты, открывать новые для себя места.',
    cta: 'Работать с нами',
    defaultPoints: {
      'krasnoyarsk-office': {
        title: 'Офис в Красноярске',
        description: 'Красноярск, ул. Парижской Коммуны, 1.',
      },
      'krasnoyarsk-repair': {
        title: 'База в Красноярске (ориентир)',
        description: 'Основная ремонтно-производственная база. На карте указан ориентир по городу.',
      },
      'dudinka-repair': {
        title: 'База в Дудинке (ориентир)',
        description: 'Ремонтная база. На карте указан ориентир по городу.',
      },
      'vankor-field': {
        title: 'Ванкорское месторождение',
        description: 'Приблизительное расположение месторождения.',
      },
    },
  },
  en: {
    introduction: 'We can work anywhere in the world!',
    locations: [
      'Our office is in Krasnoyarsk.',
      'Our main repair and production base has been in Krasnoyarsk since 2026.',
      'Our other repair base is in Dudinka.',
    ],
    operations:
      'We operate in the key oil and gas regions of Siberia. Complex projects, off-road conditions, and extreme temperatures are where we excel.',
    regions: [
      'Tomsk Oblast — cargo deliveries to the Severo-Ostaninskoye field in Vityaz vehicles.',
      'Yakutia — transport for shift crews.',
      'Krasnoyarsk Krai — oil pipeline construction at the Vankor field.',
      'Nenets Autonomous Okrug — cargo deliveries in Vityaz vehicles.',
      'Yamalo-Nenets Autonomous Okrug — cargo deliveries in Vityaz vehicles.',
    ],
    map: {
      label: 'Map of the office, repair bases and field',
      loading: 'Loading the map…',
      unavailable: 'The base map did not fully load. Map markers are still available.',
      close: 'Close marker details',
    },
    conclusion: 'We are ready to work anywhere in the world and explore new places.',
    cta: 'Work with us',
    defaultPoints: {
      'krasnoyarsk-office': {
        title: 'Krasnoyarsk office',
        description: '1 Parizhskoy Kommuny St., Krasnoyarsk.',
      },
      'krasnoyarsk-repair': {
        title: 'Krasnoyarsk base (city reference)',
        description:
          'Main repair and production base. The marker indicates the approximate city location.',
      },
      'dudinka-repair': {
        title: 'Dudinka base (city reference)',
        description: 'Repair base. The marker indicates the approximate city location.',
      },
      'vankor-field': {
        title: 'Vankor field',
        description: 'Approximate location of the field.',
      },
    },
  },
  fr: {
    introduction: 'Nous pouvons intervenir partout dans le monde !',
    locations: [
      'Notre bureau se trouve à Krasnoïarsk.',
      'Notre principale base de réparation et de production se trouve à Krasnoïarsk depuis 2026.',
      'Notre autre base de réparation se trouve à Doudinka.',
    ],
    operations:
      'Nous intervenons dans les principales régions pétrolières et gazières de Sibérie. Projets complexes, terrains sans routes et températures extrêmes sont notre spécialité.',
    regions: [
      'Oblast de Tomsk — livraison de fret au gisement de Severo-Ostaninskoïe à bord de véhicules Vityaz.',
      'Iakoutie — transport des équipes en rotation.',
      'Kraï de Krasnoïarsk — construction d’un oléoduc sur le gisement de Vankor.',
      'District autonome des Nénètses — livraison de fret à bord de véhicules Vityaz.',
      'District autonome de Iamalo-Nénétsie — livraison de fret à bord de véhicules Vityaz.',
    ],
    map: {
      label: 'Carte du bureau, des bases de réparation et du gisement',
      loading: 'Chargement de la carte…',
      unavailable: 'Le fond de carte est incomplet. Les repères restent disponibles.',
      close: 'Fermer les détails du repère',
    },
    conclusion:
      'Nous sommes prêts à intervenir partout dans le monde et à découvrir de nouveaux lieux.',
    cta: 'Travailler avec nous',
    defaultPoints: {
      'krasnoyarsk-office': {
        title: 'Bureau de Krasnoïarsk',
        description: '1, rue Parizhskoy Kommuny, Krasnoïarsk.',
      },
      'krasnoyarsk-repair': {
        title: 'Base de Krasnoïarsk (repère en ville)',
        description:
          'Base principale de réparation et de production. Le repère indique une position approximative dans la ville.',
      },
      'dudinka-repair': {
        title: 'Base de Doudinka (repère en ville)',
        description:
          'Base de réparation. Le repère indique une position approximative dans la ville.',
      },
      'vankor-field': {
        title: 'Gisement de Vankor',
        description: 'Emplacement approximatif du gisement.',
      },
    },
  },
  kk: {
    introduction: 'Біз әлемнің кез келген нүктесінде жұмыс істей аламыз!',
    locations: [
      'Кеңсеміз Красноярскіде орналасқан.',
      'Негізгі жөндеу-өндірістік базамыз 2026 жылдан бері Красноярскіде орналасқан.',
      'Екінші жөндеу базамыз Дудинкада орналасқан.',
    ],
    operations:
      'Біз Сібірдің негізгі мұнай-газ өңірлерінде жұмыс істейміз. Күрделі жобалар, жолсыз жерлер және шектен тыс температуралар — біздің жұмысымыздың бір бөлігі.',
    regions: [
      'Томск облысы — Северо-Останинское кен орнына «Витязь» көліктерімен жүк жеткізу.',
      'Якутия — вахталық тасымалдар.',
      'Краснояр өлкесі — Ванкор кен орнында мұнай құбырын салу.',
      'Ненец автономиялық округі — «Витязь» көліктерімен жүк жеткізу.',
      'Ямал-Ненец автономиялық округі — «Витязь» көліктерімен жүк жеткізу.',
    ],
    map: {
      label: 'Кеңсе, жөндеу базалары және кен орны картасы',
      loading: 'Карта жүктелуде…',
      unavailable: 'Карта негізі толық жүктелмеді. Белгілер қолжетімді.',
      close: 'Белгі сипаттамасын жабу',
    },
    conclusion:
      'Біз әлемнің кез келген нүктесінде жұмыс істеуге және жаңа жерлерді ашуға дайынбыз.',
    cta: 'Бізбен жұмыс істеу',
    defaultPoints: {
      'krasnoyarsk-office': {
        title: 'Красноярскідегі кеңсе',
        description: 'Красноярск, Париж Коммунасы көшесі, 1.',
      },
      'krasnoyarsk-repair': {
        title: 'Красноярск базасы (қала бағдары)',
        description:
          'Негізгі жөндеу-өндірістік база. Картада қаладағы шамамен орналасқан жер көрсетілген.',
      },
      'dudinka-repair': {
        title: 'Дудинка базасы (қала бағдары)',
        description: 'Жөндеу базасы. Картада қаладағы шамамен орналасқан жер көрсетілген.',
      },
      'vankor-field': {
        title: 'Ванкор кен орны',
        description: 'Кен орнының шамамен орналасқан жері.',
      },
    },
  },
  zh: {
    introduction: '我们能够在世界任何地方工作！',
    locations: [
      '我们的办公室位于克拉斯诺亚尔斯克。',
      '自 2026 年起，我们的主要维修与生产基地设在克拉斯诺亚尔斯克。',
      '另一处维修基地位于杜金卡。',
    ],
    operations: '我们在西伯利亚主要油气产区开展业务，擅长应对复杂项目、无道路环境和极端气温。',
    regions: [
      '托木斯克州 — 用“勇士”全地形车向北奥斯塔宁油田运送货物。',
      '雅库特 — 运送轮班工作人员。',
      '克拉斯诺亚尔斯克边疆区 — 在万科尔油田修建输油管道。',
      '涅涅茨自治区 — 用“勇士”全地形车运送货物。',
      '亚马尔-涅涅茨自治区 — 用“勇士”全地形车运送货物。',
    ],
    map: {
      label: '办公室、维修基地和油田地图',
      loading: '地图正在加载…',
      unavailable: '底图未能完整加载，标记仍可查看。',
      close: '关闭标记详情',
    },
    conclusion: '我们愿意在世界任何地方工作，探索新的地点。',
    cta: '与我们合作',
    defaultPoints: {
      'krasnoyarsk-office': {
        title: '克拉斯诺亚尔斯克办公室',
        description: '克拉斯诺亚尔斯克，巴黎公社街 1 号。',
      },
      'krasnoyarsk-repair': {
        title: '克拉斯诺亚尔斯克基地（城市参考位置）',
        description: '主要维修与生产基地。标记为城市内的参考位置。',
      },
      'dudinka-repair': {
        title: '杜金卡基地（城市参考位置）',
        description: '维修基地。标记为城市内的参考位置。',
      },
      'vankor-field': {
        title: '万科尔油田',
        description: '油田的大致位置。',
      },
    },
  },
}

export function getDefaultGeographyMapPoints(locale: AppLocale): GeographyMapPoint[] {
  const labels = geographyLocationMessages[locale].defaultPoints
  return defaultPointCoordinates.map((point) => ({ ...point, ...labels[point.id] }))
}

import type { AppLocale } from './locales'

type ServiceItem = { label: string; description: string }
type AdvantageItem = { label: string; description: string }
type MetricItem = { label: string; value: string }

type HomeMessages = {
  hero: { eyebrow: string; title: string }
  transportCapabilitiesTitle: string
  transportCapabilitiesDescription: string
  coreServices: ServiceItem[]
  ctaRequest: string
  cargoTitle: string
  cargoDescription: string
  capabilities: string[]
  advantagesTitle: string
  advantages: AdvantageItem[]
  playVideoAria: string
  mapButton: string
  metrics: MetricItem[]
  workWithUsTitle: string
  imageAlt: string
  personalDataAgreementPrefix: string
  personalDataPolicy: string
  consultationPoints: string[]
  form: {
    name: string
    phone: string
    email: string
    message: string
    submit: string
  }
  metadata: {
    title: string
    description: string
  }
}

export const homeMessages: Partial<Record<AppLocale, HomeMessages>> = {
  ru: {
    hero: {
      eyebrow: 'Грузоперевозки',
      title: 'В труднодоступные районы Севера',
    },
    transportCapabilitiesTitle: 'Наши транспортные возможности',
    transportCapabilitiesDescription:
      'В арсенале нашей компании есть все необходимые транспортные возможности, чтобы организовать перевозку груза оптимальным способом. С момента своего основания компания "Ранвей Транс" заработала репутацию одной из самых надёжных в отрасли. Доверьте нам решение своей задачи и убедитесь, что мы учитываем интересы каждого клиента и обеспечиваем высокое качество требуемого результата.',
    coreServices: [
      { label: 'Грузоперевозки на Витязях', description: 'Основной вид деятельности. Доставляем всё!' },
      {
        label: 'Грузоперевозки по зимникам',
        description: 'Доставка грузов полуприцепами и тралами по специализированным дорогам и зимникам',
      },
      {
        label: 'Грузоперевозки на вездеходах',
        description: 'Грузоперевозки вездеходами на колёсах низкого давления',
      },
      {
        label: 'Услуги кранов и аварийных комплексов',
        description:
          'Услуги аварийного комплекса на базе болотохода ДТ-30 с оборудованным манипулятором и экскаватором',
      },
    ],
    ctaRequest: 'Оформить заявку',
    cargoTitle: 'Что мы перевозим',
    cargoDescription:
      'Мы доставляем всё: от крупногабаритной спецтехники, оборудования, опасных грузов до малогабаритных сборных грузов.',
    capabilities: [
      'Крупногабаритные и тяжеловесные грузы',
      'Специальная и строительная техника',
      'Различное оборудование',
      'Опасные грузы',
      'Нефтепромысловое оборудование',
      'Люди',
    ],
    advantagesTitle: 'Наши преимущества',
    advantages: [
      {
        label: 'Собственный парк техники',
        description:
          'Располагаем надёжной техникой для работы в северном климаете. Подберём оптимальный транспорт под любую заявку',
      },
      {
        label: 'Готовы привезти любой груз',
        description: 'Крупногабаритные, длинномерные, тяжеловесные и опасные грузы',
      },
      {
        label: 'Работаем в сложных условиях',
        description:
          'Перевезём груз в труднодоступные районы, на месторождения и нефтегазовые объекты в тундре, выполним перевозку по зимникам',
      },
      {
        label: 'Работаем в любое время года',
        description: 'Бесперебойно работаем как летом, так и в самые невообразимые морозы',
      },
      {
        label: 'Комплексное решение в одном договоре',
        description:
          'Берём на себя задачи по разработке маршрута и подготовке расчётов, организации погрузки, безопасной доставке вашего груза',
      },
      {
        label: 'Огромный опыт',
        description: 'Стабильно входим в приоритетные компании по грузоперевозкам',
      },
    ],
    playVideoAria: 'Воспроизвести видео',
    mapButton: 'Смотреть маршрут на карте',
    metrics: [
      { label: 'Год основания', value: '2008' },
      { label: 'Перевозок в год', value: '>690' },
      { label: 'Единиц спецтехники', value: '14' },
      { label: 'Клиентов', value: '>50' },
      { label: 'Собственных маршрутов', value: '80%' },
    ],
    workWithUsTitle: 'Начните работать с нами',
    imageAlt: 'Вездеходная техника',
    personalDataAgreementPrefix: 'Я согласен с',
    personalDataPolicy: 'политикой обработки персональных данных',
    consultationPoints: [
      'Расчёт стоимости перевозки',
      'Сроки доставки',
      'Консультация специалистов',
      'Прочие вопросы',
    ],
    form: {
      name: 'Ваше имя*',
      phone: 'Телефон*',
      email: 'E-mail',
      message: 'Сообщение',
      submit: 'Отправить',
    },
    metadata: {
      title: 'RunwayTrans — грузоперевозки в труднодоступные районы Севера',
      description:
        'Профессиональные перевозки тяжеловесных и негабаритных грузов, логистика и сопровождение в северных регионах.',
    },
  },
  en: {
    hero: {
      eyebrow: 'Cargo transportation',
      title: 'To hard-to-reach northern regions',
    },
    transportCapabilitiesTitle: 'Our transport capabilities',
    transportCapabilitiesDescription:
      'Our company has every transport capability required to deliver cargo in the most efficient way. Since its founding, Runway Trans has built a reputation as one of the most reliable companies in the industry. Entrust your task to us and see how we take every client interest into account and deliver consistently high-quality results.',
    coreServices: [
      { label: 'Vityaz all-terrain cargo transportation', description: 'Our core service. We deliver everything!' },
      {
        label: 'Winter-road cargo transportation',
        description: 'Cargo delivery by semi-trailers and low-loaders on specialized winter roads',
      },
      {
        label: 'All-terrain vehicle transportation',
        description: 'Cargo transportation by low-pressure wheeled all-terrain vehicles',
      },
      {
        label: 'Crane and emergency complex services',
        description:
          'Emergency complex services on DT-30 swamp vehicle base with equipped manipulator and excavator',
      },
    ],
    ctaRequest: 'Submit request',
    cargoTitle: 'What we transport',
    cargoDescription:
      'We deliver everything: from oversized machinery, equipment and hazardous cargo to small consolidated shipments.',
    capabilities: [
      'Oversized and heavy cargo',
      'Special and construction machinery',
      'Various equipment',
      'Hazardous cargo',
      'Oilfield equipment',
      'People',
    ],
    advantagesTitle: 'Our advantages',
    advantages: [
      {
        label: 'Own fleet of machinery',
        description:
          'We operate reliable machinery adapted for northern climate conditions and choose optimal transport for each request.',
      },
      {
        label: 'Ready to deliver any cargo',
        description: 'Oversized, long-length, heavy and hazardous cargo',
      },
      {
        label: 'Experienced in harsh conditions',
        description:
          'We deliver cargo to hard-to-reach regions, fields and oil-and-gas facilities in the tundra, including winter-road logistics.',
      },
      {
        label: 'Operate year-round',
        description: 'We work continuously in summer and during extreme winter temperatures.',
      },
      {
        label: 'End-to-end solution in one contract',
        description:
          'We handle route planning, calculations, loading organization and safe delivery of your cargo.',
      },
      {
        label: 'Extensive expertise',
        description: 'We are consistently among priority cargo transportation providers.',
      },
    ],
    playVideoAria: 'Play video',
    mapButton: 'View route on map',
    metrics: [
      { label: 'Founded', value: '2008' },
      { label: 'Shipments per year', value: '>690' },
      { label: 'Special vehicles', value: '14' },
      { label: 'Clients', value: '>50' },
      { label: 'Own routes', value: '80%' },
    ],
    workWithUsTitle: 'Start working with us',
    imageAlt: 'All-terrain machinery',
    personalDataAgreementPrefix: 'I agree with the',
    personalDataPolicy: 'personal data processing policy',
    consultationPoints: ['Cost estimation', 'Delivery timelines', 'Expert consultation', 'Other questions'],
    form: {
      name: 'Your name*',
      phone: 'Phone*',
      email: 'E-mail',
      message: 'Message',
      submit: 'Send',
    },
    metadata: {
      title: 'RunwayTrans — cargo transportation to remote northern regions',
      description:
        'Professional heavy and oversized cargo transportation, logistics, and support services in northern regions.',
    },
  },
}

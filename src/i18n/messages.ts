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

type RunwayTransTodayFaqItem = { question: string; answer: string }

type RunwayTransTodayMessages = {
  breadcrumbsAria: string
  homeLink: string
  pageTitle: string
  breadcrumbsTitle: string
  videoTitle: string
  videoUnsupported: string
  videoPlaceholder: string
  faqItems: RunwayTransTodayFaqItem[]
  metadata: {
    title: string
    description: string
  }
}

type HistoryTimelineItem = { years: string; title: string; description: string }

type HistoryMessages = {
  breadcrumbsAria: string
  homeLink: string
  pageTitle: string
  breadcrumbsTitle: string
  timeline: HistoryTimelineItem[]
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
      {
        label: 'Грузоперевозки на Витязях',
        description: 'Основной вид деятельности. Доставляем всё!',
      },
      {
        label: 'Грузоперевозки по зимникам',
        description:
          'Доставка грузов полуприцепами и тралами по специализированным дорогам и зимникам',
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
      {
        label: 'Vityaz all-terrain cargo transportation',
        description: 'Our core service. We deliver everything!',
      },
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
    consultationPoints: [
      'Cost estimation',
      'Delivery timelines',
      'Expert consultation',
      'Other questions',
    ],
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
  de: {
    hero: {
      eyebrow: 'Gutertransporte',
      title: 'In schwer erreichbare Regionen des Nordens',
    },
    transportCapabilitiesTitle: 'Unsere Transportmoglichkeiten',
    transportCapabilitiesDescription:
      'Unser Unternehmen verfugt uber alle notwendigen Transportmoglichkeiten, um Fracht optimal zu liefern. Seit der Grundung hat Runway Trans den Ruf eines zuverlassigen Partners in der Branche aufgebaut. Vertrauen Sie uns Ihre Aufgabe an und uberzeugen Sie sich davon, dass wir die Interessen jedes Kunden berucksichtigen und hohe Ergebnisqualitat liefern.',
    coreServices: [
      {
        label: 'Gutertransporte mit Vityaz-Fahrzeugen',
        description: 'Unser Kerngeschaft. Wir liefern alles.',
      },
      {
        label: 'Gutertransporte uber Winterstrassen',
        description:
          'Lieferung mit Sattelaufliegern und Tiefladern auf spezialisierten Strassen und Winterrouten',
      },
      {
        label: 'Transporte mit Gelandefahrzeugen',
        description: 'Frachttransport mit Niederdruck-Radfahrzeugen',
      },
      {
        label: 'Kran- und Notfallkomplexe',
        description:
          'Notfallkomplexe auf Basis des DT-30-Sumpffahrzeugs mit Manipulator und Bagger',
      },
    ],
    ctaRequest: 'Anfrage senden',
    cargoTitle: 'Was wir transportieren',
    cargoDescription:
      'Wir liefern alles: von ubermassiger Spezialtechnik, Ausrustung und Gefahrgut bis zu kleinen Sammelladungen.',
    capabilities: [
      'Ubermassige und schwere Fracht',
      'Spezial- und Baumaschinen',
      'Verschiedene Ausrustung',
      'Gefahrgut',
      'Olfeldausrustung',
      'Personen',
    ],
    advantagesTitle: 'Unsere Vorteile',
    advantages: [
      {
        label: 'Eigener Fuhrpark',
        description:
          'Wir verfugen uber zuverlassige Technik fur nordliches Klima und wahlen den passenden Transport fur jede Anfrage.',
      },
      {
        label: 'Bereit fur jede Fracht',
        description: 'Ubermassige, lange, schwere und gefahrliche Fracht',
      },
      {
        label: 'Arbeit unter schwierigen Bedingungen',
        description:
          'Wir liefern in schwer erreichbare Regionen, auf Felder und Ol- und Gasanlagen, einschliesslich Winterstrassenlogistik.',
      },
      {
        label: 'Ganzjahriger Betrieb',
        description: 'Wir arbeiten kontinuierlich im Sommer und bei extremen Wintertemperaturen.',
      },
      {
        label: 'Komplettlosung in einem Vertrag',
        description:
          'Wir ubernehmen Routenplanung, Berechnungen, Beladung und sichere Lieferung Ihrer Fracht.',
      },
      {
        label: 'Umfangreiche Erfahrung',
        description: 'Wir gehoren stabil zu den bevorzugten Anbietern fur Gutertransporte.',
      },
    ],
    playVideoAria: 'Video abspielen',
    mapButton: 'Route auf der Karte ansehen',
    metrics: [
      { label: 'Grundungsjahr', value: '2008' },
      { label: 'Transporte pro Jahr', value: '>690' },
      { label: 'Spezialfahrzeuge', value: '14' },
      { label: 'Kunden', value: '>50' },
      { label: 'Eigene Routen', value: '80%' },
    ],
    workWithUsTitle: 'Beginnen Sie die Zusammenarbeit mit uns',
    imageAlt: 'Gelandetechnik',
    personalDataAgreementPrefix: 'Ich stimme der',
    personalDataPolicy: 'Richtlinie zur Verarbeitung personenbezogener Daten zu',
    consultationPoints: [
      'Kostenberechnung fur den Transport',
      'Lieferfristen',
      'Beratung durch Spezialisten',
      'Weitere Fragen',
    ],
    form: {
      name: 'Ihr Name*',
      phone: 'Telefon*',
      email: 'E-mail',
      message: 'Nachricht',
      submit: 'Senden',
    },
    metadata: {
      title: 'RunwayTrans - Gutertransporte in schwer erreichbare Regionen des Nordens',
      description:
        'Professionelle Transporte schwerer und ubermassiger Fracht, Logistik und Begleitung in nordlichen Regionen.',
    },
  },
  fr: {
    hero: {
      eyebrow: 'Transport de marchandises',
      title: 'Vers les regions difficiles d acces du Nord',
    },
    transportCapabilitiesTitle: 'Nos capacites de transport',
    transportCapabilitiesDescription:
      'Notre entreprise dispose de toutes les capacites de transport necessaires pour organiser la livraison de marchandises de maniere optimale. Depuis sa creation, Runway Trans a acquis la reputation d un partenaire fiable dans le secteur. Confiez-nous votre mission et constatez que nous tenons compte des interets de chaque client tout en assurant un resultat de qualite.',
    coreServices: [
      {
        label: 'Transport avec vehicules Vityaz',
        description: 'Notre activite principale. Nous livrons tout.',
      },
      {
        label: 'Transport sur routes d hiver',
        description:
          'Livraison par semi-remorques et porte-engins sur routes specialisees et itineraires hivernaux',
      },
      {
        label: 'Transport tout-terrain',
        description: 'Transport de marchandises avec vehicules a roues basse pression',
      },
      {
        label: 'Services de grues et complexes d urgence',
        description: 'Services d urgence sur base DT-30 avec manipulateur et excavatrice equipes',
      },
    ],
    ctaRequest: 'Envoyer une demande',
    cargoTitle: 'Ce que nous transportons',
    cargoDescription:
      'Nous livrons tout : machines hors gabarit, equipements, marchandises dangereuses et petites cargaisons groupees.',
    capabilities: [
      'Fret hors gabarit et lourd',
      'Machines speciales et de construction',
      'Equipements divers',
      'Marchandises dangereuses',
      'Equipements petroliers',
      'Personnes',
    ],
    advantagesTitle: 'Nos avantages',
    advantages: [
      {
        label: 'Parc de materiel propre',
        description:
          'Nous disposons d un materiel fiable pour le climat nordique et choisissons le transport adapte a chaque demande.',
      },
      {
        label: 'Prets a livrer tout type de fret',
        description: 'Fret hors gabarit, long, lourd et dangereux',
      },
      {
        label: 'Travail dans des conditions difficiles',
        description:
          'Nous livrons vers des zones difficiles d acces, des gisements et des sites petroliers et gaziers, y compris par routes d hiver.',
      },
      {
        label: 'Travail toute l annee',
        description:
          'Nous travaillons sans interruption en ete comme lors des temperatures hivernales extremes.',
      },
      {
        label: 'Solution complete dans un seul contrat',
        description:
          'Nous prenons en charge l itineraire, les calculs, l organisation du chargement et la livraison securisee.',
      },
      {
        label: 'Grande experience',
        description:
          'Nous faisons partie des partenaires prioritaires pour le transport de marchandises.',
      },
    ],
    playVideoAria: 'Lire la video',
    mapButton: 'Voir l itineraire sur la carte',
    metrics: [
      { label: 'Annee de creation', value: '2008' },
      { label: 'Transports par an', value: '>690' },
      { label: 'Vehicules speciaux', value: '14' },
      { label: 'Clients', value: '>50' },
      { label: 'Itineraires propres', value: '80%' },
    ],
    workWithUsTitle: 'Commencez a travailler avec nous',
    imageAlt: 'Materiel tout-terrain',
    personalDataAgreementPrefix: 'J accepte la',
    personalDataPolicy: 'politique de traitement des donnees personnelles',
    consultationPoints: [
      'Calcul du cout du transport',
      'Delais de livraison',
      'Consultation de specialistes',
      'Autres questions',
    ],
    form: {
      name: 'Votre nom*',
      phone: 'Telephone*',
      email: 'E-mail',
      message: 'Message',
      submit: 'Envoyer',
    },
    metadata: {
      title: 'RunwayTrans - transport vers les regions difficiles d acces du Nord',
      description:
        'Transport professionnel de fret lourd et hors gabarit, logistique et accompagnement dans les regions nordiques.',
    },
  },
  zh: {
    hero: {
      eyebrow: '货物运输',
      title: '运往北方偏远地区',
    },
    transportCapabilitiesTitle: '我们的运输能力',
    transportCapabilitiesDescription:
      '公司拥有组织高效货物运输所需的全部运输能力。自成立以来，Runway Trans 已在行业内建立了可靠合作伙伴的声誉。把您的任务交给我们，您将看到我们如何兼顾每位客户的需求并保证高质量结果。',
    coreServices: [
      {
        label: 'Vityaz 全地形车货物运输',
        description: '我们的核心业务。我们可以运送各种货物。',
      },
      {
        label: '冬季道路货物运输',
        description: '使用半挂车和低平板车沿专业道路和冬季道路配送货物',
      },
      {
        label: '全地形车辆运输',
        description: '使用低压轮式全地形车运输货物',
      },
      {
        label: '起重机和应急综合设备服务',
        description: '基于 DT-30 沼泽车并配备机械臂和挖掘设备的应急服务',
      },
    ],
    ctaRequest: '提交申请',
    cargoTitle: '我们运输什么',
    cargoDescription: '我们运输各种货物：从大型特种设备、器材和危险品到小批量拼装货物。',
    capabilities: ['超大和重型货物', '特种和工程机械', '各类设备', '危险货物', '油田设备', '人员'],
    advantagesTitle: '我们的优势',
    advantages: [
      {
        label: '自有设备车队',
        description: '我们拥有适合北方气候的可靠设备，并为每项申请选择最合适的运输方式。',
      },
      {
        label: '可运输任何货物',
        description: '超大、超长、重型和危险货物',
      },
      {
        label: '在复杂条件下作业',
        description: '我们向偏远地区、油气田和工业设施运输货物，包括冬季道路物流。',
      },
      {
        label: '全年运营',
        description: '无论夏季还是极寒冬季，我们都能持续作业。',
      },
      {
        label: '一份合同中的完整解决方案',
        description: '我们负责路线规划、费用计算、装载组织和安全交付。',
      },
      {
        label: '丰富经验',
        description: '我们长期是货物运输领域的优先合作伙伴之一。',
      },
    ],
    playVideoAria: '播放视频',
    mapButton: '在地图上查看路线',
    metrics: [
      { label: '成立年份', value: '2008' },
      { label: '每年运输次数', value: '>690' },
      { label: '特种车辆', value: '14' },
      { label: '客户', value: '>50' },
      { label: '自有路线', value: '80%' },
    ],
    workWithUsTitle: '开始与我们合作',
    imageAlt: '全地形设备',
    personalDataAgreementPrefix: '我同意',
    personalDataPolicy: '个人数据处理政策',
    consultationPoints: ['运输费用计算', '交付时间', '专家咨询', '其他问题'],
    form: {
      name: '您的姓名*',
      phone: '电话*',
      email: 'E-mail',
      message: '留言',
      submit: '发送',
    },
    metadata: {
      title: 'RunwayTrans - 运往北方偏远地区的货物运输',
      description: '北方地区重型和超大货物运输、物流及随行支持服务。',
    },
  },
}

export const historyMessages: Record<AppLocale, HistoryMessages> = {
  ru: {
    breadcrumbsAria: 'Хлебные крошки',
    homeLink: 'Главная',
    pageTitle: 'История',
    breadcrumbsTitle: 'История',
    timeline: [
      {
        years: '2008',
        title: 'Основание компании',
        description:
          'Были приобретены 2 тягача Iveco с полуприцепами, а также 1 болотоход «Витязь».',
      },
      {
        years: '2009',
        title: 'Работа в новых для нас регионах',
        description:
          'Приобретение ещё одного «Витязя». Транспортные услуги на болотоходах на длинные расстояния.',
      },
      {
        years: '2010',
        title: 'Признание в области транспортных услуг',
        description:
          'Руководители других компаний лично прилетали для благодарности ООО «Ранвей Транс».',
      },
      {
        years: '2011',
        title: 'Появление на Таймыре',
        description: 'Участие в разработке новых нефтяных месторождений.',
      },
      {
        years: '2012-2016',
        title: 'Понимание сильных и слабых сторон техники',
        description: 'Приобретение новых единиц спецтехники.',
      },
      {
        years: '2016-2020',
        title: 'Расширение присутствия компании',
        description: 'Иркутская область.',
      },
      {
        years: '2020-2022',
        title: 'Приобретение новых видов спецтехники',
        description: 'Экскаваторные и аварийные комплексы.',
      },
      {
        years: '2023',
        title: 'Занимаем лидирующие позиции',
        description: 'Наши вездеходы на всех месторождениях страны.',
      },
    ],
    metadata: {
      title: 'История',
      description: 'Ключевые этапы развития компании RunwayTrans с 2008 года по настоящее время.',
    },
  },
  en: {
    breadcrumbsAria: 'Breadcrumbs',
    homeLink: 'Home',
    pageTitle: 'History',
    breadcrumbsTitle: 'History',
    timeline: [
      {
        years: '2008',
        title: 'Company founded',
        description:
          'The company purchased 2 Iveco tractors with semi-trailers and 1 Vityaz tracked all-terrain vehicle.',
      },
      {
        years: '2009',
        title: 'Work in new regions',
        description:
          'Another Vityaz was added to the fleet. The company began long-distance transport services using tracked all-terrain vehicles.',
      },
      {
        years: '2010',
        title: 'Recognition in transport services',
        description:
          'Executives from other companies personally flew in to thank Runway Trans LLC.',
      },
      {
        years: '2011',
        title: 'Arrival on the Taymyr Peninsula',
        description: 'Participation in the development of new oil fields.',
      },
      {
        years: '2012-2016',
        title: 'Understanding equipment strengths and limits',
        description: 'Acquisition of new special-purpose machinery units.',
      },
      {
        years: '2016-2020',
        title: 'Expanding the company presence',
        description: 'Irkutsk Region.',
      },
      {
        years: '2020-2022',
        title: 'Acquisition of new special machinery types',
        description: 'Excavator and emergency response complexes.',
      },
      {
        years: '2023',
        title: 'Taking leading positions',
        description: 'Our all-terrain vehicles operate at fields across the country.',
      },
    ],
    metadata: {
      title: 'History',
      description: 'Key milestones in the development of RunwayTrans from 2008 to the present day.',
    },
  },
  de: {
    breadcrumbsAria: 'Breadcrumbs',
    homeLink: 'Startseite',
    pageTitle: 'Geschichte',
    breadcrumbsTitle: 'Geschichte',
    timeline: [
      {
        years: '2008',
        title: 'Grundung des Unternehmens',
        description:
          'Das Unternehmen kaufte 2 Iveco-Zugmaschinen mit Sattelaufliegern sowie 1 Vityaz-Ketten-Gelandefahrzeug.',
      },
      {
        years: '2009',
        title: 'Arbeit in neuen Regionen',
        description:
          'Ein weiterer Vityaz wurde angeschafft. Das Unternehmen begann Langstreckentransporte mit Ketten-Gelandefahrzeugen.',
      },
      {
        years: '2010',
        title: 'Anerkennung im Bereich Transportleistungen',
        description:
          'Fuhrungskrafte anderer Unternehmen reisten personlich an, um Runway Trans LLC zu danken.',
      },
      {
        years: '2011',
        title: 'Einsatz auf der Taimyr-Halbinsel',
        description: 'Beteiligung an der Erschliessung neuer Olfelder.',
      },
      {
        years: '2012-2016',
        title: 'Verstandnis der Starken und Grenzen der Technik',
        description: 'Anschaffung neuer Einheiten von Spezialtechnik.',
      },
      {
        years: '2016-2020',
        title: 'Ausbau der Unternehmensprasenz',
        description: 'Region Irkutsk.',
      },
      {
        years: '2020-2022',
        title: 'Anschaffung neuer Arten von Spezialtechnik',
        description: 'Bagger- und Notfallkomplexe.',
      },
      {
        years: '2023',
        title: 'Fuhrende Positionen',
        description: 'Unsere Gelandefahrzeuge sind auf Feldern im ganzen Land im Einsatz.',
      },
    ],
    metadata: {
      title: 'Geschichte',
      description: 'Wichtige Meilensteine in der Entwicklung von RunwayTrans von 2008 bis heute.',
    },
  },
  fr: {
    breadcrumbsAria: 'Fil d Ariane',
    homeLink: 'Accueil',
    pageTitle: 'Histoire',
    breadcrumbsTitle: 'Histoire',
    timeline: [
      {
        years: '2008',
        title: "Creation de l'entreprise",
        description:
          "L'entreprise a achete 2 tracteurs Iveco avec semi-remorques ainsi qu'un vehicule tout-terrain chenille Vityaz.",
      },
      {
        years: '2009',
        title: 'Travail dans de nouvelles regions',
        description:
          "Un autre Vityaz a ete ajoute au parc. L'entreprise a lance des services de transport longue distance avec des vehicules tout-terrain chenilles.",
      },
      {
        years: '2010',
        title: 'Reconnaissance dans les services de transport',
        description:
          "Des dirigeants d'autres entreprises sont venus personnellement remercier Runway Trans LLC.",
      },
      {
        years: '2011',
        title: 'Arrivee sur la peninsule de Taimyr',
        description: 'Participation au developpement de nouveaux gisements petroliers.',
      },
      {
        years: '2012-2016',
        title: 'Comprendre les points forts et les limites du materiel',
        description: "Acquisition de nouvelles unites d'equipement specialise.",
      },
      {
        years: '2016-2020',
        title: "Extension de la presence de l'entreprise",
        description: "Region d'Irkoutsk.",
      },
      {
        years: '2020-2022',
        title: "Acquisition de nouveaux types d'equipement specialise",
        description: "Complexes d'excavation et d'intervention d'urgence.",
      },
      {
        years: '2023',
        title: 'Positions de leader',
        description: 'Nos vehicules tout-terrain operent sur des gisements dans tout le pays.',
      },
    ],
    metadata: {
      title: 'Histoire',
      description: "Principales etapes du developpement de RunwayTrans de 2008 a aujourd'hui.",
    },
  },
  zh: {
    breadcrumbsAria: '面包屑导航',
    homeLink: '首页',
    pageTitle: '历史',
    breadcrumbsTitle: '历史',
    timeline: [
      {
        years: '2008',
        title: '公司成立',
        description: '公司购入 2 台 Iveco 牵引车及半挂车，以及 1 台 Vityaz 履带式全地形车。',
      },
      {
        years: '2009',
        title: '进入新的作业区域',
        description: '车队新增一台 Vityaz。公司开始使用履带式全地形车提供长距离运输服务。',
      },
      {
        years: '2010',
        title: '运输服务获得认可',
        description: '其他公司的管理人员亲自前来感谢 Runway Trans LLC。',
      },
      {
        years: '2011',
        title: '进入泰梅尔地区',
        description: '参与新油田开发项目。',
      },
      {
        years: '2012-2016',
        title: '深入了解设备优势与局限',
        description: '采购新的专用设备。',
      },
      {
        years: '2016-2020',
        title: '扩大公司业务覆盖',
        description: '伊尔库茨克州。',
      },
      {
        years: '2020-2022',
        title: '采购新类型专用设备',
        description: '挖掘机和应急作业综合设备。',
      },
      {
        years: '2023',
        title: '占据领先地位',
        description: '我们的全地形车服务于全国各地的作业现场。',
      },
    ],
    metadata: {
      title: '历史',
      description: 'RunwayTrans 自 2008 年至今的发展关键阶段。',
    },
  },
}

export const runwayTransTodayMessages: Record<AppLocale, RunwayTransTodayMessages> = {
  ru: {
    breadcrumbsAria: 'Хлебные крошки',
    homeLink: 'Главная',
    pageTitle: 'Ранвей Транс сегодня',
    breadcrumbsTitle: 'Ранвей Транс сегодня',
    videoTitle: 'Презентация компании Ранвей Транс',
    videoUnsupported: 'Ваш браузер не поддерживает встроенное видео.',
    videoPlaceholder:
      'Добавьте ссылку или загрузите видео-файл в админке, чтобы показать его на странице.',
    faqItems: [
      {
        question: 'Почему Ранвей Транс надежный партнер?',
        answer:
          'Мы работаем в сложных условиях, используем собственный парк техники и обеспечиваем прозрачность на каждом этапе перевозки.',
      },
      {
        question: 'Что символизирует логотип компании?',
        answer:
          'Логотип отражает движение, технологичность и устойчивость нашей команды в любых дорожных и климатических условиях.',
      },
      {
        question: 'Какая деятельность у компании?',
        answer:
          'Организуем грузоперевозки, экспедицию, доставку спецтехники, а также сопутствующие логистические услуги для бизнеса.',
      },
    ],
    metadata: {
      title: 'Ранвей Транс сегодня',
      description:
        'Страница о компании Runway Trans сегодня: видео о компании, ключевые вопросы и ответы.',
    },
  },
  en: {
    breadcrumbsAria: 'Breadcrumbs',
    homeLink: 'Home',
    pageTitle: 'Runway Trans Today',
    breadcrumbsTitle: 'Runway Trans Today',
    videoTitle: 'Runway Trans company presentation',
    videoUnsupported: 'Your browser does not support embedded video.',
    videoPlaceholder:
      'Add a link or upload a video file in the admin panel to show it on this page.',
    faqItems: [
      {
        question: 'Why is Runway Trans a reliable partner?',
        answer:
          'We work in demanding conditions, operate our own fleet, and keep every stage of transportation transparent.',
      },
      {
        question: 'What does the company logo symbolize?',
        answer:
          'The logo reflects movement, technology, and the resilience of our team in any road and climate conditions.',
      },
      {
        question: 'What does the company do?',
        answer:
          'We organize cargo transportation, forwarding, special machinery delivery, and related logistics services for businesses.',
      },
    ],
    metadata: {
      title: 'Runway Trans Today',
      description: 'A page about Runway Trans today: company video, key questions, and answers.',
    },
  },
  de: {
    breadcrumbsAria: 'Breadcrumbs',
    homeLink: 'Startseite',
    pageTitle: 'Runway Trans heute',
    breadcrumbsTitle: 'Runway Trans heute',
    videoTitle: 'Unternehmensprasentation von Runway Trans',
    videoUnsupported: 'Ihr Browser unterstutzt kein eingebettetes Video.',
    videoPlaceholder:
      'Fugen Sie im Adminbereich einen Link hinzu oder laden Sie eine Videodatei hoch, um sie auf dieser Seite anzuzeigen.',
    faqItems: [
      {
        question: 'Warum ist Runway Trans ein zuverlassiger Partner?',
        answer:
          'Wir arbeiten unter anspruchsvollen Bedingungen, nutzen einen eigenen Fuhrpark und sorgen in jeder Transportphase fur Transparenz.',
      },
      {
        question: 'Wofur steht das Firmenlogo?',
        answer:
          'Das Logo steht fur Bewegung, Technologie und die Widerstandsfahigkeit unseres Teams bei allen Strassen- und Klimabedingungen.',
      },
      {
        question: 'Was macht das Unternehmen?',
        answer:
          'Wir organisieren Gutertransporte, Spedition, Lieferung von Spezialtechnik sowie begleitende Logistikleistungen fur Unternehmen.',
      },
    ],
    metadata: {
      title: 'Runway Trans heute',
      description:
        'Eine Seite uber Runway Trans heute: Unternehmensvideo, zentrale Fragen und Antworten.',
    },
  },
  fr: {
    breadcrumbsAria: 'Fil d Ariane',
    homeLink: 'Accueil',
    pageTitle: "Runway Trans aujourd'hui",
    breadcrumbsTitle: "Runway Trans aujourd'hui",
    videoTitle: "Presentation de l'entreprise Runway Trans",
    videoUnsupported: 'Votre navigateur ne prend pas en charge la video integree.',
    videoPlaceholder:
      'Ajoutez un lien ou televersez un fichier video dans l administration pour l afficher sur cette page.',
    faqItems: [
      {
        question: 'Pourquoi Runway Trans est-il un partenaire fiable ?',
        answer:
          'Nous travaillons dans des conditions difficiles, utilisons notre propre parc de materiel et assurons la transparence a chaque etape du transport.',
      },
      {
        question: "Que symbolise le logo de l'entreprise ?",
        answer:
          'Le logo exprime le mouvement, la technologie et la stabilite de notre equipe dans toutes les conditions routieres et climatiques.',
      },
      {
        question: "Quelle est l'activite de l'entreprise ?",
        answer:
          'Nous organisons le transport de marchandises, l expedition, la livraison de materiel specialise et les services logistiques associes pour les entreprises.',
      },
    ],
    metadata: {
      title: "Runway Trans aujourd'hui",
      description:
        "Page consacree a Runway Trans aujourd'hui : video de l'entreprise, questions cles et reponses.",
    },
  },
  zh: {
    breadcrumbsAria: '面包屑导航',
    homeLink: '首页',
    pageTitle: '今日 Runway Trans',
    breadcrumbsTitle: '今日 Runway Trans',
    videoTitle: 'Runway Trans 公司介绍',
    videoUnsupported: '您的浏览器不支持嵌入式视频。',
    videoPlaceholder: '请在管理后台添加链接或上传视频文件，以便在此页面显示。',
    faqItems: [
      {
        question: '为什么 Runway Trans 是可靠的合作伙伴？',
        answer: '我们在复杂条件下工作，拥有自有设备车队，并在运输的每个阶段保持流程透明。',
      },
      {
        question: '公司标志象征什么？',
        answer: '标志体现了运动、技术能力，以及我们的团队在各种道路和气候条件下的稳定性。',
      },
      {
        question: '公司主要从事什么业务？',
        answer: '我们为企业组织货物运输、货运代理、特种设备配送以及相关物流服务。',
      },
    ],
    metadata: {
      title: '今日 Runway Trans',
      description: '关于今日 Runway Trans 的页面：公司视频、关键问题与解答。',
    },
  },
}

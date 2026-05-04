import type { AppLocale } from './locales'

type CardMessage = { title: string; description: string }

type SimplePageMessages = {
  title: string
  metadata: {
    title: string
    description?: string
  }
}

type GuideMessages = SimplePageMessages & {
  breadcrumbsAria: string
  homeLink: string
  breadcrumbsTitle: string
  cardFallback: CardMessage
  mainGuideCards: CardMessage[]
  advantages: CardMessage[]
  peopleTitle: string
  galleryTitle: string
  galleryImageAlt: string
  personFallback: {
    fullName: string
    position: string
  }
}

type VacanciesMessages = SimplePageMessages & {
  detailsLink: string
}

type EquipmentMessages = SimplePageMessages & {
  empty: string
  noImage: string
}

type ServicesMessages = SimplePageMessages & {
  empty: string
  cardFallback: CardMessage
  transportedSectionTitle: string
  transportedItems: CardMessage[]
  advantagesSectionTitle: string
  advantagesItems: CardMessage[]
}

type PartnersMessages = SimplePageMessages & {
  homeLink: string
  breadcrumbsTitle: string
  description: string
  partnerFallback: string
  noLogo: string
  empty: string
  videoButtonLabel: string
}

type CasesMessages = SimplePageMessages & {
  homeLink: string
  breadcrumbsTitle: string
  description: string
  expertName: string
  expertRole: string
  reviewPrefix: string
  openVideoAria: string
}

type ContactsMessages = SimplePageMessages & {
  breadcrumbsAria: string
  homeLink: string
  addressTitle: string
  addressValue: string
  phoneTitle: string
  emailTitle: string
  callbackTitle: string
  phonePlaceholder: string
  consent: string
  submit: string
  mapTitle: string
  requisites: string
}

type GeographyDelivery = {
  id: string
  color: string
  period: string
  title: string
  route: string
  duration?: string
}

type GeographyMessages = SimplePageMessages & {
  breadcrumbsAria: string
  homeLink: string
  intro: string
  directionsTitle: string
  directions: Record<
    'chukotka' | 'sakha' | 'nenets' | 'kamchatka' | 'krasnoyarsk' | 'magadan' | 'yamal',
    string
  >
  mapAria: string
  mapTitle: string
  zoomIn: string
  zoomOut: string
  locate: string
  periodLabel: string
  vehicleAllTerrain: string
  vehicleCars: string
  cargoType: string
  region: string
  fallbackDeliveries: GeographyDelivery[]
}

type LocalizedPageMessages = {
  guide: GuideMessages
  vacancies: VacanciesMessages
  equipment: EquipmentMessages
  services: ServicesMessages
  partners: PartnersMessages
  cases: CasesMessages
  contacts: ContactsMessages
  geography: GeographyMessages
}

export const pageMessages: Record<AppLocale, LocalizedPageMessages> = {
  ru: {
    guide: {
      title: 'Руководство по грузоперевозкам',
      breadcrumbsAria: 'Хлебные крошки',
      homeLink: 'Главная',
      breadcrumbsTitle: 'Руководство',
      cardFallback: {
        title: 'Направление перевозок',
        description: 'Подбираем оптимальный маршрут и формат доставки под вашу задачу.',
      },
      mainGuideCards: [
        {
          title: 'Грузоперевозки на Витязях',
          description: 'Одиночные вездеходы, автономность, доступная цена',
        },
        {
          title: 'Грузоперевозки по зимникам',
          description: 'Доставка грузов спецтранспортом по подготовленным дорогам и зимникам',
        },
        {
          title: 'Грузоперевозки на вездеходах',
          description: 'Перевозка и экспедиция на колесах низкого давления',
        },
      ],
      advantages: [
        {
          title: 'Крупногабаритные и тяжеловесные грузы',
          description: 'Опыт перевозки сложных грузов в удаленные районы',
        },
        {
          title: 'Собственный парк техники',
          description: 'Надежная техника для работы на Севере и бездорожье',
        },
        {
          title: 'Комплексное решение',
          description: 'Берем на себя маршрут, расчеты, погрузку и безопасную доставку',
        },
      ],
      peopleTitle: 'Руководство',
      galleryTitle: 'Фотогалерея',
      galleryImageAlt: 'Фотография из галереи',
      personFallback: {
        fullName: 'Сотрудник компании',
        position: 'Специалист',
      },
      metadata: {
        title: 'Руководство',
        description: 'Руководство по услугам и условиям грузоперевозок RunwayTrans.',
      },
    },
    vacancies: {
      title: 'Вакансии',
      detailsLink: 'Подробнее и отклик ->',
      metadata: { title: 'Вакансии' },
    },
    equipment: {
      title: 'Техника',
      empty: 'Пока нет опубликованной техники.',
      noImage: 'Нет изображения',
      metadata: {
        title: 'Техника',
        description: 'Каталог техники компании RunwayTrans для перевозок в сложных условиях.',
      },
    },
    services: {
      title: 'Услуги',
      empty: 'Пока нет опубликованных услуг.',
      cardFallback: {
        title: 'Заголовок карточки',
        description: 'Описание карточки.',
      },
      transportedSectionTitle: 'Что мы перевозим',
      transportedItems: [
        {
          title: 'Крупногабаритные и тяжеловесные грузы',
          description: 'Опыт перевозки сложных грузов в удаленные районы.',
        },
        {
          title: 'Спецмашины и строительная техника',
          description: 'Подбираем транспорт под задачи промышленности и строительства.',
        },
        {
          title: 'Различное оборудование',
          description: 'Аккуратная погрузка, фиксация и доставка ценных грузов.',
        },
      ],
      advantagesSectionTitle: 'Наши преимущества',
      advantagesItems: [
        {
          title: 'Собственный парк техники',
          description: 'Располагаем надежной техникой для работы в северном климате.',
        },
        {
          title: 'Готовы привезти любой груз',
          description: 'Крупногабаритные, длинномерные, тяжеловесные и опасные грузы.',
        },
        {
          title: 'Работаем в сложных условиях',
          description: 'Перевозим грузы в труднодоступные районы и на промышленные объекты.',
        },
      ],
      metadata: {
        title: 'Услуги',
        description: 'Каталог услуг компании RunwayTrans для грузоперевозок и логистики.',
      },
    },
    partners: {
      title: 'Партнеры',
      homeLink: 'Главная',
      breadcrumbsTitle: 'Партнеры',
      description:
        'Компании, с которыми мы сотрудничаем в международной логистике и комплексных поставках.',
      partnerFallback: 'Партнер',
      noLogo: 'Нет логотипа',
      empty: 'Добавьте карточки партнеров в админке, чтобы они отобразились на странице.',
      videoButtonLabel: 'Смотреть видео отзывы',
      metadata: {
        title: 'Партнеры',
        description: 'Страница партнеров Runway Trans.',
      },
    },
    cases: {
      title: 'Кейсы',
      homeLink: 'Главная',
      breadcrumbsTitle: 'Кейсы',
      description:
        'Видео, отзывы и письма благодарности от клиентов, с которыми мы работали на сложных маршрутах.',
      expertName: 'Виктория Кондакова',
      expertRole: 'Эксперт по эксплуатации отелей в РФ',
      reviewPrefix: 'Кейс:',
      openVideoAria: 'Открыть видео-кейс',
      metadata: {
        title: 'Кейсы | RunwayTrans',
        description: 'Кейсы, видео и письма благодарности от клиентов RunwayTrans.',
      },
    },
    contacts: {
      title: 'Контакты',
      breadcrumbsAria: 'Хлебные крошки',
      homeLink: 'Главная',
      addressTitle: 'Наш головной офис',
      addressValue: 'г. Красноярск, ул. Красной Армии, 10',
      phoneTitle: 'Телефон',
      emailTitle: 'Email',
      callbackTitle: 'Заказать звонок',
      phonePlaceholder: 'Ваш номер телефона',
      consent: 'Я согласен(а) на обработку персональных данных',
      submit: 'Перезвонить',
      mapTitle: 'Карта офиса Runway Trans',
      requisites: 'Лицензия и реквизиты компании доступны по запросу.',
      metadata: {
        title: 'Контакты',
        description: 'Свяжитесь с Runway Trans: адрес, телефон, email и форма обратного звонка.',
      },
    },
    geography: {
      title: 'География',
      breadcrumbsAria: 'Хлебные крошки',
      homeLink: 'Главная',
      intro:
        'Транспортно-логистическая компания Ранвей Транс специализируется на доставке грузов преимущественно в районы Крайнего севера и приравненные к ним территории.',
      directionsTitle: 'Основные направления грузоперевозок',
      directions: {
        chukotka: 'Чукотский АО',
        sakha: 'Республика Саха (Якутия)',
        nenets: 'Ненецкий АО',
        kamchatka: 'Камчатский край',
        krasnoyarsk: 'Красноярский край',
        magadan: 'Магаданская область',
        yamal: 'Ямало-Ненецкий АО',
      },
      mapAria: 'Карта перевозок',
      mapTitle: 'Карта северных направлений грузоперевозок',
      zoomIn: 'Увеличить карту',
      zoomOut: 'Уменьшить карту',
      locate: 'Определить местоположение',
      periodLabel: 'Период',
      vehicleAllTerrain: 'Вездеходы',
      vehicleCars: 'Автомобили',
      cargoType: 'Тип груза',
      region: 'Регион',
      fallbackDeliveries: [
        {
          id: 'vankor-all-terrain',
          color: '#bd1395',
          period: 'Январь 2025 - Март 2025',
          title: 'Доставка грузов на Ванкор на вездеходах',
          route: '(п. Ярцево - п. Игарка - п. Байкаловск)',
          duration: '3 дня',
        },
        {
          id: 'pipeline-service',
          color: '#0e5ca6',
          period: 'Январь 2025 - Май 2025',
          title: 'Обслуживание нефтепровода',
          route: '(п. Караул - п. Таналау)',
        },
      ],
      metadata: {
        title: 'География',
        description: 'География грузоперевозок Runway Trans по районам Крайнего Севера.',
      },
    },
  },
  en: {
    guide: {
      title: 'Cargo Transportation Guide',
      breadcrumbsAria: 'Breadcrumbs',
      homeLink: 'Home',
      breadcrumbsTitle: 'Guide',
      cardFallback: {
        title: 'Transportation direction',
        description: 'We choose the best route and delivery format for your task.',
      },
      mainGuideCards: [
        {
          title: 'Cargo transportation by Vityaz vehicles',
          description: 'Single all-terrain vehicles, autonomy, and cost efficiency',
        },
        {
          title: 'Winter-road cargo transportation',
          description: 'Cargo delivery by special vehicles on prepared roads and winter routes',
        },
        {
          title: 'All-terrain vehicle logistics',
          description: 'Transportation and forwarding on low-pressure wheeled vehicles',
        },
      ],
      advantages: [
        {
          title: 'Oversized and heavy cargo',
          description: 'Experience delivering complex cargo to remote areas',
        },
        {
          title: 'Own fleet',
          description: 'Reliable machinery for work in the North and off-road conditions',
        },
        {
          title: 'End-to-end solution',
          description: 'We handle routing, calculations, loading, and safe delivery',
        },
      ],
      peopleTitle: 'Management',
      galleryTitle: 'Photo gallery',
      galleryImageAlt: 'Gallery photo',
      personFallback: { fullName: 'Company employee', position: 'Specialist' },
      metadata: {
        title: 'Guide',
        description: 'A guide to RunwayTrans cargo transportation services and terms.',
      },
    },
    vacancies: {
      title: 'Vacancies',
      detailsLink: 'Details and apply ->',
      metadata: { title: 'Vacancies' },
    },
    equipment: {
      title: 'Equipment',
      empty: 'No published equipment yet.',
      noImage: 'No image',
      metadata: {
        title: 'Equipment',
        description: 'RunwayTrans equipment catalog for transportation in demanding conditions.',
      },
    },
    services: {
      title: 'Services',
      empty: 'No published services yet.',
      cardFallback: { title: 'Card title', description: 'Card description.' },
      transportedSectionTitle: 'What we transport',
      transportedItems: [
        {
          title: 'Oversized and heavy cargo',
          description: 'Experience delivering complex cargo to remote areas.',
        },
        {
          title: 'Special and construction machinery',
          description: 'We choose transport for industrial and construction tasks.',
        },
        {
          title: 'Various equipment',
          description: 'Careful loading, securing, and delivery of valuable cargo.',
        },
      ],
      advantagesSectionTitle: 'Our advantages',
      advantagesItems: [
        {
          title: 'Own fleet',
          description: 'We operate reliable machinery for northern climate conditions.',
        },
        {
          title: 'Ready to deliver any cargo',
          description: 'Oversized, long-length, heavy, and hazardous cargo.',
        },
        {
          title: 'Work in harsh conditions',
          description: 'We deliver cargo to remote areas and industrial sites.',
        },
      ],
      metadata: {
        title: 'Services',
        description: 'RunwayTrans services catalog for cargo transportation and logistics.',
      },
    },
    partners: {
      title: 'Partners',
      homeLink: 'Home',
      breadcrumbsTitle: 'Partners',
      description:
        'Companies we work with in international logistics and integrated supply chains.',
      partnerFallback: 'Partner',
      noLogo: 'No logo',
      empty: 'Add partner cards in the admin panel to show them on this page.',
      videoButtonLabel: 'Watch video testimonials',
      metadata: { title: 'Partners', description: 'Runway Trans partners page.' },
    },
    cases: {
      title: 'Cases',
      homeLink: 'Home',
      breadcrumbsTitle: 'Cases',
      description:
        'Videos, testimonials, and letters of appreciation from clients we worked with on complex routes.',
      expertName: 'Victoria Kondakova',
      expertRole: 'Hotel operations expert in Russia',
      reviewPrefix: 'Case:',
      openVideoAria: 'Open video case',
      metadata: {
        title: 'Cases | RunwayTrans',
        description: 'RunwayTrans cases, videos, and client letters of appreciation.',
      },
    },
    contacts: {
      title: 'Contacts',
      breadcrumbsAria: 'Breadcrumbs',
      homeLink: 'Home',
      addressTitle: 'Head office',
      addressValue: 'Krasnoyarsk, Krasnoy Armii St., 10',
      phoneTitle: 'Phone',
      emailTitle: 'Email',
      callbackTitle: 'Request a call',
      phonePlaceholder: 'Your phone number',
      consent: 'I agree to personal data processing',
      submit: 'Call me back',
      mapTitle: 'Runway Trans office map',
      requisites: 'Company license and bank details are available on request.',
      metadata: {
        title: 'Contacts',
        description: 'Contact Runway Trans: address, phone, email, and callback form.',
      },
    },
    geography: {
      title: 'Geography',
      breadcrumbsAria: 'Breadcrumbs',
      homeLink: 'Home',
      intro:
        'Runway Trans specializes in cargo delivery mainly to the Far North and territories with equivalent operating conditions.',
      directionsTitle: 'Main Cargo Transportation Directions',
      directions: {
        chukotka: 'Chukotka Autonomous Okrug',
        sakha: 'Sakha Republic (Yakutia)',
        nenets: 'Nenets Autonomous Okrug',
        kamchatka: 'Kamchatka Krai',
        krasnoyarsk: 'Krasnoyarsk Krai',
        magadan: 'Magadan Oblast',
        yamal: 'Yamalo-Nenets Autonomous Okrug',
      },
      mapAria: 'Transportation map',
      mapTitle: 'Map of northern cargo transportation directions',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      locate: 'Find location',
      periodLabel: 'Period',
      vehicleAllTerrain: 'All-terrain vehicles',
      vehicleCars: 'Road vehicles',
      cargoType: 'Cargo type',
      region: 'Region',
      fallbackDeliveries: [
        {
          id: 'vankor-all-terrain',
          color: '#bd1395',
          period: 'January 2025 - March 2025',
          title: 'Cargo delivery to Vankor by all-terrain vehicles',
          route: '(Yartsevo - Igarka - Baikalovsk)',
          duration: '3 days',
        },
        {
          id: 'pipeline-service',
          color: '#0e5ca6',
          period: 'January 2025 - May 2025',
          title: 'Oil pipeline maintenance',
          route: '(Karaul - Tanalau)',
        },
      ],
      metadata: {
        title: 'Geography',
        description: 'Runway Trans cargo transportation geography across northern territories.',
      },
    },
  },
  de: {
    guide: {
      title: 'Leitfaden fur Gutertransporte',
      breadcrumbsAria: 'Breadcrumbs',
      homeLink: 'Startseite',
      breadcrumbsTitle: 'Leitfaden',
      cardFallback: {
        title: 'Transportrichtung',
        description: 'Wir wahlen Route und Lieferformat passend zu Ihrer Aufgabe.',
      },
      mainGuideCards: [
        {
          title: 'Transporte mit Vityaz-Fahrzeugen',
          description: 'Autarke Gelande-Fahrzeuge und effiziente Kosten',
        },
        {
          title: 'Transporte uber Winterstrassen',
          description: 'Lieferung uber vorbereitete Strassen und Winterrouten',
        },
        {
          title: 'Gelande-Logistik',
          description: 'Transport und Spedition mit Niederdruck-Radfahrzeugen',
        },
      ],
      advantages: [
        {
          title: 'Ubermassige und schwere Fracht',
          description: 'Erfahrung mit komplexer Fracht in abgelegene Regionen',
        },
        { title: 'Eigener Fuhrpark', description: 'Zuverlassige Technik fur Norden und Gelande' },
        {
          title: 'Komplettlosung',
          description: 'Route, Berechnung, Beladung und sichere Lieferung aus einer Hand',
        },
      ],
      peopleTitle: 'Leitung',
      galleryTitle: 'Fotogalerie',
      galleryImageAlt: 'Galeriefoto',
      personFallback: { fullName: 'Mitarbeiter', position: 'Spezialist' },
      metadata: {
        title: 'Leitfaden',
        description: 'Leitfaden zu Services und Bedingungen von RunwayTrans.',
      },
    },
    vacancies: {
      title: 'Stellenangebote',
      detailsLink: 'Details und Bewerbung ->',
      metadata: { title: 'Stellenangebote' },
    },
    equipment: {
      title: 'Technik',
      empty: 'Noch keine veroffentlichte Technik.',
      noImage: 'Kein Bild',
      metadata: {
        title: 'Technik',
        description: 'Technikkatalog von RunwayTrans fur anspruchsvolle Transporte.',
      },
    },
    services: {
      title: 'Leistungen',
      empty: 'Noch keine veroffentlichten Leistungen.',
      cardFallback: { title: 'Kartentitel', description: 'Kartenbeschreibung.' },
      transportedSectionTitle: 'Was wir transportieren',
      transportedItems: [
        {
          title: 'Ubermassige und schwere Fracht',
          description: 'Erfahrung mit komplexer Fracht in abgelegene Regionen.',
        },
        {
          title: 'Spezial- und Baumaschinen',
          description: 'Wir wahlen Transport fur Industrie und Bau.',
        },
        {
          title: 'Verschiedene Ausrustung',
          description: 'Sorgfaltige Beladung, Sicherung und Lieferung.',
        },
      ],
      advantagesSectionTitle: 'Unsere Vorteile',
      advantagesItems: [
        { title: 'Eigener Fuhrpark', description: 'Zuverlassige Technik fur nordliches Klima.' },
        {
          title: 'Jede Fracht',
          description: 'Ubermassige, lange, schwere und gefahrliche Fracht.',
        },
        {
          title: 'Schwierige Bedingungen',
          description: 'Lieferungen in abgelegene Regionen und Industrieanlagen.',
        },
      ],
      metadata: {
        title: 'Leistungen',
        description: 'RunwayTrans Leistungen fur Transporte und Logistik.',
      },
    },
    partners: {
      title: 'Partner',
      homeLink: 'Startseite',
      breadcrumbsTitle: 'Partner',
      description: 'Unternehmen, mit denen wir in Logistik und komplexen Lieferketten arbeiten.',
      partnerFallback: 'Partner',
      noLogo: 'Kein Logo',
      empty: 'Fugen Sie Partnerkarten im Adminbereich hinzu.',
      videoButtonLabel: 'Video-Referenzen ansehen',
      metadata: { title: 'Partner', description: 'Partnerseite von Runway Trans.' },
    },
    cases: {
      title: 'Projekte',
      homeLink: 'Startseite',
      breadcrumbsTitle: 'Projekte',
      description: 'Videos, Referenzen und Dankesschreiben von Kunden auf komplexen Routen.',
      expertName: 'Victoria Kondakova',
      expertRole: 'Expertin fur Hotelbetrieb in Russland',
      reviewPrefix: 'Projekt:',
      openVideoAria: 'Video-Projekt offnen',
      metadata: {
        title: 'Projekte | RunwayTrans',
        description: 'RunwayTrans Projekte, Videos und Kundenreferenzen.',
      },
    },
    contacts: {
      title: 'Kontakte',
      breadcrumbsAria: 'Breadcrumbs',
      homeLink: 'Startseite',
      addressTitle: 'Hauptburo',
      addressValue: 'Krasnojarsk, Krasnoy Armii Str. 10',
      phoneTitle: 'Telefon',
      emailTitle: 'Email',
      callbackTitle: 'Ruckruf anfordern',
      phonePlaceholder: 'Ihre Telefonnummer',
      consent: 'Ich stimme der Verarbeitung personenbezogener Daten zu',
      submit: 'Ruckruf',
      mapTitle: 'Karte des Runway Trans Buros',
      requisites: 'Lizenz und Firmendaten sind auf Anfrage verfugbar.',
      metadata: {
        title: 'Kontakte',
        description: 'Kontaktieren Sie Runway Trans: Adresse, Telefon, Email und Formular.',
      },
    },
    geography: {
      title: 'Geografie',
      breadcrumbsAria: 'Breadcrumbs',
      homeLink: 'Startseite',
      intro:
        'Runway Trans ist auf Frachtlieferungen vor allem in den Hohen Norden und gleichgestellte Gebiete spezialisiert.',
      directionsTitle: 'Wichtige Richtungen fur Gutertransporte',
      directions: {
        chukotka: 'Autonomer Kreis Tschukotka',
        sakha: 'Republik Sacha (Jakutien)',
        nenets: 'Autonomer Kreis der Nenzen',
        kamchatka: 'Region Kamtschatka',
        krasnoyarsk: 'Region Krasnojarsk',
        magadan: 'Oblast Magadan',
        yamal: 'Autonomer Kreis der Jamal-Nenzen',
      },
      mapAria: 'Transportkarte',
      mapTitle: 'Karte der nordlichen Transportrichtungen',
      zoomIn: 'Karte vergrossern',
      zoomOut: 'Karte verkleinern',
      locate: 'Standort bestimmen',
      periodLabel: 'Zeitraum',
      vehicleAllTerrain: 'Gelandefahrzeuge',
      vehicleCars: 'Fahrzeuge',
      cargoType: 'Frachtart',
      region: 'Region',
      fallbackDeliveries: [
        {
          id: 'vankor-all-terrain',
          color: '#bd1395',
          period: 'Januar 2025 - Marz 2025',
          title: 'Frachtlieferung nach Wankor mit Gelandefahrzeugen',
          route: '(Jartsewo - Igarka - Baikalowsk)',
          duration: '3 Tage',
        },
        {
          id: 'pipeline-service',
          color: '#0e5ca6',
          period: 'Januar 2025 - Mai 2025',
          title: 'Wartung der Olpipeline',
          route: '(Karaul - Tanalau)',
        },
      ],
      metadata: {
        title: 'Geografie',
        description: 'Geografie der Runway Trans Frachttransporte in nordlichen Gebieten.',
      },
    },
  },
  fr: {
    guide: {
      title: 'Guide du transport de marchandises',
      breadcrumbsAria: 'Fil d Ariane',
      homeLink: 'Accueil',
      breadcrumbsTitle: 'Guide',
      cardFallback: {
        title: 'Direction de transport',
        description: 'Nous choisissons le meilleur itineraire pour votre besoin.',
      },
      mainGuideCards: [
        {
          title: 'Transport avec vehicules Vityaz',
          description: 'Vehicules tout-terrain autonomes et cout maitrise',
        },
        {
          title: 'Transport sur routes d hiver',
          description: 'Livraison sur routes preparees et itineraire hivernal',
        },
        {
          title: 'Logistique tout-terrain',
          description: 'Transport et expedition sur vehicules basse pression',
        },
      ],
      advantages: [
        {
          title: 'Fret hors gabarit et lourd',
          description: 'Experience des cargaisons complexes vers des zones eloignees',
        },
        { title: 'Parc propre', description: 'Materiel fiable pour le Nord et le hors-route' },
        {
          title: 'Solution complete',
          description: 'Itineraire, calculs, chargement et livraison securisee',
        },
      ],
      peopleTitle: 'Direction',
      galleryTitle: 'Galerie photo',
      galleryImageAlt: 'Photo de galerie',
      personFallback: { fullName: 'Employe de l entreprise', position: 'Specialiste' },
      metadata: {
        title: 'Guide',
        description: 'Guide des services et conditions de transport RunwayTrans.',
      },
    },
    vacancies: {
      title: 'Postes vacants',
      detailsLink: 'Details et postuler ->',
      metadata: { title: 'Postes vacants' },
    },
    equipment: {
      title: 'Materiel',
      empty: 'Aucun materiel publie pour le moment.',
      noImage: 'Aucune image',
      metadata: {
        title: 'Materiel',
        description: 'Catalogue du materiel RunwayTrans pour conditions difficiles.',
      },
    },
    services: {
      title: 'Services',
      empty: 'Aucun service publie pour le moment.',
      cardFallback: { title: 'Titre de carte', description: 'Description de carte.' },
      transportedSectionTitle: 'Ce que nous transportons',
      transportedItems: [
        {
          title: 'Fret hors gabarit et lourd',
          description: 'Experience des cargaisons complexes vers des zones eloignees.',
        },
        {
          title: 'Machines speciales et de construction',
          description: 'Nous choisissons le transport selon la mission.',
        },
        {
          title: 'Equipements divers',
          description: 'Chargement soigne, fixation et livraison de valeur.',
        },
      ],
      advantagesSectionTitle: 'Nos avantages',
      advantagesItems: [
        { title: 'Parc propre', description: 'Materiel fiable pour le climat nordique.' },
        { title: 'Tout type de fret', description: 'Fret hors gabarit, long, lourd et dangereux.' },
        {
          title: 'Conditions difficiles',
          description: 'Livraison vers zones eloignees et sites industriels.',
        },
      ],
      metadata: {
        title: 'Services',
        description: 'Catalogue des services RunwayTrans pour transport et logistique.',
      },
    },
    partners: {
      title: 'Partenaires',
      homeLink: 'Accueil',
      breadcrumbsTitle: 'Partenaires',
      description:
        'Entreprises avec lesquelles nous collaborons en logistique et chaines d approvisionnement.',
      partnerFallback: 'Partenaire',
      noLogo: 'Pas de logo',
      empty: 'Ajoutez des cartes partenaires dans l administration.',
      videoButtonLabel: 'Voir les temoignages video',
      metadata: { title: 'Partenaires', description: 'Page des partenaires Runway Trans.' },
    },
    cases: {
      title: 'Cas clients',
      homeLink: 'Accueil',
      breadcrumbsTitle: 'Cas clients',
      description:
        'Videos, temoignages et lettres de remerciement de clients sur des itineraire complexes.',
      expertName: 'Victoria Kondakova',
      expertRole: 'Experte en exploitation hoteliere en Russie',
      reviewPrefix: 'Cas:',
      openVideoAria: 'Ouvrir le cas video',
      metadata: {
        title: 'Cas clients | RunwayTrans',
        description: 'Cas clients, videos et temoignages RunwayTrans.',
      },
    },
    contacts: {
      title: 'Contacts',
      breadcrumbsAria: 'Fil d Ariane',
      homeLink: 'Accueil',
      addressTitle: 'Siege principal',
      addressValue: 'Krasnoiarsk, rue Krasnoy Armii, 10',
      phoneTitle: 'Telephone',
      emailTitle: 'Email',
      callbackTitle: 'Demander un appel',
      phonePlaceholder: 'Votre numero de telephone',
      consent: 'J accepte le traitement des donnees personnelles',
      submit: 'Me rappeler',
      mapTitle: 'Carte du bureau Runway Trans',
      requisites: 'La licence et les informations de l entreprise sont disponibles sur demande.',
      metadata: {
        title: 'Contacts',
        description: 'Contactez Runway Trans : adresse, telephone, email et formulaire.',
      },
    },
    geography: {
      title: 'Geographie',
      breadcrumbsAria: 'Fil d Ariane',
      homeLink: 'Accueil',
      intro:
        'Runway Trans est specialisee dans la livraison de fret principalement vers le Grand Nord et les territoires assimiles.',
      directionsTitle: 'Principales directions de transport de fret',
      directions: {
        chukotka: 'District autonome de Tchoukotka',
        sakha: 'Republique de Sakha (Yakoutie)',
        nenets: 'District autonome des Nenets',
        kamchatka: 'Krai du Kamtchatka',
        krasnoyarsk: 'Krai de Krasnoiarsk',
        magadan: 'Oblast de Magadan',
        yamal: 'District autonome de Iamalo-Nenets',
      },
      mapAria: 'Carte des transports',
      mapTitle: 'Carte des directions de transport vers le Nord',
      zoomIn: 'Agrandir la carte',
      zoomOut: 'Reduire la carte',
      locate: 'Determiner la position',
      periodLabel: 'Periode',
      vehicleAllTerrain: 'Vehicules tout-terrain',
      vehicleCars: 'Vehicules routiers',
      cargoType: 'Type de fret',
      region: 'Region',
      fallbackDeliveries: [
        {
          id: 'vankor-all-terrain',
          color: '#bd1395',
          period: 'Janvier 2025 - Mars 2025',
          title: 'Livraison de fret vers Vankor en vehicules tout-terrain',
          route: '(Yartsevo - Igarka - Baikalovsk)',
          duration: '3 jours',
        },
        {
          id: 'pipeline-service',
          color: '#0e5ca6',
          period: 'Janvier 2025 - Mai 2025',
          title: 'Maintenance de l oleoduc',
          route: '(Karaul - Tanalau)',
        },
      ],
      metadata: {
        title: 'Geographie',
        description: 'Geographie des transports de fret Runway Trans dans les territoires du Nord.',
      },
    },
  },
  zh: {
    guide: {
      title: '货物运输指南',
      breadcrumbsAria: '面包屑导航',
      homeLink: '首页',
      breadcrumbsTitle: '指南',
      cardFallback: {
        title: '运输方向',
        description: '我们会为您的任务选择合适的路线和交付方式。',
      },
      mainGuideCards: [
        { title: 'Vityaz 全地形车运输', description: '单车运输、自主运行、成本可控' },
        { title: '冬季道路运输', description: '沿准备好的道路和冬季路线进行货物配送' },
        { title: '全地形物流', description: '使用低压轮式车辆进行运输和货运代理' },
      ],
      advantages: [
        { title: '超大和重型货物', description: '具备向偏远地区运输复杂货物的经验' },
        { title: '自有设备车队', description: '适合北方和越野环境的可靠设备' },
        { title: '完整解决方案', description: '负责路线、计算、装载和安全交付' },
      ],
      peopleTitle: '管理团队',
      galleryTitle: '图片库',
      galleryImageAlt: '图库照片',
      personFallback: { fullName: '公司员工', position: '专家' },
      metadata: { title: '指南', description: 'RunwayTrans 货物运输服务和条件指南。' },
    },
    vacancies: { title: '招聘职位', detailsLink: '详情并申请 ->', metadata: { title: '招聘职位' } },
    equipment: {
      title: '设备',
      empty: '暂无已发布设备。',
      noImage: '无图片',
      metadata: { title: '设备', description: 'RunwayTrans 复杂条件运输设备目录。' },
    },
    services: {
      title: '服务',
      empty: '暂无已发布服务。',
      cardFallback: { title: '卡片标题', description: '卡片描述。' },
      transportedSectionTitle: '我们运输什么',
      transportedItems: [
        { title: '超大和重型货物', description: '具备向偏远地区运输复杂货物的经验。' },
        { title: '特种和工程机械', description: '根据工业和施工任务选择运输方案。' },
        { title: '各类设备', description: '谨慎装载、固定并交付贵重货物。' },
      ],
      advantagesSectionTitle: '我们的优势',
      advantagesItems: [
        { title: '自有设备车队', description: '适用于北方气候的可靠设备。' },
        { title: '可运输各种货物', description: '超大、超长、重型和危险货物。' },
        { title: '复杂条件作业', description: '向偏远地区和工业现场交付货物。' },
      ],
      metadata: { title: '服务', description: 'RunwayTrans 货物运输和物流服务目录。' },
    },
    partners: {
      title: '合作伙伴',
      homeLink: '首页',
      breadcrumbsTitle: '合作伙伴',
      description: '我们在物流和综合供应链中合作的公司。',
      partnerFallback: '合作伙伴',
      noLogo: '无标志',
      empty: '请在管理后台添加合作伙伴卡片。',
      videoButtonLabel: '观看视频评价',
      metadata: { title: '合作伙伴', description: 'Runway Trans 合作伙伴页面。' },
    },
    cases: {
      title: '案例',
      homeLink: '首页',
      breadcrumbsTitle: '案例',
      description: '来自复杂路线客户的视频、评价和感谢信。',
      expertName: 'Victoria Kondakova',
      expertRole: '俄罗斯酒店运营专家',
      reviewPrefix: '案例：',
      openVideoAria: '打开视频案例',
      metadata: {
        title: '案例 | RunwayTrans',
        description: 'RunwayTrans 案例、视频和客户感谢信。',
      },
    },
    contacts: {
      title: '联系方式',
      breadcrumbsAria: '面包屑导航',
      homeLink: '首页',
      addressTitle: '总部办公室',
      addressValue: '克拉斯诺亚尔斯克，Krasnoy Armii 街 10 号',
      phoneTitle: '电话',
      emailTitle: 'Email',
      callbackTitle: '请求回电',
      phonePlaceholder: '您的电话号码',
      consent: '我同意处理个人数据',
      submit: '请回电',
      mapTitle: 'Runway Trans 办公室地图',
      requisites: '公司许可证和银行信息可按要求提供。',
      metadata: {
        title: '联系方式',
        description: '联系 Runway Trans：地址、电话、email 和回电表单。',
      },
    },
    geography: {
      title: '运输区域',
      breadcrumbsAria: '面包屑导航',
      homeLink: '首页',
      intro: 'Runway Trans 主要专注于向极北地区及同等条件地区配送货物。',
      directionsTitle: '主要货运方向',
      directions: {
        chukotka: '楚科奇自治区',
        sakha: '萨哈共和国（雅库特）',
        nenets: '涅涅茨自治区',
        kamchatka: '堪察加边疆区',
        krasnoyarsk: '克拉斯诺亚尔斯克边疆区',
        magadan: '马加丹州',
        yamal: '亚马尔-涅涅茨自治区',
      },
      mapAria: '运输地图',
      mapTitle: '北方货运方向地图',
      zoomIn: '放大地图',
      zoomOut: '缩小地图',
      locate: '定位',
      periodLabel: '周期',
      vehicleAllTerrain: '全地形车',
      vehicleCars: '汽车',
      cargoType: '货物类型',
      region: '地区',
      fallbackDeliveries: [
        {
          id: 'vankor-all-terrain',
          color: '#bd1395',
          period: '2025年1月 - 2025年3月',
          title: '使用全地形车向 Vankor 配送货物',
          route: '（Yartsevo - Igarka - Baikalovsk）',
          duration: '3天',
        },
        {
          id: 'pipeline-service',
          color: '#0e5ca6',
          period: '2025年1月 - 2025年5月',
          title: '输油管道维护',
          route: '（Karaul - Tanalau）',
        },
      ],
      metadata: {
        title: '运输区域',
        description: 'Runway Trans 在北方地区的货物运输覆盖范围。',
      },
    },
  },
}

export function getPageText(
  locale: AppLocale,
  value: string | null | undefined,
  ruValue: string,
  fallback: string,
) {
  if (!value) return fallback
  if (locale === 'ru') return value

  return value === ruValue ? fallback : value
}

export function isDefaultRussianText(
  locale: AppLocale,
  value: string | null | undefined,
  ruValue: string,
) {
  return locale !== 'ru' && value === ruValue
}

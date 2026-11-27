import type { AppLocale } from './locales'

export const serviceLandingSlugs = ['vityaz', 'winter-road', 'all-terrain'] as const
export type ServiceLandingSlug = (typeof serviceLandingSlugs)[number]

export function isServiceLandingSlug(slug: string): slug is ServiceLandingSlug {
  return serviceLandingSlugs.some((supported) => supported === slug)
}

type ServiceCopy = {
  title: string
  lead: string
  route: string
  conditions: string
  request: string
}

type LandingCopy = {
  route: string
  conditions: string
  request: string
  emailCta: string
  cta: string
  services: Record<ServiceLandingSlug, ServiceCopy>
}

export const serviceLandingMessages: Record<AppLocale, LandingCopy> = {
  ru: {
    emailCta: 'Запросить расчёт по почте',
    route: 'Грузы и маршруты',
    conditions: 'От чего зависят стоимость и срок',
    request: 'Что указать для расчёта',
    cta: 'Запросить расчёт перевозки',
    services: {
      vityaz: {
        title: 'Перевозка грузов на болотоходах «Витязь»',
        lead: 'Доставка оборудования и материалов гусеничными болотоходами на труднодоступные объекты Севера.',
        route:
          'На участке между автомобильной дорогой и площадкой в тундре для груза может потребоваться гусеничная техника. Укажите точку перегрузки и координаты объекта, особенно если у него нет почтового адреса.',
        conditions:
          'Для расчёта оценивают протяжённость гусеничного участка, состояние грунта, массу самого тяжёлого места и способ перегрузки. Возможность проезда и дату доставки уточняют для конкретного маршрута.',
        request:
          'Пришлите координаты погрузки и выгрузки, описание груза, массу и размеры каждого места. Укажите желаемую дату и есть ли на площадке техника для выгрузки.',
      },
      'winter-road': {
        title: 'Грузоперевозки по зимникам',
        lead: 'Доставка грузов полуприцепами и тралами по сезонным зимним дорогам к северным объектам.',
        route:
          'Для партии материалов можно рассмотреть полуприцеп, для техники — трал. При выборе транспорта важны размеры груза и возможность заезда на площадки по обе стороны зимника.',
        conditions:
          'Окно перевозки зависит от открытия зимника и ограничений на конкретном участке. На расчёт влияют длина рейса, масса и габариты груза, условия погрузки и выгрузки.',
        request:
          'Укажите пункты маршрута, известный участок зимника, массу и габариты мест. Для техники уточните, может ли она заехать на трал своим ходом, и до какой даты нужна доставка.',
      },
      'all-terrain': {
        title: 'Перевозка грузов колёсными вездеходами',
        lead: 'Доставка грузов по бездорожью на вездеходах с шинами низкого давления.',
        route:
          'Колёсный вездеход рассматривают для доставки материалов и снабжения от доступной дороги до удалённой площадки. Для выбора машины важно знать, где заканчивается дорога и какой грунт на последнем участке.',
        conditions:
          'На стоимость и срок влияют расстояние по бездорожью, состояние подъезда, вес и объём партии. Количество рейсов рассчитывают после оценки груза и доступности площадки.',
        request:
          'Сообщите ближайшую точку подъезда, координаты получателя, вес, размеры и число грузовых мест. Если есть, приложите к переписке фото колеи или описание грунта и укажите желаемую дату.',
      },
    },
  },
  en: {
    emailCta: 'Request a quote by email',
    route: 'Cargo and routes',
    conditions: 'What affects cost and transit time',
    request: 'Details for a quote',
    cta: 'Request a freight quote',
    services: {
      vityaz: {
        title: 'Freight transport by Vityaz tracked carrier',
        lead: 'Tracked carriers deliver equipment and supplies to hard-to-reach northern sites.',
        route:
          'The leg between the road and a tundra site may require a tracked carrier. Identify the transfer point and provide site coordinates, especially for destinations without a street address.',
        conditions:
          'The length of the tracked leg, ground conditions, the heaviest item and the handling method affect the estimate. Route access and delivery dates are assessed for each trip.',
        request:
          'Send loading and unloading coordinates, a cargo description, and the weight and dimensions of each item. Include your preferred date and the unloading equipment available on site.',
      },
      'winter-road': {
        title: 'Freight transport on winter roads',
        lead: 'Semi-trailers and low-bed trailers carry freight on seasonal winter roads to northern sites.',
        route:
          'A semi-trailer may suit a shipment of materials, while machinery may require a low-bed trailer. Vehicle selection depends on cargo dimensions and access at both ends of the winter road.',
        conditions:
          'The transport window depends on the road opening date and restrictions along the route. Distance, cargo weight and dimensions, and loading conditions affect the quote.',
        request:
          'Provide the endpoints, known winter road sections, weight and dimensions. For machinery, specify whether it can drive onto a trailer and when delivery is needed.',
      },
      'all-terrain': {
        title: 'Freight transport by wheeled all-terrain vehicle',
        lead: 'Off-road freight delivery using wheeled vehicles with low-pressure tyres.',
        route:
          'A wheeled carrier can take materials and supplies from an accessible road to a remote site. Identify where the road ends and describe the ground on the final leg.',
        conditions:
          'Off-road distance, access conditions, shipment weight and volume affect cost and timing. The number of trips depends on the cargo and site access.',
        request:
          'Provide the nearest road access, destination coordinates, item count, weights, dimensions and target date. Describe the ground conditions or share photos during follow-up.',
      },
    },
  },
  fr: {
    emailCta: 'Demander un devis par e-mail',
    route: 'Marchandises et itinéraires',
    conditions: 'Coût et délai de transport',
    request: 'Informations à fournir pour un devis',
    cta: 'Demander un devis de transport',
    services: {
      vityaz: {
        title: 'Transport de fret par véhicule chenillé Vityaz',
        lead: 'Acheminement de matériel et de fournitures par chenillés vers des sites isolés du Grand Nord.',
        route:
          'Le trajet entre la route et un chantier en pleine toundra peut nécessiter un chenillé. Précisez le point de transbordement et les coordonnées du site, surtout en l’absence d’adresse.',
        conditions:
          'La distance à parcourir sur chenilles, la nature du sol, le poids du colis le plus lourd et les moyens de manutention déterminent le devis. L’accès et la date de livraison sont étudiés pour chaque trajet.',
        request:
          'Indiquez les coordonnées de chargement et de déchargement, la nature du fret, le poids et les dimensions de chaque colis, la date souhaitée et le matériel de déchargement disponible.',
      },
      'winter-road': {
        title: 'Transport de fret sur routes d’hiver',
        lead: 'Acheminement de marchandises en semi-remorque ou sur porte-engins par les routes saisonnières du Nord.',
        route:
          'Une semi-remorque peut convenir aux matériaux et un porte-engins aux machines. Le choix dépend des dimensions du chargement et de l’accès aux deux extrémités de la route d’hiver.',
        conditions:
          'La période de transport dépend de l’ouverture de la route et des restrictions propres à chaque tronçon. Le devis tient compte de la distance, du poids, du gabarit et de la manutention.',
        request:
          'Précisez les points de départ et d’arrivée, les tronçons connus, le poids et les dimensions. Pour un engin, indiquez s’il peut monter sur la remorque par ses propres moyens et la date limite de livraison.',
      },
      'all-terrain': {
        title: 'Transport de fret en véhicule tout-terrain à roues',
        lead: 'Livraison hors route par véhicules équipés de pneus basse pression.',
        route:
          'Un véhicule à roues peut acheminer matériaux et fournitures depuis une route accessible jusqu’à un site isolé. Indiquez où la route prend fin et décrivez le sol sur le dernier tronçon.',
        conditions:
          'La distance hors route, les conditions d’accès, le poids et le volume du lot influent sur le prix et le délai. Le nombre de rotations dépend du fret et de l’accès au site.',
        request:
          'Indiquez l’accès routier le plus proche, les coordonnées du destinataire, le nombre de colis, leur poids, leurs dimensions et la date souhaitée. Décrivez le terrain ou transmettez des photos lors des échanges.',
      },
    },
  },
  kk: {
    emailCta: 'Есепті электрондық пошта арқылы сұрау',
    route: 'Жүк және бағыт',
    conditions: 'Құны мен мерзімі неге байланысты',
    request: 'Құнын есептеуге қажетті мәліметтер',
    cta: 'Тасымал құнын есептеуге өтінім беру',
    services: {
      vityaz: {
        title: '«Витязь» шынжыр табанды көлігімен жүк тасымалдау',
        lead: 'Солтүстіктің жол қатынасы қиын нысандарына жабдықтар мен материалдарды шынжыр табанды көлікпен жеткізу.',
        route:
          'Автожол мен тундрадағы нысан арасындағы бөлікте шынжыр табанды көлік қажет болуы мүмкін. Жүкті қайта тиейтін орынды және нысанның координаттарын көрсетіңіз. Бұл әсіресе нысанның мекенжайы болмаса маңызды.',
        conditions:
          'Есептеу кезінде жолсыз бөліктің ұзындығы, топырақтың күйі, ең ауыр жүктің салмағы және қайта тиеу тәсілі ескеріледі. Жолдың қолжетімділігі мен жеткізу күні әр бағыт бойынша нақтыланады.',
        request:
          'Тиеу және түсіру орындарының координаттарын, жүктің сипаттамасын, әр орынның салмағы мен өлшемдерін жіберіңіз. Қалаған күнді және түсіру техникасының бар-жоғын көрсетіңіз.',
      },
      'winter-road': {
        title: 'Қысқы жолдармен жүк тасымалдау',
        lead: 'Солтүстіктегі нысандарға маусымдық қысқы жолдармен жартылай тіркеме және төмен платформалы трал арқылы жүк жеткізу.',
        route:
          'Материалдар партиясына жартылай тіркеме, ал техникаға трал жарауы мүмкін. Көлікті таңдау жүктің өлшеміне және қысқы жолдың екі шетіндегі алаңдарға кіру мүмкіндігіне байланысты.',
        conditions:
          'Тасымал кезеңі қысқы жолдың ашылуына және жекелеген учаскелердегі шектеулерге байланысты. Бағаға қашықтық, жүктің салмағы мен өлшемі, тиеу және түсіру жағдайы әсер етеді.',
        request:
          'Бағыттың бастапқы және соңғы нүктелерін, белгілі қысқы жол учаскесін, жүктің салмағы мен өлшемдерін көрсетіңіз. Техника тралға өз жүрісімен шыға ала ма және жүкті қай күнге дейін жеткізу керек екенін жазыңыз.',
      },
      'all-terrain': {
        title: 'Дөңгелекті жол талғамайтын көлікпен жүк тасымалдау',
        lead: 'Қысымы төмен шиналары бар дөңгелекті көлікпен жолсыз жерде жүк жеткізу.',
        route:
          'Материалдар мен керек-жарақты автожолдан шалғай алаңға жеткізу үшін дөңгелекті жол талғамайтын көлік қолданылуы мүмкін. Жолдың қай тұста аяқталатынын және соңғы бөліктегі жердің жағдайын сипаттаңыз.',
        conditions:
          'Баға мен мерзімге жолсыз бөліктің ұзындығы, кіреберістің жағдайы, жүктің салмағы мен көлемі әсер етеді. Рейс саны жүк пен алаңға кіру мүмкіндігі бағаланғаннан кейін анықталады.',
        request:
          'Ең жақын кіреберісті, алушының координаттарын, жүк орындарының санын, салмағы мен өлшемдерін және қалаған күнді жазыңыз. Жер жағдайын сипаттаңыз немесе кейін хат алмасқанда фотосурет жіберіңіз.',
      },
    },
  },
  zh: {
    emailCta: '通过邮件询价',
    route: '货物与运输路线',
    conditions: '影响运费和时效的因素',
    request: '询价所需信息',
    cta: '咨询运输报价',
    services: {
      vityaz: {
        title: 'Vityaz 履带式运输车货运服务',
        lead: '使用履带式运输车，将设备和物资运往北方交通不便的作业现场。',
        route:
          '从公路到苔原作业现场的路段可能需要使用履带车。请提供换装地点和目的地坐标，尤其是没有街道地址的现场。',
        conditions:
          '报价取决于履带车行驶里程、地面状况、最重单件的重量以及换装方式。路线能否通行和交付日期需按具体行程确认。',
        request:
          '请提供装卸地点坐标、货物名称、每件货物的重量和尺寸、期望到货日期，以及现场可用的卸货设备。',
      },
      'winter-road': {
        title: '冬季道路货物运输',
        lead: '使用半挂车和低平板拖车，沿季节性冬季道路向北方作业现场运送货物。',
        route:
          '成批材料可考虑使用半挂车，工程机械可考虑使用低平板拖车。车型选择取决于货物尺寸和冬季道路两端装卸场地的进出条件。',
        conditions:
          '运输时间窗口取决于道路开放日期及各路段的通行限制。运费还需考虑里程、货物重量和尺寸以及装卸条件。',
        request:
          '请注明起点、终点、已知的冬季路段、货物重量和尺寸。运输机械设备时，请说明设备能否自行驶上拖车，以及最晚到货日期。',
      },
      'all-terrain': {
        title: '轮式全地形车货物运输',
        lead: '使用配备低压轮胎的轮式全地形车，在无公路地段运送货物。',
        route:
          '轮式车辆可将材料和补给从公路运至偏远现场。请说明公路终点的位置和最后一段路线的地面状况，以便选择车辆。',
        conditions:
          '越野里程、进场条件、货物重量和体积会影响费用及运输时间。所需车次取决于货物和现场通行条件。',
        request:
          '请提供最近的公路接入点、收货地点坐标、件数、重量、尺寸和期望到货日期。可描述路面状况，也可在后续沟通中提供照片。',
      },
    },
  },
}

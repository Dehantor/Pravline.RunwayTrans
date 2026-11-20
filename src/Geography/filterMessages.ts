import type { AppLocale } from '@/i18n/locales'

export type GeographyFilterLabels = {
  periodLabel: string
  vehicleAllTerrain: string
  vehicleCars: string
  cargoType: string
  region: string
}

export type GeographyFilterMessages = {
  allPeriods: string
  allRegions: string
  cargoUnavailable: string
  deliveryDuration: string
  focusedRoute: string
  focusRoute: string
  mapBadge: string
  noResults: string
  routesTitle: string
  selectNavigate: string
  selectOpen: string
  selectOptions: string
  selectSelected: string
  vehicleGroup: string
  vehicleUnknownHint: string
}

export const geographyFilterMessages: Record<AppLocale, GeographyFilterMessages> = {
  ru: {
    allPeriods: 'Все периоды',
    allRegions: 'Все регионы',
    cargoUnavailable: 'Типы грузов пока не указаны.',
    deliveryDuration: 'Срок доставки',
    focusedRoute: 'На карте показан маршрут «{label}».',
    focusRoute: 'Показать маршрут на карте',
    mapBadge: 'Схема маршрутов',
    noResults: 'По выбранным фильтрам перевозок нет.',
    routesTitle: 'Маршруты',
    selectNavigate: 'Стрелки вверх и вниз перемещают по списку. Enter выбирает, Escape закрывает.',
    selectOpen: 'Стрелка вниз открывает список.',
    selectOptions: 'Вариантов в списке — {count}.',
    selectSelected: 'Выбрано «{label}».',
    vehicleGroup: 'Вид транспорта',
    vehicleUnknownHint: 'Перевозки без указания транспорта видны, когда включены оба варианта.',
  },
  en: {
    allPeriods: 'All periods',
    allRegions: 'All regions',
    cargoUnavailable: 'Cargo types have not been specified.',
    deliveryDuration: 'Delivery time',
    focusedRoute: 'Showing {label} on the map.',
    focusRoute: 'Show route on the map',
    mapBadge: 'Route map',
    noResults: 'No deliveries match the selected filters.',
    routesTitle: 'Routes',
    selectNavigate: 'Use the arrow keys to move, Enter to select and Escape to close.',
    selectOpen: 'Press the down arrow to open the list.',
    selectOptions: 'Options in the list — {count}.',
    selectSelected: 'Selected {label}.',
    vehicleGroup: 'Vehicle type',
    vehicleUnknownHint: 'Deliveries without a vehicle type are shown when both options are on.',
  },
  fr: {
    allPeriods: 'Toutes les périodes',
    allRegions: 'Toutes les régions',
    cargoUnavailable: 'Les types de fret ne sont pas renseignés.',
    deliveryDuration: 'Délai de livraison',
    focusedRoute: 'Trajet affiché sur la carte « {label} ».',
    focusRoute: 'Afficher le trajet sur la carte',
    mapBadge: 'Carte des itinéraires',
    noResults: 'Aucun transport ne correspond aux filtres sélectionnés.',
    routesTitle: 'Itinéraires',
    selectNavigate: 'Utilisez les flèches pour naviguer, Entrée pour choisir et Échap pour fermer.',
    selectOpen: 'Appuyez sur la flèche vers le bas pour ouvrir la liste.',
    selectOptions: 'Nombre de choix — {count}.',
    selectSelected: 'Option sélectionnée « {label} ».',
    vehicleGroup: 'Type de véhicule',
    vehicleUnknownHint:
      'Les transports sans type de véhicule sont affichés si les deux options sont activées.',
  },
  kk: {
    allPeriods: 'Барлық кезең',
    allRegions: 'Барлық өңір',
    cargoUnavailable: 'Жүк түрлері әзірге көрсетілмеген.',
    deliveryDuration: 'Жеткізу мерзімі',
    focusedRoute: '«{label}» бағыты картада көрсетілді.',
    focusRoute: 'Бағытты картадан көрсету',
    mapBadge: 'Бағыттар сызбасы',
    noResults: 'Таңдалған сүзгілерге сәйкес тасымалдар жоқ.',
    routesTitle: 'Бағыттар',
    selectNavigate: 'Тізімде көрсеткілермен жылжыңыз. Enter таңдайды, Escape жабады.',
    selectOpen: 'Тізімді ашу үшін төмен көрсеткіні басыңыз.',
    selectOptions: 'Тізімдегі нұсқалар саны — {count}.',
    selectSelected: '«{label}» таңдалды.',
    vehicleGroup: 'Көлік түрі',
    vehicleUnknownHint: 'Көлік түрі көрсетілмеген тасымалдар екі нұсқа да қосылғанда көрсетіледі.',
  },
  zh: {
    allPeriods: '全部周期',
    allRegions: '全部地区',
    cargoUnavailable: '尚未注明货物类型。',
    deliveryDuration: '送达时间',
    focusedRoute: '地图上已显示路线“{label}”。',
    focusRoute: '在地图上显示路线',
    mapBadge: '路线示意图',
    noResults: '没有符合所选筛选条件的运输记录。',
    routesTitle: '路线',
    selectNavigate: '使用方向键移动，按 Enter 选择，按 Escape 关闭。',
    selectOpen: '按向下方向键打开列表。',
    selectOptions: '列表中有 {count} 个选项。',
    selectSelected: '已选择 {label}。',
    vehicleGroup: '车辆类型',
    vehicleUnknownHint: '启用两个选项时会显示未注明车辆类型的运输记录。',
  },
}

export const kazakhGeographyFilterLabels: GeographyFilterLabels = {
  periodLabel: 'Кезең',
  vehicleAllTerrain: 'Жол талғамайтын көліктер',
  vehicleCars: 'Автокөліктер',
  cargoType: 'Жүк түрі',
  region: 'Өңір',
}

export const kazakhGeographyDirections = {
  chukotka: 'Чукотка автономиялық округі',
  sakha: 'Саха Республикасы (Якутия)',
  nenets: 'Ненец автономиялық округі',
  kamchatka: 'Камчатка өлкесі',
  krasnoyarsk: 'Краснояр өлкесі',
  magadan: 'Магадан облысы',
  yamal: 'Ямал-Ненец автономиялық округі',
}

export const kazakhGeographyPageLabels = {
  breadcrumbsAria: 'Навигация жолы',
  description: 'Runway Trans компаниясының Қиыр Солтүстікке жүк тасымалдау бағыттары.',
  directionsTitle: 'Жүк тасымалының негізгі бағыттары',
  homeLink: 'Басты бет',
  intro:
    'Runway Trans көлік-логистика компаниясы негізінен Қиыр Солтүстік аудандарына және оларға теңестірілген аумақтарға жүк жеткізеді.',
  mapAria: 'Тасымал картасы',
  title: 'География',
  zoomIn: 'Картаны үлкейту',
  zoomOut: 'Картаны кішірейту',
}

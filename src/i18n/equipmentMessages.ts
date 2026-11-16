import type { AppLocale } from './locales'

export const equipmentImages = [
  { kind: 'vityaz', src: '/media/home-service-vityaz.webp' },
  { kind: 'winterRoad', src: '/media/home-service-winter-road.webp' },
  { kind: 'lowPressure', src: '/media/home-service-all-terrain.webp' },
  { kind: 'dt30Emergency', src: '/media/home-service-crane.webp' },
] as const

type EquipmentKind = (typeof equipmentImages)[number]['kind']

type EquipmentMessages = {
  title: string
  intro: string
  imageNote: string
  specificationsTitle: string
  noImage: string
  cards: Record<EquipmentKind, { title: string; description: string }>
}

export const equipmentMessages: Record<AppLocale, EquipmentMessages> = {
  ru: {
    title: 'Техника',
    intro: 'Техника Runway Trans для перевозок и аварийных работ в труднодоступных районах Севера.',
    imageNote: 'Изображения приведены для иллюстрации типов техники.',
    specificationsTitle: 'Характеристики техники',
    noImage: 'Нет изображения',
    cards: {
      vityaz: {
        title: 'Вездеход «Витязь»',
        description: 'Двухзвенный гусеничный транспортёр для доставки грузов по бездорожью.',
      },
      winterRoad: {
        title: 'Техника для зимников',
        description: 'Тягачи с полуприцепами и тралами для доставки грузов по зимним автодорогам.',
      },
      lowPressure: {
        title: 'Вездеход на шинах низкого давления',
        description: 'Колёсный вездеход для перевозки грузов по бездорожью и слабым грунтам.',
      },
      dt30Emergency: {
        title: 'Аварийный комплекс ДТ-30',
        description: 'Манипулятор и экскаватор на базе болотохода ДТ-30 для аварийных работ.',
      },
    },
  },
  en: {
    title: 'Equipment',
    intro:
      'Runway Trans equipment for cargo transport and emergency work in remote northern areas.',
    imageNote: 'Images illustrate the types of equipment.',
    specificationsTitle: 'Equipment specifications',
    noImage: 'No image',
    cards: {
      vityaz: {
        title: 'Vityaz all-terrain vehicle',
        description: 'An articulated tracked carrier for off-road cargo transport.',
      },
      winterRoad: {
        title: 'Winter road equipment',
        description:
          'Tractor units with semi-trailers and low-loaders for hauling cargo on winter roads.',
      },
      lowPressure: {
        title: 'All-terrain vehicle with low-pressure tires',
        description: 'A wheeled vehicle for carrying cargo off-road and over soft ground.',
      },
      dt30Emergency: {
        title: 'DT-30 emergency response unit',
        description:
          'A loader crane and excavator on a DT-30 all-terrain carrier for emergency work.',
      },
    },
  },
  fr: {
    title: 'Matériel',
    intro:
      'Le matériel de Runway Trans pour le transport de marchandises et les interventions d’urgence dans les régions isolées du Nord.',
    imageNote: 'Les images illustrent les types de matériel.',
    specificationsTitle: 'Caractéristiques du matériel',
    noImage: 'Aucune image',
    cards: {
      vityaz: {
        title: 'Véhicule tout-terrain Vityaz',
        description:
          'Un transporteur articulé à chenilles pour acheminer des marchandises hors route.',
      },
      winterRoad: {
        title: 'Matériel pour les routes d’hiver',
        description:
          'Des tracteurs routiers avec semi-remorques et remorques surbaissées pour acheminer des marchandises sur les routes d’hiver.',
      },
      lowPressure: {
        title: 'Véhicule tout-terrain à pneus basse pression',
        description:
          'Un véhicule à roues pour transporter des marchandises hors route et sur des sols meubles.',
      },
      dt30Emergency: {
        title: 'Unité d’intervention d’urgence DT-30',
        description:
          'Une grue de manutention et une pelle mécanique sur un porteur tout-terrain DT-30 pour les interventions d’urgence.',
      },
    },
  },
  kk: {
    title: 'Техника',
    intro:
      'Runway Trans компаниясының солтүстіктегі жетуі қиын аудандарда жүк тасымалдауға және апаттық жұмыстарға арналған техникасы.',
    imageNote: 'Суреттер техника түрлерін көрсету үшін берілген.',
    specificationsTitle: 'Техника сипаттамалары',
    noImage: 'Сурет жоқ',
    cards: {
      vityaz: {
        title: '«Витязь» жол талғамайтын көлігі',
        description: 'Жолсыз жермен жүк жеткізуге арналған екі буынды шынжыртабан тасымалдағыш.',
      },
      winterRoad: {
        title: 'Қысқы жолдарға арналған техника',
        description:
          'Қысқы автожолдармен жүк жеткізуге арналған жартылай тіркемелері мен төмен төсемді тіркемелері бар тартқыштар.',
      },
      lowPressure: {
        title: 'Төмен қысымды шиналары бар жол талғамайтын көлік',
        description:
          'Жолсыз жерде және жұмсақ топырақта жүк тасымалдауға арналған доңғалақты көлік.',
      },
      dt30Emergency: {
        title: 'ДТ-30 апаттық кешені',
        description:
          'Апаттық жұмыстарға арналған ДТ-30 батпақ жүргішіне орнатылған кран-манипулятор мен экскаватор.',
      },
    },
  },
  zh: {
    title: '设备',
    intro: 'Runway Trans 用于在北部偏远地区开展货物运输和应急作业的设备。',
    imageNote: '图片仅用于说明设备类型。',
    specificationsTitle: '设备规格',
    noImage: '无图片',
    cards: {
      vityaz: {
        title: 'Vityaz 全地形运输车',
        description: '用于越野货物运输的双节履带式运输车。',
      },
      winterRoad: {
        title: '冬季道路运输设备',
        description: '采用配备半挂车和低平板挂车的牵引车，通过冬季道路运送货物。',
      },
      lowPressure: {
        title: '低压轮胎全地形车',
        description: '用于在无道路地带和松软地面运送货物的轮式车辆。',
      },
      dt30Emergency: {
        title: 'DT-30 应急作业设备',
        description: '在 DT-30 全地形运输车底盘上配置起重机械臂和挖掘机，用于应急作业。',
      },
    },
  },
}

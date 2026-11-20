import type { AppLocale } from './locales'

type EquipmentMessages = {
  title: string
  specificationsTitle: string
  noImage: string
}

export const equipmentMessages: Record<AppLocale, EquipmentMessages> = {
  ru: {
    title: 'Техника',
    specificationsTitle: 'Характеристики техники',
    noImage: 'Нет изображения',
  },
  en: {
    title: 'Equipment',
    specificationsTitle: 'Equipment specifications',
    noImage: 'No image',
  },
  fr: {
    title: 'Matériel',
    specificationsTitle: 'Caractéristiques du matériel',
    noImage: 'Aucune image',
  },
  kk: {
    title: 'Техника',
    specificationsTitle: 'Техника сипаттамалары',
    noImage: 'Сурет жоқ',
  },
  zh: {
    title: '设备',
    specificationsTitle: '设备规格',
    noImage: '无图片',
  },
}

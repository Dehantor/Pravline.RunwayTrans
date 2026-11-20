import type { AppLocale } from './locales'

import { kkEquipmentCatalog, zhEquipmentCatalog } from './equipmentCatalog.east'
import { type EquipmentCatalogTranslation, ruEquipmentCatalog } from './equipmentCatalog.ru'
import { enEquipmentCatalog, frEquipmentCatalog } from './equipmentCatalog.west'

type Section = keyof EquipmentCatalogTranslation['sections']
type Model = keyof EquipmentCatalogTranslation['titles']
type Label = keyof EquipmentCatalogTranslation['labels']
type Value = keyof EquipmentCatalogTranslation['values']

type Vehicle = {
  model: Model
  count: number
  photo?: 'bobcat' | 'iveco'
  specs?: [Label, Value][]
}

const sections: { category: Section; vehicles: Vehicle[] }[] = [
  {
    category: 'tracked',
    vehicles: [
      {
        model: 'vityaz-dt30-mnl',
        count: 8,
        specs: [
          ['payload', 'tons15'],
          ['platform', 'platformVityaz'],
          ['feature', 'oversize'],
          ['use', 'tundra'],
        ],
      },
      {
        model: 'vityaz-dt30-pmn',
        count: 2,
        specs: [
          ['payload', 'tons15'],
          ['cargoUnit', 'cargoUnit'],
          ['feature', 'enclosed'],
          ['use', 'tundra'],
        ],
      },
      {
        model: 'vityaz-dt30-pmnk',
        count: 2,
        specs: [
          ['payload', 'tons15'],
          ['cargoUnit', 'cargoUnit'],
          ['feature', 'crane9'],
          ['use', 'selfLoading'],
        ],
      },
      {
        model: 'vityaz-dt30-pmnke',
        count: 3,
        specs: [
          ['configuration', 'repairEquipment'],
          ['feature', 'emergency'],
          ['use', 'tundra'],
        ],
      },
      {
        model: 'vityaz-dt7-p',
        count: 1,
        specs: [
          ['payload', 'tons7'],
          ['feature', 'maneuverable'],
          ['use', 'tundra'],
        ],
      },
      {
        model: 'vityaz-dt30-pnmk',
        count: 1,
        specs: [
          ['feature', 'crane'],
          ['use', 'tundra'],
        ],
      },
    ],
  },
  {
    category: 'lowPressure',
    vehicles: [
      {
        model: 'rusak-k8',
        count: 2,
        photo: 'iveco',
        specs: [
          ['payload', 'tons25'],
          ['feature', 'peopleAndCargo'],
          ['terrain', 'terrain'],
        ],
      },
      {
        model: 'severtrak-profi-max',
        count: 1,
        specs: [
          ['passengers', 'profiPassengers'],
          ['payload', 'tons2'],
          ['platform', 'platformSevertrak'],
        ],
      },
      {
        model: 'severtrak-pickup-max',
        count: 1,
        specs: [
          ['passengers', 'pickupPassengers'],
          ['payload', 'tons2'],
          ['platform', 'platformSevertrak'],
        ],
      },
    ],
  },
  {
    category: 'road',
    vehicles: [
      { model: 'tractors', count: 5 },
      { model: 'trailers', count: 10, photo: 'bobcat' },
    ],
  },
  {
    category: 'special',
    vehicles: [
      { model: 'zetros', count: 1, photo: 'bobcat' },
      { model: 'ivanovets', count: 1, photo: 'bobcat' },
      { model: 'xcmg', count: 1, photo: 'bobcat' },
      { model: 'scania', count: 1, photo: 'bobcat' },
    ],
  },
  {
    category: 'administrative',
    vehicles: [{ model: 'ford', count: 1, photo: 'bobcat' }],
  },
]

function localizeCatalog(t: EquipmentCatalogTranslation) {
  return {
    intro: t.intro,
    sections: sections.map(({ category, vehicles }) => ({
      title: t.sections[category],
      items: vehicles.map(({ model, count, photo, specs = [] }) => ({
        title: t.titles[model],
        image: `/media/equipment/${photo ?? model}.webp`,
        imageAlt: photo ? '' : t.titles[model],
        specifications: [
          { title: t.labels.count, description: String(count) },
          ...specs.map(([label, value]) => ({
            title: t.labels[label],
            description: t.values[value],
          })),
        ],
      })),
    })),
  }
}

export const equipmentCatalog = {
  ru: localizeCatalog(ruEquipmentCatalog),
  en: localizeCatalog(enEquipmentCatalog),
  fr: localizeCatalog(frEquipmentCatalog),
  kk: localizeCatalog(kkEquipmentCatalog),
  zh: localizeCatalog(zhEquipmentCatalog),
} satisfies Record<AppLocale, ReturnType<typeof localizeCatalog>>

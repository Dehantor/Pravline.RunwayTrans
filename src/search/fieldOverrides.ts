import { Field } from 'payload'

export const searchFields: Field[] = [
  {
    name: 'slug',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'meta',
    label: { ru: 'Метаданные', en: 'Meta' },
    type: 'group',
    index: true,
    admin: {
      readOnly: true,
    },
    fields: [
      {
        type: 'text',
        name: 'title',
        label: { ru: 'Заголовок', en: 'Title' },
      },
      {
        type: 'text',
        name: 'description',
        label: { ru: 'Описание', en: 'Description' },
      },
      {
        name: 'image',
        label: { ru: 'Изображение', en: 'Image' },
        type: 'upload',
        relationTo: 'media',
      },
    ],
  },
  {
    label: { ru: 'Категории', en: 'Categories' },
    name: 'categories',
    type: 'array',
    admin: {
      readOnly: true,
    },
    fields: [
      {
        name: 'relationTo',
        type: 'text',
      },
      {
        name: 'categoryID',
        type: 'text',
      },
      {
        name: 'title',
        type: 'text',
      },
    ],
  },
]

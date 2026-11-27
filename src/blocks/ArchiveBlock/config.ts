import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Archive: Block = {
  slug: 'archive',
  interfaceName: 'ArchiveBlock',
  fields: [
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: { ru: 'Вступительный текст', en: 'Intro Content' },
    },
    {
      name: 'populateBy',
      label: { ru: 'Источник публикаций', en: 'Populate by' },
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: { ru: 'Коллекция', en: 'Collection' },
          value: 'collection',
        },
        {
          label: { ru: 'Ручной выбор', en: 'Individual Selection' },
          value: 'selection',
        },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      defaultValue: 'posts',
      label: { ru: 'Коллекция для показа', en: 'Collections To Show' },
      options: [
        {
          label: { ru: 'Публикации', en: 'Posts' },
          value: 'posts',
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      hasMany: true,
      label: { ru: 'Категории для показа', en: 'Categories To Show' },
      relationTo: 'categories',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 10,
      label: { ru: 'Максимум записей', en: 'Limit' },
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: { ru: 'Выбранные публикации', en: 'Selection' },
      relationTo: ['posts'],
    },
  ],
  labels: {
    plural: { ru: 'Списки публикаций', en: 'Archives' },
    singular: { ru: 'Список публикаций', en: 'Archive' },
  },
}

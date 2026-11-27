import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    label: { ru: 'Ширина', en: 'Size' },
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: { ru: 'Одна треть', en: 'One Third' },
        value: 'oneThird',
      },
      {
        label: { ru: 'Половина', en: 'Half' },
        value: 'half',
      },
      {
        label: { ru: 'Две трети', en: 'Two Thirds' },
        value: 'twoThirds',
      },
      {
        label: { ru: 'Вся ширина', en: 'Full' },
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    label: { ru: 'Показывать ссылку', en: 'Enable link' },
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  labels: {
    singular: { ru: 'Текстовый блок', en: 'Content' },
    plural: { ru: 'Текстовые блоки', en: 'Content' },
  },
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      label: { ru: 'Колонки', en: 'Columns' },
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}

import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Banner: Block = {
  slug: 'banner',
  labels: {
    singular: { ru: 'Баннер', en: 'Banner' },
    plural: { ru: 'Баннеры', en: 'Banners' },
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: { ru: 'Информация', en: 'Info' }, value: 'info' },
        { label: { ru: 'Предупреждение', en: 'Warning' }, value: 'warning' },
        { label: { ru: 'Ошибка', en: 'Error' }, value: 'error' },
        { label: { ru: 'Успешно', en: 'Success' }, value: 'success' },
      ],
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: false,
      required: true,
    },
  ],
  interfaceName: 'BannerBlock',
}

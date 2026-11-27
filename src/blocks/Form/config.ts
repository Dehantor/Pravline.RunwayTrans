import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'form',
      label: { ru: 'Форма', en: 'Form' },
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: { ru: 'Показывать вступление', en: 'Enable Intro Content' },
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
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
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    plural: { ru: 'Блоки форм', en: 'Form Blocks' },
    singular: { ru: 'Блок формы', en: 'Form Block' },
  },
}

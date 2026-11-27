import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  labels: {
    singular: { ru: 'Блок медиа', en: 'Media Block' },
    plural: { ru: 'Блоки медиа', en: 'Media Blocks' },
  },
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      label: { ru: 'Медиафайл', en: 'Media' },
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

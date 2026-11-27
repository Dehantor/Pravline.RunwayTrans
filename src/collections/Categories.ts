import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { canEditContent, userHasRole } from '@/access/roles'
import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: { ru: 'Категория', en: 'Category' },
    plural: { ru: 'Категории', en: 'Categories' },
  },
  access: {
    create: canEditContent,
    delete: canEditContent,
    read: anyone,
    update: canEditContent,
  },
  admin: {
    hidden: ({ user }) => !userHasRole(user, ['admin', 'moderator']),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: { ru: 'Название', en: 'Title' },
      type: 'text',
      required: true,
    },
    slugField({
      position: undefined,
    }),
  ],
}

import type { CollectionConfig } from 'payload'

import { canEditContent, canEditContentOrPublished, userHasRole } from '@/access/roles'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { slugField } from 'payload'

export const Equipment: CollectionConfig<'equipment'> = {
  slug: 'equipment',
  labels: {
    singular: 'Единица техники',
    plural: 'Техника',
  },
  access: {
    create: canEditContent,
    delete: canEditContent,
    read: canEditContentOrPublished,
    update: canEditContent,
  },
  admin: {
    defaultColumns: ['title', 'updatedAt'],
    hidden: ({ user }) => !userHasRole(user, ['admin', 'moderator']),
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'equipment',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'equipment',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      localized: true,
      type: 'text',
      required: true,
    },
    {
      name: 'specifications',
      localized: true,
      type: 'array',
      labels: {
        singular: 'Характеристика',
        plural: 'Характеристики',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Заголовок',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Описание',
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}

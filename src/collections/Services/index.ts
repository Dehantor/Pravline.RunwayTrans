import type { CollectionConfig } from 'payload'

import { canEditContent, canEditContentOrPublished, userHasRole } from '@/access/roles'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { slugField } from 'payload'

export const Services: CollectionConfig<'services'> = {
  slug: 'services',
  labels: {
    singular: 'Услуга',
    plural: 'Услуги',
  },
  access: {
    create: canEditContent,
    delete: canEditContent,
    read: canEditContentOrPublished,
    update: canEditContent,
  },
  admin: {
    defaultColumns: ['title', 'serviceType', 'updatedAt'],
    hidden: ({ user }) => !userHasRole(user, ['admin', 'moderator']),
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'services',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'services',
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
      name: 'serviceType',
      localized: true,
      type: 'text',
    },
    {
      name: 'summary',
      localized: true,
      type: 'textarea',
      required: true,
    },
    {
      name: 'description',
      localized: true,
      type: 'richText',
      required: true,
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

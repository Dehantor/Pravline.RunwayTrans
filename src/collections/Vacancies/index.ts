import type { CollectionConfig } from 'payload'

import { canEditContent, canEditContentOrPublished, userHasRole } from '@/access/roles'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { defaultLexical } from '@/fields/defaultLexical'
import { slugField } from 'payload'

export const Vacancies: CollectionConfig<'vacancies'> = {
  slug: 'vacancies',
  labels: {
    singular: 'Вакансия',
    plural: 'Вакансии',
  },
  access: {
    create: canEditContent,
    delete: canEditContent,
    read: canEditContentOrPublished,
    update: canEditContent,
  },
  admin: {
    defaultColumns: ['title', 'salary', 'updatedAt'],
    hidden: ({ user }) => !userHasRole(user, ['admin', 'moderator']),
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'vacancies',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'vacancies',
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
      name: 'salary',
      label: 'Заработная плата',
      localized: true,
      type: 'text',
    },
    {
      name: 'contactPhone',
      label: 'Телефон для консультации',
      type: 'text',
    },
    {
      name: 'contactEmail',
      label: 'Email для резюме',
      type: 'email',
    },
    {
      name: 'description',
      label: 'Полное описание',
      localized: true,
      type: 'richText',
      editor: defaultLexical,
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

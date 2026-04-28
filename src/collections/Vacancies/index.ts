import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { slugField } from 'payload'

export const Vacancies: CollectionConfig<'vacancies'> = {
  slug: 'vacancies',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'location', 'employmentType', 'updatedAt'],
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
      name: 'location',
      localized: true,
      type: 'text',
      required: true,
    },
    {
      name: 'employmentType',
      type: 'select',
      defaultValue: 'full-time',
      options: [
        { label: 'Полная занятость', value: 'full-time' },
        { label: 'Частичная занятость', value: 'part-time' },
        { label: 'Контракт', value: 'contract' },
        { label: 'Стажировка', value: 'internship' },
      ],
      required: true,
    },
    {
      name: 'salary',
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

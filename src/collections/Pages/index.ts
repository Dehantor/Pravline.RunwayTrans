import type { CollectionConfig } from 'payload'

import { canEditContent, canEditContentOrPublished, userHasRole } from '@/access/roles'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { VacanciesList } from '../../blocks/VacanciesList/config'
import { hero } from '@/heros/config'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: {
    singular: { ru: 'Страница', en: 'Page' },
    plural: { ru: 'Страницы', en: 'Pages' },
  },
  access: {
    create: canEditContent,
    delete: canEditContent,
    read: canEditContentOrPublished,
    update: canEditContent,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    parent: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    hidden: ({ user }) => !userHasRole(user, ['admin', 'moderator']),
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: { ru: 'Заголовок', en: 'Title' },
      type: 'text',
      required: true,
      localized: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: { ru: 'Первый экран', en: 'Hero' },
          fields: [hero],
        },
        {
          label: { ru: 'Содержимое', en: 'Content' },
          fields: [
            {
              name: 'layout',
              label: { ru: 'Блоки страницы', en: 'Layout' },
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, VacanciesList],
              required: true,
              localized: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          localized: true,
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
              overrides: { label: { ru: 'SEO-заголовок', en: 'Meta Title' } },
            }),
            MetaImageField({
              relationTo: 'media',
              overrides: { label: { ru: 'Изображение для SEO', en: 'Meta Image' } },
            }),
            MetaDescriptionField({
              overrides: { label: { ru: 'SEO-описание', en: 'Meta Description' } },
            }),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'parent',
      label: { ru: 'Родительская страница', en: 'Parent' },
      type: 'relationship',
      relationTo: 'pages',
      hasMany: false,
      admin: {
        position: 'sidebar',
        description: 'Выберите родительскую страницу, если это подстраница.',
      },
    },
    {
      name: 'publishedAt',
      label: { ru: 'Дата публикации', en: 'Published at' },
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'slug',
      label: { ru: 'Адрес страницы', en: 'Slug' },
      type: 'text',
      index: true,
      unique: true,
      required: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (typeof value === 'string' && value.trim()) {
              return value
                .toLowerCase()
                .trim()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-_]/g, '')
            }

            const title = data?.title

            if (typeof title === 'string' && title.trim()) {
              return title
                .toLowerCase()
                .trim()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-_]/g, '')
            }

            return value
          },
        ],
      },
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
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

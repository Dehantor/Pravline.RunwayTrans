import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import {
  formFieldLabels,
  redirectFieldLabels,
  searchFieldLabels,
  submissionFieldLabels,
  translatePluginFields,
} from './adminFieldLabels'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import {
  createConsultationSubmission,
  manageConsultationSubmissions,
  preserveConsultationForm,
  protectConsultationForm,
} from '@/consultation/payload'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Runway Trans` : 'Runway Trans'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      labels: {
        singular: { ru: 'Перенаправление', en: 'Redirect' },
        plural: { ru: 'Перенаправления', en: 'Redirects' },
      },
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return translatePluginFields(defaultFields, redirectFieldLabels).map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                ...field.admin,
                description: {
                  ru: 'После изменения этого поля потребуется пересобрать сайт.',
                  en: 'You will need to rebuild the website when changing this field.',
                },
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      labels: {
        singular: { ru: 'Форма', en: 'Form' },
        plural: { ru: 'Формы', en: 'Forms' },
      },
      hooks: {
        beforeChange: [protectConsultationForm],
        beforeDelete: [preserveConsultationForm],
      },
      fields: ({ defaultFields }) => {
        return translatePluginFields(defaultFields, formFieldLabels).map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
    formSubmissionOverrides: {
      labels: {
        singular: { ru: 'Ответ на форму', en: 'Form Submission' },
        plural: { ru: 'Ответы на формы', en: 'Form Submissions' },
      },
      fields: ({ defaultFields }) =>
        translatePluginFields(defaultFields, submissionFieldLabels).map((field) => {
          if (field.type !== 'array' || field.name !== 'submissionData') return field

          return {
            ...field,
            admin: {
              ...field.admin,
              components: {
                ...field.admin?.components,
                Field: '@/components/SubmissionAnswers',
              },
            },
          }
        }),
      access: {
        create: createConsultationSubmission,
        delete: manageConsultationSubmissions,
        read: manageConsultationSubmissions,
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      labels: {
        singular: { ru: 'Результат поиска', en: 'Search Result' },
        plural: { ru: 'Результаты поиска', en: 'Search Results' },
      },
      fields: ({ defaultFields }) => {
        return [...translatePluginFields(defaultFields, searchFieldLabels), ...searchFields]
      },
    },
  }),
]

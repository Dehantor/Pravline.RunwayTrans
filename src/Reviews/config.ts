import type { GlobalConfig } from 'payload'

import { canEditContent, userHasRole } from '@/access/roles'
import { revalidateReviews } from './hooks/revalidateReviews'

export const ReviewsPage: GlobalConfig = {
  slug: 'reviewsPage',
  label: {
    singular: 'Отзывы',
    plural: 'Отзывы',
  },
  access: {
    read: () => true,
    update: canEditContent,
  },
  admin: {
    hidden: ({ user }) => !userHasRole(user, ['admin', 'moderator']),
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Верхний блок',
      fields: [
        {
          name: 'breadcrumbsTitle',
          label: 'Подпись в хлебных крошках',
          type: 'text',
          localized: true,
          defaultValue: 'Отзывы',
          required: true,
        },
        {
          name: 'pageTitle',
          label: 'Заголовок страницы',
          type: 'text',
          localized: true,
          defaultValue: 'Отзывы клиентов',
          required: true,
        },
        {
          name: 'pageDescription',
          label: 'Описание страницы',
          type: 'textarea',
          localized: true,
          defaultValue: 'Видеоотзывы и письма благодарности от клиентов «Ранвей Транс».',
          required: true,
        },
        {
          name: 'heroImage',
          label: 'Изображение справа',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description:
              'Вертикальное изображение для правой части верхнего блока. Лучше использовать PNG с прозрачным фоном.',
          },
        },
        {
          name: 'heroImageAlt',
          label: 'Описание изображения для доступности',
          type: 'text',
          localized: true,
          defaultValue: 'Видео-отзывы партнёров Runway Trans',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Карточка эксперта',
      fields: [
        {
          name: 'expertName',
          label: 'Имя эксперта',
          type: 'text',
          localized: true,
          defaultValue: '—',
          required: true,
        },
        {
          name: 'expertRole',
          label: 'Должность эксперта',
          type: 'text',
          localized: true,
          defaultValue: '—',
          required: true,
        },
        {
          name: 'expertReviewLabels',
          label: 'Список отзывов эксперта',
          type: 'array',
          localized: true,
          fields: [
            {
              name: 'label',
              label: 'Текст',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Видео-отзывы',
      fields: [
        {
          name: 'videoSectionTitle',
          label: 'Заголовок секции (опционально)',
          type: 'text',
          localized: true,
        },
        {
          name: 'videoReviews',
          label: 'Карточки',
          type: 'array',
          admin: {
            description: 'Карточки выводятся на сайте в том же порядке, что и здесь.',
          },
          fields: [
            {
              name: 'companyName',
              label: 'Компания',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'reviewer',
              label: 'Автор отзыва и должность',
              type: 'textarea',
              localized: true,
              required: true,
            },
            {
              name: 'year',
              label: 'Год',
              type: 'number',
              required: true,
            },
            {
              name: 'videoUrl',
              label: 'Ссылка на видео',
              type: 'text',
              required: true,
            },
            {
              name: 'previewImage',
              label: 'Превью (опционально)',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Отзывы на бумажных носителях',
      fields: [
        {
          name: 'documentsSectionTitle',
          label: 'Заголовок секции',
          type: 'text',
          localized: true,
          required: true,
          defaultValue: 'Отзывы на бумажных носителях',
        },
        {
          name: 'documentsSectionDescription',
          label: 'Описание секции',
          type: 'textarea',
          localized: true,
          required: true,
          defaultValue:
            'Мы гордимся проделанной работой и успешным сотрудничеством с нашими заказчиками.',
        },
        {
          name: 'textReviews',
          label: 'Карточки',
          type: 'array',
          admin: {
            description: 'Карточки выводятся на сайте в том же порядке, что и здесь.',
          },
          fields: [
            {
              name: 'companyName',
              label: 'Компания',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'reviewer',
              label: 'Автор отзыва и должность',
              type: 'textarea',
              localized: true,
              required: true,
            },
            {
              name: 'year',
              label: 'Год',
              type: 'number',
              required: true,
            },
            {
              name: 'documentImage',
              label: 'Изображение отзыва',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'meta',
      label: 'SEO',
      localized: true,
      fields: [
        {
          name: 'title',
          label: { ru: 'SEO-заголовок', en: 'Meta title' },
          type: 'text',
          defaultValue: 'Отзывы | RunwayTrans',
        },
        {
          name: 'description',
          label: { ru: 'SEO-описание', en: 'Meta description' },
          type: 'textarea',
          defaultValue: 'Видео-отзывы и письма благодарности от клиентов RunwayTrans.',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateReviews],
  },
}

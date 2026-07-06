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
          defaultValue: 'Видео-отзывы наших партнёров',
          required: true,
        },
        {
          name: 'pageDescription',
          label: 'Описание страницы',
          type: 'textarea',
          localized: true,
          defaultValue:
            'Мы имеем более 60 видео-отзывов и более 100 благодарностей на фирменных бланках от своих клиентов.',
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
          defaultValue: 'Виктория Кондакова',
          required: true,
        },
        {
          name: 'expertRole',
          label: 'Должность эксперта',
          type: 'text',
          localized: true,
          defaultValue: 'Эксперт по эксплуатации отелей в РФ',
          required: true,
        },
        {
          name: 'expertReviewLabels',
          label: 'Список отзывов эксперта',
          type: 'array',
          localized: true,
          minRows: 1,
          fields: [
            {
              name: 'label',
              label: 'Текст',
              type: 'text',
              required: true,
            },
          ],
          defaultValue: [
            { label: 'Family Place' },
            { label: 'Glamping Moon' },
            { label: 'Отель Атмосфера' },
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
          minRows: 1,
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
              defaultValue: 'ООО «Роснефть»',
            },
            {
              name: 'reviewer',
              label: 'Автор отзыва и должность',
              type: 'textarea',
              localized: true,
              required: true,
              defaultValue: 'Управляющий проекта: Сечин Семён Валерьевич',
            },
            {
              name: 'year',
              label: 'Год',
              type: 'number',
              required: true,
              defaultValue: 2023,
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
          defaultValue: [
            {
              companyName: 'ООО «Роснефть»',
              reviewer: 'Управляющий проекта: Сечин Семён Валерьевич',
              year: 2023,
              videoUrl: 'https://www.youtube.com',
            },
            {
              companyName: 'Логистика Транс Сервис',
              reviewer: 'Владелец компании: Иванов Дмитрий Владимирович',
              year: 2022,
              videoUrl: 'https://www.youtube.com',
            },
            {
              companyName: 'Авто Транспорт Москва',
              reviewer: 'Мэр г. Москва: Лужков Сергей Иванович',
              year: 2021,
              videoUrl: 'https://www.youtube.com',
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
          minRows: 1,
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
              defaultValue: 'ООО «Роснефть»',
            },
            {
              name: 'reviewer',
              label: 'Автор отзыва и должность',
              type: 'textarea',
              localized: true,
              required: true,
              defaultValue: 'Управляющий проекта: Сечин Семён Валерьевич',
            },
            {
              name: 'year',
              label: 'Год',
              type: 'number',
              required: true,
              defaultValue: 2023,
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
          label: 'Meta title',
          type: 'text',
          defaultValue: 'Отзывы | RunwayTrans',
        },
        {
          name: 'description',
          label: 'Meta description',
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

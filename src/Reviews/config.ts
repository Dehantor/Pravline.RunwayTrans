import type { GlobalConfig } from 'payload'

import { revalidateReviews } from './hooks/revalidateReviews'

export const ReviewsPage: GlobalConfig = {
  slug: 'reviewsPage',
  label: {
    singular: 'Отзывы',
    plural: 'Отзывы',
  },
  access: {
    read: () => true,
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
          defaultValue: 'Отзывы',
          required: true,
        },
        {
          name: 'pageTitle',
          label: 'Заголовок страницы',
          type: 'text',
          defaultValue: 'Видео-отзывы наших партнёров',
          required: true,
        },
        {
          name: 'pageDescription',
          label: 'Описание страницы',
          type: 'textarea',
          defaultValue:
            'Мы имеем более 60 видео-отзывов и более 100 благодарностей на фирменных бланках от своих клиентов.',
          required: true,
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
          defaultValue: 'Виктория Кондакова',
          required: true,
        },
        {
          name: 'expertTitle',
          label: 'Должность эксперта',
          type: 'text',
          defaultValue: 'Эксперт по эксплуатации отелей в РФ',
          required: true,
        },
        {
          name: 'expertReviews',
          label: 'Список отзывов эксперта',
          type: 'array',
          minRows: 1,
          defaultValue: [
            { title: 'Family Place' },
            { title: 'Glamping Moon' },
            { title: 'Отель Атмосфера' },
          ],
          fields: [
            {
              name: 'title',
              label: 'Название отзыва',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'videoReviews',
      label: 'Видео-отзывы',
      type: 'array',
      minRows: 1,
      defaultValue: [{ year: 2023 }, { year: 2022 }, { year: 2021 }],
      fields: [
        {
          name: 'title',
          label: 'Название/подпись',
          type: 'text',
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
        },
      ],
    },
    {
      name: 'textReviews',
      label: 'Текстовые отзывы',
      type: 'array',
      minRows: 1,
      defaultValue: [{ year: 2023 }, { year: 2022 }, { year: 2021 }],
      fields: [
        {
          name: 'title',
          label: 'Название/подпись',
          type: 'text',
        },
        {
          name: 'year',
          label: 'Год',
          type: 'number',
          required: true,
        },
        {
          name: 'document',
          label: 'Скан/документ отзыва',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      type: 'group',
      name: 'meta',
      label: 'SEO',
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

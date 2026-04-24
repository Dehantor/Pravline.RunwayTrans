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
          name: 'expertRole',
          label: 'Должность эксперта',
          type: 'text',
          defaultValue: 'Эксперт по эксплуатации отелей в РФ',
          required: true,
        },
        {
          name: 'expertReviewLabels',
          label: 'Список отзывов эксперта',
          type: 'array',
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
      name: 'videoReviews',
      label: 'Видео-отзывы',
      type: 'array',
      minRows: 1,
      fields: [
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
        { year: 2023, videoUrl: 'https://www.youtube.com' },
        { year: 2022, videoUrl: 'https://www.youtube.com' },
        { year: 2021, videoUrl: 'https://www.youtube.com' },
      ],
    },
    {
      name: 'textReviews',
      label: 'Текстовые отзывы',
      type: 'array',
      minRows: 1,
      fields: [
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

import type { GlobalConfig } from 'payload'

import { revalidatePartners } from './hooks/revalidatePartners'

export const PartnersPage: GlobalConfig = {
  slug: 'partnersPage',
  label: {
    singular: 'Партнеры',
    plural: 'Партнеры',
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
          localized: true,
          defaultValue: 'Партнеры',
          required: true,
        },
        {
          name: 'pageTitle',
          label: 'Заголовок страницы',
          type: 'text',
          localized: true,
          defaultValue: 'Партнеры',
          required: true,
        },
        {
          name: 'pageDescription',
          label: 'Описание страницы',
          type: 'textarea',
          localized: true,
          defaultValue:
            'Компании, с которыми мы сотрудничаем в международной логистике и комплексных поставках.',
          required: true,
        },
      ],
    },
    {
      name: 'partners',
      label: 'Карточки партнеров',
      type: 'array',
      minRows: 1,

      fields: [
        {
          name: 'logo',
          label: 'Логотип',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          label: 'Название',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Описание',
          type: 'textarea',
          localized: true,
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Кнопка под карточками',
      fields: [
        {
          name: 'videoButtonLabel',
          label: 'Текст кнопки',
          type: 'text',
          localized: true,
          defaultValue: 'Смотреть видео отзывы',
          required: true,
        },
        {
          name: 'videoButtonHref',
          label: 'Ссылка кнопки',
          type: 'text',
          defaultValue: 'https://www.youtube.com',
          required: true,
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
          defaultValue: 'Партнеры',
        },
        {
          name: 'description',
          label: 'Meta description',
          type: 'textarea',
          defaultValue: 'Страница партнеров Runway Trans.',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePartners],
  },
}

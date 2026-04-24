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
          defaultValue: 'Партнеры',
          required: true,
        },
        {
          name: 'pageTitle',
          label: 'Заголовок страницы',
          type: 'text',
          defaultValue: 'Партнеры',
          required: true,
        },
        {
          name: 'pageDescription',
          label: 'Описание страницы',
          type: 'textarea',
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
          name: 'name',
          label: 'Название (латиницей)',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          label: 'Название (локализованное)',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Описание',
          type: 'textarea',
          required: true,
        },
        {
          name: 'accent',
          label: 'CSS класс акцента',
          type: 'text',
          required: true,
          defaultValue: 'text-neutral-200',
        },
        {
          name: 'logoClassName',
          label: 'CSS классы логотипа',
          type: 'text',
          required: true,
          defaultValue: 'bg-neutral-900 text-neutral-100',
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

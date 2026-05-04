import type { GlobalConfig } from 'payload'

import { canEditContent, userHasRole } from '@/access/roles'
import { revalidateRunwayTransToday } from './hooks/revalidateRunwayTransToday'

export const RunwayTransTodayPage: GlobalConfig = {
  slug: 'runwayTransTodayPage',
  label: {
    singular: 'Ранвей Транс сегодня',
    plural: 'Ранвей Транс сегодня',
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
          defaultValue: 'Ранвей Транс сегодня',
          required: true,
        },
        {
          name: 'pageTitle',
          label: 'Заголовок страницы',
          type: 'text',
          localized: true,
          defaultValue: 'Ранвей Транс сегодня',
          required: true,
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Видео',
      fields: [
        {
          name: 'videoUrl',
          label: 'Ссылка на видео (YouTube/Vimeo/MP4)',
          type: 'text',
        },
        {
          name: 'videoFile',
          label: 'Видео-файл',
          type: 'upload',
          relationTo: 'media',
          filterOptions: {
            mimeType: {
              contains: 'video/',
            },
          },
        },
        {
          name: 'videoTitle',
          label: 'Название видео (для доступности)',
          type: 'text',
          localized: true,
          defaultValue: 'Презентация компании Ранвей Транс',
          required: true,
        },
      ],
    },
    {
      name: 'faqItems',
      label: 'Вопросы и ответы',
      type: 'array',
      localized: true,
      minRows: 1,
      defaultValue: [
        {
          question: 'Почему Ранвей Транс надежный партнёр?',
          answer:
            'Мы работаем в сложных условиях, используем собственный парк техники и обеспечиваем прозрачность на каждом этапе перевозки.',
        },
        {
          question: 'Что символизирует логотип компании?',
          answer:
            'Логотип отражает движение, технологичность и устойчивость нашей команды в любых дорожных и климатических условиях.',
        },
        {
          question: 'Какая деятельность у компании?',
          answer:
            'Организуем грузоперевозки, экспедицию, доставку спецтехники, а также сопутствующие логистические услуги для бизнеса.',
        },
      ],
      fields: [
        {
          name: 'question',
          label: 'Вопрос',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          label: 'Ответ',
          type: 'textarea',
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
          defaultValue: 'Ранвей Транс сегодня',
        },
        {
          name: 'description',
          label: 'Meta description',
          type: 'textarea',
          defaultValue:
            'Страница о компании Runway Trans сегодня: видео о компании, ключевые вопросы и ответы.',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateRunwayTransToday],
  },
}

import type { GlobalConfig } from 'payload'

import { canEditContent, userHasRole } from '@/access/roles'
import { revalidateHistoryPage } from './hooks/revalidateHistoryPage'

export const HistoryPage: GlobalConfig = {
  slug: 'historyPage',
  label: {
    singular: 'Страница истории',
    plural: 'Страница истории',
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
      label: 'Заголовки и навигация',
      fields: [
        {
          name: 'companyBreadcrumbLabel',
          label: 'Раздел в хлебных крошках',
          type: 'text',
          localized: true,
          defaultValue: 'Компания',
          required: true,
        },
        {
          name: 'breadcrumbsTitle',
          label: 'Название страницы в хлебных крошках',
          type: 'text',
          localized: true,
          defaultValue: 'История',
          required: true,
        },
        {
          name: 'pageTitle',
          label: 'Заголовок страницы',
          type: 'text',
          localized: true,
          defaultValue: 'История',
          required: true,
        },
      ],
    },
    {
      name: 'timeline',
      label: 'Этапы истории',
      type: 'array',
      localized: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      defaultValue: [
        {
          years: '2008',
          title: 'Основание компании',
          description:
            'Были приобретены 2 тягача Iveco с полуприцепами, а также 1 болотоход «Витязь».',
          tone: 'green',
        },
        {
          years: '2009',
          title: 'Работа в новых для нас регионах',
          description:
            'Приобретение ещё одного «Витязя». Транспортные услуги на болотоходах на длинные расстояния.',
          tone: 'gray',
        },
        {
          years: '2010',
          title: 'Признание в области транспортных услуг',
          description:
            'Руководители других компаний лично прилетали для благодарности ООО «Ранвей Транс».',
          tone: 'green',
        },
        {
          years: '2011',
          title: 'Появление на Таймыре',
          description: 'Участие в разработке новых нефтяных месторождений.',
          tone: 'gray',
        },
        {
          years: '2012–2016',
          title: 'Понимание сильных и слабых сторон техники',
          description: 'Приобретение новых единиц спецтехники.',
          tone: 'green',
        },
        {
          years: '2016–2020',
          title: 'Расширение присутствия компании',
          description: 'Иркутская область.',
          tone: 'gray',
        },
        {
          years: '2020–2022',
          title: 'Приобретение новых видов спецтехники',
          description: 'Экскаваторные и аварийные комплексы.',
          tone: 'green',
        },
        {
          years: '2023',
          title: 'Занимаем лидирующие позиции',
          description: 'Наши вездеходы работают на месторождениях по всей стране.',
          tone: 'gray',
        },
      ],
      fields: [
        {
          name: 'years',
          label: 'Год или период',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          label: 'Заголовок',
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
          name: 'tone',
          label: 'Цвет строки',
          type: 'select',
          defaultValue: 'green',
          options: [
            { label: 'Зелёный', value: 'green' },
            { label: 'Серый', value: 'gray' },
          ],
          required: true,
        },
        {
          name: 'image',
          label: 'Изображение',
          type: 'upload',
          relationTo: 'media',
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
          defaultValue: 'История',
        },
        {
          name: 'description',
          label: 'Meta description',
          type: 'textarea',
          defaultValue: 'Ключевые этапы развития компании Runway Trans.',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHistoryPage],
  },
}

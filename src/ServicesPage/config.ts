import type { GlobalConfig } from 'payload'

import { canEditContent, userHasRole } from '@/access/roles'
import { revalidateServicesPage } from './hooks/revalidateServicesPage'

export const ServicesPage: GlobalConfig = {
  slug: 'servicesPage',
  label: {
    singular: 'Страница услуг',
    plural: 'Страница услуг',
  },
  access: {
    read: () => true,
    update: canEditContent,
  },
  admin: {
    hidden: ({ user }) => !userHasRole(user, ['admin', 'moderator']),
    livePreview: {
      url: () => '/uslugi',
    },
    preview: () => '/uslugi',
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
          defaultValue: 'Услуги',
          required: true,
        },
        {
          name: 'intro',
          label: 'Вводный текст',
          type: 'textarea',
          localized: true,
          defaultValue:
            'Наша компания гарантирует своим клиентам полную сохранность и высокую скорость доставки грузов.',
          required: true,
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Наши транспортные возможности',
      fields: [
        {
          name: 'capabilitiesTitle',
          label: 'Заголовок',
          type: 'text',
          localized: true,
          defaultValue: 'Наши транспортные возможности',
          required: true,
        },
        {
          name: 'capabilitiesDescription',
          label: 'Описание',
          type: 'textarea',
          localized: true,
          defaultValue:
            'В арсенале нашей компании есть все необходимые транспортные возможности, чтобы организовать перевозку груза оптимальным способом.',
          required: true,
        },
        {
          name: 'ctaLabel',
          label: 'Текст кнопки заявки',
          type: 'text',
          localized: true,
          defaultValue: 'Оформить заявку',
          required: true,
        },
        {
          name: 'ctaHref',
          label: 'Ссылка кнопки заявки',
          type: 'text',
          defaultValue: '/contacts#callback-form',
          required: true,
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Что мы перевозим',
      fields: [
        {
          name: 'transportedSectionTitle',
          label: 'Заголовок блока',
          type: 'text',
          localized: true,
          defaultValue: 'Что мы перевозим',
          required: true,
        },
        {
          name: 'transportedDescription',
          label: 'Описание блока',
          type: 'textarea',
          localized: true,
          defaultValue:
            'Мы доставляем всё: от крупногабаритной спецтехники, оборудования, опасных грузов до малогабаритных сборных грузов.',
          required: true,
        },
        {
          name: 'transportedItems',
          label: 'Карточки',
          type: 'array',
          localized: true,
          minRows: 1,
          defaultValue: [
            {
              title: 'Крупногабаритные и тяжеловесные грузы',
            },
            {
              title: 'Специальная и строительная техника',
            },
            {
              title: 'Различное оборудование',
            },
            {
              title: 'Опасные грузы',
            },
            {
              title: 'Нефтепромысловое оборудование',
            },
            {
              title: 'Люди',
            },
          ],
          fields: [
            {
              name: 'image',
              label: 'Изображение',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'title',
              label: 'Название груза',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Наши преимущества',
      fields: [
        {
          name: 'advantagesSectionTitle',
          label: 'Заголовок блока',
          type: 'text',
          localized: true,
          defaultValue: 'Наши преимущества',
          required: true,
        },
        {
          name: 'advantagesItems',
          label: 'Карточки',
          type: 'array',
          localized: true,
          minRows: 1,
          defaultValue: [
            {
              title: 'Собственный парк техники',
              description:
                'Располагаем надёжной техникой для работы в северном климате. Подберём оптимальный транспорт под любую задачу.',
            },
            {
              title: 'Готовы привезти любой груз',
              description: 'Крупногабаритные, длинномерные, тяжеловесные и опасные грузы.',
            },
            {
              title: 'Работаем в сложных условиях',
              description:
                'Перевозим грузы в труднодоступные районы, на месторождения и нефтегазовые объекты, в том числе по зимникам.',
            },
            {
              title: 'Работаем в любое время года',
              description: 'Бесперебойно работаем как летом, так и в самые невообразимые морозы.',
            },
            {
              title: 'Комплексное решение в одном договоре',
              description:
                'Берём на себя задачи по разработке маршрута и подготовке расчётов, организации погрузки и безопасной доставке вашего груза.',
            },
            {
              title: 'Огромный опыт',
              description: 'Стабильно входим в приоритетные компании по грузоперевозкам.',
            },
          ],
          fields: [
            {
              name: 'image',
              label: 'Изображение',
              type: 'upload',
              relationTo: 'media',
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
          defaultValue: 'Услуги | Runway Trans',
        },
        {
          name: 'description',
          label: 'Meta description',
          type: 'textarea',
          defaultValue: 'Услуги грузоперевозок Runway Trans.',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateServicesPage],
  },
}

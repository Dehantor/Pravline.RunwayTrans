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
  },
  fields: [
    {
      name: 'transportedSectionTitle',
      label: 'Заголовок блока "Что мы перевозим"',
      type: 'text',
      localized: true,
      defaultValue: 'Что мы перевозим',
      required: true,
    },
    {
      name: 'transportedItems',
      label: 'Карточки блока "Что мы перевозим"',
      type: 'array',
      localized: true,
      minRows: 1,
      defaultValue: [
        {
          title: 'Крупногабаритные и тяжеловесные грузы',
          description: 'Опыт перевозки сложных грузов в удалённые районы.',
        },
        {
          title: 'Спецмашины и строительная техника',
          description: 'Подбираем транспорт под задачи промышленности и строительства.',
        },
        {
          title: 'Различное оборудование',
          description: 'Аккуратная погрузка, фиксация и доставка ценных грузов.',
        },
      ],
      fields: [
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
    {
      name: 'advantagesSectionTitle',
      label: 'Заголовок блока "Наши преимущества"',
      type: 'text',
      localized: true,
      defaultValue: 'Наши преимущества',
      required: true,
    },
    {
      name: 'advantagesItems',
      label: 'Карточки блока "Наши преимущества"',
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
      ],
      fields: [
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
  hooks: {
    afterChange: [revalidateServicesPage],
  },
}

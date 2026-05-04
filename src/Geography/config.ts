import type { GlobalConfig } from 'payload'

import { canEditContent, userHasRole } from '@/access/roles'
import { revalidateGeography } from './hooks/revalidateGeography'

export const GeographyPage: GlobalConfig = {
  slug: 'geographyPage',
  label: {
    singular: 'География',
    plural: 'География',
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
      name: 'deliveries',
      label: 'Список перевозок под картой',
      type: 'array',
      minRows: 1,
      defaultValue: [
        {
          color: '#bd1395',
          period: 'Январь 2025 - Март 2025',
          title: 'Доставка грузов на Ванкор на вездеходах',
          route: '(п. Ярцево - п. Игарка - п. Байкаловск)',
          duration: '3 дня',
        },
        {
          color: '#0e5ca6',
          period: 'Январь 2025 - Май 2025',
          title: 'Обслуживание нефтепровода',
          route: '(п. Караул - п. Таналау)',
        },
      ],
      fields: [
        {
          name: 'color',
          label: 'Цвет маркера',
          type: 'text',
          defaultValue: '#0e5ca6',
          required: true,
        },
        {
          name: 'period',
          label: 'Период',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'title',
          label: 'Описание',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'route',
          label: 'Маршрут',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'duration',
          label: 'Срок',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGeography],
  },
}

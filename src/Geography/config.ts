import type { GlobalConfig } from 'payload'

import { canEditContent, userHasRole } from '@/access/roles'
import { isAppLocale } from '@/i18n/locales'
import { revalidateGeography } from './hooks/revalidateGeography'
import { getDefaultGeographyMapPoints } from './locationMessages'

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
      name: 'mapPoints',
      label: 'Объекты на карте',
      type: 'array',
      defaultValue: ({ locale }: { locale?: string }) =>
        getDefaultGeographyMapPoints(locale && isAppLocale(locale) ? locale : 'ru').map(
          ({ coordinates: [latitude, longitude], ...point }) => ({
            ...point,
            latitude,
            longitude,
          }),
        ),
      admin: {
        description: 'Отдельные метки офиса, ремонтных баз и месторождений на странице географии.',
      },
      fields: [
        {
          name: 'kind',
          label: 'Тип объекта',
          type: 'select',
          options: [
            { label: 'Офис', value: 'office' },
            { label: 'Ремонтная база', value: 'repairBase' },
            { label: 'Месторождение', value: 'field' },
          ],
          required: true,
        },
        { name: 'title', label: 'Название', type: 'text', localized: true, required: true },
        { name: 'description', label: 'Описание', type: 'textarea', localized: true },
        { name: 'latitude', label: 'Широта', type: 'number', min: -90, max: 90, required: true },
        {
          name: 'longitude',
          label: 'Долгота',
          type: 'number',
          min: -180,
          max: 180,
          required: true,
        },
      ],
    },
    {
      name: 'deliveries',
      label: 'Список перевозок под картой',
      type: 'array',
      minRows: 1,
      defaultValue: [
        {
          color: 'var(--question)',
          period: 'Январь 2025 - Март 2025',
          title: 'Доставка грузов на Ванкор на вездеходах',
          route: '(п. Ярцево - п. Игарка - п. Байкаловск)',
          duration: '3 дня',
        },
        {
          color: 'var(--brand-blue)',
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
          defaultValue: 'var(--brand-blue)',
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
        {
          name: 'routePoints',
          label: 'Координаты маршрута',
          type: 'array',
          admin: {
            description:
              'Добавьте минимум две точки. Маршрут на карте строится последовательно по этим координатам.',
          },
          fields: [
            {
              name: 'latitude',
              label: 'Широта',
              type: 'number',
              min: -90,
              max: 90,
              required: true,
            },
            {
              name: 'longitude',
              label: 'Долгота',
              type: 'number',
              min: -180,
              max: 180,
              required: true,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGeography],
  },
}

import type { CollectionConfig } from 'payload'

import { canManageApplications, userHasRole } from '@/access/roles'

export const ServiceOrders: CollectionConfig<'service-orders'> = {
  slug: 'service-orders',
  labels: {
    singular: 'Заявка на услугу',
    plural: 'Заявки на услуги',
  },
  access: {
    create: () => true,
    delete: canManageApplications,
    read: canManageApplications,
    update: canManageApplications,
  },
  admin: {
    defaultColumns: ['fullName', 'contact', 'service', 'createdAt'],
    hidden: ({ user }) => !userHasRole(user, ['admin', 'office-manager']),
    useAsTitle: 'fullName',
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      label: 'ФИО',
      required: true,
    },
    {
      name: 'contact',
      type: 'text',
      label: 'Контакт для связи',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      label: 'Компания',
    },
    {
      name: 'details',
      type: 'textarea',
      label: 'Детали заказа',
      required: true,
    },
    {
      name: 'service',
      type: 'relationship',
      label: 'Услуга',
      relationTo: 'services',
      required: true,
    },
  ],
}

import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

export const ServiceOrders: CollectionConfig<'service-orders'> = {
  slug: 'service-orders',
  access: {
    create: () => true,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['fullName', 'contact', 'service', 'createdAt'],
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

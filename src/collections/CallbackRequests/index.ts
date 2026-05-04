import type { CollectionConfig } from 'payload'

import { canManageApplications, userHasRole } from '@/access/roles'

export const CallbackRequests: CollectionConfig<'callback-requests'> = {
  slug: 'callback-requests',
  labels: {
    singular: 'Заявка на звонок',
    plural: 'Заявки на звонок',
  },
  access: {
    create: () => true,
    delete: canManageApplications,
    read: canManageApplications,
    update: canManageApplications,
  },
  admin: {
    defaultColumns: ['phone', 'createdAt'],
    hidden: ({ user }) => !userHasRole(user, ['admin', 'office-manager']),
    useAsTitle: 'phone',
  },
  fields: [
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон',
      required: true,
    },
  ],
  timestamps: true,
}

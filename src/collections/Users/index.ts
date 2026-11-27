import type { CollectionConfig } from 'payload'

import { adminOnly, adminOrSelf, canUseAdminPanel, isAdminUser, ROLE_OPTIONS } from '@/access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { ru: 'Пользователь', en: 'User' },
    plural: { ru: 'Пользователи', en: 'Users' },
  },
  access: {
    admin: canUseAdminPanel,
    create: adminOnly,
    delete: adminOnly,
    read: adminOrSelf,
    update: adminOrSelf,
  },
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    hidden: ({ user }) => !isAdminUser(user),
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      label: { ru: 'Имя', en: 'Name' },
      type: 'text',
    },
    {
      name: 'roles',
      label: { ru: 'Роли', en: 'Roles' },
      type: 'select',
      hasMany: true,
      options: ROLE_OPTIONS,
      defaultValue: ['office-manager'],
      required: true,
      saveToJWT: true,
      access: {
        create: ({ req: { user } }) => isAdminUser(user),
        update: ({ req: { user } }) => isAdminUser(user),
      },
    },
  ],
  timestamps: true,
}

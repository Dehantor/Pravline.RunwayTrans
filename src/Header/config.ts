import type { GlobalConfig } from 'payload'

import { canEditContent, userHasRole } from '@/access/roles'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: { ru: 'Шапка сайта', en: 'Header' },
  access: {
    read: () => true,
    update: canEditContent,
  },
  admin: {
    hidden: ({ user }) => !userHasRole(user, ['admin', 'moderator']),
  },
  fields: [
    {
      name: 'navItems',
      label: { ru: 'Пункты меню', en: 'Navigation items' },
      localized: true,
      type: 'array',
      fields: [
        link({
          appearances: false,
          localizedLabel: true,
        }),
        {
          name: 'children',
          type: 'array',
          admin: {
            initCollapsed: true,
          },
          fields: [
            link({
              appearances: false,
            }),
          ],
          label: { ru: 'Вложенные ссылки', en: 'Child links' },
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}

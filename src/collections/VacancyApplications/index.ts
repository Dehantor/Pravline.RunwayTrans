import type { CollectionConfig } from 'payload'

import { canManageApplications, userHasRole } from '@/access/roles'

export const VacancyApplications: CollectionConfig<'vacancy-applications'> = {
  slug: 'vacancy-applications',
  labels: {
    singular: 'Отклик на вакансию',
    plural: 'Отклики на вакансии',
  },
  access: {
    create: () => true,
    delete: canManageApplications,
    read: canManageApplications,
    update: canManageApplications,
  },
  admin: {
    defaultColumns: ['fullName', 'contact', 'vacancy', 'createdAt'],
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
      name: 'resume',
      type: 'upload',
      label: 'Резюме',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'coverLetter',
      type: 'textarea',
      label: 'Сопроводительный текст',
      required: true,
    },
    {
      name: 'vacancy',
      type: 'relationship',
      label: 'Вакансия',
      relationTo: 'vacancies',
      required: true,
    },
  ],
}

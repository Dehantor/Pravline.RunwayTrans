import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

export const VacancyApplications: CollectionConfig<'vacancy-applications'> = {
  slug: 'vacancy-applications',
  access: {
    create: () => true,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['fullName', 'contact', 'vacancy', 'createdAt'],
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

import type { Block } from 'payload'

export const VacanciesList: Block = {
  slug: 'vacanciesList',
  labels: {
    singular: 'Список вакансий',
    plural: 'Списки вакансий',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Открытые вакансии',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 12,
      min: 1,
      max: 100,
      admin: {
        description: 'Сколько вакансий показывать на странице.',
      },
    },
  ],
}

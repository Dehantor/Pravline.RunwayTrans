import type { Field } from 'payload'

type FieldLabels = Readonly<Record<string, { ru: string; en: string }>>

export function translatePluginFields(fields: Field[], labels: FieldLabels): Field[] {
  return fields.map((field) => {
    const label = 'name' in field ? labels[field.name] : undefined
    const translated =
      label && !('label' in field && field.label === false) ? { ...field, label } : field

    if ('fields' in translated) {
      return { ...translated, fields: translatePluginFields(translated.fields, labels) }
    }
    return translated
  })
}

export const redirectFieldLabels: FieldLabels = {
  from: { ru: 'Исходный адрес', en: 'From' },
  type: { ru: 'Тип назначения', en: 'Type' },
  reference: { ru: 'Страница или публикация', en: 'Reference' },
  url: { ru: 'Адрес назначения', en: 'URL' },
}

export const formFieldLabels: FieldLabels = {
  title: { ru: 'Название формы', en: 'Title' },
  fields: { ru: 'Поля формы', en: 'Fields' },
  submitButtonLabel: { ru: 'Текст кнопки отправки', en: 'Submit Button Label' },
  confirmationType: { ru: 'Действие после отправки', en: 'Confirmation Type' },
  confirmationMessage: { ru: 'Сообщение после отправки', en: 'Confirmation Message' },
  redirect: { ru: 'Перенаправление', en: 'Redirect' },
  url: { ru: 'Адрес перенаправления', en: 'URL to redirect to' },
  emails: { ru: 'Письма', en: 'Emails' },
  emailTo: { ru: 'Кому', en: 'Email To' },
  cc: { ru: 'Копия', en: 'CC' },
  bcc: { ru: 'Скрытая копия', en: 'BCC' },
  replyTo: { ru: 'Адрес для ответа', en: 'Reply To' },
  emailFrom: { ru: 'Отправитель', en: 'Email From' },
  subject: { ru: 'Тема письма', en: 'Subject' },
  message: { ru: 'Текст письма', en: 'Message' },
}

export const submissionFieldLabels: FieldLabels = {
  form: { ru: 'Форма', en: 'Form' },
  submissionData: { ru: 'Ответы', en: 'Submission Data' },
  field: { ru: 'Поле', en: 'Field' },
  value: { ru: 'Значение', en: 'Value' },
}

export const searchFieldLabels: FieldLabels = {
  title: { ru: 'Заголовок', en: 'Title' },
  priority: { ru: 'Приоритет', en: 'Priority' },
  doc: { ru: 'Документ', en: 'Doc' },
  docUrl: { ru: 'Адрес документа', en: 'Doc URL' },
  slug: { ru: 'Адрес публикации', en: 'Slug' },
}

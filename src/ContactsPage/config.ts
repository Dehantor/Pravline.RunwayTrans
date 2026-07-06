import type { GlobalConfig } from 'payload'

import { canEditContent, userHasRole } from '@/access/roles'
import { revalidateContactsPage } from './hooks/revalidateContactsPage'

export const ContactsPage: GlobalConfig = {
  slug: 'contactsPage',
  label: {
    singular: 'Страница контактов',
    plural: 'Страница контактов',
  },
  access: {
    read: () => true,
    update: canEditContent,
  },
  admin: {
    hidden: ({ user }) => !userHasRole(user, ['admin', 'moderator']),
    livePreview: {
      url: () => '/contacts',
    },
    preview: () => '/contacts',
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Заголовок страницы',
      fields: [
        {
          name: 'homeLinkLabel',
          label: 'Подпись ссылки на главную',
          type: 'text',
          localized: true,
          defaultValue: 'Главная',
          required: true,
        },
        {
          name: 'breadcrumbsTitle',
          label: 'Подпись в хлебных крошках',
          type: 'text',
          localized: true,
          defaultValue: 'Контакты',
          required: true,
        },
        {
          name: 'pageTitle',
          label: 'Заголовок страницы',
          type: 'text',
          localized: true,
          defaultValue: 'Контакты',
          required: true,
        },
      ],
    },
    {
      name: 'contactItems',
      label: 'Контактные данные',
      type: 'array',
      localized: true,
      minRows: 1,
      defaultValue: [
        {
          icon: 'address',
          label: 'Наш головной офис',
          value: 'г. Красноярск, ул. Красной Армии, 10',
        },
        {
          icon: 'phone',
          label: 'Телефон',
          value: '+7 (391) 000-00-00',
          href: 'tel:+73910000000',
        },
        {
          icon: 'email',
          label: 'Email',
          value: 'info@runwaytrans.ru',
          href: 'mailto:info@runwaytrans.ru',
        },
      ],
      fields: [
        {
          name: 'icon',
          label: 'Иконка',
          type: 'select',
          defaultValue: 'address',
          options: [
            { label: 'Адрес', value: 'address' },
            { label: 'Телефон', value: 'phone' },
            { label: 'Email', value: 'email' },
            { label: 'Время работы', value: 'hours' },
            { label: 'Сообщение', value: 'message' },
          ],
          required: true,
        },
        {
          name: 'label',
          label: 'Подпись',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          label: 'Значение',
          type: 'textarea',
          required: true,
        },
        {
          name: 'href',
          label: 'Ссылка',
          type: 'text',
          admin: {
            description:
              'Необязательно. Например: tel:+73910000000, mailto:info@example.ru или https://...',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Форма обратного звонка',
      fields: [
        {
          name: 'callbackTitle',
          label: 'Заголовок формы',
          type: 'text',
          localized: true,
          defaultValue: 'Заказать звонок',
          required: true,
        },
        {
          name: 'phonePlaceholder',
          label: 'Подсказка в поле телефона',
          type: 'text',
          localized: true,
          defaultValue: 'Ваш номер телефона',
          required: true,
        },
        {
          name: 'consentLabel',
          label: 'Текст согласия',
          type: 'textarea',
          localized: true,
          defaultValue: 'Я согласен(а) на обработку персональных данных',
          required: true,
        },
        {
          name: 'submitLabel',
          label: 'Текст кнопки',
          type: 'text',
          localized: true,
          defaultValue: 'Перезвонить',
          required: true,
        },
        {
          name: 'submittingLabel',
          label: 'Текст во время отправки',
          type: 'text',
          localized: true,
          defaultValue: 'Отправка...',
          required: true,
        },
        {
          name: 'successMessage',
          label: 'Сообщение об успешной отправке',
          type: 'text',
          localized: true,
          defaultValue: 'Заявка успешно отправлена.',
          required: true,
        },
        {
          name: 'errorMessage',
          label: 'Сообщение при ошибке',
          type: 'text',
          localized: true,
          defaultValue: 'Произошла ошибка при отправке.',
          required: true,
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Карта и реквизиты',
      fields: [
        {
          name: 'mapEmbedUrl',
          label: 'Местоположение офиса',
          type: 'text',
          defaultValue:
            'https://www.openstreetmap.org/export/embed.html?bbox=92.856071%2C55.993209%2C92.906071%2C56.023209&layer=mapnik&marker=56.008209%2C92.881071',
          required: true,
          admin: {
            components: {
              Field: '@/ContactsPage/MapLocationField',
            },
          },
        },
        {
          name: 'mapTitle',
          label: 'Название карты',
          type: 'text',
          localized: true,
          defaultValue: 'Карта офиса Runway Trans',
          required: true,
        },
        {
          name: 'requisitesImage',
          label: 'Изображение реквизитов или лицензии',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'requisitesText',
          label: 'Подпись под реквизитами',
          type: 'textarea',
          localized: true,
          defaultValue: 'Лицензия и реквизиты компании доступны по запросу.',
        },
      ],
    },
    {
      type: 'group',
      name: 'meta',
      label: 'SEO',
      localized: true,
      fields: [
        {
          name: 'title',
          label: 'Meta title',
          type: 'text',
          defaultValue: 'Контакты | Runway Trans',
        },
        {
          name: 'description',
          label: 'Meta description',
          type: 'textarea',
          defaultValue: 'Свяжитесь с Runway Trans: адрес, телефон, email и форма обратного звонка.',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateContactsPage],
  },
}

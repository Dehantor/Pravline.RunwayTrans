import type { GlobalConfig } from 'payload'

import { revalidateGuide } from './hooks/revalidateGuide'

export const GuidePage: GlobalConfig = {
  slug: 'guidePage',
  label: {
    singular: 'Руководство',
    plural: 'Руководство',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Верхний блок',
      fields: [
        {
          name: 'breadcrumbsTitle',
          label: 'Подпись в хлебных крошках',
          type: 'text',
          defaultValue: 'Руководство',
          required: true,
        },
        {
          name: 'pageTitle',
          label: 'Заголовок страницы (скрыт визуально)',
          type: 'text',
          defaultValue: 'Руководство по грузоперевозкам',
          required: true,
        },
      ],
    },
    {
      name: 'mainGuideCards',
      label: 'Карточки главного блока',
      type: 'array',
      minRows: 1,
      defaultValue: [
        {
          title: 'Грузоперевозки на Витязях',
          description: 'Одиночные вездеходы, автономность, доступная цена',
        },
        {
          title: 'Грузоперевозки по зимникам',
          description: 'Доставка грузов спецтранспортом по подготовленным дорогам и зимникам',
        },
        {
          title: 'Грузоперевозки на «вездеходах»',
          description: 'Перевозка и экспедиция на колёсах низкого давления',
        },
        {
          title: 'Услуги крана и аварийных комиссаров',
          description: 'Устраним аварийную остановку на базе болотохода ТГ-30 с оборудованным манипулятором и эвакуатором',
        },
      ],
      fields: [
        {
          name: 'title',
          label: 'Заголовок',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Описание',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Кнопка CTA',
      fields: [
        {
          name: 'ctaLabel',
          label: 'Текст кнопки',
          type: 'text',
          defaultValue: 'Оформить заявку',
          required: true,
        },
        {
          name: 'ctaHref',
          label: 'Ссылка кнопки',
          type: 'text',
          defaultValue: '/next/vacancies/apply',
          required: true,
        },
      ],
    },
    {
      name: 'advantages',
      label: 'Карточки преимуществ',
      type: 'array',
      minRows: 1,
      defaultValue: [
        {
          title: 'Крупногабаритные и тяжеловесные грузы',
          description: 'Опыт перевозки сложных грузов в удалённые районы',
        },
        {
          title: 'Спецмашины и строительная техника',
          description: 'Подбираем транспорт под задачи промышленности и строительства',
        },
        {
          title: 'Различное оборудование',
          description: 'Аккуратная погрузка, фиксация и доставка ценных грузов',
        },
        {
          title: 'Опасные грузы',
          description: 'Соблюдаем регламенты и требования к перевозке',
        },
        {
          title: 'Нефтегазодобывающее оборудование',
          description: 'Работаем с месторождениями, буровыми и обслуживающими базами',
        },
        {
          title: 'Люди',
          description: 'Транспортировка персонала в труднодоступные точки маршрута',
        },
        {
          title: 'Собственный парк техники',
          description: 'Надёжная техника для работы в условиях Крайнего Севера и бездорожья',
        },
        {
          title: 'Готовы привезти любой груз',
          description: 'Крупногабаритные, длинномерные, тяжеловесные и опасные грузы',
        },
        {
          title: 'Работаем в сложных условиях',
          description: 'Перевозим грузы в труднодоступные районы на месторождения и нефтегазовые объекты',
        },
        {
          title: 'Работаем в любое время года',
          description: 'Бесперебойная доставка как летом, так и в самые морозные месяцы',
        },
        {
          title: 'Комплексное решение по одному договору',
          description: 'Берём на себя маршрут, подготовку расчётов, организацию погрузки и безопасную доставку',
        },
        {
          title: 'Огромный опыт',
          description: 'Стабильно входим в приоритетные компании по грузоперевозкам',
        },
      ],
      fields: [
        {
          name: 'title',
          label: 'Заголовок',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Описание',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Блок команды',
      fields: [
        {
          name: 'teamTiles',
          label: 'Карточки команды',
          type: 'array',
          minRows: 1,
          defaultValue: [
            {
              title: 'Руководитель отдела',
              subtitle: 'Команда RunwayTrans',
              layout: 'large',
            },
            {
              title: 'Менеджер проектов',
              subtitle: 'Команда RunwayTrans',
              layout: 'tall',
            },
            {
              title: 'Координатор перевозок',
              subtitle: 'Команда RunwayTrans',
              layout: 'wide',
            },
            {
              title: 'Логист',
              subtitle: 'Команда RunwayTrans',
              layout: 'regular',
            },
            {
              title: 'Специалист сопровождения',
              subtitle: 'Команда RunwayTrans',
              layout: 'wide',
            },
            {
              title: 'Оператор 24/7',
              subtitle: 'Команда RunwayTrans',
              layout: 'regular',
            },
          ],
          fields: [
            {
              name: 'title',
              label: 'Заголовок',
              type: 'text',
              required: true,
            },
            {
              name: 'subtitle',
              label: 'Подзаголовок',
              type: 'text',
              defaultValue: 'Команда RunwayTrans',
            },
            {
              name: 'layout',
              label: 'Размер карточки',
              type: 'select',
              defaultValue: 'regular',
              options: [
                { label: 'Стандартная', value: 'regular' },
                { label: 'Широкая', value: 'wide' },
                { label: 'Высокая', value: 'tall' },
                { label: 'Большая (2x2)', value: 'large' },
              ],
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'meta',
      label: 'SEO',
      fields: [
        {
          name: 'title',
          label: 'Meta title',
          type: 'text',
          defaultValue: 'Руководство',
        },
        {
          name: 'description',
          label: 'Meta description',
          type: 'textarea',
          defaultValue: 'Руководство по услугам и условиям грузоперевозок RunwayTrans.',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateGuide],
  },
}

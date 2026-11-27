'use client'

import { useTranslation } from '@payloadcms/ui'
import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  const { i18n } = useTranslation()
  const russian = i18n.language !== 'en'

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__jivo`}>
        <div>
          <h4>{russian ? 'Чат Jivo' : 'Jivo live chat'}</h4>
          <p>{russian
            ? 'Откройте кабинет оператора, чтобы ответить посетителям сайта.'
            : 'Open the operator workspace to reply to site visitors.'}</p>
        </div>
        <a
          className={`${baseClass}__jivo-link`}
          href="https://app.jivo.ru"
          rel="noopener noreferrer"
          target="_blank"
        >
          {russian ? 'Открыть Jivo' : 'Open Jivo'}
        </a>
      </div>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>{russian ? 'Добро пожаловать в панель управления!' : 'Welcome to your dashboard!'}</h4>
      </Banner>
      {russian ? 'С чего начать' : 'Here’s what to do next:'}
      <ul className={`${baseClass}__instructions`}>
        <li>
          <SeedButton />
          {russian
            ? ', чтобы добавить примеры страниц и публикаций. Затем '
            : ' with a few pages, posts, and projects to jump-start your new site, then '}
          <a href="/" target="_blank">
            {russian ? 'откройте сайт' : 'visit your website'}
          </a>
          {russian ? ', чтобы посмотреть результат.' : ' to see the results.'}
        </li>
        <li>
          {russian ? 'Настройте ' : 'Modify your '}
          <a
            href="https://payloadcms.com/docs/configuration/collections"
            rel="noopener noreferrer"
            target="_blank"
          >
            {russian ? 'коллекции' : 'collections'}
          </a>
          {russian ? ' и добавьте нужные ' : ' and add more '}
          <a
            href="https://payloadcms.com/docs/fields/overview"
            rel="noopener noreferrer"
            target="_blank"
          >
            {russian ? 'поля' : 'fields'}
          </a>
          {russian
            ? '. Если вы впервые работаете с Payload, прочитайте '
            : ' as needed. If you are new to Payload, we also recommend you check out the '}
          <a
            href="https://payloadcms.com/docs/getting-started/what-is-payload"
            rel="noopener noreferrer"
            target="_blank"
          >
            {russian ? 'руководство по началу работы' : 'Getting Started'}
          </a>
          {russian ? '.' : ' docs.'}
        </li>
        <li>
          {russian
            ? 'Зафиксируйте и отправьте изменения в репозиторий, чтобы запустить повторное развёртывание сайта.'
            : 'Commit and push your changes to the repository to trigger a redeployment of your project.'}
        </li>
      </ul>
      {russian ? 'Этот блок — ' : 'Pro Tip: This block is a '}
      <a
        href="https://payloadcms.com/docs/custom-components/overview"
        rel="noopener noreferrer"
        target="_blank"
      >
        {russian ? 'пользовательский компонент' : 'custom component'}
      </a>
      {russian ? '. Его можно убрать в файле ' : ', you can remove it at any time by updating your '}
      <strong>payload.config</strong>.
    </div>
  )
}

export default BeforeDashboard

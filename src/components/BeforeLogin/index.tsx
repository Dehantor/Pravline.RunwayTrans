'use client'

import { useTranslation } from '@payloadcms/ui'
import React from 'react'

const BeforeLogin: React.FC = () => {
  const { i18n } = useTranslation()
  const russian = i18n.language !== 'en'

  return (
    <div>
      <p>
        <b>{russian ? 'Добро пожаловать в панель управления!' : 'Welcome to your dashboard!'}</b>
        {russian
          ? ' Войдите, чтобы управлять сайтом.'
          : ' This is where site admins will log in to manage your website.'}
      </p>
    </div>
  )
}

export default BeforeLogin

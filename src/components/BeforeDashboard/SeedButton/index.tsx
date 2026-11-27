'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { toast, useTranslation } from '@payloadcms/ui'

import './index.scss'

const SuccessMessage = ({ russian }: { russian: boolean }) => (
  <div>
    {russian ? 'Примеры добавлены. Теперь можно ' : 'Database seeded! You can now '}
    <a target="_blank" href="/">
      {russian ? 'открыть сайт' : 'visit your website'}
    </a>
  </div>
)

export const SeedButton: React.FC = () => {
  const { i18n } = useTranslation()
  const russian = i18n.language !== 'en'
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (seeded) {
        toast.info(russian ? 'Примеры уже добавлены.' : 'Database already seeded.')
        return
      }
      if (loading) {
        toast.info(russian ? 'Примеры уже добавляются.' : 'Seeding already in progress.')
        return
      }
      if (error) {
        toast.error(
          russian
            ? 'Произошла ошибка. Обновите страницу и попробуйте снова.'
            : 'An error occurred, please refresh and try again.',
        )
        return
      }

      const failureMessage = russian
        ? 'Не удалось добавить примеры.'
        : 'An error occurred while seeding.'
      setLoading(true)

      try {
        toast.promise(
          new Promise((resolve, reject) => {
            try {
              fetch('/next/seed', { method: 'POST', credentials: 'include' })
                .then((res) => {
                  if (res.ok) {
                    resolve(true)
                    setSeeded(true)
                  } else {
                    reject(failureMessage)
                  }
                })
                .catch((error) => {
                  reject(error)
                })
            } catch (error) {
              reject(error)
            }
          }),
          {
            loading: russian ? 'Добавляем примеры…' : 'Seeding with data…',
            success: <SuccessMessage russian={russian} />,
            error: failureMessage,
          },
        )
      } catch (err) {
        const error = err instanceof Error ? err.message : String(err)
        setError(error)
      }
    },
    [loading, seeded, error, russian],
  )

  let message = ''
  if (loading) message = russian ? ' (добавляем…) ' : ' (seeding…) '
  if (seeded) message = russian ? ' (готово) ' : ' (done!) '
  if (error) message = russian ? ` (ошибка: ${error}) ` : ` (error: ${error}) `

  return (
    <Fragment>
      <button className="seedButton" onClick={handleClick}>
        {russian ? 'Заполните базу примерами' : 'Seed your database'}
      </button>
      {message}
    </Fragment>
  )
}

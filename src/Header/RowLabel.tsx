'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel, useTranslation } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()
  const { i18n } = useTranslation()
  const itemLabel = i18n.language === 'en' ? 'Nav item' : 'Пункт меню'
  const position = data.rowNumber === undefined ? '' : ` ${data.rowNumber + 1}`
  const linkLabel = data.data?.link?.label

  const label = linkLabel ? `${itemLabel}${position}: ${linkLabel}` : `${itemLabel}${position}`

  return <div>{label}</div>
}

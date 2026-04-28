import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import { getRequestLocale } from '@/i18n/getRequestLocale'

export async function Header() {
  const locale = await getRequestLocale()
  const headerData = await getCachedGlobal('header', locale, 1)()

  return <HeaderClient data={headerData} />
}

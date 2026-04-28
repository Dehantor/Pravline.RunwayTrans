import { cookies, headers } from 'next/headers'

import { defaultLocale, isAppLocale, type AppLocale } from './locales'

const localeCookieName = 'rw_locale'
const localeHeaderName = 'x-rw-locale'

export async function getRequestLocale(): Promise<AppLocale> {
  const requestHeaders = await headers()
  const headerLocale = requestHeaders.get(localeHeaderName)?.toLowerCase()

  if (headerLocale && isAppLocale(headerLocale)) {
    return headerLocale
  }

  const requestCookies = await cookies()
  const cookieLocale = requestCookies.get(localeCookieName)?.value?.toLowerCase()

  if (cookieLocale && isAppLocale(cookieLocale)) {
    return cookieLocale
  }

  return defaultLocale
}

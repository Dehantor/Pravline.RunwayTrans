export const locales = ['ru', 'en', 'de', 'fr', 'zh'] as const

export type AppLocale = (typeof locales)[number]

export const defaultLocale: AppLocale = 'ru'

export function isAppLocale(value: string): value is AppLocale {
  return locales.includes(value as AppLocale)
}

export function getLocaleFromAcceptLanguage(acceptLanguageHeader?: string | null): AppLocale {
  if (!acceptLanguageHeader) return defaultLocale

  const requestedLocales = acceptLanguageHeader
    .split(',')
    .map((entry) => entry.trim().split(';')[0]?.toLowerCase())
    .filter((entry): entry is string => Boolean(entry))

  for (const requested of requestedLocales) {
    if (isAppLocale(requested)) return requested

    const baseLanguage = requested.split('-')[0]
    if (baseLanguage && isAppLocale(baseLanguage)) return baseLanguage
  }

  return defaultLocale
}

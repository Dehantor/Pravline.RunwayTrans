'use client'

import { locales, type AppLocale } from '@/i18n/locales'
import { usePathname, useSearchParams } from 'next/navigation'

const localeLabels: Record<AppLocale, string> = {
  ru: 'Русский',
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  zh: '中文',
}

function buildPathWithLocale(pathname: string, locale: AppLocale): string {
  const segments = pathname.split('/').filter(Boolean)
  const rest = locales.includes(segments[0] as AppLocale) ? segments.slice(1) : segments
  const normalizedPath = rest.length > 0 ? `/${rest.join('/')}` : '/'

  return normalizedPath === '/' ? `/${locale}` : `/${locale}${normalizedPath}`
}

export function LanguageSwitcher({ locale }: { locale: AppLocale }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onChange = (nextLocale: AppLocale) => {
    const pathWithLocale = buildPathWithLocale(pathname, nextLocale)
    const query = searchParams.toString()
    const nextPath = query ? `${pathWithLocale}?${query}` : pathWithLocale

    document.cookie = `rw_locale=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`
    window.location.assign(nextPath)
  }

  return (
    <label className="inline-flex items-center gap-2 text-sm text-[#2f794e]">
      <span className="sr-only">Язык сайта</span>
      <select
        aria-label="Язык сайта"
        className="h-9 rounded-sm border border-[#2f794e] bg-white px-3 text-sm font-semibold text-[#2f794e] transition-colors hover:bg-[#e8f4e7] focus:outline-none focus:ring-2 focus:ring-[#4c7d4f]"
        onChange={(event) => onChange(event.target.value as AppLocale)}
        value={locale}
      >
        {locales.map((item) => (
          <option key={item} value={item}>
            {localeLabels[item]}
          </option>
        ))}
      </select>
    </label>
  )
}

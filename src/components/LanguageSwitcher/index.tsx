'use client'

import { locales, type AppLocale } from '@/i18n/locales'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

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
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onChange = (nextLocale: AppLocale) => {
    const pathWithLocale = buildPathWithLocale(pathname, nextLocale)
    const query = searchParams.toString()
    router.push(query ? `${pathWithLocale}?${query}` : pathWithLocale)
  }

  return (
    <label className="inline-flex items-center gap-2 text-sm text-[#2f794e]">
      <span className="sr-only">Язык сайта</span>
      <select
        aria-label="Язык сайта"
        className="rounded-md border border-[#5c8f61] bg-white px-2 py-1 text-sm text-[#2f794e] focus:outline-none"
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

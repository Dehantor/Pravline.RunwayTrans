'use client'

import { locales, type AppLocale } from '@/i18n/locales'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const localeOptions: Record<AppLocale, { flag: string; label: string; shortLabel: string }> = {
  ru: { flag: '/media/flags/ru.svg', label: 'Русский', shortLabel: 'Рус' },
  en: { flag: '/media/social/mail.svg', label: 'English', shortLabel: 'Eng' },
  fr: { flag: '/media/flags/fr.svg', label: 'Français', shortLabel: 'Fra' },
  kk: { flag: '/media/flags/us.svg', label: 'Қазақша', shortLabel: 'Қаз' },
  zh: { flag: '/media/flags/kz.svg', label: '中文', shortLabel: '中文' },
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
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const current = localeOptions[locale]

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false)
    }

    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [])

  const onChange = (nextLocale: AppLocale) => {
    const pathWithLocale = buildPathWithLocale(pathname, nextLocale)
    const query = searchParams.toString()
    const nextPath = query ? `${pathWithLocale}?${query}` : pathWithLocale

    document.cookie = `rw_locale=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`
    window.location.assign(nextPath)
  }

  return (
    <div className="relative shrink-0" ref={rootRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Язык сайта"
        className="flex min-w-[49px] items-center gap-1 text-left text-[12px] leading-tight"
        onClick={() => setIsOpen((value) => !value)}
        type="button"
      >
        <span className="flex flex-col items-center">
          <Image alt="" aria-hidden height={27} src={current.flag} width={27} />
          <span>{current.shortLabel}</span>
        </span>
        <Image alt="" aria-hidden height={7} src="/media/flags/ch.svg" width={12} />
      </button>

      {isOpen && (
        <ul
          aria-label="Выберите язык"
          className="absolute top-full right-0 z-50 mt-2 w-40 overflow-hidden rounded-md border border-background-muted bg-background-light py-1 shadow-xl"
          role="listbox"
        >
          {locales.map((item) => {
            const option = localeOptions[item]

            return (
              <li aria-selected={item === locale} key={item} role="option">
                <button
                  className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-background-muted"
                  onClick={() => onChange(item)}
                  type="button"
                >
                  <Image alt="" aria-hidden height={24} src={option.flag} width={24} />
                  <span>{option.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

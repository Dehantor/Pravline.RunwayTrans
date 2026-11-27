'use client'

import { locales, type AppLocale } from '@/i18n/locales'
import { headerMessages } from '@/i18n/navigationMessages'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useId, useRef } from 'react'

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

type LanguageSwitcherProps = {
  locale: AppLocale
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}

export function LanguageSwitcher({ locale, isOpen, onToggle, onClose }: LanguageSwitcherProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const current = localeOptions[locale]
  const t = headerMessages[locale]

  useEffect(() => {
    if (!isOpen) return

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) onClose()
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      event.preventDefault()
      onClose()
      triggerRef.current?.focus()
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen, onClose])

  const onChange = (nextLocale: AppLocale) => {
    const pathWithLocale = buildPathWithLocale(pathname, nextLocale)
    const query = searchParams.toString()
    const nextPath = query ? `${pathWithLocale}?${query}` : pathWithLocale

    document.cookie = `rw_locale=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`
    window.location.assign(nextPath)
  }

  return (
    <div className="relative ml-auto shrink-0 lg:ml-0" ref={rootRef}>
      <button
        aria-controls={isOpen ? menuId : undefined}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t.languageLabel}
        className="flex min-h-11 min-w-[49px] cursor-pointer items-center justify-center gap-1 rounded-md px-1 text-left text-[12px] leading-tight focus-visible:outline-2 focus-visible:outline-brand-green max-lg:border max-lg:border-background-muted lg:min-h-0 lg:px-0"
        onClick={onToggle}
        ref={triggerRef}
        title={t.languageLabel}
        type="button"
      >
        <span className="flex items-center gap-1.5 lg:flex-col lg:gap-0.5">
          <Image alt="" aria-hidden height={22} src={current.flag} width={22} />
          <span>{current.shortLabel}</span>
        </span>
        <ChevronDown aria-hidden="true" className="size-3 lg:hidden" />
      </button>

      {isOpen && (
        <ul
          aria-label={t.languageOptionsLabel}
          className="absolute top-full right-0 z-50 mt-2 max-h-[calc(100dvh-5rem)] w-40 overflow-y-auto overscroll-contain rounded-md border border-border bg-popover py-1 text-popover-foreground shadow-xl"
          id={menuId}
          role="listbox"
        >
          {locales.map((item) => {
            const option = localeOptions[item]

            return (
              <li aria-selected={item === locale} key={item} role="option">
                <button
                  className="flex min-h-11 w-full cursor-pointer items-center gap-3 px-3 py-2 text-left text-sm hover:bg-accent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-green"
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

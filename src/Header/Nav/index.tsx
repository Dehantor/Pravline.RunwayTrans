'use client'

import type { AppLocale } from '@/i18n/locales'

import { headerMessages } from '@/i18n/navigationMessages'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dropdown } from './Dropdown'

export const HeaderNav: React.FC<{ locale: AppLocale; onNavigate: () => void }> = ({
  locale,
  onNavigate,
}) => {
  const pathname = usePathname()
  const t = headerMessages[locale]
  const localePrefix = `/${locale}`
  const currentRoute = pathname.startsWith(`${localePrefix}/`)
    ? pathname.slice(localePrefix.length)
    : pathname

  const isActiveRoute = (route: string) =>
    currentRoute === route || currentRoute.startsWith(`${route}/`)

  const companyDropdownLinks = t.companyDropdownLinks.map((item) => ({
    type: 'custom' as const,
    url: `${localePrefix}${item.href}`,
    label: item.label,
  }))

  return (
    <div className="w-full">
      <nav aria-label={t.mainNavAria} className="lg:py-3">
        <ul className="divide-y divide-border lg:flex lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-6 lg:gap-y-3 lg:divide-none lg:text-[17px] lg:text-ink">
          <li className="group relative">
            <Link
              className={`hidden items-center gap-2 transition-colors hover:text-brand-green lg:inline-flex ${
                t.companyDropdownLinks.some(({ href }) => isActiveRoute(href))
                  ? 'text-brand-green'
                  : ''
              }`}
              href={`${localePrefix}/ranvey-trans-segodnya`}
              onNavigate={onNavigate}
            >
              {t.companyLabel}
              <ChevronDown className="h-4 w-4 text-brand-green" />
            </Link>
            <div className="hidden lg:block">
              <Dropdown items={companyDropdownLinks} />
            </div>
            <details className="group/company lg:hidden" key={pathname}>
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 rounded-sm font-semibold focus-visible:outline-2 focus-visible:outline-brand-green [&::-webkit-details-marker]:hidden">
                {t.companyLabel}
                <ChevronDown
                  aria-hidden="true"
                  className="size-4 shrink-0 transition-transform group-open/company:rotate-180"
                />
              </summary>
              <ul className="mb-2 border-l border-border pl-3">
                {companyDropdownLinks.map((item) => (
                  <li key={item.url}>
                    <Link
                      aria-current={pathname === item.url ? 'page' : undefined}
                      className="flex min-h-11 items-center rounded-sm px-2 text-sm hover:bg-accent focus-visible:outline-2 focus-visible:outline-brand-green aria-[current=page]:font-semibold"
                      href={item.url}
                      onNavigate={onNavigate}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          </li>

          {t.topLevelLinks.map((item) => (
            <li className="group relative" key={`${item.href}-${item.label}`}>
              <Link
                aria-current={currentRoute === item.href ? 'page' : undefined}
                className={`flex min-h-11 items-center rounded-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-brand-green max-lg:hover:bg-accent lg:inline lg:min-h-0 lg:font-normal lg:hover:text-brand-green ${
                  isActiveRoute(item.href)
                    ? 'max-lg:underline max-lg:underline-offset-4 lg:text-brand-green'
                    : ''
                }`}
                href={`${localePrefix}${item.href}`}
                onNavigate={onNavigate}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

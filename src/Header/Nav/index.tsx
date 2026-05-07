'use client'

import type { AppLocale } from '@/i18n/locales'

import { headerMessages } from '@/i18n/navigationMessages'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dropdown } from './Dropdown'

export const HeaderNav: React.FC<{ locale: AppLocale }> = ({ locale }) => {
  const pathname = usePathname()
  const t = headerMessages[locale]
  const companyDropdownLinks = t.companyDropdownLinks.map((item) => ({
    type: 'custom' as const,
    url: item.href,
    label: item.label,
  }))

  return (
    <div className="flex w-full flex-col gap-4 lg:items-end">
      <nav aria-label={t.mainNavAria} className="w-full rounded-sm border bg-white px-3 py-2">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-[#89d57d]">
          <li className="group relative">
            <Link className="transition-colors hover:text-[#1d2a1e]" href="/ranvey-trans-segodnya">
              {t.companyLabel}
            </Link>
            <Dropdown items={companyDropdownLinks} />
          </li>

          {t.topLevelLinks.map((item) => (
            <li className="group relative" key={item.href}>
              <Link
                className={`transition-colors hover:text-[#1d2a1e] ${
                  pathname === item.href ? 'font-bold text-neutral-950' : ''
                }`}
                href={item.href}
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

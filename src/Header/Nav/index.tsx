'use client'

import type { AppLocale } from '@/i18n/locales'

import { headerMessages } from '@/i18n/navigationMessages'
import { ChevronDown } from 'lucide-react'
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
    <div className="w-full">
      <nav aria-label={t.mainNavAria} className="py-3">
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-3 pl-0 text-[17px] font-normal text-ink sm:pl-[202px] lg:flex-nowrap lg:gap-x-[72px]">
          <li className="group relative">
            <Link
              className="inline-flex items-center gap-2 transition-colors hover:text-brand-green"
              href="/ranvey-trans-segodnya"
            >
              {t.companyLabel}
              <ChevronDown className="h-4 w-4 text-brand-green" />
            </Link>
            <Dropdown items={companyDropdownLinks} />
          </li>

          {t.topLevelLinks.map((item) => (
            <li className="group relative" key={item.href}>
              <Link
                className={`transition-colors hover:text-brand-green ${
                  pathname === item.href ? 'text-brand-green' : ''
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

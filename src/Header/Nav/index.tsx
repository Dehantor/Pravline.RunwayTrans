'use client'

import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'
import Link from 'next/link'
import { Dropdown } from './Dropdown'



const fallbackNavLinks = [
  { href: '/', label: 'Главная' },
  { href: '/o-kompanii', label: 'Компания' },
  { href: '/tehnika', label: 'Техника' },
  { href: '/vacancies', label: 'Вакансии' },
  { href: '/contacts', label: 'Контакты' },
] as const

const companyDropdownLinks = [
  { type: 'custom', url: '/ranvey-trans-segodnya', label: 'Ранвей Транс сегодня' },
  { type: 'custom', url: '/istoriya', label: 'История' },
  { type: 'custom', url: '/rukovodstvo', label: 'Руководство' },
  { type: 'custom', url: '/vacancies', label: 'Вакансии' },
  { type: 'custom', url: '/tehnika', label: 'Техника' },
] as const

const isCompanyLabel = (label?: string | null) => {
  if (!label) return false

  return label.toLowerCase().includes('компан')
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems?.filter((item) => item?.link) ?? []

  return (
    <div className="flex w-full flex-col gap-4 lg:items-end">


      <nav aria-label="Основная навигация" className="w-full rounded-sm border bg-white px-3 py-2">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-[#89d57d]">
          {navItems.length > 0
            ? navItems.map(({ link }, index) => {
                if (!link) {
                  return null
                }

                const childLinks = link.label && isCompanyLabel(link.label) ? [...companyDropdownLinks] : []

                return (
                  <li className="group relative" key={`${link.label}-${index}`}>
                    <CMSLink className="transition-colors hover:text-white" {...link} />
                    {childLinks.length > 0 ? <Dropdown items={childLinks} /> : null}
                  </li>
                )
              })
            : fallbackNavLinks.map((item) => (
                <li className="group relative" key={item.href}>
                  <Link className="transition-colors hover:text-white" href={item.href}>
                    {item.label}
                  </Link>
                  {isCompanyLabel(item.label) ? <Dropdown items={[...companyDropdownLinks]} /> : null}
                </li>
              ))}
        </ul>
      </nav>
    </div>
  )
}

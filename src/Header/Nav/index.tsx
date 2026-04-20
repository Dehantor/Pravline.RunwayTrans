'use client'

import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'
import Link from 'next/link'
import { Dropdown } from './Dropdown'



const fallbackNavLinks = [
  { href: '/', label: 'Главная' },
  { href: '/o-kompanii', label: 'Компания' },
  { href: '/uslugi', label: 'Услуги' },
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
  const navItemsWithoutServices = navItems.filter(
    (item) => !item?.link?.label?.toLowerCase().includes('услуг'),
  )
  const hasContactsLink = navItems.some(({ link }) => link?.label?.toLowerCase().includes('контакт'))

  return (
    <div className="flex w-full flex-col gap-4 lg:items-end">


      <nav aria-label="Основная навигация" className="w-full rounded-sm border bg-white px-3 py-2">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-[#89d57d]">
          {navItems.length > 0
            ? (() => {
                const companyIndex = navItemsWithoutServices.findIndex(({ link }) => isCompanyLabel(link?.label))
                const servicesItem = (
                  <li className="group relative" key="services-after-company">
                    <Link className="transition-colors hover:text-white" href="/uslugi">
                      Услуги
                    </Link>
                  </li>
                )
                const contactsItem = (
                  <li className="group relative" key="contacts-nav-link">
                    <Link className="transition-colors hover:text-white" href="/contacts">
                      Контакты
                    </Link>
                  </li>
                )

                const items = navItemsWithoutServices.flatMap(({ link }, index) => {
                  if (!link) {
                    return []
                  }

                  const childLinks = link.label && isCompanyLabel(link.label) ? [...companyDropdownLinks] : []
                  const items = [
                    <li className="group relative" key={`${link.label}-${index}`}>
                      <CMSLink className="transition-colors hover:text-white" {...link} />
                      {childLinks.length > 0 ? <Dropdown items={childLinks} /> : null}
                    </li>,
                  ]

                  if (index === companyIndex) {
                    items.push(servicesItem)
                  }

                  return items
                })

                if (!hasContactsLink) {
                  items.push(contactsItem)
                }

                return items
              })()
            : fallbackNavLinks.map((item) => (
                <li className="group relative" key={item.href}>
                  <Link className="transition-colors hover:text-white" href={item.href}>
                    {item.label}
                  </Link>
                  {isCompanyLabel(item.label) ? <Dropdown items={[...companyDropdownLinks]} /> : null}
                </li>
              ))}
          {navItems.length > 0 && !navItemsWithoutServices.some(({ link }) => isCompanyLabel(link?.label)) ? (
            <li className="group relative" key="services-without-company">
              <Link className="transition-colors hover:text-white" href="/uslugi">
                Услуги
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { Dropdown } from './Dropdown'

const companyDropdownLinks = [
  { type: 'custom', url: '/ranvey-trans-segodnya', label: 'Ранвей Транс сегодня' },
  { type: 'custom', url: '/istoriya', label: 'История' },
  { type: 'custom', url: '/rukovodstvo', label: 'Руководство' },
  { type: 'custom', url: '/vacancies', label: 'Вакансии' },
  { type: 'custom', url: '/tehnika', label: 'Техника' },
] as const

const topLevelLinks = [
  { href: '/uslugi', label: 'Услуги' },
  { href: '/reviews', label: 'Кейсы' },
  { href: '/partners', label: 'Партнёры' },
  { href: '/contacts', label: 'Контакты' },
] as const

export const HeaderNav: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-4 lg:items-end">
      <nav aria-label="Основная навигация" className="w-full rounded-sm border bg-white px-3 py-2">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-[#89d57d]">
          <li className="group relative">
            <Link className="transition-colors hover:text-white" href="/ranvey-trans-segodnya">
              Компания
            </Link>
            <Dropdown items={[...companyDropdownLinks]} />
          </li>

          {topLevelLinks.map((item) => (
            <li className="group relative" key={item.href}>
              <Link className="transition-colors hover:text-white" href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

'use client'

import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'
import Link from 'next/link'
import { Mail, Phone, Send, MessageCircle, Play, Video } from 'lucide-react'

const quickLinks = [
  { href: '#', label: 'Telegram', icon: Send, bgClass: 'bg-[#27A7E7]' },
  { href: '#', label: 'WhatsApp', icon: MessageCircle, bgClass: 'bg-[#25D366]' },
  { href: '#', label: 'YouTube', icon: Play, bgClass: 'bg-[#FF3131]' },
  { href: '#', label: 'Rutube', icon: Video, bgClass: 'bg-[#e3e5eb] text-[#252a33]' },
]

const fallbackNavLinks = [
  { href: '/', label: 'Главная' },
  { href: '/o-kompanii', label: 'О компании' },
  { href: '/tehnika', label: 'Техника' },
  { href: '/vacancies', label: 'Вакансии' },
  { href: '/contacts', label: 'Контакты' },
] as const

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems?.filter((item) => item?.link) ?? []

  return (
    <div className="flex w-full flex-col gap-4 lg:items-end">
      <div className="flex flex-wrap items-center gap-4 lg:justify-end">
        <div className="flex items-center gap-2">
          {quickLinks.map(({ href, label, icon: Icon, bgClass }) => (
            <Link
              key={label}
              aria-label={label}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-white transition-transform hover:scale-105 ${bgClass}`}
              href={href}
            >
              <Icon className="h-4 w-4" />
            </Link>
          ))}
        </div>

        <Link
          className="rounded-sm border border-[#2f794e] bg-[#4c7d4f] px-6 py-2 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#5b915f]"
          href="/contacts#callback-form"
        >
          Заказать звонок
        </Link>

        <div className="flex items-center gap-2 text-[#89d57d]">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#507e53] text-white">
            <Mail className="h-4 w-4" />
          </span>
          <Link className="text-sm hover:text-white" href="mailto:info@runwaytrans.ru">
            info@runwaytrans.ru
          </Link>
        </div>

        <div className="flex items-center gap-2 text-[#89d57d]">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#507e53] text-white">
            <Phone className="h-4 w-4" />
          </span>
          <div className="flex flex-col leading-tight">
            <Link className="text-sm hover:text-white" href="tel:+79991234567">
              +7 (999) 123-45-67
            </Link>
            <Link className="text-sm hover:text-white" href="tel:+78001234567">
              +7 (800) 123-45-67
            </Link>
          </div>
        </div>
      </div>

      <nav aria-label="Основная навигация" className="w-full rounded-sm border bg-white px-3 py-2">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-[#89d57d]">
          {navItems.length > 0
            ? navItems.map(({ link }, index) => {
                if (!link) {
                  return null
                }

                return (
                  <li key={`${link.label}-${index}`}>
                    <CMSLink className="transition-colors hover:text-white" {...link} />
                  </li>
                )
              })
            : fallbackNavLinks.map((item) => (
                <li key={item.href}>
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

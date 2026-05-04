'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { type AppLocale } from '@/i18n/locales'
import { headerMessages } from '@/i18n/navigationMessages'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'
import { Mail, Phone, Send, MessageCircle, Play, Video } from 'lucide-react'

import { HeaderNav } from './Nav'

const quickLinks = [
  { href: '#', label: 'Telegram', icon: Send, bgClass: 'bg-[#27A7E7]' },
  { href: '#', label: 'WhatsApp', icon: MessageCircle, bgClass: 'bg-[#25D366]' },
  { href: '#', label: 'YouTube', icon: Play, bgClass: 'bg-[#FF3131]' },
  { href: '#', label: 'Rutube', icon: Video, bgClass: 'bg-[#e3e5eb] text-[#252a33]' },
]

interface HeaderClientProps {
  data: Header
  locale: AppLocale
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, locale }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const t = headerMessages[locale]

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="relative z-20 border-b border-[#2f794e] bg-white"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container py-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          {/* <Link href="/" className="inline-flex">
            <img src={logoImage.src} alt="" />
          </Link> */}

          <Link href="/" className="text-2xl leading-none font-black tracking-wide text-[#1a1a1a]">
            RUNWAY TRANS
          </Link>

          <div className="flex flex-col text-sm leading-tight text-[#74c56a]">
            <span className="text-3xl">
              <i>{t.serviceLinePrimary}</i>
            </span>
            <span>
              <i>{t.serviceLineSecondary}</i>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 lg:justify-end">
            <LanguageSwitcher locale={locale} />
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
              {t.callbackLabel}
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

          <HeaderNav locale={locale} />
        </div>
      </div>
    </header>
  )
}

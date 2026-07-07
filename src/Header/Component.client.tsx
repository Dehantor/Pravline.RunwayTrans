'use client'

import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { type AppLocale } from '@/i18n/locales'
import { headerMessages } from '@/i18n/navigationMessages'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { MessageCircle, Phone, Play, Send } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'

type SocialLink =
  | {
      href: string
      label: string
      icon: React.ComponentType<{ className?: string }>
      image?: never
      className: string
    }
  | {
      href: string
      label: string
      image: string
      icon?: never
      className?: never
    }

const socialLinks: SocialLink[] = [
  {
    href: '#',
    label: 'Telegram',
    icon: Send,
    className: 'bg-social-telegram text-on-dark',
  },
  {
    href: '#',
    label: 'WhatsApp',
    icon: MessageCircle,
    className: 'bg-social-whatsapp text-on-dark',
  },
  {
    href: '#',
    label: 'YouTube',
    icon: Play,
    className: 'bg-social-youtube text-on-dark',
  },
  {
    href: '#',
    label: 'Rutube',
    image: '/media/social/tel.svg',
  },
  {
    href: '#',
    label: 'ВКонтакте',
    className: 'bg-social-vk text-on-dark',
    icon: () => <span className="text-[13px] font-black tracking-[-1px]">VK</span>,
  },
  {
    href: '#',
    label: 'Одноклассники',
    image: '/media/social/vk.svg',
  },
  {
    href: '#',
    label: 'TikTok',
    className: 'bg-ink text-on-dark',
    icon: () => <span className="text-lg font-black">♪</span>,
  },
]

interface HeaderClientProps {
  data: Header
  locale: AppLocale
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ locale }) => {
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
      className="relative z-20 border-t-[3px] border-ink bg-background-light text-ink"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="mx-auto w-full max-w-[1380px] px-2">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 py-2 xl:flex-nowrap">
          <Link aria-label="Runway Trans — на главную" className="shrink-0" href="/">
            <Image
              alt="Runway Trans"
              className="h-auto w-[178px] sm:w-[202px]"
              height={63}
              priority
              src="/media/logo.svg"
              width={202}
            />
          </Link>

          <div className="mr-auto min-w-[185px] shrink-0 leading-none text-brand-green">
            <div className="text-[24px] font-semibold italic sm:text-[27px]">
              {t.serviceLinePrimary}
            </div>
            <div className="mt-1 max-w-[200px] text-[12px] leading-[1.35] italic">
              {t.serviceLineSecondary}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map(({ href, label, icon: Icon, image, className }) => (
              <Link
                aria-label={label}
                className="inline-flex h-[39px] w-[39px] shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
                href={href}
                key={label}
              >
                {image ? (
                  <Image alt="" aria-hidden height={39} src={image} width={39} />
                ) : Icon ? (
                  <span
                    className={`inline-flex h-full w-full items-center justify-center rounded-full ${className}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                ) : null}
              </Link>
            ))}
          </div>

          <Link
            className="inline-flex h-10 shrink-0 items-center rounded-[4px] bg-brand-green px-3 text-[14px] font-medium whitespace-nowrap text-on-dark transition-colors hover:bg-brand-green-hover"
            href="/contacts#callback-form"
          >
            {t.callbackLabel}
          </Link>

          <Link
            className="flex shrink-0 items-center gap-2 text-[14px] font-medium hover:text-brand-green"
            href="mailto:info@rwt.ru"
          >
            <Image alt="" aria-hidden height={39} src="/media/social/rt.svg" width={39} />
            <span>info@rwt.ru</span>
          </Link>

          <div className="flex shrink-0 items-center gap-2">
            <span className="inline-flex h-[39px] w-[39px] items-center justify-center rounded-full bg-brand-green text-on-dark">
              <Phone className="h-5 w-5" />
            </span>
            <div className="flex flex-col text-[14px] leading-[1.35] font-medium">
              <Link href="tel:+79130303030">8-913-030-30-30</Link>
              <Link href="tel:+73912803030">280-30-30</Link>
            </div>
          </div>

          <LanguageSwitcher locale={locale} />
        </div>

        <HeaderNav locale={locale} />
      </div>
    </header>
  )
}

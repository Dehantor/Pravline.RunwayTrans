'use client'

import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { type AppLocale } from '@/i18n/locales'
import { headerMessages } from '@/i18n/navigationMessages'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Menu, MessageCircle, Phone, Play, Send, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useId, useRef, useState } from 'react'

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

const mainPhone = { href: 'tel:+79130303030', label: '8-913-030-30-30' }

export const HeaderClient: React.FC<HeaderClientProps> = ({ locale }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [openPanel, setOpenPanel] = useState<'menu' | 'language' | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [panelPath, setPanelPath] = useState(pathname)
  const panelId = useId()
  const menuPanelRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const t = headerMessages[locale]

  if (panelPath !== pathname) {
    setPanelPath(pathname)
    setOpenPanel(null)
  }

  const isMenuOpen = openPanel === 'menu'
  const menuLabel = isMenuOpen ? t.closeMenuLabel : t.openMenuLabel
  const MenuIcon = isMenuOpen ? X : Menu
  const callLabel = `${t.callLabel} ${mainPhone.label}`

  const closePanel = useCallback(() => setOpenPanel(null), [])

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 64rem)')
    desktop.addEventListener('change', closePanel)
    return () => desktop.removeEventListener('change', closePanel)
  }, [closePanel])

  useEffect(() => {
    if (!isMenuOpen) return

    const closeOnOutsideClick = (event: PointerEvent) => {
      const target = event.target as Node
      if (!menuPanelRef.current?.contains(target) && !menuButtonRef.current?.contains(target)) {
        closePanel()
      }
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      event.preventDefault()
      closePanel()
      menuButtonRef.current?.focus()
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isMenuOpen, closePanel])

  const socials = (
    <div className="grid min-w-0 justify-items-start gap-1.5 lg:justify-items-center">
      <div className="flex max-w-full flex-wrap items-center gap-1 sm:gap-1.5">
        {socialLinks.map(({ href, label, icon: Icon, image, className }) => (
          <Link
            aria-label={label}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
            href={href}
            key={label}
            onClick={closePanel}
          >
            {image ? (
              <Image alt="" aria-hidden height={39} src={image} width={39} />
            ) : Icon ? (
              <span
                className={`inline-flex h-full w-full items-center justify-center rounded-full ${className}`}
              >
                <Icon className="size-4" />
              </span>
            ) : null}
          </Link>
        ))}
      </div>
      <Link
        className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium hover:underline focus-visible:outline-2 focus-visible:outline-brand-green max-lg:min-h-11"
        href="mailto:info@rwt.ru"
        onClick={closePanel}
      >
        <Image alt="" aria-hidden height={18} src="/media/social/rt.svg" width={18} />
        <span>info@rwt.ru</span>
      </Link>
    </div>
  )
  const contacts = (
    <div className="grid min-w-0 justify-items-start gap-1.5 border-t border-border pt-3 lg:border-t-0 lg:border-l lg:border-background-muted lg:pt-0 lg:pl-4">
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-green-hover text-on-dark"
        >
          <Phone className="size-4" />
        </span>
        <div className="flex flex-col text-sm leading-tight font-semibold">
          <a
            className="inline-flex items-center max-lg:min-h-10"
            href={mainPhone.href}
            onClick={closePanel}
          >
            {mainPhone.label}
          </a>
          <a
            className="inline-flex items-center max-lg:min-h-10"
            href="tel:+73912803030"
            onClick={closePanel}
          >
            280-30-30
          </a>
        </div>
      </div>
      <Link
        className="inline-flex min-h-11 items-center rounded-sm bg-brand-green-hover px-3 py-1.5 text-center text-sm font-semibold text-on-dark transition-colors hover:bg-brand-green-hover/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green lg:min-h-8"
        href={`/${locale}/contacts#callback-form`}
        onNavigate={closePanel}
      >
        {t.callbackLabel}
      </Link>
    </div>
  )

  return (
    <header
      className="relative z-20 bg-background-light text-ink"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="mx-auto w-full max-w-[1380px] px-2">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_auto_auto] items-center gap-x-1.5 px-1 max-lg:min-h-17 max-lg:pt-2 max-lg:pb-2.5 lg:grid-cols-[minmax(0,1.1fr)_minmax(16.25rem,0.85fr)_auto_auto] lg:gap-x-4 lg:px-4 lg:border-b lg:border-background-muted lg:py-4 xl:gap-x-6">
          <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
            <Link
              aria-label={t.homeLabel}
              className="min-w-0 rounded-sm focus-visible:outline-2 focus-visible:outline-brand-green max-lg:max-w-full lg:shrink-0"
              href={`/${locale}`}
              onNavigate={closePanel}
            >
              <Image
                alt="Runway Trans"
                className="h-auto w-32 max-w-full xl:w-44"
                height={63}
                priority
                src="/media/logo.svg"
                width={202}
              />
            </Link>
            <div className="hidden min-w-[8rem] flex-1 border-l border-background-muted pl-3 text-brand-green lg:block">
              <div className="font-openSans text-lg leading-tight font-semibold break-words italic xl:text-[24px]">
                {t.serviceLinePrimary}
              </div>
              <div className="mt-0.5 text-[12px] leading-snug italic text-ink/75">
                {t.serviceLineSecondary}
              </div>
            </div>
          </div>

          <a
            aria-label={callLabel}
            className="inline-flex size-11 items-center justify-center rounded-md bg-brand-green-hover text-on-dark hover:bg-brand-green-hover/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green lg:hidden"
            href={mainPhone.href}
            onClick={closePanel}
            title={callLabel}
          >
            <Phone aria-hidden="true" className="size-5" />
          </a>

          <div className="hidden lg:contents">
            {socials}
            {contacts}
          </div>

          <LanguageSwitcher
            isOpen={openPanel === 'language'}
            locale={locale}
            onClose={closePanel}
            onToggle={() => setOpenPanel((panel) => (panel === 'language' ? null : 'language'))}
          />

          <button
            aria-controls={panelId}
            aria-expanded={isMenuOpen}
            aria-label={menuLabel}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-md border border-background-muted hover:bg-background-muted/45 focus-visible:outline-2 focus-visible:outline-brand-green lg:hidden"
            onClick={() => setOpenPanel((panel) => (panel === 'menu' ? null : 'menu'))}
            ref={menuButtonRef}
            title={menuLabel}
            type="button"
          >
            <MenuIcon aria-hidden="true" className="size-5" />
          </button>

          <div
            className={`${isMenuOpen ? 'grid' : 'hidden'} col-span-full -mx-1 mt-2 max-h-[calc(100dvh-4.25rem)] gap-3 overflow-y-auto overscroll-contain rounded-b-lg border border-border bg-popover px-4 pb-4 text-popover-foreground lg:hidden`}
            id={panelId}
            ref={menuPanelRef}
          >
            <div className="border-b border-border pt-3 pb-3 lg:hidden">
              <p className="font-openSans text-lg leading-tight font-semibold italic">
                {t.serviceLinePrimary}
              </p>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">
                {t.serviceLineSecondary}
              </p>
            </div>

            <HeaderNav locale={locale} onNavigate={closePanel} />
            {contacts}
            {socials}
          </div>
        </div>
        <div className="hidden lg:block">
          <HeaderNav locale={locale} onNavigate={closePanel} />
        </div>
      </div>
    </header>
  )
}

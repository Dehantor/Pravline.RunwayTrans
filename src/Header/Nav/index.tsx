'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { Dropdown } from './Dropdown'
import { NavItem } from './NavItem'

type ChildPage = {
  id: number | string
  title?: string | null
  slug?: string | null
}

type PagesResponse = {
  docs?: ChildPage[]
}

const COMPANY_LABEL = 'Компания'

const isCompanyLink = (link?: { label?: string | null; url?: string | null }) => {
  const normalizedLabel = link?.label?.trim().toLowerCase()
  const normalizedUrl = link?.url?.trim().replace(/\/$/, '')

  return (
    normalizedLabel === COMPANY_LABEL.toLowerCase() ||
    normalizedUrl === '/about-company' ||
    normalizedUrl === 'about-company'
  )
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [companyPages, setCompanyPages] = useState<ChildPage[]>([])
  const [isLoadingCompanyPages, setIsLoadingCompanyPages] = useState(true)
  const [companyOpen, setCompanyOpen] = useState(false)
  const closeDelayRef = useRef<number | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const loadCompanyPages = async () => {
      setIsLoadingCompanyPages(true)

      try {
        const response = await fetch('/api/pages?where[parent.slug][equals]=about-company&limit=20', {
          signal: controller.signal,
        })

        if (!response.ok) {
          setCompanyPages([])
          return
        }

        const pages: PagesResponse = await response.json()
        setCompanyPages(Array.isArray(pages?.docs) ? pages.docs : [])
      } catch {
        setCompanyPages([])
      } finally {
        setIsLoadingCompanyPages(false)
      }
    }

    void loadCompanyPages()

    return () => {
      controller.abort()
      if (closeDelayRef.current) {
        window.clearTimeout(closeDelayRef.current)
      }
    }
  }, [])

  const withCompanyFallback = useMemo(() => {
    if (navItems.some((item) => isCompanyLink(item.link))) {
      return navItems
    }

    return [
      {
        link: {
          label: COMPANY_LABEL,
          type: 'custom' as const,
          url: '/about-company',
        },
      },
      ...navItems,
    ]
  }, [navItems])

  const handleMouseEnter = () => {
    if (closeDelayRef.current) {
      window.clearTimeout(closeDelayRef.current)
      closeDelayRef.current = null
    }

    setCompanyOpen(true)
  }

  const handleMouseLeave = () => {
    closeDelayRef.current = window.setTimeout(() => {
      setCompanyOpen(false)
    }, 120)
  }

  return (
    <nav className="flex items-center gap-4">
      {withCompanyFallback.map(({ link }, i) => {
        if (isCompanyLink(link)) {
          return (
            <NavItem
              key={`company-${i}`}
              isOpen={companyOpen}
              label={link?.label || COMPANY_LABEL}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onToggle={() => setCompanyOpen((prev) => !prev)}
            >
              <Dropdown isLoading={isLoadingCompanyPages} items={companyPages} />
            </NavItem>
          )
        }

        return <CMSLink key={i} {...link} appearance="link" />
      })}

      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}

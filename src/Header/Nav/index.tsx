'use client'

import React, { useEffect, useRef, useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { Dropdown } from './Dropdown'
import { NavItem } from './NavItem'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null)
  const closeDelayRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (closeDelayRef.current) {
        window.clearTimeout(closeDelayRef.current)
      }
    }
  }, [])

  const handleMouseEnter = (index: number) => {
    if (closeDelayRef.current) {
      window.clearTimeout(closeDelayRef.current)
      closeDelayRef.current = null
    }

    setOpenDropdownIndex(index)
  }

  const handleMouseLeave = () => {
    closeDelayRef.current = window.setTimeout(() => {
      setOpenDropdownIndex(null)
    }, 120)
  }

  return (
    <nav className="flex items-center gap-4">
      {navItems.map(({ children, link }, index) => {
        if (children?.length) {
          return (
            <NavItem
              key={`dropdown-${index}`}
              isOpen={openDropdownIndex === index}
              label={link?.label || 'Раздел'}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onToggle={() => setOpenDropdownIndex((prev) => (prev === index ? null : index))}
            >
              <Dropdown items={children.map(({ link: childLink }) => childLink)} />
            </NavItem>
          )
        }

        return <CMSLink key={index} {...link} appearance="link" />
      })}

      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}

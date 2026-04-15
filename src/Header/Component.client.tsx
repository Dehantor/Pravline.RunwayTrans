'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

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
      className="relative z-20 border-b border-[#2f794e] bg-black"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container py-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link href="/" className="inline-flex">
            <Logo loading="eager" priority="high" />
          </Link>

          <Link href="/" className="text-2xl leading-none font-black tracking-wide text-[#e8eee8]">
            RUNWAY TRANS
          </Link>

          <div className="flex flex-col text-sm leading-tight text-[#74c56a]">
            <span>Грузоперевозки</span>
            <span>выживем в сложнейших условиях</span>
          </div>

          <HeaderNav data={data} />
        </div>
      </div>
    </header>
  )
}

'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center overflow-hidden text-white"
      data-theme="dark"
    >
      <div className="absolute inset-0 z-0 bg-linear-to-t from-black/70 via-black/50 to-black/20" />

      <div className="container relative z-10 flex min-h-[65vh] items-end justify-center py-14 sm:min-h-[72vh] sm:py-16 md:min-h-[80vh] md:py-20">
        <div className="max-w-[36.5rem] text-center">
          {richText && (
            <RichText
              className="mb-5 text-balance sm:mb-6 [&_h1]:text-3xl [&_h1]:leading-tight sm:[&_h1]:text-4xl md:[&_h1]:text-5xl"
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i} className="flex">
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[65vh] w-full select-none sm:min-h-[72vh] md:min-h-[80vh]">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  )
}

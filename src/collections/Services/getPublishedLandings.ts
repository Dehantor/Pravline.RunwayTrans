import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import { type AppLocale } from '@/i18n/locales'
import {
  isServiceLandingSlug,
  serviceLandingSlugs,
  type ServiceLandingSlug,
} from '@/i18n/serviceLandingMessages'
import { getSitemapOrigin } from '@/utilities/getSitemapOrigin'

export const getPublishedLandings = cache(async (locale: AppLocale) => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'services',
    draft: false,
    overrideAccess: false,
    locale,
    fallbackLocale: false,
    depth: 0,
    limit: serviceLandingSlugs.length,
    select: { slug: true, title: true, summary: true, image: true },
    where: {
      and: [{ _status: { equals: 'published' } }, { slug: { in: [...serviceLandingSlugs] } }],
    },
  })

  const published = new Map<ServiceLandingSlug, (typeof result.docs)[number]>()
  for (const doc of result.docs) {
    if (doc.slug && isServiceLandingSlug(doc.slug) && doc.title?.trim() && doc.summary?.trim()) {
      published.set(doc.slug, doc)
    }
  }
  return published
})

export const getLandingImage = cache(async (id: number) => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'media',
    where: { id: { equals: id } },
    depth: 0,
    limit: 1,
    overrideAccess: false,
    select: { filename: true, url: true },
  })
  return docs[0]?.url
})

export function servicePath(locale: AppLocale, slug: ServiceLandingSlug) {
  return `/${locale}/uslugi/${slug}`
}

export function serviceURL(locale: AppLocale, slug: ServiceLandingSlug) {
  return new URL(servicePath(locale, slug), getSitemapOrigin()).href
}

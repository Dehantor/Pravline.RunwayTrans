import type { Config } from '@/payload-types'

import configPromise from '@payload-config'
import { type DataFromGlobalSlug, getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import type { AppLocale } from '@/i18n/locales'

const fallbackLocale: AppLocale = 'ru'

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(slug: T, locale: AppLocale, depth = 0): Promise<DataFromGlobalSlug<T>> {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    locale,
    fallbackLocale,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug and locale.
 */
export const getCachedGlobal = <T extends Global>(slug: T, locale: AppLocale, depth = 0) =>
  unstable_cache(async () => getGlobal<T>(slug, locale, depth), [slug, locale, String(depth)], {
    tags: [`global_${slug}_${locale}`],
  })

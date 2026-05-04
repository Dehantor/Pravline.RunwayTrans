import type { Config } from '@/payload-types'

import configPromise from '@payload-config'
import { type DataFromGlobalSlug, getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import type { AppLocale } from '@/i18n/locales'

const fallbackLocale: AppLocale = 'ru'
type FallbackLocale = AppLocale | false

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(
  slug: T,
  locale: AppLocale,
  depth = 0,
  fallback: FallbackLocale = fallbackLocale,
): Promise<DataFromGlobalSlug<T>> {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    locale,
    fallbackLocale: fallback,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug and locale.
 */
export const getCachedGlobal = <T extends Global>(
  slug: T,
  locale: AppLocale,
  depth = 0,
  fallback: FallbackLocale = fallbackLocale,
) =>
  unstable_cache(
    async () => getGlobal<T>(slug, locale, depth, fallback),
    [slug, locale, String(depth), String(fallback)],
    {
      tags: [`global_${slug}`, `global_${slug}_${locale}`],
    },
  )

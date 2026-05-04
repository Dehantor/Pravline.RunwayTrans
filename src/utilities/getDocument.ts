import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

import type { AppLocale } from '@/i18n/locales'

const fallbackLocale: AppLocale = 'ru'

type Collection = keyof Config['collections']

async function getDocument(collection: Collection, slug: string, locale: AppLocale, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection,
    depth,
    locale,
    fallbackLocale,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return page.docs[0]
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug and locale.
 */
export const getCachedDocument = (collection: Collection, slug: string, locale: AppLocale) =>
  unstable_cache(async () => getDocument(collection, slug, locale), [collection, slug, locale], {
    tags: [`${collection}_${slug}_${locale}`],
  })

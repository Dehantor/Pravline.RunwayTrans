import config from '@payload-config'
import { getPayload, type Payload } from 'payload'

import { getPublishedLandings, serviceURL } from '@/collections/Services/getPublishedLandings'
import { getCaseExamples } from '@/i18n/casesMessages'
import { locales, type AppLocale } from '@/i18n/locales'
import { casesPageSlug } from '@/i18n/navigationMessages'
import { getCachedRedirects } from '@/utilities/getRedirects'
import { getSitemapOrigin } from '@/utilities/getSitemapOrigin'

const publicPageSlugs = [
  'contacts',
  'geografiya',
  'istoriya',
  'ranvey-trans-segodnya',
  'rukovodstvo',
  'tehnika',
  'uslugi',
  'vacancies',
]

const reservedPageSlugs = new Set([
  ...publicPageSlugs,
  '_next',
  'admin',
  'api',
  'assets',
  'graphql',
  'home',
  'media',
  'next',
  'partners',
  'posts',
  'reviews',
  'search',
])

const queryOptions = { limit: 50, sort: 'id', depth: 0 } as const
const published = { _status: { equals: 'published' } }
const validSlug = /^[\p{L}\p{N}_-]+$/u

type SitemapEntry = { loc: string; lastmod?: string }

async function visitPages<T>(
  loadPage: (page: number) => Promise<{ docs: T[]; hasNextPage: boolean }>,
  visit: (docs: T[]) => void,
): Promise<void> {
  for (let page = 1; ; page++) {
    const result = await loadPage(page)
    visit(result.docs)
    if (!result.hasNextPage) return
  }
}

async function getRedirectSources(payload: Payload): Promise<Set<string>> {
  // The pages and posts can still redirect through the renderer's cached snapshot.
  const cachedRedirects = await getCachedRedirects()()
  const sources = new Set(cachedRedirects.map(({ from }) => from))
  await visitPages(
    (page) =>
      payload.find({
        ...queryOptions,
        collection: 'redirects',
        page,
        select: { from: true },
      }),
    (docs) => {
      for (const { from } of docs) sources.add(from)
    },
  )
  return sources
}

function localizedURL(origin: string, locale: AppLocale, path = ''): string {
  return new URL(`/${locale}${path}`, origin).href
}

export async function getPageSitemapEntries(): Promise<SitemapEntry[]> {
  const payload = await getPayload({ config })
  const redirects = await getRedirectSources(payload)
  const origin = getSitemapOrigin()

  const entries = await Promise.all(
    locales.map(async (locale) => {
      const urls = new Map<string, SitemapEntry>()
      const home = localizedURL(origin, locale)
      urls.set(home, { loc: home })
      for (const slug of publicPageSlugs) {
        if (slug === 'contacts' && locale === 'kk') continue
        const loc = localizedURL(origin, locale, `/${slug}`)
        urls.set(loc, { loc })
      }

      for (const slug of (await getPublishedLandings(locale)).keys()) {
        const loc = serviceURL(locale, slug)
        urls.set(loc, { loc })
      }

      let hasPublishedCasesPage = false
      await visitPages(
        (page) =>
          payload.find({
            ...queryOptions,
            collection: 'pages',
            draft: false,
            fallbackLocale: false,
            locale,
            overrideAccess: false,
            page,
            select: { layout: true, slug: true, title: true, updatedAt: true },
            where: published,
          }),
        (docs) => {
          for (const { layout, slug, title, updatedAt } of docs) {
            if (slug === casesPageSlug) hasPublishedCasesPage = true
            if (!slug || !validSlug.test(slug) || reservedPageSlugs.has(slug)) continue
            if (!title?.trim() || !layout?.length) continue
            if (slug !== casesPageSlug && redirects.has(`/${slug}`)) continue

            const loc = localizedURL(origin, locale, `/${slug}`)
            urls.set(loc, { loc, lastmod: updatedAt })
          }
        },
      )

      if (!hasPublishedCasesPage && getCaseExamples(locale).length > 0) {
        const loc = localizedURL(origin, locale, `/${casesPageSlug}`)
        urls.set(loc, { loc })
      }

      return [...urls.values()]
    }),
  )

  return entries.flat()
}

export async function getPostSitemapEntries(): Promise<SitemapEntry[]> {
  const payload = await getPayload({ config })
  const redirects = await getRedirectSources(payload)
  const origin = getSitemapOrigin()

  const entries = await Promise.all(
    locales.map(async (locale) => {
      const urls = new Map<string, SitemapEntry>()
      await visitPages(
        (page) =>
          payload.find({
            ...queryOptions,
            collection: 'posts',
            draft: false,
            fallbackLocale: false,
            locale,
            overrideAccess: false,
            page,
            select: { content: true, slug: true, title: true, updatedAt: true },
            where: published,
          }),
        (docs) => {
          for (const { content, slug, title, updatedAt } of docs) {
            if (!slug || !validSlug.test(slug) || slug === 'page') continue
            if (!title?.trim() || !content?.root.children.length) continue

            const path = `/posts/${slug}`
            if (redirects.has(path)) continue

            const loc = localizedURL(origin, locale, path)
            urls.set(loc, { loc, lastmod: updatedAt })
          }
        },
      )

      return [...urls.values()]
    }),
  )

  return entries.flat()
}

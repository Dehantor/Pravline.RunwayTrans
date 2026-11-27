import { getServerSideSitemapIndex } from 'next-sitemap'

import { getSitemapOrigin } from '@/utilities/getSitemapOrigin'

import { getPostSitemapEntries } from '../sitemapEntries'

export const dynamic = 'force-dynamic'

export async function GET() {
  const origin = getSitemapOrigin()
  const sitemaps = [new URL('/pages-sitemap.xml', origin).href]
  if ((await getPostSitemapEntries()).length > 0) {
    sitemaps.push(new URL('/posts-sitemap.xml', origin).href)
  }

  return getServerSideSitemapIndex(sitemaps)
}

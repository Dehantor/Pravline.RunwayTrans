import { getServerSideSitemap } from 'next-sitemap'

import { getPostSitemapEntries } from '../sitemapEntries'

export const dynamic = 'force-dynamic'

export async function GET() {
  return getServerSideSitemap(await getPostSitemapEntries())
}

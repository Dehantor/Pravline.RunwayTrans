import { getServerSideSitemap } from 'next-sitemap'

import { getPageSitemapEntries } from '../sitemapEntries'

export const dynamic = 'force-dynamic'

export async function GET() {
  return getServerSideSitemap(await getPageSitemapEntries())
}

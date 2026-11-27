import type { MetadataRoute } from 'next'

import { getSitemapOrigin } from '@/utilities/getSitemapOrigin'

export const dynamic = 'force-dynamic'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', disallow: '/admin/' },
    sitemap: new URL('/sitemap.xml', getSitemapOrigin()).href,
  }
}

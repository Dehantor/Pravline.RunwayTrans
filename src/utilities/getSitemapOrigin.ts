const productionOrigin = 'https://rwt.ru'

export function getSitemapOrigin(): string {
  const configuredOrigin = process.env.NEXT_PUBLIC_SERVER_URL
  if (!configuredOrigin) return productionOrigin

  try {
    const url = new URL(configuredOrigin)
    const hostname = url.hostname.replace(/\.$/, '')
    if (url.protocol === 'https:' && hostname !== 'localhost' && !hostname.endsWith('.localhost')) {
      return url.origin
    }
  } catch {
    // Local and malformed settings fall back to the public site.
  }

  return productionOrigin
}

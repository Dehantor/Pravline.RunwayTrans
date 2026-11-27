export function getConcreteVideoLink(value: string | null | undefined) {
  const url = URL.parse(value?.trim() || '')
  if (!url || !['https:', 'http:'].includes(url.protocol) || url.username || url.password) {
    return null
  }

  const path = url.pathname.replace(/\/+$/, '')
  const youtube = /(^|\.)(youtube\.com|youtube-nocookie\.com)$/i.test(url.hostname)
  if (youtube && path === '/watch') {
    return url.searchParams.get('v') ? url.href : null
  }

  return path ? url.href : null
}

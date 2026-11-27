export function getConsultationPolicyHref() {
  const href = process.env.CONSULTATION_PRIVACY_POLICY_URL?.trim()
  if (!href || href.includes('\\') || /[\r\n\t]/.test(href)) return null
  if (href.startsWith('/') && !href.startsWith('//')) return href

  try {
    const url = new URL(href)
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : null
  } catch {
    return null
  }
}

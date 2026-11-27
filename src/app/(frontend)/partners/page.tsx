import type { Metadata } from 'next'
import Link from 'next/link'
import { getConcreteVideoLink } from '@/Reviews/videoLink'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import { getPageText, pageMessages } from '@/i18n/pageMessages'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { PartnersGrid } from './page.client'

type PartnerCard = {
  id?: string | null
  name?: string | null
  description?: string | null
  logo?:
    | {
        url?: string | null
      }
    | number
    | string
    | null
}

function normalizePartners(partners: PartnerCard[] | null | undefined, partnerFallback: string) {
  if (!Array.isArray(partners) || partners.length === 0) return []

  return partners.map((partner, index) => ({
    key: partner.id || `${partner.name || 'partner'}-${index}`,
    name: partner.name || partnerFallback,
    description: partner.description || '',
    logoUrl: typeof partner.logo === 'object' ? (partner.logo?.url ?? null) : null,
  }))
}

export default async function PartnersPage() {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].partners
  const ru = pageMessages.ru.partners
  const partnersPageData = await getCachedGlobal('partnersPage', locale, 1)()

  const breadcrumbsTitle = getPageText(
    locale,
    partnersPageData.breadcrumbsTitle,
    ru.breadcrumbsTitle,
    t.breadcrumbsTitle,
  )
  const pageTitle = getPageText(locale, partnersPageData.pageTitle, ru.title, t.title)
  const pageDescription = getPageText(
    locale,
    partnersPageData.pageDescription,
    ru.description,
    t.description,
  )
  const partners = normalizePartners(partnersPageData.partners, t.partnerFallback)
  const videoButtonLabel = getPageText(
    locale,
    partnersPageData.videoButtonLabel,
    ru.videoButtonLabel,
    t.videoButtonLabel,
  )
  const videoButtonHref = getConcreteVideoLink(partnersPageData.videoButtonHref)

  return (
    <main className="bg-background pt-12 pb-24 text-foreground sm:pt-16">
      <div className="container space-y-12">
        <header className="space-y-4">
          <p className="text-sm text-muted-foreground">
            <Link
              className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
              href={`/${locale}`}
            >
              {t.homeLink}
            </Link>{' '}
            <span aria-hidden="true">/</span> {breadcrumbsTitle}
          </p>
          <h1 className="text-4xl font-bold uppercase tracking-wide">{pageTitle}</h1>
          <p className="max-w-3xl text-muted-foreground">{pageDescription}</p>
        </header>

        {partners.length > 0 ? (
          <PartnersGrid noLogoLabel={t.noLogo} partners={partners} />
        ) : (
          <p className="rounded border border-border bg-card p-6 text-card-foreground">{t.empty}</p>
        )}

        {videoButtonHref && (
          <div className="flex justify-center">
            <a
              className="inline-flex min-h-11 items-center rounded border border-border bg-card px-6 py-3 text-center text-sm font-semibold text-card-foreground transition hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4"
              href={videoButtonHref}
              rel="noreferrer"
              target="_blank"
            >
              {videoButtonLabel}
            </a>
          </div>
        )}
      </div>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].partners
  const ru = pageMessages.ru.partners
  const partnersPageData = await getCachedGlobal('partnersPage', locale, 1, false)()

  return {
    title: getPageText(locale, partnersPageData.meta?.title, ru.metadata.title, t.metadata.title),
    description: getPageText(
      locale,
      partnersPageData.meta?.description,
      ru.metadata.description || '',
      t.metadata.description || '',
    ),
  }
}

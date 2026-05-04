import type { Metadata } from 'next'
import React from 'react'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import { getPageText, pageMessages } from '@/i18n/pageMessages'
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
  const partnersPageData = await getCachedGlobal('partnersPage', locale, 1, false)()

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
  const videoButtonHref = partnersPageData.videoButtonHref || 'https://www.youtube.com'

  return (
    <main className="bg-white pb-24 pt-24 text-black">
      <div className="container space-y-12">
        <header className="space-y-4">
          <p className="text-sm text-neutral-600">
            {t.homeLink} / {breadcrumbsTitle}
          </p>
          <h1 className="text-4xl font-bold uppercase tracking-wide">{pageTitle}</h1>
          <p className="max-w-3xl text-neutral-700">{pageDescription}</p>
        </header>

        {partners.length > 0 ? (
          <PartnersGrid noLogoLabel={t.noLogo} partners={partners} />
        ) : (
          <section className="rounded border border-neutral-200 bg-white p-6 text-neutral-600">
            {t.empty}
          </section>
        )}

        <div className="flex justify-center">
          <a
            className="inline-flex rounded bg-white px-10 py-3 text-sm font-semibold text-black transition hover:bg-neutral-100 border border-neutral-300"
            href={videoButtonHref}
            rel="noreferrer"
            target="_blank"
          >
            {videoButtonLabel}
          </a>
        </div>
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

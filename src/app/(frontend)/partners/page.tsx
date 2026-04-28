import type { Metadata } from 'next'
import React from 'react'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { getRequestLocale } from '@/i18n/getRequestLocale'

type PartnerCard = {
  id?: string | null
  name?: string | null
  logo?:
    | {
        url?: string | null
      }
    | number
    | string
    | null
}

function normalizePartners(partners: PartnerCard[] | null | undefined) {
  if (!Array.isArray(partners) || partners.length === 0) return []

  return partners.map((partner, index) => ({
    key: partner.id || `${partner.name || 'partner'}-${index}`,
    name: partner.name || 'Партнёр',
    logoUrl: typeof partner.logo === 'object' ? (partner.logo?.url ?? null) : null,
  }))
}

export default async function PartnersPage() {
  const locale = await getRequestLocale()
  const partnersPageData = await getCachedGlobal('partnersPage', locale, 1)()

  const breadcrumbsTitle = partnersPageData.breadcrumbsTitle || 'Партнеры'
  const pageTitle = partnersPageData.pageTitle || 'Партнеры'
  const pageDescription =
    partnersPageData.pageDescription ||
    'Компании, с которыми мы сотрудничаем в международной логистике и комплексных поставках.'
  const partners = normalizePartners(partnersPageData.partners)
  const videoButtonLabel = partnersPageData.videoButtonLabel || 'Смотреть видео отзывы'
  const videoButtonHref = partnersPageData.videoButtonHref || 'https://www.youtube.com'

  return (
    <main className="bg-white pb-24 pt-24 text-black">
      <div className="container space-y-12">
        <header className="space-y-4">
          <p className="text-sm text-neutral-600">Главная / {breadcrumbsTitle}</p>
          <h1 className="text-4xl font-bold uppercase tracking-wide">{pageTitle}</h1>
          <p className="max-w-3xl text-neutral-700">{pageDescription}</p>
        </header>

        {partners.length > 0 ? (
          <section className="grid gap-4 md:grid-cols-3">
            {partners.map((partner) => {
              return (
                <article
                  className="rounded border border-neutral-200 bg-white p-5 transition hover:border-green-500"
                  key={partner.key}
                >
                  {partner.logoUrl ? (
                    <img
                      alt={partner.name}
                      className="mb-4 h-20 w-full rounded border border-neutral-200 object-contain p-2"
                      loading="lazy"
                      src={partner.logoUrl}
                    />
                  ) : (
                    <div className="mb-4 flex h-20 items-center justify-center rounded border border-neutral-200 bg-neutral-100 text-sm text-neutral-500">
                      Нет логотипа
                    </div>
                  )}
                  <h2 className="text-lg font-semibold text-black">{partner.name}</h2>
                </article>
              )
            })}
          </section>
        ) : (
          <section className="rounded border border-neutral-200 bg-white p-6 text-neutral-600">
            Добавьте карточки партнеров в админке, чтобы они отобразились на странице.
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
  const partnersPageData = await getCachedGlobal('partnersPage', locale, 1)()

  return {
    title: partnersPageData.meta?.title || 'Партнеры',
    description: partnersPageData.meta?.description || 'Страница партнеров Runway Trans.',
  }
}

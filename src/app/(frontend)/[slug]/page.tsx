import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { CasesFallback } from './CasesFallback'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { casesMessages } from '@/i18n/casesMessages'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import type { AppLocale } from '@/i18n/locales'
import { casesPageSlug } from '@/i18n/navigationMessages'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const locale = await getRequestLocale()
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  const isCasesPage = decodedSlug === casesPageSlug
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug(decodedSlug, locale)

  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    if (isCasesPage) return <CasesFallback locale={locale} />
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      {!isCasesPage && <PayloadRedirects disableNotFound url={url} />}

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const locale = await getRequestLocale()
  const { slug = 'home' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug(decodedSlug, locale)

  if (!page && decodedSlug === casesPageSlug) {
    const { title, description } = casesMessages[locale]
    return { title: `${title} | Runway Trans`, description }
  }

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async (slug: string, locale: AppLocale) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    locale,
    fallbackLocale: 'ru',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

import type { Metadata } from 'next'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'

import {
  getLandingImage,
  getPublishedLandings,
  serviceURL,
} from '@/collections/Services/getPublishedLandings'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import { locales } from '@/i18n/locales'
import { pageMessages } from '@/i18n/pageMessages'
import { isServiceLandingSlug, serviceLandingMessages } from '@/i18n/serviceLandingMessages'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

type Props = { params: Promise<{ slug: string }> }

const loadLanding = cache(async (slug: string) => {
  if (!isServiceLandingSlug(slug)) notFound()
  const locale = await getRequestLocale()
  const service = (await getPublishedLandings(locale)).get(slug)
  if (!service) notFound()

  const copy = serviceLandingMessages[locale]
  return { locale, slug, service, copy, article: copy.services[slug] }
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, article } = await loadLanding((await params).slug)
  const translations = await Promise.all(
    locales.map(async (language) => {
      const published = await getPublishedLandings(language)
      return published.has(slug) ? [[language, serviceURL(language, slug)]] : []
    }),
  )
  const canonical = serviceURL(locale, slug)
  const title = `${article.title} | Runway Trans`
  return {
    title,
    description: article.lead,
    alternates: { canonical, languages: Object.fromEntries(translations.flat()) },
    openGraph: mergeOpenGraph({ title, description: article.lead, url: canonical }),
  }
}

export default async function ServiceItemPage({ params }: Props) {
  const { locale, service, copy, article } = await loadLanding((await params).slug)
  const navigation = pageMessages[locale]
  const imageUrl = getMediaUrl(
    typeof service.image === 'number' ? await getLandingImage(service.image) : service.image?.url,
  )
  const href = `/${locale}#home-consultation-title`

  return (
    <main className="bg-background pb-24 text-foreground">
      <article className="container pt-12 sm:pt-16">
        <nav
          aria-label={navigation.contacts.breadcrumbsAria}
          className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
        >
          <Link className="underline underline-offset-4 hover:text-foreground" href={`/${locale}`}>
            {navigation.contacts.homeLink}
          </Link>
          <ChevronRight aria-hidden className="size-4" />
          <Link
            className="underline underline-offset-4 hover:text-foreground"
            href={`/${locale}/uslugi`}
          >
            {navigation.services.title}
          </Link>
          <ChevronRight aria-hidden className="size-4" />
          <span aria-current="page" className="text-foreground">
            {service.title}
          </span>
        </nav>

        <header
          className={imageUrl ? 'mt-10 grid items-center gap-8 md:grid-cols-2' : 'mt-10 max-w-3xl'}
        >
          <div>
            <h1 className="text-3xl leading-tight font-semibold sm:text-5xl">{article.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{article.lead}</p>
          </div>
          {imageUrl && (
            <img
              alt={service.title || article.title}
              className="aspect-video w-full rounded-lg object-cover"
              src={imageUrl}
            />
          )}
        </header>

        <div className="mt-12 max-w-3xl space-y-9">
          {(['route', 'conditions', 'request'] as const).map((section) => (
            <section key={section}>
              <h2 className="text-2xl font-semibold">{copy[section]}</h2>
              <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                {article[section]}
              </p>
            </section>
          ))}
          <a
            className="inline-flex min-h-12 max-w-full items-center gap-3 rounded-md bg-brand-green-hover px-6 py-3 text-lg font-semibold text-on-dark hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            href={href}
          >
            {copy.cta}
            <ChevronRight aria-hidden className="size-5 shrink-0" />
          </a>
        </div>
      </article>
    </main>
  )
}

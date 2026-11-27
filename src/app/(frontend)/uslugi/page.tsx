import type { Metadata } from 'next'

import { getPublishedLandings, servicePath } from '@/collections/Services/getPublishedLandings'
import { isServiceLandingSlug } from '@/i18n/serviceLandingMessages'
import { ServicesCatalog } from '@/components/ServicesCatalog'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import { defaultLocale, type AppLocale } from '@/i18n/locales'
import { homeMessages } from '@/i18n/messages'
import { getPageText, pageMessages } from '@/i18n/pageMessages'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import configPromise from '@payload-config'
import {
  Award,
  Box,
  ChevronRight,
  Cog,
  Container,
  Factory,
  FileCheck2,
  Forklift,
  type LucideIcon,
  Mountain,
  Snowflake,
  TriangleAlert,
  Truck,
  UsersRound,
} from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'

import homeStyles from '../home.module.css'

export const revalidate = 600

const cargoIcons = [Container, Forklift, Cog, TriangleAlert, Factory, UsersRound]
const advantageIcons = [Truck, Box, Mountain, Snowflake, FileCheck2, Award]

const introMessages: Record<AppLocale, string> = {
  ru: 'Наша компания гарантирует своим клиентам полную сохранность и высокую скорость доставки грузов.',
  en: 'Our company guarantees complete cargo safety and fast delivery for every client.',
  fr: 'Notre entreprise garantit à ses clients la sécurité totale et la livraison rapide des marchandises.',
  kk: 'Біздің компания клиенттерге жүктің толық сақталуына және жылдам жеткізілуіне кепілдік береді.',
  zh: '我们保证客户货物的完整安全和高效运输。',
}

type CardImage =
  | {
      alt?: string | null
      url?: string | null
    }
  | number
  | string
  | null
  | undefined

function CircleImage({
  Icon,
  image,
  title,
}: {
  Icon: LucideIcon
  image: CardImage
  title: string
}) {
  const media = typeof image === 'object' && image ? image : null
  const imageUrl = getMediaUrl(media?.url)

  return (
    <span className="mx-auto grid size-28 place-items-center overflow-hidden rounded-full border border-border bg-muted sm:size-32">
      {imageUrl ? (
        <img
          alt={media?.alt || title}
          className="size-full object-cover"
          loading="lazy"
          src={imageUrl}
        />
      ) : (
        <Icon
          aria-hidden="true"
          className="size-12 text-brand-green-hover dark:text-foreground"
          strokeWidth={1.65}
        />
      )}
    </span>
  )
}

function AdvantageCard({
  Icon,
  image,
  title,
  description,
}: {
  Icon: LucideIcon
  image: CardImage
  title: string
  description: string
}) {
  return (
    <article className="text-center">
      <CircleImage Icon={Icon} image={image} title={title} />
      <h3 className="mx-auto mt-7 max-w-[420px] text-xl leading-tight font-semibold text-foreground">
        {title}
      </h3>
      <p className="mx-auto mt-6 max-w-[390px] text-lg leading-snug text-muted-foreground">
        {description}
      </p>
    </article>
  )
}

export default async function ServicesPage() {
  const locale = await getRequestLocale()
  const pageCopy = pageMessages[locale].services
  const ruPageCopy = pageMessages.ru.services
  const homeCopy = homeMessages[locale] ?? homeMessages[defaultLocale]
  const ruHomeCopy = homeMessages.ru
  const payload = await getPayload({ config: configPromise })
  const servicesPageData = await getCachedGlobal('servicesPage', locale, 1, false)()

  if (!homeCopy || !ruHomeCopy) return null

  const landings = await getPublishedLandings(locale)
  const services = await payload.find({
    collection: 'services',
    locale,
    fallbackLocale: 'ru',
    depth: 1,
    limit: 100,
    select: { slug: true, title: true, summary: true, image: true },
    populate: { media: { filename: true, url: true, alt: true } },
    overrideAccess: false,
    sort: 'sortOrder',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  const serviceItems = services.docs.flatMap((item) => {
    if (!item.title || !item.summary) return []

    const image = typeof item.image === 'object' ? item.image : null

    return [
      {
        id: item.id,
        href:
          item.slug && isServiceLandingSlug(item.slug) && landings.has(item.slug)
            ? servicePath(locale, item.slug)
            : undefined,
        imageAlt: image?.alt || item.title,
        imageUrl: getMediaUrl(image?.url) || null,
        summary: item.summary,
        title: item.title,
      },
    ]
  })

  const intro = getPageText(locale, servicesPageData.intro, introMessages.ru, introMessages[locale])
  const breadcrumbsTitle = getPageText(
    locale,
    servicesPageData.breadcrumbsTitle,
    ruPageCopy.title,
    pageCopy.title,
  )
  const capabilitiesTitle = getPageText(
    locale,
    servicesPageData.capabilitiesTitle,
    ruHomeCopy.transportCapabilitiesTitle,
    homeCopy.transportCapabilitiesTitle,
  )
  const capabilitiesDescription = getPageText(
    locale,
    servicesPageData.capabilitiesDescription,
    ruHomeCopy.transportCapabilitiesDescription,
    homeCopy.transportCapabilitiesDescription,
  )
  const ctaLabel = getPageText(
    locale,
    servicesPageData.ctaLabel,
    ruHomeCopy.ctaRequest,
    homeCopy.ctaRequest,
  )
  const ctaHref = servicesPageData.ctaHref || `/${locale}/contacts#callback-form`
  const advantagesTitle = getPageText(
    locale,
    servicesPageData.advantagesSectionTitle,
    ruPageCopy.advantagesSectionTitle,
    pageCopy.advantagesSectionTitle,
  )
  const configuredAdvantagesItems = servicesPageData.advantagesItems ?? []
  const advantagesItems =
    configuredAdvantagesItems.length > 0
      ? configuredAdvantagesItems
      : pageCopy.advantagesItems.map((item) => ({ ...item, image: null }))
  const contactsCopy = pageMessages[locale].contacts

  return (
    <main className="bg-background pb-24 text-foreground">
      <div className="container pt-12 sm:pt-16">
        <nav
          aria-label={contactsCopy.breadcrumbsAria}
          className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground"
        >
          <Link
            className="hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            href={`/${locale}`}
          >
            {contactsCopy.homeLink}
          </Link>
          <ChevronRight aria-hidden="true" className="size-5 shrink-0" />
          <span aria-current="page" className="text-foreground">
            {breadcrumbsTitle}
          </span>
        </nav>

        <p className="mt-12 text-lg leading-relaxed sm:text-xl">{intro}</p>

        <section className="pt-12 sm:pt-16">
          <h1 className="text-center text-3xl font-semibold">{capabilitiesTitle}</h1>
          <p className="mt-7 text-lg leading-relaxed sm:text-xl">{capabilitiesDescription}</p>

          {serviceItems.length > 0 ? (
            <div className="mt-10">
              <ServicesCatalog
                buttonHref={ctaHref}
                buttonLabel={ctaLabel}
                services={serviceItems}
              />
            </div>
          ) : (
            <p className="mt-10 text-center text-muted-foreground">{pageCopy.empty}</p>
          )}
        </section>

        <section aria-labelledby="services-cargo-title" className="pt-16 sm:pt-20">
          <div className={homeStyles.sectionIntro}>
            <h2 className={homeStyles.sectionTitle} id="services-cargo-title">
              {homeCopy.cargoTitle}
            </h2>
            <p className={homeStyles.sectionDescription}>{homeCopy.cargoDescription}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {homeCopy.capabilities.map((item, index) => {
              const Icon = cargoIcons[index]
              return (
                <li className={`${homeStyles.iconCard} items-center`} key={item}>
                  <Icon aria-hidden="true" className={homeStyles.cardIcon} strokeWidth={1.65} />
                  <span className="min-w-0 wrap-anywhere font-semibold">{item}</span>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="pt-20 sm:pt-24">
          <h2 className="text-center text-3xl font-semibold">{advantagesTitle}</h2>

          <div className="mt-10 grid gap-x-12 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
            {advantagesItems.map((item, index) => (
              <AdvantageCard
                Icon={advantageIcons[index] ?? Award}
                description={item.description || ''}
                image={item.image}
                key={'id' in item ? item.id || index : index}
                title={item.title}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].services
  const ru = pageMessages.ru.services
  const servicesPageData = await getCachedGlobal('servicesPage', locale, 0, false)()

  return {
    title: getPageText(locale, servicesPageData.meta?.title, ru.metadata.title, t.metadata.title),
    description: getPageText(
      locale,
      servicesPageData.meta?.description,
      ru.metadata.description || '',
      t.metadata.description || '',
    ),
  }
}

import type { Metadata } from 'next'

import { GeographyMapClientOnly } from '@/components/GeographyMap/ClientOnly'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import { pageMessages } from '@/i18n/pageMessages'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const directions = [
  ['Coat of Arms of Chukotka.svg', 'chukotka'],
  ['Coat of arms of Sakha.svg', 'sakha'],
  ['Coat of arms of Nenets Autonomous Okrug.svg', 'nenets'],
  ['Coat of Arms of Kamchatka Krai.svg', 'kamchatka'],
  ['Coat of arms of Krasnoyarsk Krai.svg', 'krasnoyarsk'],
  ['Coat of Arms of Magadan oblast.svg', 'magadan'],
  ['Coat of Arms of Yamal Nenetsia.svg', 'yamal'],
] as const

type RoutePoint = {
  latitude?: number | null
  longitude?: number | null
}

type DeliveryRouteSource = {
  id?: string | null
  route?: string | null
  routePoints?: RoutePoint[] | null
  title?: string | null
}

function hasRoutePoints(item: unknown): item is DeliveryRouteSource {
  return typeof item === 'object' && item !== null
}

const fallbackRoutePoints = {
  pipelineService: [
    { latitude: 70.4706, longitude: 83.2226 },
    { latitude: 72.3875, longitude: 80.6553 },
  ],
  vankorAllTerrain: [
    { latitude: 60.2526, longitude: 90.1955 },
    { latitude: 67.4667, longitude: 86.5667 },
    { latitude: 65.9623, longitude: 84.2881 },
  ],
} satisfies Record<string, RoutePoint[]>

function getFallbackRoutePoints(item: DeliveryRouteSource): RoutePoint[] | undefined {
  const searchable = [item.id, item.title, item.route].filter(Boolean).join(' ').toLowerCase()

  if (
    searchable.includes('vankor') ||
    searchable.includes('ванкор') ||
    searchable.includes('ярцево') ||
    searchable.includes('igarka') ||
    searchable.includes('игарка')
  ) {
    return fallbackRoutePoints.vankorAllTerrain
  }

  if (
    searchable.includes('pipeline') ||
    searchable.includes('нефтепровод') ||
    searchable.includes('караул') ||
    searchable.includes('tanalau') ||
    searchable.includes('таналау')
  ) {
    return fallbackRoutePoints.pipelineService
  }

  return undefined
}

function getDeliveryRoutePoints(item: unknown) {
  if (!hasRoutePoints(item)) return undefined

  const configuredPoints = item.routePoints?.filter(
    (point) => typeof point.latitude === 'number' && typeof point.longitude === 'number',
  )

  return configuredPoints && configuredPoints.length >= 2
    ? configuredPoints
    : getFallbackRoutePoints(item)
}

function getCommonsFileUrl(fileName: string) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}`
}

function SelectButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex h-12 min-w-36 items-center justify-between gap-5 rounded-md border border-neutral-300 bg-white px-5 text-base text-neutral-950 shadow-sm">
      <span>{children}</span>
      <ChevronDown className="size-5 text-brand-green" />
    </button>
  )
}

export default async function GeographyPage() {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].geography
  const geographyPageData = await getCachedGlobal('geographyPage', locale)()
  const deliveries =
    geographyPageData.deliveries && geographyPageData.deliveries.length > 0
      ? geographyPageData.deliveries
      : t.fallbackDeliveries
  const mapRoutes = deliveries.map((item) => ({
    color: item.color,
    title: item.title,
    routePoints: getDeliveryRoutePoints(item),
  }))

  return (
    <main className="bg-white pb-20 pt-9 text-neutral-950">
      <div className="container max-w-[1440px] space-y-8">
        <nav aria-label={t.breadcrumbsAria} className="flex items-center gap-2 text-sm">
          <Link className="text-neutral-400 transition-colors hover:text-neutral-700" href="/">
            {t.homeLink}
          </Link>
          <ChevronRight className="size-4 text-neutral-400" />
          <span>{t.title}</span>
        </nav>

        <section className="space-y-8">
          <h1 className="sr-only">{t.title}</h1>
          <p className="max-w-[1330px] text-xl leading-snug">{t.intro}</p>

          <div className="space-y-7">
            <h2 className="text-center text-3xl font-semibold leading-tight">
              {t.directionsTitle}
            </h2>

            <div className="mx-auto grid max-w-[1220px] gap-x-20 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
              {directions.map(([fileName, key], index) => (
                <article
                  className={`flex min-h-24 items-center gap-6 ${
                    index === directions.length - 1
                      ? 'md:col-span-2 md:justify-center xl:col-span-3'
                      : ''
                  }`}
                  key={key}
                >
                  <img
                    alt=""
                    className="size-24 shrink-0 object-contain"
                    loading="lazy"
                    src={getCommonsFileUrl(fileName)}
                  />
                  <h3 className="text-xl leading-tight">{t.directions[key]}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-label={t.mapAria} className="space-y-6">
          <div className="relative h-[440px] overflow-hidden border border-background-muted bg-background-light md:h-[700px]">
            <GeographyMapClientOnly routes={mapRoutes} />
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xl">
            <span>{t.periodLabel}</span>
            <SelectButton>2026</SelectButton>

            <div className="flex h-12 flex-wrap items-center gap-5 rounded-md border border-neutral-300 bg-white px-4 text-neutral-500 shadow-sm">
              <label className="inline-flex items-center gap-2">
                <span className="size-7 rounded-full border border-neutral-400 bg-neutral-200" />
                <span>{t.vehicleAllTerrain}</span>
                <span className="relative h-5 w-9 rounded-full bg-brand-green">
                  <span className="absolute right-0.5 top-0.5 size-4 rounded-full bg-white shadow" />
                </span>
              </label>
              <label className="inline-flex items-center gap-2">
                <span className="size-7 rounded-full border border-neutral-400 bg-neutral-200" />
                <span>{t.vehicleCars}</span>
                <span className="relative h-5 w-9 rounded-full bg-brand-green">
                  <span className="absolute right-0.5 top-0.5 size-4 rounded-full bg-white shadow" />
                </span>
              </label>
            </div>

            <SelectButton>{t.cargoType}</SelectButton>
            <SelectButton>{t.region}</SelectButton>
          </div>

          <div className="space-y-4 pt-3 text-xl">
            {deliveries.map((item) => (
              <div
                className="grid gap-4 md:grid-cols-[68px_260px_minmax(0,1fr)_340px_80px] md:items-center"
                key={item.id ?? item.title}
              >
                <span className="h-3 w-16" style={{ backgroundColor: item.color }} />
                <span>{item.period}</span>
                <span>{item.title}</span>
                <span>{item.route}</span>
                <span>{item.duration ?? ''}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].geography

  return {
    title: t.metadata.title,
    description: t.metadata.description,
  }
}

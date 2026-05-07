import type { Metadata } from 'next'

import { getRequestLocale } from '@/i18n/getRequestLocale'
import { pageMessages } from '@/i18n/pageMessages'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { GeographyMap } from '@/components/GeographyMap'
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
  routePoints?: RoutePoint[] | null
}

function hasRoutePoints(item: unknown): item is DeliveryRouteSource {
  return typeof item === 'object' && item !== null && 'routePoints' in item
}

function getDeliveryRoutePoints(item: unknown) {
  return hasRoutePoints(item) ? item.routePoints : undefined
}

function getCommonsFileUrl(fileName: string) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}`
}

function SelectButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex h-12 min-w-36 items-center justify-between gap-5 rounded-md border border-neutral-300 bg-white px-5 text-base text-neutral-950 shadow-sm">
      <span>{children}</span>
      <ChevronDown className="size-5 text-[#4d8351]" />
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

        <section className="space-y-6" aria-label={t.mapAria}>
          <div className="relative h-[440px] overflow-hidden border border-neutral-300 bg-[#f6fbff] md:h-[700px]">
            <GeographyMap routes={mapRoutes} />
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xl">
            <span>{t.periodLabel}</span>
            <SelectButton>2026</SelectButton>

            <div className="flex h-12 flex-wrap items-center gap-5 rounded-md border border-neutral-300 bg-white px-4 text-neutral-500 shadow-sm">
              <label className="inline-flex items-center gap-2">
                <span className="size-7 rounded-full border border-neutral-400 bg-neutral-200" />
                <span>{t.vehicleAllTerrain}</span>
                <span className="relative h-5 w-9 rounded-full bg-[#88bd3b]">
                  <span className="absolute right-0.5 top-0.5 size-4 rounded-full bg-white shadow" />
                </span>
              </label>
              <label className="inline-flex items-center gap-2">
                <span className="size-7 rounded-full border border-neutral-400 bg-neutral-200" />
                <span>{t.vehicleCars}</span>
                <span className="relative h-5 w-9 rounded-full bg-[#88bd3b]">
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

import type { Metadata } from 'next'

import {
  geographyFilterMessages,
  kazakhGeographyDirections,
  kazakhGeographyFilterLabels,
  kazakhGeographyPageLabels,
} from '@/Geography/filterMessages'
import { DeliveryFilters } from '@/components/GeographyMap/DeliveryFilters'
import {
  getRouteCoordinates,
  hasRouteGeometry,
  type RouteCoordinate,
} from '@/components/GeographyMap/routes'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import { pageMessages } from '@/i18n/pageMessages'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { ChevronRight } from 'lucide-react'
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

const fallbackRoutePoints = {
  pipelineService: [
    [70.4706, 83.2226],
    [72.3875, 80.6553],
  ],
  vankorAllTerrain: [
    [60.2526, 90.1955],
    [67.4667, 86.5667],
    [65.9623, 84.2881],
  ],
} satisfies Record<string, RouteCoordinate[]>

function getKnownRoute(item: { id?: string | null; route: string }) {
  if (
    item.id === 'vankor-all-terrain' ||
    (/ярцево|yartsevo|jartsewo/i.test(item.route) &&
      /игарка|igarka/i.test(item.route) &&
      /байкаловск|baikalovsk|baikalowsk/i.test(item.route))
  ) {
    return 'vankorAllTerrain'
  }

  if (
    item.id === 'pipeline-service' ||
    (/караул|karaul/i.test(item.route) && /таналау|tanalau/i.test(item.route))
  ) {
    return 'pipelineService'
  }

  return null
}

function getDeliveryRoutePoints(
  item: { id?: string | null; title: string; route: string; routePoints?: RoutePoint[] | null },
  knownRoute: ReturnType<typeof getKnownRoute>,
) {
  const configuredPoints = getRouteCoordinates(item.routePoints)

  if (hasRouteGeometry(configuredPoints)) return configuredPoints
  if (knownRoute) return fallbackRoutePoints[knownRoute]

  // Keep the legacy coordinate fallback for existing entries. It does not determine their region.
  const description = [item.id, item.title, item.route].join(' ')
  if (/vankor|ванкор|ярцево|igarka|игарка/i.test(description))
    return fallbackRoutePoints.vankorAllTerrain
  if (/pipeline|нефтепровод|караул|tanalau|таналау/i.test(description))
    return fallbackRoutePoints.pipelineService

  return configuredPoints
}

function getDeliveryVehicle({ id, title }: { id?: string | null; title: string }) {
  const allTerrain =
    id === 'vankor-all-terrain' ||
    /на вездеход(?:е|ах)|вездеходами|\b(?:by|using) all[- ]terrain vehicles?\b|\ben véhicules? tout[- ]terrain\b|жол талғамайтын көлікпен|用全地形车/i.test(
      title,
    )
  const cars =
    /на автомобил(?:е|ях)|автомобилями|\b(?:by|using) (?:cars?|trucks?)\b|\b(?:en voiture|par camion)\b|автокөлікпен|用(?:汽车|卡车)/i.test(
      title,
    )

  if (allTerrain === cars) return null
  return allTerrain ? 'allTerrain' : 'cars'
}

function getCommonsFileUrl(fileName: string) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}`
}

export default async function GeographyPage() {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].geography
  const pageLabels = locale === 'kk' ? kazakhGeographyPageLabels : t
  const geographyPageData = await getCachedGlobal('geographyPage', locale)()
  const deliveries =
    geographyPageData.deliveries && geographyPageData.deliveries.length > 0
      ? geographyPageData.deliveries
      : t.fallbackDeliveries
  const directionLabels = locale === 'kk' ? kazakhGeographyDirections : t.directions
  const filterLabels =
    locale === 'kk'
      ? kazakhGeographyFilterLabels
      : {
          periodLabel: t.periodLabel,
          vehicleAllTerrain: t.vehicleAllTerrain,
          vehicleCars: t.vehicleCars,
          cargoType: t.cargoType,
          region: t.region,
        }

  return (
    <main className="bg-background pt-5 pb-6 text-foreground md:pt-6">
      <div className="mx-auto w-full max-w-[1344px] space-y-5 px-4 md:space-y-6 md:px-8">
        <nav aria-label={pageLabels.breadcrumbsAria} className="flex items-center gap-3 text-sm">
          <Link
            className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            href={`/${locale}`}
          >
            {pageLabels.homeLink}
          </Link>
          <ChevronRight aria-hidden="true" className="size-4 text-muted-foreground" />
          <span aria-current="page">{pageLabels.title}</span>
        </nav>

        <header className="space-y-1">
          <h1 className="text-4xl leading-tight font-bold md:text-[40px]">{pageLabels.title}</h1>
          <p className="max-w-[62rem] text-[17px] leading-snug text-muted-foreground md:text-lg">
            {pageLabels.intro}
          </p>
        </header>

        <section aria-labelledby="geography-directions" className="space-y-4 md:space-y-5">
          <h2
            className="text-center text-2xl leading-tight font-bold md:text-[26px]"
            id="geography-directions"
          >
            {pageLabels.directionsTitle}
          </h2>

          <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-12">
            {directions.map(([fileName, key], index) => (
              <li
                className={`flex min-h-[94px] min-w-0 items-center gap-3.5 rounded-[10px] border border-border bg-on-dark px-3.5 py-2.5 text-card-foreground dark:bg-card ${
                  index < 4 ? 'lg:col-span-3' : 'lg:col-span-4'
                }`}
                key={key}
              >
                <img
                  alt=""
                  className="size-[62px] shrink-0 object-contain md:size-16"
                  height={64}
                  loading="lazy"
                  src={getCommonsFileUrl(fileName)}
                  width={64}
                />
                <span className="min-w-0 leading-tight wrap-anywhere">{directionLabels[key]}</span>
              </li>
            ))}
          </ul>
        </section>

        <DeliveryFilters
          deliveries={deliveries.map((item, index) => {
            const knownRoute = getKnownRoute(item)
            return {
              id: item.id ?? String(index),
              color: item.color,
              title: item.title,
              period: item.period,
              route: item.route,
              duration: item.duration,
              points: getDeliveryRoutePoints(item, knownRoute),
              region: knownRoute ? 'krasnoyarsk' : null,
              vehicle: getDeliveryVehicle(item),
            }
          })}
          mapLabel={pageLabels.mapAria}
          messages={{ ...filterLabels, ...geographyFilterMessages[locale] }}
          regions={directions.map(([, key]) => ({ value: key, label: directionLabels[key] }))}
          zoomInLabel={pageLabels.zoomIn}
          zoomOutLabel={pageLabels.zoomOut}
        />
      </div>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  if (locale === 'kk') {
    return {
      title: kazakhGeographyPageLabels.title,
      description: kazakhGeographyPageLabels.description,
    }
  }

  const t = pageMessages[locale].geography

  return {
    title: t.metadata.title,
    description: t.metadata.description,
  }
}

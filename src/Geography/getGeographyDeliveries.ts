import 'server-only'

import {
  getRouteCoordinates,
  hasRouteGeometry,
  type GeographyDelivery,
  type RouteCoordinate,
} from '@/components/GeographyMap/routes'
import type { AppLocale } from '@/i18n/locales'
import { pageMessages } from '@/i18n/pageMessages'
import { getCachedGlobal } from '@/utilities/getGlobals'

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

export async function getGeographyDeliveries(locale: AppLocale): Promise<GeographyDelivery[]> {
  const t = pageMessages[locale].geography
  const geographyPageData = await getCachedGlobal('geographyPage', locale)()
  const deliveries =
    geographyPageData.deliveries && geographyPageData.deliveries.length > 0
      ? geographyPageData.deliveries
      : t.fallbackDeliveries

  return deliveries.map((item, index) => {
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
  })
}

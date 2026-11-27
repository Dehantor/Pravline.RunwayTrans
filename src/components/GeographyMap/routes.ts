type RoutePoint = {
  latitude?: number | string | null
  longitude?: number | string | null
}

export type RouteCoordinate = [latitude: number, longitude: number]

export type GeographyRoute = {
  id: string
  color: string
  title: string
  points: RouteCoordinate[]
}

export type GeographyDelivery = GeographyRoute & {
  period: string
  route: string
  duration?: string | null
  region: string | null
  vehicle: 'allTerrain' | 'cars' | null
}

export type RouteFocusRequest = {
  routeId: string
  revision: number
}

function parseCoordinate(value: number | string | null | undefined) {
  if (typeof value === 'number') return value
  if (value?.trim()) return Number(value.replace(',', '.'))
  return NaN
}

export function getRouteCoordinates(points?: RoutePoint[] | null): RouteCoordinate[] {
  return (points ?? []).flatMap(({ latitude, longitude }): RouteCoordinate[] => {
    const lat = parseCoordinate(latitude)
    const lng = parseCoordinate(longitude)

    if (
      !Number.isFinite(lat) ||
      !Number.isFinite(lng) ||
      Math.abs(lat) > 90 ||
      Math.abs(lng) > 180
    ) {
      return []
    }

    return [[lat, lng]]
  })
}

export function hasRouteGeometry(points: RouteCoordinate[]) {
  return points.length >= 2
}

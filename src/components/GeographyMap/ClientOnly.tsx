'use client'

import dynamic from 'next/dynamic'

type RoutePoint = {
  latitude?: number | null
  longitude?: number | null
}

type GeographyRoute = {
  color: string
  title: string
  routePoints?: RoutePoint[] | null
}

type GeographyMapClientOnlyProps = {
  routes: GeographyRoute[]
}

const GeographyMap = dynamic(
  () => import('./index').then((module) => module.GeographyMap),
  {
    ssr: false,
  },
)

export function GeographyMapClientOnly({ routes }: GeographyMapClientOnlyProps) {
  return <GeographyMap routes={routes} />
}

'use client'

import type { LatLngExpression, LayerGroup, Map as LeafletMap } from 'leaflet'

import { useEffect, useMemo, useRef } from 'react'

type RoutePoint = {
  latitude?: number | string | null
  longitude?: number | string | null
}

type GeographyRoute = {
  color: string
  title: string
  routePoints?: RoutePoint[] | null
}

type GeographyMapProps = {
  routes: GeographyRoute[]
}

const defaultCenter: LatLngExpression = [68.25, 88.25]
const defaultZoom = 5

function toCoordinate(value: number | string | null | undefined) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  if (typeof value === 'string') {
    const parsed = Number(value.replace(',', '.'))
    return Number.isFinite(parsed) ? parsed : null
  }

  return null
}

function getRouteLatLngs(routePoints?: RoutePoint[] | null): LatLngExpression[] {
  if (!routePoints) return []

  return routePoints.flatMap((point) => {
    const latitude = toCoordinate(point.latitude)
    const longitude = toCoordinate(point.longitude)

    return latitude === null || longitude === null
      ? []
      : ([[latitude, longitude] satisfies LatLngExpression] as LatLngExpression[])
  })
}

function resolveRouteColor(color: string) {
  const cssVarMatch = color.match(/^var\((--[^),]+)(?:,[^)]+)?\)$/)
  if (!cssVarMatch) return color

  return getComputedStyle(document.documentElement).getPropertyValue(cssVarMatch[1]).trim() || color
}

export function GeographyMap({ routes }: GeographyMapProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const routeLayerRef = useRef<LayerGroup | null>(null)
  const preparedRoutes = useMemo(
    () =>
      routes
        .map((route) => ({
          color: route.color,
          title: route.title,
          points: getRouteLatLngs(route.routePoints),
        }))
        .filter((route) => route.points.length >= 2),
    [routes],
  )

  useEffect(() => {
    let cancelled = false

    async function initMap() {
      if (!mapElementRef.current || mapRef.current) return

      const L = await import('leaflet')

      if (cancelled || !mapElementRef.current || mapRef.current) return

      const map = L.map(mapElementRef.current, {
        attributionControl: false,
        center: defaultCenter,
        scrollWheelZoom: true,
        zoom: defaultZoom,
        zoomControl: false,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(map)
      L.control.attribution({ prefix: false }).addAttribution('&copy; OpenStreetMap').addTo(map)
      L.control.zoom({ position: 'topright' }).addTo(map)

      const routeLayer = L.layerGroup().addTo(map)

      mapRef.current = map
      routeLayerRef.current = routeLayer
    }

    void initMap()

    return () => {
      cancelled = true
      mapRef.current?.remove()
      mapRef.current = null
      routeLayerRef.current = null
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function renderRoutes() {
      const map = mapRef.current
      const routeLayer = routeLayerRef.current

      if (!map || !routeLayer) return

      const L = await import('leaflet')

      if (cancelled) return

      routeLayer.clearLayers()

      const bounds = L.latLngBounds([])

      preparedRoutes.forEach((route) => {
        const color = resolveRouteColor(route.color)
        const polyline = L.polyline(route.points, {
          color,
          lineCap: 'round',
          lineJoin: 'round',
          opacity: 0.95,
          weight: 5,
        }).bindTooltip(route.title)

        polyline.addTo(routeLayer)
        route.points.forEach((point) => {
          bounds.extend(point)
          L.circleMarker(point, {
            color: '#ffffff',
            fillColor: color,
            fillOpacity: 1,
            radius: 6,
            weight: 2,
          }).addTo(routeLayer)
        })
      })

      if (bounds.isValid()) {
        map.fitBounds(bounds, {
          maxZoom: 9,
          padding: [48, 48],
        })
      }
    }

    void renderRoutes()

    return () => {
      cancelled = true
    }
  }, [preparedRoutes])

  return <div className="h-full w-full" ref={mapElementRef} />
}

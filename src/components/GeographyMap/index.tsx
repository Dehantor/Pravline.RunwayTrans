'use client'

import type { LatLngExpression, Map as LeafletMap } from 'leaflet'

import { useEffect, useMemo, useRef } from 'react'
import L from 'leaflet'

type RoutePoint = {
  latitude?: number | null
  longitude?: number | null
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

function isValidRoutePoint(point: RoutePoint): point is { latitude: number; longitude: number } {
  return typeof point.latitude === 'number' && typeof point.longitude === 'number'
}

function getRouteLatLngs(routePoints?: RoutePoint[] | null): LatLngExpression[] {
  if (!routePoints) return []

  return routePoints
    .filter(isValidRoutePoint)
    .map((point) => [point.latitude, point.longitude] satisfies LatLngExpression)
}

export function GeographyMap({ routes }: GeographyMapProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const routeLayerRef = useRef<L.LayerGroup | null>(null)
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
    if (!mapElementRef.current || mapRef.current) return

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

    return () => {
      map.remove()
      mapRef.current = null
      routeLayerRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    const routeLayer = routeLayerRef.current

    if (!map || !routeLayer) return

    routeLayer.clearLayers()

    const bounds = L.latLngBounds([])

    preparedRoutes.forEach((route) => {
      const polyline = L.polyline(route.points, {
        color: route.color,
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
          fillColor: route.color,
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
  }, [preparedRoutes])

  return <div className="h-full w-full" ref={mapElementRef} />
}

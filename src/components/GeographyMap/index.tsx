'use client'

import L, { type LatLngExpression, type LayerGroup, type Map as LeafletMap } from 'leaflet'

import { useEffect, useMemo, useRef } from 'react'
import { hasRouteGeometry, type GeographyRoute, type RouteFocusRequest } from './routes'

export type GeographyMapProps = {
  focusRequest: RouteFocusRequest | null
  routes: GeographyRoute[]
  zoomInLabel: string
  zoomOutLabel: string
}

const defaultCenter: LatLngExpression = [68.25, 88.25]
const defaultZoom = 5

function resolveRouteColor(color: string) {
  const cssVarMatch = color.match(/^var\((--[^),]+)(?:,[^)]+)?\)$/)
  if (!cssVarMatch) return color

  return getComputedStyle(document.documentElement).getPropertyValue(cssVarMatch[1]).trim() || color
}

export function GeographyMap({
  focusRequest,
  routes,
  zoomInLabel,
  zoomOutLabel,
}: GeographyMapProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const routeLayerRef = useRef<LayerGroup | null>(null)
  const preparedRoutes = useMemo(
    () => routes.filter((route) => hasRouteGeometry(route.points)),
    [routes],
  )

  useEffect(() => {
    if (!mapElementRef.current) return

    const map = L.map(mapElementRef.current, {
      attributionControl: false,
      center: defaultCenter,
      scrollWheelZoom: true,
      zoom: defaultZoom,
      zoomAnimation: false,
      zoomControl: false,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map)
    L.control.attribution({ prefix: false }).addAttribution('&copy; OpenStreetMap').addTo(map)
    L.control
      .zoom({
        position: 'topright',
        zoomInTitle: zoomInLabel,
        zoomOutTitle: zoomOutLabel,
      })
      .addTo(map)

    mapRef.current = map
    routeLayerRef.current = L.layerGroup().addTo(map)

    return () => {
      map.remove()
      mapRef.current = null
      routeLayerRef.current = null
    }
  }, [zoomInLabel, zoomOutLabel])

  useEffect(() => {
    const routeLayer = routeLayerRef.current

    if (!routeLayer) return

    routeLayer.clearLayers()

    preparedRoutes.forEach((route) => {
      const color = resolveRouteColor(route.color)
      const tooltip = document.createElement('span')
      tooltip.textContent = route.title
      L.polyline(route.points, {
        color,
        lineCap: 'round',
        lineJoin: 'round',
        opacity: 0.95,
        weight: 5,
      })
        .bindTooltip(tooltip)
        .addTo(routeLayer)

      route.points.forEach((point) => {
        L.circleMarker(point, {
          color: '#ffffff',
          fillColor: color,
          fillOpacity: 1,
          radius: 6,
          weight: 2,
        }).addTo(routeLayer)
      })
    })
  }, [preparedRoutes, zoomInLabel, zoomOutLabel])

  useEffect(() => {
    const map = mapRef.current
    if (!map || preparedRoutes.length === 0) return

    const focusedRoute = preparedRoutes.find((route) => route.id === focusRequest?.routeId)
    const points = focusedRoute
      ? focusedRoute.points
      : preparedRoutes.flatMap((route) => route.points)
    map.fitBounds(L.latLngBounds(points), {
      animate: false,
      maxZoom: 9,
      paddingTopLeft: [36, 52],
      paddingBottomRight: [36, 30],
    })
  }, [focusRequest, preparedRoutes, zoomInLabel, zoomOutLabel])

  return <div className="h-full w-full" ref={mapElementRef} />
}

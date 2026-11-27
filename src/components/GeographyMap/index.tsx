'use client'

import L, { type LayerGroup, type Map as LeafletMap, type TileLayer } from 'leaflet'

import { useEffect, useMemo, useRef } from 'react'
import { createGeographyLeafletMap, type BasemapStatus } from './leafletMap'
import { hasRouteGeometry, type GeographyRoute, type RouteFocusRequest } from './routes'

export type GeographyMapProps = {
  focusRequest: RouteFocusRequest | null
  label: string
  mode?: 'overview' | 'full'
  onBasemapStatusChange?: (status: BasemapStatus) => void
  routes: GeographyRoute[]
  zoomInLabel: string
  zoomOutLabel: string
}

function resolveRouteColor(color: string) {
  const cssVarMatch = color.match(/^var\((--[^),]+)(?:,[^)]+)?\)$/)
  if (!cssVarMatch) return color

  return getComputedStyle(document.documentElement).getPropertyValue(cssVarMatch[1]).trim() || color
}

export function GeographyMap({
  focusRequest,
  label,
  mode = 'full',
  onBasemapStatusChange,
  routes,
  zoomInLabel,
  zoomOutLabel,
}: GeographyMapProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const routeLayerRef = useRef<LayerGroup | null>(null)
  const tileLayerRef = useRef<TileLayer | null>(null)
  const isOverview = mode === 'overview'
  const preparedRoutes = useMemo(
    () => routes.filter((route) => hasRouteGeometry(route.points)),
    [routes],
  )

  useEffect(() => {
    if (!mapElementRef.current) return

    const { map, tiles, dispose } = createGeographyLeafletMap(mapElementRef.current, {
      preservePageScroll: isOverview,
      onBasemapStatusChange,
      zoomInLabel,
      zoomOutLabel,
    })

    mapRef.current = map
    routeLayerRef.current = L.layerGroup().addTo(map)
    tileLayerRef.current = tiles

    return () => {
      dispose()
      mapRef.current = null
      routeLayerRef.current = null
      tileLayerRef.current = null
    }
  }, [isOverview, onBasemapStatusChange, zoomInLabel, zoomOutLabel])

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
  }, [isOverview, onBasemapStatusChange, preparedRoutes, zoomInLabel, zoomOutLabel])

  useEffect(() => {
    const map = mapRef.current
    const tiles = tileLayerRef.current
    if (!map || !tiles) return

    if (preparedRoutes.length > 0) {
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
    }

    if (!map.hasLayer(tiles)) tiles.addTo(map)
  }, [focusRequest, isOverview, onBasemapStatusChange, preparedRoutes, zoomInLabel, zoomOutLabel])

  return <div aria-label={label} className="h-full w-full" ref={mapElementRef} role="region" />
}

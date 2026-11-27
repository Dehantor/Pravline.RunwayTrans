'use client'

import L, { type Map as LeafletMap, type Marker, type Point, type Popup } from 'leaflet'
import { useEffect, useRef } from 'react'

import type { GeographyMapPoint } from '@/Geography/mapPointTypes'

import { createGeographyLeafletMap, type BasemapStatus } from './leafletMap'
import styles from './locationMap.module.css'

const pinDiameter = 28
const pinHeight = 35
const nearPinThreshold = 34
const pinSpacing = 34
const compactMapWidth = 600

type MapEntry = { point: GeographyMapPoint; marker: Marker; layout?: string }

function pinIcon(point: GeographyMapPoint, offsetX: number) {
  const contents = document.createElement('span')
  contents.className = styles.pinShape
  contents.setAttribute('aria-hidden', 'true')

  const icon = document.createElement('span')
  icon.append(contents)
  if (offsetX !== 0) {
    const offsetLine = document.createElement('span')
    offsetLine.className = styles.pinOffsetLine
    offsetLine.style.width = `${Math.abs(offsetX)}px`
    if (offsetX > 0) offsetLine.style.right = '50%'
    else offsetLine.style.left = '50%'
    icon.append(offsetLine)
  }

  return L.divIcon({
    className: `${styles.pin} ${styles[point.kind]}`,
    html: icon,
    iconAnchor: [pinDiameter / 2 - offsetX, pinHeight],
    iconSize: [pinDiameter, pinHeight],
    popupAnchor: [offsetX, -pinHeight],
    tooltipAnchor: [offsetX, -16],
  })
}

function popupContent(point: GeographyMapPoint) {
  const popup = document.createElement('div')
  const title = document.createElement('strong')
  title.textContent = point.title
  popup.append(title)
  if (point.description) {
    const description = document.createElement('div')
    description.textContent = point.description
    popup.append(description)
  }
  return popup
}

function separateClosePins(positions: Point[]) {
  const offsets = new Map<number, number>()
  const sorted = positions
    .map((_, index) => index)
    .sort(
      (left, right) =>
        positions[left].x - positions[right].x || positions[left].y - positions[right].y,
    )

  sorted.forEach((index) => {
    if (offsets.has(index)) return
    const group = sorted.filter(
      (candidate) =>
        !offsets.has(candidate) &&
        positions[index].distanceTo(positions[candidate]) < nearPinThreshold,
    )
    group.forEach((member, order) => {
      offsets.set(member, (order - (group.length - 1) / 2) * pinSpacing)
    })
  })
  return offsets
}

function layoutPins(map: LeafletMap, entries: MapEntry[]) {
  const width = map.getSize().x
  const compact = width < compactMapWidth
  const positions = entries.map(({ marker }) => map.latLngToContainerPoint(marker.getLatLng()))
  const offsets = separateClosePins(positions)

  entries.forEach((entry, index) => {
    const offsetX = offsets.get(index) ?? 0
    let direction: 'left' | 'right' = positions[index].x < width / 2 ? 'right' : 'left'
    if (offsetX < 0) direction = 'left'
    if (offsetX > 0) direction = 'right'

    const layout = `${offsetX}/${compact ? 'compact' : direction}`
    if (entry.layout === layout) return
    entry.layout = layout
    entry.marker.setIcon(pinIcon(entry.point, offsetX))
    const element = entry.marker.getElement()
    if (element) {
      element.setAttribute('aria-label', entry.point.title)
      element.dataset.pointId = entry.point.id
      element.dataset.pointKind = entry.point.kind
    }
    entry.marker.unbindTooltip()
    if (compact) return

    const label = document.createElement('span')
    label.textContent = entry.point.title
    entry.marker.bindTooltip(label, {
      permanent: true,
      direction,
      opacity: 1,
      offset: direction === 'left' ? [-16, 0] : [16, 0],
      className: styles.pointTooltip,
    })
  })
}

export function GeographyLocationMap({
  closeLabel,
  label,
  onBasemapStatusChange,
  points,
  zoomInLabel,
  zoomOutLabel,
}: {
  closeLabel: string
  label: string
  onBasemapStatusChange: (status: BasemapStatus) => void
  points: GeographyMapPoint[]
  zoomInLabel: string
  zoomOutLabel: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const { map, tiles, dispose } = createGeographyLeafletMap(container, {
      preservePageScroll: true,
      onBasemapStatusChange,
      zoomInLabel,
      zoomOutLabel,
    })
    const bounds = L.latLngBounds(points.map(({ coordinates }) => coordinates))
    const fit = () => {
      if (!bounds.isValid()) return
      const narrow = map.getSize().x < compactMapWidth
      map.fitBounds(bounds, {
        animate: false,
        maxZoom: 9,
        padding: narrow ? [54, 64] : [115, 68],
      })
    }
    fit()

    const popupMaxWidth = () => Math.min(220, Math.max(1, map.getSize().x - 104))
    const entries: MapEntry[] = points.map((point) => {
      const marker = L.marker(point.coordinates, {
        icon: pinIcon(point, 0),
        riseOnHover: true,
        title: point.title,
      }).addTo(map)
      marker.bindPopup(popupContent(point), {
        autoPanPaddingTopLeft: [12, 12],
        autoPanPaddingBottomRight: [12, 36],
        className: styles.pointPopup,
        maxHeight: 220,
        maxWidth: popupMaxWidth(),
        minWidth: 0,
      })
      return { point, marker }
    })

    let activePopup: Popup | undefined
    const arrange = () => layoutPins(map, entries)
    const resize = () => {
      const maxWidth = popupMaxWidth()
      entries.forEach(({ marker }) => {
        const popup = marker.getPopup()
        if (popup) popup.options.maxWidth = maxWidth
      })
      fit()
      arrange()
      activePopup?.update()
    }
    map.on('moveend', arrange)
    map.on('resize', resize)
    map.on('popupopen', ({ popup }) => {
      activePopup = popup
      container.dataset.popupOpen = 'true'
      const element = popup.getElement()
      element?.querySelector('.leaflet-popup-scrolled')?.setAttribute('tabindex', '0')
      const close = element?.querySelector<HTMLAnchorElement>('.leaflet-popup-close-button')
      if (!close) return
      close.title = closeLabel
      close.setAttribute('aria-label', closeLabel)
    })
    map.on('popupclose', ({ popup }) => {
      if (activePopup !== popup) return
      activePopup = undefined
      delete container.dataset.popupOpen
    })

    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !activePopup) return

      const popup = activePopup
      const restoreFocus = popup.getElement()?.contains(document.activeElement)
      const trigger = restoreFocus
        ? entries.find(({ marker }) => marker.getPopup() === popup)?.marker
        : undefined
      event.preventDefault()
      event.stopPropagation()
      map.closePopup(popup)
      trigger?.getElement()?.focus({ preventScroll: true })
    }
    container.addEventListener('keydown', closeWithEscape, true)
    arrange()
    tiles.addTo(map)

    return () => {
      container.removeEventListener('keydown', closeWithEscape, true)
      delete container.dataset.popupOpen
      dispose()
    }
  }, [closeLabel, onBasemapStatusChange, points, zoomInLabel, zoomOutLabel])

  return (
    <div
      aria-label={label}
      className={styles.canvas}
      id="geography-locations-map"
      ref={containerRef}
      role="region"
    />
  )
}

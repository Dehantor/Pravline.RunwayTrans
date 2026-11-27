import L, { type LatLngExpression } from 'leaflet'

export type BasemapStatus = 'ready' | 'unavailable'

type GeographyLeafletOptions = {
  preservePageScroll: boolean
  onBasemapStatusChange?: (status: BasemapStatus) => void
  zoomInLabel: string
  zoomOutLabel: string
}

const defaultCenter: LatLngExpression = [68.25, 88.25]
const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const tileAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

export function createGeographyLeafletMap(
  container: HTMLElement,
  { preservePageScroll, onBasemapStatusChange, zoomInLabel, zoomOutLabel }: GeographyLeafletOptions,
) {
  const pointer = preservePageScroll ? window.matchMedia('(pointer: coarse)') : undefined
  const map = L.map(container, {
    attributionControl: false,
    center: defaultCenter,
    dragging: !pointer?.matches,
    scrollWheelZoom: !preservePageScroll,
    zoom: 5,
    zoomAnimation: false,
    zoomControl: false,
  })

  const syncDragging = (event: MediaQueryListEvent) => {
    if (event.matches) map.dragging.disable()
    else map.dragging.enable()
  }
  pointer?.addEventListener('change', syncDragging)

  const tiles = L.tileLayer(tileUrl, { attribution: tileAttribution, maxZoom: 18 })
  if (onBasemapStatusChange) {
    let hasIncompleteTiles = false
    tiles
      .on('loading', () => {
        hasIncompleteTiles = false
      })
      .on('tileerror', () => {
        hasIncompleteTiles = true
      })
      .on('load', () => onBasemapStatusChange(hasIncompleteTiles ? 'unavailable' : 'ready'))
  }

  L.control.attribution({ prefix: false }).addTo(map)
  L.control
    .zoom({ position: 'topright', zoomInTitle: zoomInLabel, zoomOutTitle: zoomOutLabel })
    .addTo(map)

  return {
    map,
    tiles,
    dispose() {
      pointer?.removeEventListener('change', syncDragging)
      tiles.off()
      map.remove()
    },
  }
}

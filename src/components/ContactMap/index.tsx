'use client'

import type { Map as LeafletMap } from 'leaflet'

import { useEffect, useRef } from 'react'

type ContactMapProps = {
  latitude: number
  longitude: number
}

export function ContactMap({ latitude, longitude }: ContactMapProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<LeafletMap | null>(null)

  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) return

    let cancelled = false

    void import('leaflet').then(({ default: L }) => {
      if (cancelled || !mapElementRef.current || mapRef.current) return

      const position: [number, number] = [latitude, longitude]
      const map = L.map(mapElementRef.current, {
        attributionControl: false,
        center: position,
        scrollWheelZoom: true,
        zoom: 14,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map)
      L.circleMarker(position, {
        color: '#ffffff',
        fillColor: '#598758',
        fillOpacity: 1,
        radius: 10,
        weight: 3,
      }).addTo(map)
      L.control.attribution({ prefix: false }).addAttribution('&copy; OpenStreetMap').addTo(map)

      mapRef.current = map
    })

    return () => {
      cancelled = true
      mapRef.current?.remove()
      mapRef.current = null
    }
  }, [latitude, longitude])

  return <div className="h-full w-full" ref={mapElementRef} />
}

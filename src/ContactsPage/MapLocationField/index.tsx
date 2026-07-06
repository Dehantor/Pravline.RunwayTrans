'use client'

import type { LatLngExpression, Map as LeafletMap, Marker } from 'leaflet'
import type { TextFieldClientComponent } from 'payload'

import { FieldLabel, useField } from '@payloadcms/ui'
import L from 'leaflet'
import { useCallback, useEffect, useRef } from 'react'

import 'leaflet/dist/leaflet.css'
import './styles.scss'

type Location = {
  latitude: number
  longitude: number
}

const defaultLocation: Location = {
  latitude: 56.008209,
  longitude: 92.881071,
}

const markerIcon = L.divIcon({
  className: 'contact-map-location__marker',
  html: '<span aria-hidden="true"></span>',
  iconAnchor: [16, 32],
  iconSize: [32, 32],
})

function createMapUrl({ latitude, longitude }: Location) {
  const longitudePadding = 0.025
  const latitudePadding = 0.015
  const bounds = [
    longitude - longitudePadding,
    latitude - latitudePadding,
    longitude + longitudePadding,
    latitude + latitudePadding,
  ].join('%2C')

  return `https://www.openstreetmap.org/export/embed.html?bbox=${bounds}&layer=mapnik&marker=${latitude}%2C${longitude}`
}

function getLocation(value: unknown): Location {
  if (typeof value !== 'string') return defaultLocation

  const decodedValue = decodeURIComponent(value)
  const match = decodedValue.match(/[?&]marker=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/)
  const latitude = match ? Number(match[1]) : Number.NaN
  const longitude = match ? Number(match[2]) : Number.NaN

  return Number.isFinite(latitude) && Number.isFinite(longitude)
    ? { latitude, longitude }
    : defaultLocation
}

const MapLocationField: TextFieldClientComponent = ({ field, path, readOnly }) => {
  const mapElementRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const markerRef = useRef<Marker | null>(null)
  const { disabled, setValue, value } = useField<string>({
    potentiallyStalePath: path,
  })
  const location = getLocation(value)
  const isReadOnly = Boolean(readOnly || disabled)
  const initialCenterRef = useRef<LatLngExpression>([location.latitude, location.longitude])

  const setLocation = useCallback(
    (nextLocation: Location) => {
      setValue(createMapUrl(nextLocation))
    },
    [setValue],
  )

  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) return

    const map = L.map(mapElementRef.current, {
      attributionControl: false,
      center: initialCenterRef.current,
      scrollWheelZoom: true,
      zoom: 14,
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map)
    L.control.attribution({ prefix: false }).addAttribution('&copy; OpenStreetMap').addTo(map)

    if (!isReadOnly) {
      map.on('click', ({ latlng }) => {
        setLocation({ latitude: latlng.lat, longitude: latlng.lng })
      })
    }

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      markerRef.current = null
    }
  }, [isReadOnly, setLocation])

  useEffect(() => {
    const map = mapRef.current
    const position: LatLngExpression = [location.latitude, location.longitude]

    if (!map) return

    if (!markerRef.current) {
      const marker = L.marker(position, {
        draggable: !isReadOnly,
        icon: markerIcon,
      }).addTo(map)

      if (!isReadOnly) {
        marker.on('dragend', () => {
          const nextPosition = marker.getLatLng()
          setLocation({
            latitude: nextPosition.lat,
            longitude: nextPosition.lng,
          })
        })
      }

      markerRef.current = marker
    } else {
      markerRef.current.setLatLng(position)
    }

    map.panTo(position)
  }, [isReadOnly, location.latitude, location.longitude, setLocation])

  return (
    <div className="contact-map-location">
      <FieldLabel label={field.label} path={path} required={field.required} />
      <div className="contact-map-location__coordinates">
        <label>
          <span>Долгота</span>
          <input
            disabled={isReadOnly}
            onChange={(event) => {
              const longitude = Number(event.target.value)
              if (Number.isFinite(longitude)) setLocation({ ...location, longitude })
            }}
            step="0.000001"
            type="number"
            value={location.longitude}
          />
        </label>
        <label>
          <span>Широта</span>
          <input
            disabled={isReadOnly}
            onChange={(event) => {
              const latitude = Number(event.target.value)
              if (Number.isFinite(latitude)) setLocation({ ...location, latitude })
            }}
            step="0.000001"
            type="number"
            value={location.latitude}
          />
        </label>
      </div>
      <p className="contact-map-location__help">
        Кликните по карте или перетащите маркер, чтобы указать местоположение офиса.
      </p>
      <div className="contact-map-location__map" ref={mapElementRef} />
    </div>
  )
}

export default MapLocationField

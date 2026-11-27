'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

import type { GeographyMapPoint } from '@/Geography/mapPointTypes'

import type { BasemapStatus } from './leafletMap'
import styles from './locationMap.module.css'
import mapStyles from './map.module.css'

const LocationMap = dynamic(
  () => import('./LocationMap').then((module) => module.GeographyLocationMap),
  { ssr: false },
)

export function GeographyLocationClient({
  messages,
  points,
  zoomInLabel,
  zoomOutLabel,
}: {
  messages: { label: string; loading: string; unavailable: string; close: string }
  points: GeographyMapPoint[]
  zoomInLabel: string
  zoomOutLabel: string
}) {
  const [status, setStatus] = useState<BasemapStatus | 'loading'>('loading')

  return (
    <div className={`${mapStyles.frame} ${styles.frame}`}>
      <LocationMap
        closeLabel={messages.close}
        label={messages.label}
        onBasemapStatusChange={setStatus}
        points={points}
        zoomInLabel={zoomInLabel}
        zoomOutLabel={zoomOutLabel}
      />
      <p aria-atomic="true" className={styles.status} role="status">
        {status === 'loading'
          ? messages.loading
          : status === 'unavailable'
            ? messages.unavailable
            : null}
      </p>
    </div>
  )
}

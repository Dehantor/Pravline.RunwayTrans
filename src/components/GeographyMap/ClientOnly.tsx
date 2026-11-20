'use client'

import dynamic from 'next/dynamic'
import type { GeographyMapProps } from './index'

const GeographyMap = dynamic(() => import('./index').then((module) => module.GeographyMap), {
  ssr: false,
})

export function GeographyMapClientOnly(props: GeographyMapProps) {
  return <GeographyMap {...props} />
}

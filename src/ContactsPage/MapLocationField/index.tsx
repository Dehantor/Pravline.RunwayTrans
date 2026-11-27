'use client'

import dynamic from 'next/dynamic'

// Leaflet requires the browser DOM as soon as its module is imported.
export default dynamic(() => import('./MapLocationField'), { ssr: false })

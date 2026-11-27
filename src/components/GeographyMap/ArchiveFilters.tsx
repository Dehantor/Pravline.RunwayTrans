'use client'

import dynamic from 'next/dynamic'
import type { ComponentProps } from 'react'

import type { DeliveryFilters } from './DeliveryFilters'

const LazyDeliveryFilters = dynamic(() =>
  import('./DeliveryFilters').then((module) => module.DeliveryFilters),
)

export function GeographyArchiveFilters(props: ComponentProps<typeof DeliveryFilters>) {
  return <LazyDeliveryFilters {...props} />
}

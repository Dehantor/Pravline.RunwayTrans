import 'server-only'

import type { AppLocale } from '@/i18n/locales'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { getDefaultGeographyMapPoints } from './locationMessages'
import type { GeographyMapPoint } from './mapPointTypes'

export async function getGeographyMapPoints(locale: AppLocale): Promise<GeographyMapPoint[]> {
  const { mapPoints } = await getCachedGlobal('geographyPage', locale)()
  if (!mapPoints?.length) return getDefaultGeographyMapPoints(locale)

  return mapPoints.map(({ id, kind, title, description, latitude, longitude }, index) => ({
    coordinates: [latitude, longitude],
    description: description ?? undefined,
    id: id ?? String(index),
    kind,
    title,
  }))
}

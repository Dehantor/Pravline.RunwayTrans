export type GeographyMapPointKind = 'office' | 'repairBase' | 'field'

export type GeographyMapPoint = {
  id: string
  kind: GeographyMapPointKind
  title: string
  description?: string
  coordinates: [latitude: number, longitude: number]
}

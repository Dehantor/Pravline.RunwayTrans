import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Грузоперевозки в труднодоступные районы Севера.',
  images: [
    {
      url: new URL('/runway-trans-preview.jpg', getServerSideURL()),
      type: 'image/jpeg',
      width: 1200,
      height: 630,
      alt: 'Runway Trans',
    },
  ],
  siteName: 'Runway Trans',
  title: 'Runway Trans',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}

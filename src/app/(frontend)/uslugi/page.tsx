import type { Metadata } from 'next'

import { ServicesCatalog } from '@/components/ServicesCatalog'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function ServicesPage() {
  const payload = await getPayload({ config: configPromise })

  const services = await payload.find({
    collection: 'services',
    depth: 1,
    limit: 100,
    overrideAccess: false,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  const serviceItems = services.docs.map((item) => {
    const image = typeof item.image === 'object' ? item.image : null

    return {
      id: item.id,
      imageUrl: image?.url ?? null,
      summary: item.summary,
      title: item.title,
    }
  })

  return (
    <section className="w-full bg-white">
      <div className="container py-16 text-black">
        <h1 className="mb-8 text-4xl font-semibold">Услуги</h1>

        {serviceItems.length === 0 ? (
          <p className="text-zinc-600">Пока нет опубликованных услуг.</p>
        ) : (
          <ServicesCatalog services={serviceItems} />
        )}
      </div>
    </section>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Услуги',
    description: 'Каталог услуг компании RunwayTrans для грузоперевозок и логистики.',
  }
}

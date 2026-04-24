import type { Metadata } from 'next'

import Link from 'next/link'

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

  return (
    <section className="w-full bg-white">
      <div className="container py-16 text-black">
        <h1 className="mb-8 text-4xl font-semibold">Услуги</h1>

        {services.docs.length === 0 ? (
          <p className="text-zinc-600">Пока нет опубликованных услуг.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.docs.map((item) => {
              const image = typeof item.image === 'object' ? item.image : null

              return (
                <article className="overflow-hidden rounded-sm border border-[#2b7f56] bg-white text-black" key={item.id}>
                  {image?.url ? (
                    <img alt={item.title} className="h-56 w-full object-cover" loading="lazy" src={image.url} />
                  ) : (
                    <div className="flex h-56 w-full items-center justify-center bg-zinc-100 text-zinc-500">
                      Нет изображения
                    </div>
                  )}

                  <div className="min-h-48 bg-white p-5">
                    <h2 className="mb-3 text-xl font-medium">{item.title}</h2>
                    <p className="mb-4 text-sm text-zinc-700">{item.summary}</p>

                    <Link className="font-medium text-[#2b7f56] hover:underline" href={`/uslugi/${item.slug}`}>
                      Подробнее →
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
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

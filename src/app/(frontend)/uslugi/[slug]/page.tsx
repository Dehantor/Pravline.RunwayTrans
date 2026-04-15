import type { Metadata } from 'next'

import Link from 'next/link'

import RichText from '@/components/RichText'
import { ServiceOrderForm } from '@/components/ServiceOrderForm'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { cache } from 'react'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export default async function ServiceItemPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const item = await queryServiceBySlug({ slug: decodedSlug })

  if (!item) {
    notFound()
  }

  const image = typeof item.image === 'object' ? item.image : null

  return (
    <section className="container py-16">
      <Link className="mb-6 inline-block text-sm text-muted-foreground hover:underline" href="/uslugi">
        ← Назад к списку услуг
      </Link>

      <h1 className="mb-4 text-4xl font-semibold">{item.title}</h1>

      {item.serviceType && <p className="mb-6 text-muted-foreground">Тип услуги: {item.serviceType}</p>}

      {image?.url ? (
        <img alt={item.title} className="mb-8 max-h-[420px] w-full rounded-md object-cover" src={image.url} />
      ) : null}

      <p className="mb-8 text-lg text-zinc-300">{item.summary}</p>

      <div className="prose max-w-none dark:prose-invert">
        <RichText data={item.description} />
      </div>

      <div className="mt-12 max-w-2xl rounded-lg border border-border p-6">
        <h2 className="mb-4 text-2xl font-medium">Заказать услугу</h2>
        <ServiceOrderForm serviceId={item.id} />
      </div>
    </section>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const item = await queryServiceBySlug({ slug: decodedSlug })

  return {
    title: item?.title ? `${item.title} — Услуги` : 'Услуги',
    description: item?.summary ?? undefined,
  }
}

const queryServiceBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft ? true : false,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs[0] || null
})

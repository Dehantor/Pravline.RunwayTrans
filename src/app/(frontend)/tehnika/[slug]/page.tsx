import type { Metadata } from 'next'

import Link from 'next/link'

import RichText from '@/components/RichText'
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

export default async function TehnikaItemPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const item = await queryEquipmentBySlug({ slug: decodedSlug })

  if (!item) {
    notFound()
  }

  const image = typeof item.image === 'object' ? item.image : null

  return (
    <section className="container py-16">
      <Link className="mb-6 inline-block text-sm text-muted-foreground hover:underline" href="/tehnika">
        ← Назад к списку техники
      </Link>

      <h1 className="mb-4 text-4xl font-semibold">{item.title}</h1>

      {item.category && <p className="mb-6 text-muted-foreground">Категория: {item.category}</p>}

      {image?.url ? (
        <img alt={item.title} className="mb-8 max-h-[420px] w-full rounded-md object-cover" src={image.url} />
      ) : null}

      <p className="mb-8 text-lg text-zinc-300">{item.summary}</p>

      {item.specifications && item.specifications.length > 0 ? (
        <div className="mb-10 rounded-md border border-[#2b7f56] bg-black/30 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Характеристики</h2>

          <dl className="space-y-4">
            {item.specifications.map((spec, index) => (
              <div
                className="grid gap-1 border-b border-zinc-800 pb-4 last:border-b-0 last:pb-0 md:grid-cols-[220px_1fr]"
                key={spec.id ?? `${spec.title}-${index}`}
              >
                <dt className="font-medium text-[#7de7af]">{spec.title}</dt>
                <dd className="text-zinc-300">{spec.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}

      <div className="prose max-w-none dark:prose-invert">
        <RichText data={item.description} />
      </div>
    </section>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const item = await queryEquipmentBySlug({ slug: decodedSlug })

  return {
    title: item?.title ? `${item.title} — Техника` : 'Техника',
    description: item?.summary ?? undefined,
  }
}

const queryEquipmentBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'equipment',
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

import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import { pageMessages } from '@/i18n/pageMessages'

export const dynamic = 'force-dynamic'

function getImageUrl(image: unknown) {
  if (image && typeof image === 'object' && 'url' in image && typeof image.url === 'string') {
    return image.url
  }

  return null
}

export default async function TehnikaPage() {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].equipment
  const payload = await getPayload({ config: configPromise })

  const equipmentItems = await payload.find({
    collection: 'equipment',
    locale,
    fallbackLocale: 'ru',
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

  const introText =
    locale === 'ru'
      ? 'Наша компания уникальна тем, что мы имеем все возможности для работы в условиях тундры по грузоперевозкам.'
      : t.metadata.description

  return (
    <section className="container bg-white py-7 text-black">
      <h1 className="sr-only">{t.title}</h1>
      <p className="mb-4 text-[15px] leading-6 text-neutral-900">{introText}</p>

      {equipmentItems.docs.length === 0 ? (
        <p className="text-muted-foreground">{t.empty}</p>
      ) : (
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {equipmentItems.docs.map((item) => {
            const imageUrl = getImageUrl(item.image)

            return (
              <article
                className="flex min-h-[590px] flex-col border border-[#2b7f56] bg-white p-3 text-black"
                key={item.id}
              >
                {imageUrl ? (
                  <img
                    alt={item.title}
                    className="mb-5 aspect-[1.12] w-full object-cover"
                    loading="lazy"
                    src={imageUrl}
                  />
                ) : (
                  <div className="mb-5 flex aspect-[1.12] w-full items-center justify-center bg-neutral-100 text-sm text-neutral-500">
                    {t.noImage}
                  </div>
                )}

                <div className="flex flex-1 flex-col">
                  <h2 className="mb-6 text-[13px] font-bold leading-5">{item.title}</h2>

                  {item.specifications && item.specifications.length > 0 ? (
                    <dl className="space-y-2">
                      {item.specifications.map((spec, index) => (
                        <div className="text-[11px] leading-[1.45]" key={spec.id ?? `${spec.title}-${index}`}>
                          <dt className="inline font-bold">{spec.title}: </dt>
                          <dd className="inline">{spec.description}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].equipment

  return {
    title: t.metadata.title,
    description: t.metadata.description,
  }
}

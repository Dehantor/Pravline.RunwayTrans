import type { Metadata } from 'next'
import Image from 'next/image'

import { equipmentImages, equipmentMessages } from '@/i18n/equipmentMessages'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

function getImageUrl(image: unknown) {
  if (image && typeof image === 'object' && 'url' in image && typeof image.url === 'string') {
    return image.url
  }

  return null
}

export default async function TehnikaPage() {
  const [locale, payload] = await Promise.all([
    getRequestLocale(),
    getPayload({ config: configPromise }),
  ])
  const t = equipmentMessages[locale]

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

  return (
    <main className="bg-background text-foreground">
      <div className="container py-10 sm:py-14">
        <h1 className="text-3xl font-bold sm:text-4xl">{t.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed">{t.intro}</p>

        <div className="mt-6 grid max-w-[960px] gap-4 sm:grid-cols-2 md:gap-6">
          {equipmentImages.map(({ kind, src }) => {
            const { title, description } = t.cards[kind]

            return (
              <article
                className="rounded-xl border border-border bg-card p-3 text-card-foreground sm:p-4"
                key={kind}
              >
                <Image
                  alt=""
                  className="aspect-[16/10] w-full rounded-lg object-cover"
                  height={128}
                  src={src}
                  unoptimized
                  width={183}
                />
                <h2 className="mt-3 text-xl leading-tight font-bold sm:text-2xl">{title}</h2>
                <p className="mt-2 text-base leading-relaxed">{description}</p>
              </article>
            )
          })}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{t.imageNote}</p>

        {equipmentItems.docs.length > 0 ? (
          <section aria-labelledby="equipment-specifications" className="mt-10">
            <h2 className="text-2xl font-bold" id="equipment-specifications">
              {t.specificationsTitle}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {equipmentItems.docs.map((item) => {
                const imageUrl = getImageUrl(item.image)

                return (
                  <article
                    className="rounded-xl border border-border bg-card p-3 text-card-foreground sm:p-4"
                    key={item.id}
                  >
                    {imageUrl ? (
                      <Image
                        alt={item.title}
                        className="aspect-[16/10] w-full rounded-lg object-cover"
                        height={300}
                        src={imageUrl}
                        unoptimized
                        width={480}
                      />
                    ) : (
                      <div className="flex aspect-[16/10] items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
                        {t.noImage}
                      </div>
                    )}

                    <h3 className="mt-3 text-xl font-bold">{item.title}</h3>

                    {item.specifications?.length ? (
                      <dl className="mt-3 space-y-2 text-sm">
                        {item.specifications.map((spec, index) => (
                          <div key={spec.id ?? `${spec.title}-${index}`}>
                            <dt className="inline font-semibold">{spec.title}: </dt>
                            <dd className="inline">{spec.description}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : null}
                  </article>
                )
              })}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = equipmentMessages[locale]

  return {
    title: t.title,
    description: t.intro,
  }
}

import type { Metadata } from 'next'
import Image from 'next/image'

import { equipmentCatalog } from '@/i18n/equipmentCatalog'
import { equipmentMessages } from '@/i18n/equipmentMessages'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'

const equipmentGridClassName = 'mt-4 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3'

type EquipmentCardProps = {
  title: string
  imageUrl?: string | null
  imageAlt?: string
  missingImageLabel?: string
  specifications?: ReadonlyArray<{
    id?: string | null
    title: string
    description: string
  }> | null
}

function EquipmentCard({
  title,
  imageUrl,
  imageAlt = title,
  missingImageLabel,
  specifications,
}: EquipmentCardProps) {
  return (
    <article className="rounded-xl border border-border bg-card p-3 text-card-foreground sm:p-4">
      {imageUrl ? (
        <Image
          alt={imageAlt}
          className="mb-3 aspect-[16/10] w-full rounded-lg object-cover"
          height={300}
          src={imageUrl}
          unoptimized
          width={480}
        />
      ) : missingImageLabel ? (
        <div className="mb-3 flex aspect-[16/10] items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
          {missingImageLabel}
        </div>
      ) : null}

      <h3 className="text-xl font-bold">{title}</h3>

      {specifications?.length ? (
        <dl className="mt-3 space-y-2 text-sm">
          {specifications.map((spec, index) => (
            <div key={spec.id ?? `${spec.title}-${index}`}>
              <dt className="inline font-semibold">{spec.title}: </dt>
              <dd className="inline">{spec.description}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </article>
  )
}

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
  const catalog = equipmentCatalog[locale]

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
        <p className="mt-4 max-w-3xl text-base leading-relaxed">{catalog.intro}</p>

        {catalog.sections.map((section, index) => (
          <section
            aria-labelledby={`equipment-category-${index}`}
            className="mt-8"
            key={section.title}
          >
            <h2 className="text-2xl font-bold" id={`equipment-category-${index}`}>
              {section.title}
            </h2>
            <div className={equipmentGridClassName}>
              {section.items.map((item) => (
                <EquipmentCard
                  imageAlt={item.imageAlt}
                  imageUrl={item.image}
                  key={item.title}
                  specifications={item.specifications}
                  title={item.title}
                />
              ))}
            </div>
          </section>
        ))}

        {equipmentItems.docs.length > 0 ? (
          <section aria-labelledby="equipment-specifications" className="mt-10">
            <h2 className="text-2xl font-bold" id="equipment-specifications">
              {t.specificationsTitle}
            </h2>
            <div className={equipmentGridClassName}>
              {equipmentItems.docs.map((item) => (
                <EquipmentCard
                  imageUrl={getImageUrl(item.image)}
                  key={item.id}
                  missingImageLabel={t.noImage}
                  specifications={item.specifications}
                  title={item.title}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return {
    title: equipmentMessages[locale].title,
    description: equipmentCatalog[locale].intro,
  }
}

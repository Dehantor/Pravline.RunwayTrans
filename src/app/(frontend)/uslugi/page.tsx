import type { Metadata } from 'next'

import { ServicesCatalog } from '@/components/ServicesCatalog'
import { getCachedGlobal } from '@/utilities/getGlobals'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-static'
export const revalidate = 600

type ServicesPageCard = {
  id?: string | null
  title?: string | null
  description?: string | null
}

function CircleIcon() {
  return <span aria-hidden="true" className="mx-auto block size-24 rounded-full bg-zinc-300" />
}

function InfoCard({ title, description }: { title: string; description: string }) {
  return (
    <article className="mx-auto max-w-sm text-center text-[#69ad75]">
      <CircleIcon />
      <h3 className="mt-4 text-xl font-semibold leading-tight">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-[#74bf81]">{description}</p>
    </article>
  )
}

function normalizeCards(cards: ServicesPageCard[] | null | undefined, prefix: string) {
  return (cards || []).map((card, index) => ({
    id: card.id || `${prefix}-${index}`,
    title: card.title || 'Заголовок карточки',
    description: card.description || 'Описание карточки.',
  }))
}

export default async function ServicesPage() {
  const payload = await getPayload({ config: configPromise })
  const servicesPageData = await getCachedGlobal('servicesPage', 1)()

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

  const transportedItems = normalizeCards(servicesPageData.transportedItems, 'transported')
  const advantagesItems = normalizeCards(servicesPageData.advantagesItems, 'advantage')

  return (
    <section className="w-full bg-white">
      <div className="container py-16 text-black">
        <h1 className="mb-8 text-4xl font-semibold">Услуги</h1>

        {serviceItems.length === 0 ? (
          <p className="text-zinc-600">Пока нет опубликованных услуг.</p>
        ) : (
          <ServicesCatalog services={serviceItems} />
        )}

        {transportedItems.length > 0 ? (
          <div className="mt-20">
            <h2 className="mb-10 text-center text-3xl font-semibold text-[#69ad75]">
              {servicesPageData.transportedSectionTitle || 'Что мы перевозим'}
            </h2>
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {transportedItems.map((item) => (
                <InfoCard description={item.description} key={item.id} title={item.title} />
              ))}
            </div>
          </div>
        ) : null}

        {advantagesItems.length > 0 ? (
          <div className="mt-20">
            <h2 className="mb-10 text-center text-3xl font-semibold text-[#69ad75]">
              {servicesPageData.advantagesSectionTitle || 'Наши преимущества'}
            </h2>
            <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {advantagesItems.map((item) => (
                <InfoCard description={item.description} key={item.id} title={item.title} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Услуги',
    description: 'Каталог услуг компании RunwayTrans для грузоперевозок и логистики.',
  }
}

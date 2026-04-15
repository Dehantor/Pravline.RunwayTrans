import type { Metadata } from 'next'

import Link from 'next/link'
import { getCachedGlobal } from '@/utilities/getGlobals'

function CircleIcon() {
  return <span className="mx-auto mb-5 block size-24 rounded-full bg-zinc-300" />
}

function GuideCard({ title, description }: { title: string; description: string }) {
  return (
    <article className="text-center text-[#69ad75]">
      <CircleIcon />
      <h2 className="text-xl font-semibold leading-tight">{title}</h2>
      <p className="mt-3 text-lg leading-snug">{description}</p>
    </article>
  )
}

export default async function GuidePage() {
  const guidePageData = await getCachedGlobal('guidePage', 1)()

  const mainGuideCards = guidePageData.mainGuideCards || []
  const advantages = guidePageData.advantages || []

  return (
    <section className="bg-white py-12 text-balsck md:py-20">
      <div className="container">
        <nav aria-label="Хлебные крошки" className="mb-10 text-sm text-zinc-400 md:mb-16">
          <Link className="hover:text-white" href="/">
            Главная
          </Link>{' '}
          <span aria-hidden="true">›</span>{' '}
          <span className="text-zinc-200">{guidePageData.breadcrumbsTitle || 'Руководство'}</span>
        </nav>

        <h1 className="sr-only">{guidePageData.pageTitle || 'Руководство по грузоперевозкам'}</h1>

        <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {mainGuideCards.map((card) => (
            <GuideCard
              description={card.description || ''}
              key={card.id}
              title={card.title || ''}
            />
          ))}
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-14 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((card) => (
            <GuideCard
              description={card.description || ''}
              key={card.id}
              title={card.title || ''}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const guidePageData = await getCachedGlobal('guidePage', 1)()

  return {
    title: guidePageData.meta?.title || 'Руководство',
    description:
      guidePageData.meta?.description ||
      'Руководство по услугам и условиям грузоперевозок RunwayTrans.',
  }
}

import type { Metadata } from 'next'

import Link from 'next/link'
import { getCachedGlobal } from '@/utilities/getGlobals'

type GuideCardData = {
  id?: string | null
  title?: string | null
  description?: string | null
}

type TeamTile = {
  id: string
  title: string
  subtitle: string
  className: string
}

const TEAM_TILE_LAYOUT_CLASSES: Record<string, string> = {
  regular: 'md:col-span-1 md:row-span-1',
  wide: 'md:col-span-2 md:row-span-1',
  tall: 'md:col-span-1 md:row-span-2',
  large: 'md:col-span-2 md:row-span-2',
}

function CircleIcon() {
  return (
    <span
      aria-hidden="true"
      className="mx-auto block size-36 rounded-full bg-zinc-300 md:size-44"
    />
  )
}

function GuideCard({ title, description }: { title: string; description: string }) {
  return (
    <article className="mx-auto max-w-sm text-center text-[#69ad75]">
      <CircleIcon />
      <h2 className="mt-6 text-xl font-semibold leading-tight">{title}</h2>
      <p className="mt-3 text-base leading-relaxed text-[#74bf81]">{description}</p>
    </article>
  )
}

function TeamTileCard({ tile, index }: { tile: TeamTile; index: number }) {
  return (
    <article
      className={`relative overflow-hidden rounded-sm bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-200 p-6 text-zinc-800 ${tile.className}`}
    >
      <div className="flex h-full flex-col justify-end">
        <span className="text-sm uppercase tracking-[0.18em] text-zinc-500">{tile.subtitle}</span>
        <h3 className="mt-2 text-xl font-semibold">{tile.title}</h3>
      </div>

      <span
        aria-hidden="true"
        className="absolute right-4 top-4 inline-flex size-12 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-zinc-500"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
    </article>
  )
}

function normalizeCards(cards: GuideCardData[], prefix: string) {
  return cards.map((card, index) => ({
    id: card.id || `${prefix}-${index}`,
    title: card.title || 'Направление перевозок',
    description:
      card.description || 'Подбираем оптимальный маршрут и формат доставки под вашу задачу.',
  }))
}

function normalizeTeamTiles(tiles: TeamTileInput[] | null | undefined) {
  const fallback: TeamTileInput[] = [
    { title: 'Руководитель отдела', subtitle: 'Команда RunwayTrans', layout: 'large' },
    { title: 'Менеджер проектов', subtitle: 'Команда RunwayTrans', layout: 'tall' },
    { title: 'Координатор перевозок', subtitle: 'Команда RunwayTrans', layout: 'wide' },
    { title: 'Логист', subtitle: 'Команда RunwayTrans', layout: 'regular' },
    { title: 'Специалист сопровождения', subtitle: 'Команда RunwayTrans', layout: 'wide' },
    { title: 'Оператор 24/7', subtitle: 'Команда RunwayTrans', layout: 'regular' },
  ]

  const source = tiles?.length ? tiles : fallback

  return source.map((tile, index) => {
    const layoutKey = tile.layout || 'regular'
    return {
      id: tile.id || `team-${index}`,
      title: tile.title || 'Сотрудник команды',
      subtitle: tile.subtitle || 'Команда RunwayTrans',
      className: TEAM_TILE_LAYOUT_CLASSES[layoutKey] || TEAM_TILE_LAYOUT_CLASSES.regular,
    }
  })
}

type TeamTileInput = {
  id?: string | null
  title?: string | null
  subtitle?: string | null
  layout?: string | null
}

export default async function GuidePage() {
  const guidePageData = await getCachedGlobal('guidePage', 1)()

  const mainGuideCards = normalizeCards(guidePageData.mainGuideCards || [], 'main')
  const advantageCards = normalizeCards(guidePageData.advantages || [], 'advantage')
  const heroCards = [...mainGuideCards, ...advantageCards].slice(0, 6)
  const teamTiles = normalizeTeamTiles(guidePageData.teamTiles)

  return (
    <section className="bg-white text-black">
      <div className="container py-12 md:py-16 lg:py-20">
        <nav aria-label="Хлебные крошки" className="mb-12 text-sm text-zinc-400 md:mb-20">
          <Link className="hover:text-white" href="/">
            Главная
          </Link>{' '}
          <span aria-hidden="true">›</span>{' '}
          <span className="text-zinc-200">{guidePageData.breadcrumbsTitle || 'Руководство'}</span>
        </nav>

        <h1 className="sr-only">{guidePageData.pageTitle || 'Руководство по грузоперевозкам'}</h1>

        <div className="grid gap-x-8 gap-y-16 pb-24 md:grid-cols-2 md:gap-y-20 lg:grid-cols-3 lg:pb-32">
          {heroCards.map((card) => (
            <GuideCard description={card.description} key={card.id} title={card.title} />
          ))}
        </div>
      </div>

      <div className="bg-white py-8 md:py-10">
        <div className="container">
          <div className="grid auto-rows-[220px] gap-4 md:grid-cols-3 md:auto-rows-[240px] lg:auto-rows-[260px]">
            {teamTiles.map((tile, index) => (
              <TeamTileCard index={index} key={tile.id} tile={tile} />
            ))}
          </div>
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

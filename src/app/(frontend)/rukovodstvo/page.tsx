import type { Metadata } from 'next'

import type { Media as MediaType } from '@/payload-types'

import Link from 'next/link'

import { Media } from '@/components/Media'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import { getPageText, isDefaultRussianText, pageMessages } from '@/i18n/pageMessages'

type GuideCardData = {
  id?: string | null
  title?: string | null
  description?: string | null
}

type PersonCardInput = {
  id?: string | null
  fullName?: string | null
  position?: string | null
  photo?: string | number | MediaType | null
}

type GalleryImageInput = {
  id?: string | null
  image?: string | number | MediaType | null
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

function PersonCard({ person }: { person: ReturnType<typeof normalizePeopleCards>[number] }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="relative aspect-[3/4] bg-zinc-100">
        <Media
          fill
          imgClassName="object-cover"
          resource={person.photo}
          alt={person.fullName}
          size="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>

      <div className="space-y-2 px-5 py-4">
        <h3 className="text-lg font-semibold text-zinc-900">{person.fullName}</h3>
        <p className="text-sm text-zinc-600">{person.position}</p>
      </div>
    </article>
  )
}

function normalizeCards(cards: GuideCardData[], prefix: string, fallback: GuideCardData) {
  return cards.map((card, index) => ({
    id: card.id || `${prefix}-${index}`,
    title: card.title || fallback.title || '',
    description: card.description || fallback.description || '',
  }))
}

function normalizePeopleCards(
  cards: PersonCardInput[] | null | undefined,
  fallback: { fullName: string; position: string },
) {
  return (cards || [])
    .map((person, index) => ({
      id: person.id || `person-${index}`,
      fullName: person.fullName || fallback.fullName,
      position: person.position || fallback.position,
      photo: typeof person.photo === 'object' && person.photo ? person.photo : null,
    }))
    .filter((person) => Boolean(person.photo))
}

function normalizeGallery(images: GalleryImageInput[] | null | undefined) {
  return (images || [])
    .map((item, index) => ({
      id: item.id || `gallery-${index}`,
      image: typeof item.image === 'object' && item.image ? item.image : null,
    }))
    .filter((item) => Boolean(item.image))
}

export default async function RukovodstvoPage() {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].guide
  const ru = pageMessages.ru.guide
  const guidePageData = await getCachedGlobal('guidePage', locale, 2, false)()

  const hasDefaultRussianMain =
    guidePageData.mainGuideCards?.[0]?.title &&
    isDefaultRussianText(locale, guidePageData.mainGuideCards[0].title, ru.mainGuideCards[0].title)
  const hasDefaultRussianAdvantages =
    guidePageData.advantages?.[0]?.title &&
    isDefaultRussianText(locale, guidePageData.advantages[0].title, ru.advantages[0].title)
  const mainGuideCards = normalizeCards(
    hasDefaultRussianMain ? t.mainGuideCards : guidePageData.mainGuideCards || t.mainGuideCards,
    'main',
    t.cardFallback,
  )
  const advantageCards = normalizeCards(
    hasDefaultRussianAdvantages ? t.advantages : guidePageData.advantages || t.advantages,
    'advantage',
    t.cardFallback,
  )
  const heroCards = [...mainGuideCards, ...advantageCards].slice(0, 6)
  const peopleCards = normalizePeopleCards(guidePageData.peopleCards, t.personFallback)
  const teamGallery = normalizeGallery(guidePageData.teamGallery)
  const breadcrumbsTitle = getPageText(
    locale,
    guidePageData.breadcrumbsTitle,
    ru.breadcrumbsTitle,
    t.breadcrumbsTitle,
  )
  const pageTitle = getPageText(locale, guidePageData.pageTitle, ru.title, t.title)

  return (
    <section className="bg-white text-black">
      <div className="container py-12 md:py-16 lg:py-20">
        <nav aria-label={t.breadcrumbsAria} className="mb-12 text-sm text-zinc-400 md:mb-20">
          <Link className="hover:text-white" href="/">
            {t.homeLink}
          </Link>{' '}
          <span aria-hidden="true">›</span>{' '}
          <span className="text-zinc-200">{breadcrumbsTitle}</span>
        </nav>

        <h1 className="sr-only">{pageTitle}</h1>

        <div className="grid gap-x-8 gap-y-16 pb-24 md:grid-cols-2 md:gap-y-20 lg:grid-cols-3 lg:pb-32">
          {heroCards.map((card) => (
            <GuideCard description={card.description} key={card.id} title={card.title} />
          ))}
        </div>
      </div>

      <div className="bg-white py-8 text-zinc-900 md:py-10">
        <div className="container space-y-12 md:space-y-16">
          {peopleCards.length > 0 && (
            <div>
              <h2 className="mb-6 text-2xl font-semibold md:mb-8">{t.peopleTitle}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {peopleCards.map((person) => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            </div>
          )}

          {teamGallery.length > 0 && (
            <div>
              <h2 className="mb-6 text-2xl font-semibold md:mb-8">{t.galleryTitle}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {teamGallery.map((item) => (
                  <article
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100"
                    key={item.id}
                  >
                    <Media
                      fill
                      imgClassName="object-cover"
                      resource={item.image}
                      alt={t.galleryImageAlt}
                      size="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].guide
  const ru = pageMessages.ru.guide
  const guidePageData = await getCachedGlobal('guidePage', locale, 2, false)()

  return {
    title: getPageText(locale, guidePageData.meta?.title, ru.metadata.title, t.metadata.title),
    description: getPageText(
      locale,
      guidePageData.meta?.description,
      ru.metadata.description || '',
      t.metadata.description || '',
    ),
  }
}

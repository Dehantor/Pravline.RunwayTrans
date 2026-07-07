import type { Metadata } from 'next'

import Link from 'next/link'

import { getRequestLocale } from '@/i18n/getRequestLocale'
import { getPageText, pageMessages } from '@/i18n/pageMessages'
import type { Media } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type PersonCardInput = {
  id?: string | null
  fullName?: string | null
  position?: string | null
  photo?: number | Media | null
}

type GalleryImageInput = {
  id?: string | null
  image?: number | Media | null
}

function normalizePeopleCards(
  cards: PersonCardInput[] | null | undefined,
  fallback: { fullName: string; position: string },
) {
  return (cards || [])
    .map((person, index) => {
      const photo = person.photo && typeof person.photo === 'object' ? person.photo : null
      const photoUrl = getMediaUrl(photo?.sizes?.medium?.url || photo?.url)

      return {
        id: person.id || `person-${index}`,
        fullName: person.fullName || fallback.fullName,
        position: person.position || fallback.position,
        photoUrl: photoUrl || '',
      }
    })
}

function PersonCard({ person }: { person: ReturnType<typeof normalizePeopleCards>[number] }) {
  return (
    <article className="flex flex-col items-center text-center">
      <div className="h-[180px] w-[180px] overflow-hidden rounded-full border-2 border-[#bfbfbf] bg-[#d9d9d9] sm:h-[205px] sm:w-[205px]">
        {person.photoUrl && (
          <img
            alt={person.fullName}
            className="h-full w-full object-cover"
            loading="lazy"
            src={person.photoUrl}
          />
        )}
      </div>
      <h2 className="mt-5 text-[18px] leading-tight font-semibold">{person.fullName}</h2>
      <p className="mt-3 text-[18px] leading-tight">{person.position}</p>
    </article>
  )
}

function normalizeGallery(images: GalleryImageInput[] | null | undefined) {
  return (images || [])
    .map((item, index) => {
      const image = item.image && typeof item.image === 'object' ? item.image : null
      const url = getMediaUrl(image?.sizes?.large?.url || image?.sizes?.medium?.url || image?.url)

      return {
        id: item.id || `gallery-${index}`,
        url: url || '',
      }
    })
    .filter((item) => Boolean(item.url))
}

export default async function RukovodstvoPage() {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].guide
  const ru = pageMessages.ru.guide
  const guidePageData = await getCachedGlobal('guidePage', locale, 2, false)()

  const peopleCards = normalizePeopleCards(guidePageData.peopleCards, t.personFallback)
  const galleryImages = normalizeGallery(guidePageData.teamGallery)
  const breadcrumbsTitle = getPageText(
    locale,
    guidePageData.breadcrumbsTitle,
    ru.breadcrumbsTitle,
    t.breadcrumbsTitle,
  )
  const companyBreadcrumbLabel = getPageText(
    locale,
    guidePageData.companyBreadcrumbLabel,
    'Компания',
    'Компания',
  )
  const introText = getPageText(
    locale,
    guidePageData.introText,
    'Наша великолепная команда к Вашим услугам.',
    'Наша великолепная команда к Вашим услугам.',
  )
  const pageTitle = getPageText(locale, guidePageData.pageTitle, ru.title, t.title)

  return (
    <main className="bg-background-light pb-24 text-ink">
      <div className="container pt-12 sm:pt-16">
        <nav aria-label={t.breadcrumbsAria} className="flex items-center gap-3 text-sm">
          <Link className="text-neutral-400 transition-colors hover:text-brand-green" href="/">
            {t.homeLink}
          </Link>
          <span className="text-neutral-400">›</span>
          <span className="text-neutral-400">{companyBreadcrumbLabel}</span>
          <span className="text-neutral-400">›</span>
          <span>{breadcrumbsTitle}</span>
        </nav>

        <h1 className="sr-only">{pageTitle}</h1>

        <p className="mt-8 text-[18px] leading-tight">{introText}</p>

        <section className="pt-6">
          {peopleCards.length > 0 ? (
            <div className="grid gap-x-20 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
              {peopleCards.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-neutral-600">{t.personFallback.fullName}</p>
          )}
        </section>

        {galleryImages.length > 0 && (
          <section className="mt-96 border-t border-neutral-300 pt-2">
            <h2 className="sr-only">{getPageText(locale, guidePageData.galleryTitle, ru.galleryTitle, t.galleryTitle)}</h2>
            <div className="grid auto-rows-[155px] grid-cols-12 gap-0 overflow-hidden">
              {galleryImages.map((image, index) => {
                const className =
                  index === 0
                    ? 'col-span-3 row-span-2'
                    : index === 1
                      ? 'col-span-3 row-span-2'
                      : index === 2
                        ? 'col-span-4 row-span-2'
                        : index === 3
                          ? 'col-span-2 row-span-2'
                          : index === 4
                            ? 'col-span-2 row-span-2'
                            : index === 5
                              ? 'col-span-4 row-span-2'
                              : 'col-span-2 row-span-2'

                return (
                  <img
                    alt={t.galleryImageAlt}
                    className={`${className} h-full w-full object-cover`}
                    key={image.id}
                    loading="lazy"
                    src={image.url}
                  />
                )
              })}
            </div>
          </section>
        )}
      </div>
    </main>
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

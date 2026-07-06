import type { Metadata } from 'next'

import { Media } from '@/components/Media'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import type { AppLocale } from '@/i18n/locales'
import { getPageText, pageMessages } from '@/i18n/pageMessages'
import type { Media as MediaType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

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

const companyLabels: Record<AppLocale, string> = {
  ru: 'Компания',
  en: 'Company',
  fr: 'Entreprise',
  kk: 'Компания',
  zh: '公司',
}

const introMessages: Record<AppLocale, string> = {
  ru: 'Наша великолепная команда к Вашим услугам.',
  en: 'Our outstanding team is at your service.',
  fr: 'Notre formidable équipe est à votre service.',
  kk: 'Біздің тамаша командамыз сіздің қызметіңізде.',
  zh: '我们优秀的团队随时为您服务。',
}

function normalizePeople(cards: PersonCardInput[] | null | undefined) {
  return (cards ?? []).map((person, index) => ({
    id: person.id || `person-${index}`,
    fullName: person.fullName || '',
    position: person.position || '',
    photo: typeof person.photo === 'object' && person.photo ? person.photo : null,
  }))
}

function normalizeGallery(images: GalleryImageInput[] | null | undefined) {
  return (images ?? []).flatMap((item, index) => {
    const image = typeof item.image === 'object' && item.image ? item.image : null

    return image
      ? [
          {
            id: item.id || `gallery-${index}`,
            image,
          },
        ]
      : []
  })
}

function PersonCard({ person }: { person: ReturnType<typeof normalizePeople>[number] }) {
  return (
    <article className="text-center">
      <div className="relative mx-auto size-56 overflow-hidden rounded-full border border-black/30 bg-background-muted sm:size-64">
        {person.photo ? (
          <Media
            fill
            alt={person.fullName}
            imgClassName="object-cover"
            resource={person.photo}
            size="(max-width: 640px) 224px, 256px"
          />
        ) : null}
      </div>

      <h2 className="mt-7 text-xl leading-tight font-semibold">{person.fullName}</h2>
      <p className="mt-4 text-lg leading-tight">{person.position}</p>
    </article>
  )
}

export default async function RukovodstvoPage() {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].guide
  const ru = pageMessages.ru.guide
  const guidePageData = await getCachedGlobal('guidePage', locale, 2, false)()
  const people = normalizePeople(guidePageData.peopleCards)
  const gallery = normalizeGallery(guidePageData.teamGallery)

  const breadcrumbsTitle = getPageText(
    locale,
    guidePageData.breadcrumbsTitle,
    ru.breadcrumbsTitle,
    t.breadcrumbsTitle,
  )
  const pageTitle = getPageText(locale, guidePageData.pageTitle, ru.title, t.title)
  const companyLabel = getPageText(
    locale,
    guidePageData.companyBreadcrumbLabel,
    companyLabels.ru,
    companyLabels[locale],
  )
  const introText = getPageText(
    locale,
    guidePageData.introText,
    introMessages.ru,
    introMessages[locale],
  )
  const peopleTitle = getPageText(locale, guidePageData.peopleTitle, ru.peopleTitle, t.peopleTitle)
  const galleryTitle = getPageText(
    locale,
    guidePageData.galleryTitle,
    ru.galleryTitle,
    t.galleryTitle,
  )

  return (
    <main className="bg-background-light pb-24 text-ink">
      <div className="container pt-12 sm:pt-16">
        <nav aria-label={t.breadcrumbsAria} className="flex items-center gap-3 text-sm">
          <Link className="text-neutral-400 transition-colors hover:text-brand-green" href="/">
            {t.homeLink}
          </Link>
          <ChevronRight className="size-5 text-neutral-400" />
          <Link
            className="text-neutral-400 transition-colors hover:text-brand-green"
            href="/ranvey-trans-segodnya"
          >
            {companyLabel}
          </Link>
          <ChevronRight className="size-5 text-neutral-400" />
          <span>{breadcrumbsTitle}</span>
        </nav>

        <h1 className="sr-only">{pageTitle}</h1>
        <p className="mt-12 text-lg leading-relaxed sm:text-xl">{introText}</p>

        <section className="pt-8" aria-labelledby="people-title">
          <h2 className="sr-only" id="people-title">
            {peopleTitle}
          </h2>

          {people.length > 0 ? (
            <div className="grid gap-x-12 gap-y-16 md:grid-cols-2 xl:grid-cols-3 xl:gap-y-20">
              {people.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-neutral-600">{t.personFallback.fullName}</p>
          )}
        </section>

        {gallery.length > 0 ? (
          <section className="mt-28 border-t border-background-muted pt-4">
            <h2 className="sr-only">{galleryTitle}</h2>
            <div
              className={
                gallery.length === 1
                  ? 'grid'
                  : 'grid auto-rows-[220px] grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4'
              }
            >
              {gallery.map((item, index) => (
                <article
                  className={
                    gallery.length === 1
                      ? 'relative aspect-[16/7] overflow-hidden bg-background-muted'
                      : `relative overflow-hidden bg-background-muted ${
                          index === 2 ? 'sm:col-span-2' : ''
                        }`
                  }
                  key={item.id}
                >
                  <Media
                    fill
                    alt={galleryTitle}
                    imgClassName="object-cover"
                    resource={item.image}
                    size="(max-width: 768px) 100vw, 50vw"
                  />
                </article>
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

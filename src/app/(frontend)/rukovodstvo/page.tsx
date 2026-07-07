import type { Metadata } from 'next'

import Link from 'next/link'

import { getRequestLocale } from '@/i18n/getRequestLocale'
import { getPageText, pageMessages } from '@/i18n/pageMessages'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type PersonCardInput = {
  id?: string | null
  fullName?: string | null
  position?: string | null
  photo?:
    | {
        url?: string | null
        sizes?: {
          medium?: {
            url?: string | null
          } | null
        } | null
      }
    | null
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
      photoUrl: getMediaUrl(person.photo?.sizes?.medium?.url || person.photo?.url),
    }))
    .filter((person) => Boolean(person.photoUrl))
}

function PersonCard({ person }: { person: ReturnType<typeof normalizePeopleCards>[number] }) {
  return (
    <article className="aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <img
        alt={person.fullName}
        className="h-full w-full object-cover"
        loading="lazy"
        src={person.photoUrl}
      />
    </article>
  )
}

export default async function RukovodstvoPage() {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].guide
  const ru = pageMessages.ru.guide
  const guidePageData = await getCachedGlobal('guidePage', locale, 2, false)()

  const peopleCards = normalizePeopleCards(guidePageData.peopleCards, t.personFallback)
  const breadcrumbsTitle = getPageText(
    locale,
    guidePageData.breadcrumbsTitle,
    ru.breadcrumbsTitle,
    t.breadcrumbsTitle,
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
          <span>{breadcrumbsTitle}</span>
        </nav>

        <h1 className="sr-only">{pageTitle}</h1>

        <div className="pt-8">
          {peopleCards.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {peopleCards.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-neutral-600">{t.personFallback.fullName}</p>
          )}
        </div>
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

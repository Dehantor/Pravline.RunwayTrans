import type { Metadata } from 'next'
import Link from 'next/link'

import { getRequestLocale } from '@/i18n/getRequestLocale'
import type { AppLocale } from '@/i18n/locales'
import {
  managementBiographyKeys,
  managementFactKeys,
  managementHobbyPhotos,
  managementProfileMessages,
} from '@/i18n/managementProfileMessages'
import { headerMessages } from '@/i18n/navigationMessages'
import { getPageText, pageMessages } from '@/i18n/pageMessages'
import type { GuidePage } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'

const directorPlaceholder = /(?:^|\/)runway-confirmed-team-placeholder(?:-\d+x\d+)?\.png(?:[?#]|$)/i

function normalizeFullName(fullName: string) {
  return fullName.normalize('NFC').trim().replace(/\s+/g, ' ').toLowerCase()
}

const directorNames = new Set(
  Object.values(managementProfileMessages).map(({ fullName }) => normalizeFullName(fullName)),
)

const hobbyKeys = Object.keys(managementHobbyPhotos) as (keyof typeof managementHobbyPhotos)[]

function getDirectorPortrait(peopleCards: GuidePage['peopleCards']) {
  for (const { fullName, photo } of peopleCards ?? []) {
    if (
      !fullName ||
      !directorNames.has(normalizeFullName(fullName)) ||
      !photo ||
      typeof photo !== 'object' ||
      !photo.mimeType?.startsWith('image/') ||
      directorPlaceholder.test(photo.filename?.trim() ?? '')
    ) {
      continue
    }

    const url = getMediaUrl(photo.sizes?.medium?.url?.trim() || photo.url?.trim())
    if (url && !directorPlaceholder.test(url)) return url
  }

  return null
}

function getManagementTitle(locale: AppLocale) {
  return (
    headerMessages[locale].companyDropdownLinks.find(({ href }) => href === '/rukovodstvo')?.label ??
    pageMessages[locale].guide.breadcrumbsTitle
  )
}

export default async function RukovodstvoPage() {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].guide
  const ru = pageMessages.ru.guide
  const profile = managementProfileMessages[locale]
  const guidePageData = await getCachedGlobal('guidePage', locale, 1)()
  const portrait = getDirectorPortrait(guidePageData.peopleCards)
  const breadcrumbsTitle = getPageText(
    locale,
    guidePageData.breadcrumbsTitle,
    ru.breadcrumbsTitle,
    getManagementTitle(locale),
  )
  const companyBreadcrumbLabel = getPageText(
    locale,
    guidePageData.companyBreadcrumbLabel,
    'Компания',
    headerMessages[locale].companyLabel,
  )

  return (
    <main className="bg-background pb-24 text-foreground">
      <div className="container max-w-6xl pt-10 sm:pt-12">
        <nav aria-label={t.breadcrumbsAria} className="flex flex-wrap items-center gap-3 text-sm">
          <Link
            className="text-muted-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
            href={`/${locale}`}
          >
            {t.homeLink}
          </Link>
          <span aria-hidden="true">›</span>
          <span className="text-muted-foreground">{companyBreadcrumbLabel}</span>
          <span aria-hidden="true">›</span>
          <span aria-current="page">{breadcrumbsTitle}</span>
        </nav>

        <div
          className={`mt-5 ${
            portrait ? 'grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12' : ''
          }`}
        >
          <div className="min-w-0">
            <h1 className="text-2xl leading-tight font-semibold text-brand-green-hover sm:text-[28px] dark:text-brand-green">
              {profile.fullName}
            </h1>
            <p className="mt-2 text-[15px] font-medium leading-normal sm:text-base">{profile.role}</p>

            <dl className="mt-5 max-w-prose space-y-2 text-sm leading-relaxed sm:mt-6">
              {managementFactKeys.map((key) => {
                const { label, value } = profile.facts[key]

                return (
                  <div className="flex flex-wrap gap-x-2" key={key}>
                    <dt className="font-semibold">{label}</dt>
                    <dd>{key === 'birthDate' ? <time dateTime="1971-03-11">{value}</time> : value}</dd>
                  </div>
                )
              })}
            </dl>
          </div>

          {portrait && (
            <img
              alt={profile.fullName}
              className="mx-auto aspect-[3/4] w-full max-w-[300px] object-cover lg:mr-0 lg:max-w-[360px]"
              height={480}
              src={portrait}
              width={360}
            />
          )}
        </div>

        <div className="mt-9 max-w-prose space-y-7 sm:mt-10">
          {managementBiographyKeys.map((key) => {
            const { title, text } = profile.biography[key]

            return (
              <section key={key}>
                <h2 className="text-lg font-semibold sm:text-xl">{title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed">{text}</p>
              </section>
            )
          })}
        </div>

        <section aria-labelledby="profile-hobbies" className="mt-9 sm:mt-10">
          <h2 className="text-lg font-semibold sm:text-xl" id="profile-hobbies">
            {profile.hobbiesTitle}
          </h2>
          <ul className="mt-4 grid gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {hobbyKeys.map((key) => {
              const { title, alt, caption } = profile.hobbies[key]

              return (
                <li className="text-center" key={key}>
                  <h3 className="mb-2 text-sm leading-5 font-semibold sm:flex sm:min-h-10 sm:items-end sm:justify-center">
                    {title}
                  </h3>
                  <figure>
                    <img
                      alt={alt}
                      className="aspect-[4/3] w-full object-cover"
                      height={270}
                      loading="lazy"
                      src={`/media/management-gallery/${managementHobbyPhotos[key]}`}
                      width={360}
                    />
                    <figcaption className="mt-2 text-sm leading-snug">{caption}</figcaption>
                  </figure>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const ru = pageMessages.ru.guide
  const t = pageMessages[locale].guide
  const profile = managementProfileMessages[locale]
  const { meta } = await getCachedGlobal('guidePage', locale, 0, false)()
  const description = meta?.description?.trim()
  const isLegacyDescription = description === ru.metadata.description || description === t.metadata.description

  return {
    title: getPageText(locale, meta?.title?.trim(), ru.metadata.title, getManagementTitle(locale)),
    description: !description || isLegacyDescription ? profile.metadataDescription : description,
  }
}

import type { Metadata } from 'next'

import { HistoryImage } from '@/components/HistoryImage'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import type { AppLocale } from '@/i18n/locales'
import { historyMessages } from '@/i18n/messages'
import type { Media as MediaType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './history.module.css'

type TimelineItem = {
  id?: string | null
  years?: string | null
  title?: string | null
  description?: string | null
  image?: string | number | MediaType | null
}

const companyLabels: Record<AppLocale, string> = {
  ru: 'Компания',
  en: 'Company',
  fr: 'Entreprise',
  kk: 'Компания',
  zh: '公司',
}

const milestoneIllustrations: Readonly<Record<string, string>> = {
  '2008': '/media/home-service-winter-road.webp',
  '2011': '/media/home-service-vityaz.webp',
  '2020–2022': '/media/home-service-crane.webp',
  '2023': '/media/home-arctic-freight.webp',
}

function normalizeYears(years: string) {
  return years.trim().replace(/(\d{4})\s*[-–—]\s*(\d{4})/g, '$1–$2')
}

function localizedValue(
  locale: AppLocale,
  value: string | null | undefined,
  russianValue: string,
  fallback: string,
) {
  if (!value) return fallback
  if (locale === 'ru') return value
  return value === russianValue ? fallback : value
}

function normalizeTimeline(items: TimelineItem[] | null | undefined, locale: AppLocale) {
  const translated = historyMessages[locale].timeline
  const source: TimelineItem[] = items?.length ? items : translated

  return source.map((item, index) => {
    const years = normalizeYears(item.years || '')
    const russian = historyMessages.ru.timeline.find(
      (milestone) => normalizeYears(milestone.years) === years,
    )
    const translation = translated.find((milestone) => normalizeYears(milestone.years) === years)
    const isKnownMilestone =
      Boolean(russian && translation) &&
      (item.title === russian?.title || item.title === translation?.title)
    const image = typeof item.image === 'object' && item.image?.url ? item.image : null

    return {
      id: item.id || `timeline-${index}`,
      years,
      title: isKnownMilestone && translation ? translation.title : item.title || '',
      description:
        russian && translation && item.description === russian.description
          ? translation.description
          : item.description || '',
      image,
      illustration: !image && isKnownMilestone ? milestoneIllustrations[years] : undefined,
    }
  })
}

export default async function HistoryPage() {
  const locale = await getRequestLocale()
  const t = historyMessages[locale]
  const ru = historyMessages.ru
  const historyPageData = await getCachedGlobal('historyPage', locale, 2, false)()
  const timeline = normalizeTimeline(historyPageData.timeline, locale)
  const companyLabel = localizedValue(
    locale,
    historyPageData.companyBreadcrumbLabel,
    companyLabels.ru,
    companyLabels[locale],
  )
  const breadcrumbsTitle = localizedValue(
    locale,
    historyPageData.breadcrumbsTitle,
    ru.breadcrumbsTitle,
    t.breadcrumbsTitle,
  )
  const pageTitle = localizedValue(locale, historyPageData.pageTitle, ru.pageTitle, t.pageTitle)

  return (
    <main className="bg-background text-foreground">
      <div className="container py-8 sm:py-12">
        <nav aria-label={t.breadcrumbsAria} className="flex flex-wrap items-center gap-2 text-sm">
          <Link
            className="text-muted-foreground transition-colors hover:text-foreground"
            href={`/${locale}`}
          >
            {t.homeLink}
          </Link>
          <ChevronRight aria-hidden="true" className="size-4 text-muted-foreground" />
          <Link
            className="text-muted-foreground transition-colors hover:text-foreground"
            href={`/${locale}/ranvey-trans-segodnya`}
          >
            {companyLabel}
          </Link>
          <ChevronRight aria-hidden="true" className="size-4 text-muted-foreground" />
          <span aria-current="page">{breadcrumbsTitle}</span>
        </nav>

        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">{pageTitle}</h1>
        <p className="mt-1 text-base text-muted-foreground sm:text-lg">{t.subtitle}</p>

        <ol className={`${styles.timeline} mt-7`} role="list">
          {timeline.map((item) => (
            <li className={styles.milestone} key={item.id}>
              <p className="text-xl font-bold leading-tight md:pt-5">{item.years}</p>
              <article className="flex min-w-0 flex-col gap-3 rounded-xl border border-border bg-card p-4 text-card-foreground md:flex-row md:gap-5 md:p-5">
                <div className="min-w-0 flex-1 [overflow-wrap:anywhere]">
                  <h2 className="text-xl font-bold leading-tight lg:text-2xl">{item.title}</h2>
                  <p className="mt-1 leading-snug">{item.description}</p>
                </div>
                {item.image?.url ? (
                  <HistoryImage
                    alt={item.image.alt || item.title}
                    className={styles.media}
                    closeLabel={t.closeImage}
                    openLabel={t.openImage}
                    src={item.image.url}
                  />
                ) : item.illustration ? (
                  <figure className={styles.media}>
                    <div className="relative aspect-[2.2] overflow-hidden rounded-lg">
                      <Image
                        alt=""
                        className="object-cover"
                        fill
                        src={item.illustration}
                        unoptimized
                      />
                    </div>
                  </figure>
                ) : null}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = historyMessages[locale]
  const ru = historyMessages.ru
  const historyPageData = await getCachedGlobal('historyPage', locale, 1, false)()

  return {
    title: localizedValue(locale, historyPageData.meta?.title, ru.metadata.title, t.metadata.title),
    description: localizedValue(
      locale,
      historyPageData.meta?.description,
      ru.metadata.description,
      t.metadata.description,
    ),
  }
}

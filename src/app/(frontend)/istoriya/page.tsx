import type { Metadata } from 'next'

import { HistoryImage } from '@/components/HistoryImage'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import type { AppLocale } from '@/i18n/locales'
import { historyMessages } from '@/i18n/messages'
import type { Media as MediaType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

type TimelineItem = {
  id?: string | null
  years?: string | null
  title?: string | null
  description?: string | null
  tone?: 'gray' | 'green' | null
  image?: string | number | MediaType | null
}

const companyLabels: Record<AppLocale, string> = {
  ru: 'Компания',
  en: 'Company',
  fr: 'Entreprise',
  kk: 'Компания',
  zh: '公司',
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

function normalizeTimeline(items: TimelineItem[] | null | undefined, fallback: TimelineItem[]) {
  const source = items?.length ? items : fallback

  return source.map((item, index) => ({
    id: item.id || `timeline-${index}`,
    years: item.years || '',
    title: item.title || '',
    description: item.description || '',
    tone: item.tone || (index % 2 === 0 ? 'green' : 'gray'),
    image: typeof item.image === 'object' && item.image ? item.image : null,
  }))
}

function getFallbackTimeline(locale: AppLocale): TimelineItem[] {
  return historyMessages[locale].timeline.map((item, index) => ({
    ...item,
    id: `fallback-${index}`,
    image: null,
    tone: index % 2 === 0 ? 'green' : 'gray',
  }))
}

export default async function HistoryPage() {
  const locale = await getRequestLocale()
  const t = historyMessages[locale]
  const ru = historyMessages.ru
  const historyPageData = await getCachedGlobal('historyPage', locale, 2, false)()
  const timeline = normalizeTimeline(historyPageData.timeline, getFallbackTimeline(locale))
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

        <section className="relative left-1/2 mt-4 w-screen -translate-x-1/2 pt-0 sm:mt-5">
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 right-[8%] bottom-0 z-20 hidden w-[17%] bg-background-light lg:block"
          />

          <ol className="relative">
            {timeline.map((item, index) => {
              const isGreen = item.tone === 'green'

              return (
                <li
                  className={`relative min-h-40 px-6 py-8 sm:min-h-44 sm:px-12 lg:pr-[27%] ${
                    index % 2 === 0 ? 'lg:mr-[4%] lg:w-[96%]' : 'lg:ml-[5%] lg:w-[95%]'
                  } ${isGreen ? 'bg-brand-green text-on-dark' : 'bg-history-row-gray text-on-dark'}`}
                  key={item.id}
                >
                  <div className="grid gap-5 sm:grid-cols-[100px_1fr] sm:items-center">
                    <p className="text-xl leading-tight font-semibold whitespace-pre-line">
                      {item.years.replace(/[–—]/g, ' -\n')}
                    </p>
                    <div>
                      <h2 className="text-lg leading-tight font-normal">{item.title}</h2>
                      <p className="mt-1 text-base leading-snug">{item.description}</p>
                    </div>
                  </div>

                  {item.image?.url ? (
                    <HistoryImage
                      alt={item.title}
                      className={`absolute top-0 z-30 hidden h-full overflow-hidden lg:block ${
                        index % 2 === 0 ? 'right-[4.17%] w-[17.92%]' : 'right-[8.42%] w-[18.1%]'
                      }`}
                      src={item.image.url}
                    />
                  ) : null}
                </li>
              )
            })}
          </ol>
        </section>
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

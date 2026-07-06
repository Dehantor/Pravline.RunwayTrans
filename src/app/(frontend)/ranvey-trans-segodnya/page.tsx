import type { Metadata } from 'next'

import { TodayVideo } from '@/components/TodayVideo'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import type { AppLocale } from '@/i18n/locales'
import { runwayTransTodayMessages } from '@/i18n/messages'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

const companyLabels: Record<AppLocale, string> = {
  ru: 'Компания',
  en: 'Company',
  fr: 'Entreprise',
  kk: 'Компания',
  zh: '公司',
}

const videoSectionTitles: Record<AppLocale, string> = {
  ru: 'Посмотрите о нас в 2 минутах',
  en: 'Discover us in two minutes',
  fr: 'Découvrez-nous en deux minutes',
  kk: 'Біз туралы екі минутта біліңіз',
  zh: '用两分钟了解我们',
}

function getVideoEmbedUrl(url: string) {
  try {
    const parsed = new URL(url)

    if (parsed.hostname.includes('youtu.be')) {
      const videoId = parsed.pathname.replace('/', '')
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : undefined
    }

    if (parsed.hostname.includes('youtube.com')) {
      const videoId = parsed.searchParams.get('v')
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : undefined
    }

    if (parsed.hostname.includes('vimeo.com')) {
      const videoId = parsed.pathname.split('/').filter(Boolean).at(-1)
      return videoId ? `https://player.vimeo.com/video/${videoId}?autoplay=1` : undefined
    }
  } catch {
    return undefined
  }

  return undefined
}

function getLocalizedText(
  locale: AppLocale,
  value: string | null | undefined,
  ruValue: string,
  fallback: string,
) {
  if (!value) return fallback
  if (locale === 'ru') return value
  return value === ruValue ? fallback : value
}

export default async function RunwayTransTodayPage() {
  const locale = await getRequestLocale()
  const t = runwayTransTodayMessages[locale]
  const ru = runwayTransTodayMessages.ru
  const runwayPageData = await getCachedGlobal('runwayTransTodayPage', locale, 1, false)()
  const pageTitle = getLocalizedText(locale, runwayPageData.pageTitle, ru.pageTitle, t.pageTitle)
  const breadcrumbsTitle = getLocalizedText(
    locale,
    runwayPageData.breadcrumbsTitle,
    ru.breadcrumbsTitle,
    t.breadcrumbsTitle,
  )
  const companyLabel = getLocalizedText(
    locale,
    runwayPageData.companyBreadcrumbLabel,
    companyLabels.ru,
    companyLabels[locale],
  )
  const videoSectionTitle = getLocalizedText(
    locale,
    runwayPageData.videoSectionTitle,
    videoSectionTitles.ru,
    videoSectionTitles[locale],
  )
  const hasDefaultRussianFaq =
    locale !== 'ru' && runwayPageData.faqItems?.[0]?.question === ru.faqItems[0]?.question
  const faqItems =
    runwayPageData.faqItems && runwayPageData.faqItems.length > 0 && !hasDefaultRussianFaq
      ? runwayPageData.faqItems
      : t.faqItems
  const videoUrl = runwayPageData.videoUrl || ''
  const videoFileUrl =
    runwayPageData.videoFile && typeof runwayPageData.videoFile === 'object'
      ? runwayPageData.videoFile.url || ''
      : ''
  const posterUrl =
    runwayPageData.videoPoster && typeof runwayPageData.videoPoster === 'object'
      ? runwayPageData.videoPoster.url || ''
      : ''
  const videoTitle = getLocalizedText(
    locale,
    runwayPageData.videoTitle,
    ru.videoTitle,
    t.videoTitle,
  )
  const embedUrl = videoFileUrl ? undefined : getVideoEmbedUrl(videoUrl)
  const directVideoUrl = embedUrl ? '' : videoFileUrl || videoUrl

  return (
    <main className="bg-background-light pb-24 text-ink">
      <div className="container pt-12 sm:pt-16">
        <nav aria-label={t.breadcrumbsAria} className="flex items-center gap-3 text-sm">
          <Link className="text-neutral-400 transition-colors hover:text-brand-green" href="/">
            {t.homeLink}
          </Link>
          <ChevronRight className="size-5 text-neutral-400" />
          <span className="text-neutral-400">{companyLabel}</span>
          <ChevronRight className="size-5 text-neutral-400" />
          <span>{breadcrumbsTitle}</span>
        </nav>

        <h1 className="sr-only">{pageTitle}</h1>
      </div>

      <section className="mx-auto mt-8 w-full max-w-[1530px] px-4 sm:mt-9">
        <h2 className="text-center text-3xl font-semibold">{videoSectionTitle}</h2>
        <div className="mt-7 overflow-hidden bg-ink">
          <TodayVideo
            embedUrl={embedUrl}
            fileUrl={directVideoUrl}
            placeholder={t.videoPlaceholder}
            posterUrl={posterUrl}
            title={videoTitle}
          />
        </div>
      </section>

      <section className="container pt-16 sm:pt-20">
        <h2 className="sr-only">{t.pageTitle}</h2>
        <ul className="space-y-9">
          {faqItems.map((item, index) => (
            <li key={'id' in item && item.id ? String(item.id) : index}>
              <h3 className="text-xl leading-tight font-semibold text-question">{item.question}</h3>
              <p className="mt-4 text-lg leading-relaxed text-ink">{item.answer}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = runwayTransTodayMessages[locale]
  const ru = runwayTransTodayMessages.ru
  const runwayPageData = await getCachedGlobal('runwayTransTodayPage', locale, 1, false)()

  return {
    title: getLocalizedText(
      locale,
      runwayPageData.meta?.title,
      ru.metadata.title,
      t.metadata.title,
    ),
    description: getLocalizedText(
      locale,
      runwayPageData.meta?.description,
      ru.metadata.description,
      t.metadata.description,
    ),
  }
}

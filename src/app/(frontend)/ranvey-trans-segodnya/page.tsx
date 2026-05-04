import type { Metadata } from 'next'

import Link from 'next/link'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import { runwayTransTodayMessages } from '@/i18n/messages'

function isYouTubeUrl(url: string) {
  return url.includes('youtube.com') || url.includes('youtu.be')
}

function toYouTubeEmbed(url: string) {
  try {
    const parsed = new URL(url)

    if (parsed.hostname.includes('youtu.be')) {
      const videoId = parsed.pathname.replace('/', '')
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url
    }

    if (parsed.hostname.includes('youtube.com')) {
      const videoId = parsed.searchParams.get('v')
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url
    }

    return url
  } catch {
    return url
  }
}

function getLocalizedText(
  locale: string,
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
  const videoTitle = getLocalizedText(
    locale,
    runwayPageData.videoTitle,
    ru.videoTitle,
    t.videoTitle,
  )

  return (
    <section className="bg-white py-12 text-[#69ad75] md:py-20">
      <div className="container">
        <nav aria-label={t.breadcrumbsAria} className="mb-12 text-sm text-zinc-400 md:mb-16">
          <Link className="hover:text-white" href="/">
            {t.homeLink}
          </Link>{' '}
          <span aria-hidden="true">›</span>{' '}
          <span className="text-zinc-200">{breadcrumbsTitle}</span>
        </nav>

        <h1 className="mb-10 text-3xl font-semibold text-[#7de7af] md:mb-14 md:text-5xl">
          {pageTitle}
        </h1>

        <div className="mb-16 overflow-hidden rounded-sm border border-[#2b7f56] bg-white md:mb-20">
          {videoFileUrl || videoUrl ? (
            videoFileUrl ? (
              <video className="aspect-video w-full" controls preload="metadata" src={videoFileUrl}>
                {t.videoUnsupported}
              </video>
            ) : isYouTubeUrl(videoUrl) ? (
              <div className="aspect-video w-full">
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src={toYouTubeEmbed(videoUrl)}
                  title={videoTitle}
                />
              </div>
            ) : (
              <video className="aspect-video w-full" controls preload="metadata" src={videoUrl}>
                {t.videoUnsupported}
              </video>
            )
          ) : (
            <div className="flex min-h-72 items-center justify-center p-8 text-center text-zinc-400 md:min-h-96">
              {t.videoPlaceholder}
            </div>
          )}
        </div>

        <ul className="space-y-6 md:space-y-4">
          {faqItems.map((item, index) => (
            <li
              className="rounded-sm bg-white p-1 md:p-1"
              key={'id' in item && item.id ? String(item.id) : index}
            >
              <h2 className="text-xl font-semibold leading-tight text-[#598758] md:text-2xl">
                {item.question}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-black md:text-lg">{item.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
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

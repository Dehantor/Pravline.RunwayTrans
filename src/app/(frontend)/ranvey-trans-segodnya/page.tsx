import type { Metadata } from 'next'

import { TodayVideo } from '@/components/TodayVideo'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import type { AppLocale } from '@/i18n/locales'
import { runwayTransTodayMessages } from '@/i18n/messages'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const companyLabels: Record<AppLocale, string> = {
  ru: 'Компания',
  en: 'Company',
  fr: 'Entreprise',
  kk: 'Компания',
  zh: '公司',
}

const legacyVideoSectionTitles: Record<AppLocale, string> = {
  ru: 'Посмотрите о нас в 2 минутах',
  en: 'Discover us in two minutes',
  fr: 'Découvrez-nous en deux minutes',
  kk: 'Біз туралы екі минутта біліңіз',
  zh: '用两分钟了解我们',
}

const presentationMessages: Record<AppLocale, { about: string; video: string; play: string }> = {
  ru: { about: 'О компании', video: 'Посмотрите видео о компании', play: 'Воспроизвести' },
  en: { about: 'About the company', video: 'Watch our company video', play: 'Play' },
  fr: {
    about: 'À propos de l’entreprise',
    video: 'Découvrez notre entreprise en vidéo',
    play: 'Lire',
  },
  kk: { about: 'Компания туралы', video: 'Компания туралы бейнені көріңіз', play: 'Ойнату' },
  zh: { about: '关于公司', video: '观看公司介绍视频', play: '播放' },
}

const defaultPosterUrl = '/media/home-arctic-freight.webp'

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
  const presentation = presentationMessages[locale]
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
  const hasDefaultRussianFaq =
    locale !== 'ru' &&
    runwayPageData.faqItems?.[0]?.question?.replaceAll('ё', 'е') ===
      ru.faqItems[0]?.question.replaceAll('ё', 'е')
  const faqItems =
    runwayPageData.faqItems && runwayPageData.faqItems.length > 0 && !hasDefaultRussianFaq
      ? runwayPageData.faqItems
      : t.faqItems
  const videoUrl = runwayPageData.videoUrl?.trim() || ''
  const videoFileUrl =
    runwayPageData.videoFile && typeof runwayPageData.videoFile === 'object'
      ? runwayPageData.videoFile.url || ''
      : ''
  const posterUrl =
    (typeof runwayPageData.videoPoster === 'object' && runwayPageData.videoPoster?.url) ||
    defaultPosterUrl
  const videoTitle = getLocalizedText(
    locale,
    runwayPageData.videoTitle,
    ru.videoTitle,
    t.videoTitle,
  )
  const embedUrl = videoFileUrl ? undefined : getVideoEmbedUrl(videoUrl)
  const directVideoUrl = embedUrl ? '' : videoFileUrl || videoUrl
  const hasVideo = Boolean(embedUrl || directVideoUrl)
  const cmsVideoSectionTitle = runwayPageData.videoSectionTitle?.trim()
  const videoSectionTitle =
    cmsVideoSectionTitle && !Object.values(legacyVideoSectionTitles).includes(cmsVideoSectionTitle)
      ? cmsVideoSectionTitle
      : presentation.video

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
          <span className="text-muted-foreground">{companyLabel}</span>
          <ChevronRight aria-hidden="true" className="size-4 text-muted-foreground" />
          <span aria-current="page">{breadcrumbsTitle}</span>
        </nav>

        <h1 className="mt-7 text-3xl font-bold sm:text-4xl">{pageTitle}</h1>

        <section className="mt-6" aria-labelledby="today-presentation">
          <h2 className="text-2xl font-bold sm:text-[1.75rem]" id="today-presentation">
            {hasVideo ? videoSectionTitle : presentation.about}
          </h2>
          <div className="relative mt-5 aspect-video overflow-hidden rounded-xl bg-muted">
            {hasVideo ? (
              <TodayVideo
                embedUrl={embedUrl}
                fileUrl={directVideoUrl}
                playLabel={`${presentation.play} — ${videoTitle}`}
                posterUrl={posterUrl}
                title={videoTitle}
                unsupportedMessage={t.videoUnsupported}
              />
            ) : (
              <Image alt="" className="object-cover" fill src={posterUrl} unoptimized />
            )}
          </div>
        </section>

        <section className="mt-8 sm:mt-10" aria-labelledby="today-questions">
          <h2 className="text-2xl font-bold sm:text-[1.75rem]" id="today-questions">
            {pageTitle}
          </h2>
          <ul className="mt-5 space-y-4">
            {faqItems.map((item, index) => (
              <li
                className="rounded-lg border border-border bg-card p-5 text-card-foreground sm:p-6"
                key={'id' in item && item.id ? String(item.id) : index}
              >
                <h3 className="text-xl leading-tight font-bold text-question dark:text-foreground">
                  {item.question}
                </h3>
                <p className="mt-2 text-base leading-relaxed sm:text-lg">{item.answer}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
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

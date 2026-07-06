import type { Metadata } from 'next/types'
import { Play } from 'lucide-react'
import React from 'react'

import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import PageClient from './page.client'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import { getPageText, pageMessages } from '@/i18n/pageMessages'

type ReviewLabel = {
  id?: string | null
  label?: string | null
}

type VideoReview = {
  id?: string | null
  companyName?: string | null
  reviewer?: string | null
  year?: number | null
  videoUrl?: string | null
  previewImage?: number | MediaType | null
}

type TextReview = {
  id?: string | null
  companyName?: string | null
  reviewer?: string | null
  year?: number | null
  documentImage?: number | MediaType | null
}

function normalizeVideoReviews(videoReviews: VideoReview[] | null | undefined) {
  if (!Array.isArray(videoReviews) || videoReviews.length === 0) return []

  return videoReviews.map((review, index) => ({
    key: review.id || `video-${index}`,
    companyName: review.companyName || '',
    reviewer: review.reviewer || '',
    year: review.year || 2023,
    videoUrl: review.videoUrl || '#',
    previewImage:
      review.previewImage && typeof review.previewImage === 'object' ? review.previewImage : null,
  }))
}

function normalizeTextReviews(textReviews: TextReview[] | null | undefined) {
  if (!Array.isArray(textReviews) || textReviews.length === 0) return []

  return textReviews
    .map((review, index) => ({
      key: review.id || `text-${index}`,
      companyName: review.companyName || '',
      reviewer: review.reviewer || '',
      year: review.year || 2023,
      documentImage:
        review.documentImage && typeof review.documentImage === 'object'
          ? review.documentImage
          : null,
    }))
    .filter((review) => Boolean(review.documentImage))
}

export default async function ReviewsPage() {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].cases
  const ru = pageMessages.ru.cases
  const reviewsPageData = await getCachedGlobal('reviewsPage', locale, 1, false)()

  const breadcrumbsTitle = getPageText(
    locale,
    reviewsPageData.breadcrumbsTitle,
    'Отзывы',
    t.breadcrumbsTitle,
  )
  const pageTitle = getPageText(
    locale,
    reviewsPageData.pageTitle,
    'Видео-отзывы наших партнёров',
    t.title,
  )
  const pageDescription = getPageText(
    locale,
    reviewsPageData.pageDescription,
    'Мы имеем более 60 видео-отзывов и более 100 благодарностей на фирменных бланках от своих клиентов.',
    t.description,
  )
  const expertName = getPageText(locale, reviewsPageData.expertName, ru.expertName, t.expertName)
  const expertRole = getPageText(locale, reviewsPageData.expertRole, ru.expertRole, t.expertRole)
  const expertReviewLabels = (reviewsPageData.expertReviewLabels || []) as ReviewLabel[]
  const videoReviews = normalizeVideoReviews(reviewsPageData.videoReviews)
  const textReviews = normalizeTextReviews(reviewsPageData.textReviews)
  const heroImage =
    reviewsPageData.heroImage && typeof reviewsPageData.heroImage === 'object'
      ? reviewsPageData.heroImage
      : null
  const documentsSectionTitle = getPageText(
    locale,
    reviewsPageData.documentsSectionTitle,
    'Отзывы на бумажных носителях',
    'Отзывы на бумажных носителях',
  )
  const documentsSectionDescription = getPageText(
    locale,
    reviewsPageData.documentsSectionDescription,
    'Мы гордимся проделанной работой и успешным сотрудничеством с нашими заказчиками.',
    'Мы гордимся проделанной работой и успешным сотрудничеством с нашими заказчиками.',
  )

  return (
    <main className="bg-white pb-24 text-ink">
      <PageClient />

      <div className="container pt-8 md:pt-11">
        <p className="mb-7 text-xs text-black/45">
          {t.homeLink} <span className="mx-2">›</span> {breadcrumbsTitle}
        </p>

        <section className="grid min-h-[410px] overflow-hidden bg-background-light md:grid-cols-[1.15fr_0.85fr] md:min-h-[530px]">
          <div className="flex flex-col justify-start px-7 py-12 md:px-16 md:py-16">
            <h1 className="max-w-[660px] text-[2.25rem] font-bold uppercase leading-[1.18] md:text-5xl lg:text-[3.35rem]">
              {pageTitle}
            </h1>
            <p className="mt-14 max-w-[590px] text-sm leading-relaxed text-black/55 md:text-base">
              {pageDescription}
            </p>
          </div>

          <div className="relative flex min-h-[360px] items-end justify-center px-6 pt-8 md:min-h-0 md:justify-start md:px-0 md:pt-7">
            {heroImage ? (
              <Media
                alt={getPageText(
                  locale,
                  reviewsPageData.heroImageAlt,
                  'Видео-отзывы партнёров Runway Trans',
                  'Видео-отзывы партнёров Runway Trans',
                )}
                fill
                imgClassName="h-full w-full object-contain object-bottom"
                pictureClassName="relative h-full w-full max-w-[520px]"
                resource={heroImage}
              />
            ) : (
              <div className="mb-[-60px] w-full max-w-[370px] rounded-[3rem] border-[10px] border-ink bg-white p-4 shadow-xl">
                <div className="rounded-[2rem] bg-background-light p-4">
                  <div className="mb-4 bg-white p-3 shadow-sm">
                    <p className="text-lg font-semibold text-brand-blue">{expertName}</p>
                    <p className="mt-1 text-xs text-black/55">{expertRole}</p>
                  </div>
                  <div className="space-y-2">
                    {expertReviewLabels.map((item, index) => (
                      <div
                        key={item.id || `review-label-${index}`}
                        className="border border-black/10 bg-white px-3 py-3 text-xs"
                      >
                        {t.reviewPrefix} {item.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      <section className="container py-12 md:py-14">
        {reviewsPageData.videoSectionTitle ? (
          <h2 className="mb-8 text-center text-2xl font-semibold">
            {reviewsPageData.videoSectionTitle}
          </h2>
        ) : null}
        <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {videoReviews.map((review) => (
            <article key={review.key}>
              <a
                className="group relative flex aspect-[3/2] w-full items-center justify-center overflow-hidden border border-black/5 bg-background-light transition hover:bg-background-muted"
                href={review.videoUrl}
                rel="noreferrer"
                target="_blank"
                aria-label={t.openVideoAria}
              >
                {review.previewImage ? (
                  <Media
                    fill
                    imgClassName="h-full w-full object-cover"
                    pictureClassName="relative h-full w-full"
                    resource={review.previewImage}
                  />
                ) : (
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-brand-green text-brand-green transition group-hover:scale-105">
                    <Play aria-hidden className="ml-1 h-7 w-7 fill-current" />
                  </span>
                )}
              </a>
              <div className="mt-4 flex items-start justify-between gap-4 text-sm">
                <h3 className="font-semibold">{review.companyName}</h3>
                <span className="shrink-0 text-black/25">{review.year}</span>
              </div>
              <p className="mt-3 max-w-[92%] whitespace-pre-line text-sm leading-snug text-black/80">
                {review.reviewer}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="container pt-4">
        <div className="mb-8">
          <h2 className="text-center text-xl font-semibold md:text-2xl">{documentsSectionTitle}</h2>
          <p className="mt-5 text-sm text-black/70">{documentsSectionDescription}</p>
        </div>

        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {textReviews.map((review) => (
            <article key={review.key}>
              <div className="relative aspect-square w-full overflow-hidden bg-background-light">
                <Media
                  fill
                  imgClassName="h-full w-full object-cover"
                  pictureClassName="relative h-full w-full"
                  resource={review.documentImage}
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4 text-sm">
                <h3 className="font-semibold">{review.companyName}</h3>
                <span className="shrink-0 text-black/25">{review.year}</span>
              </div>
              <p className="mt-3 max-w-[92%] whitespace-pre-line text-sm leading-snug text-black/80">
                {review.reviewer}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].cases
  const reviewsPageData = await getCachedGlobal('reviewsPage', locale, 1, false)()

  return {
    title: getPageText(
      locale,
      reviewsPageData.meta?.title,
      'Отзывы | RunwayTrans',
      t.metadata.title,
    ),
    description: getPageText(
      locale,
      reviewsPageData.meta?.description,
      'Видео-отзывы и письма благодарности от клиентов RunwayTrans.',
      t.metadata.description || '',
    ),
  }
}

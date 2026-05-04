import type { Metadata } from 'next/types'
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
  year?: number | null
  videoUrl?: string | null
  previewImage?: number | MediaType | null
}

type TextReview = {
  id?: string | null
  year?: number | null
  documentImage?: number | MediaType | null
}

function normalizeVideoReviews(videoReviews: VideoReview[] | null | undefined) {
  if (!Array.isArray(videoReviews) || videoReviews.length === 0) return []

  return videoReviews.map((review, index) => ({
    key: review.id || `video-${index}`,
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

  return (
    <main className="bg-black pb-24 text-white">
      <PageClient />

      <section className="bg-[#ececec] text-black">
        <div className="container grid gap-10 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <p className="mb-6 text-sm text-black/60">
              {t.homeLink} / {breadcrumbsTitle}
            </p>
            <h1 className="text-4xl font-semibold uppercase leading-tight md:text-6xl">
              {pageTitle}
            </h1>
            <p className="mt-8 max-w-xl text-base text-black/60 md:text-lg">{pageDescription}</p>
          </div>

          <div className="mx-auto w-full max-w-[420px] rounded-[2rem] border border-black/15 bg-white p-4 shadow-xl">
            <div className="rounded-[1.6rem] border border-black/10 bg-[#f4f4f4] p-4">
              <div className="mb-4 rounded-xl bg-white p-3 shadow-sm">
                <p className="text-lg font-semibold">{expertName}</p>
                <p className="text-sm text-black/60">{expertRole}</p>
              </div>
              <div className="space-y-2">
                {expertReviewLabels.map((item, index) => (
                  <div
                    key={item.id || `review-label-${index}`}
                    className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm"
                  >
                    {t.reviewPrefix} {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-14 md:py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videoReviews.map((review) => (
            <article key={review.key} className="space-y-3">
              <a
                className="group flex aspect-video w-full items-center justify-center overflow-hidden rounded-sm bg-[#e7e7e7] transition hover:bg-[#dcdcdc]"
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
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#5f9c61] text-2xl text-[#5f9c61] transition group-hover:scale-105">
                    ▶
                  </span>
                )}
              </a>
              <p className="text-right text-2xl font-black tracking-wide text-white/85">
                {review.year}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="container pt-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {textReviews.map((review) => (
            <article key={review.key} className="space-y-3">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-gradient-to-b from-[#dedede] to-[#f2f2f2] p-6">
                <div className="relative mx-auto h-full max-w-[280px] overflow-hidden rounded-sm border border-black/20 bg-white shadow-[0_12px_25px_rgba(0,0,0,.22)]">
                  {review.documentImage ? (
                    <Media
                      fill
                      imgClassName="h-full w-full object-cover"
                      pictureClassName="relative h-full w-full"
                      resource={review.documentImage}
                    />
                  ) : null}
                </div>
              </div>
              <p className="text-right text-2xl font-black tracking-wide text-white/85">
                {review.year}
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

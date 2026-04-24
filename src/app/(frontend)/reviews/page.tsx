import type { Metadata } from 'next/types'
import React from 'react'

import Link from 'next/link'
import { getCachedGlobal } from '@/utilities/getGlobals'

import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function ReviewsPage() {
  const reviewsPageData = await getCachedGlobal('reviewsPage', 1)()

  const breadcrumbsTitle = reviewsPageData.breadcrumbsTitle || 'Отзывы'
  const pageTitle = reviewsPageData.pageTitle || 'Видео-отзывы наших партнёров'
  const pageDescription =
    reviewsPageData.pageDescription ||
    'Мы имеем более 60 видео-отзывов и более 100 благодарностей на фирменных бланках от своих клиентов.'
  const expertName = reviewsPageData.expertName || 'Виктория Кондакова'
  const expertTitle = reviewsPageData.expertTitle || 'Эксперт по эксплуатации отелей в РФ'
  const expertReviews = reviewsPageData.expertReviews || []
  const videoReviews = reviewsPageData.videoReviews || []
  const textReviews = reviewsPageData.textReviews || []

  return (
    <main className="bg-black pb-24 text-white">
      <PageClient />

      <section className="bg-[#ececec] text-black">
        <div className="container grid gap-10 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <p className="mb-6 text-sm text-black/60">
              <Link className="hover:underline" href="/">
                Главная
              </Link>{' '}
              / {breadcrumbsTitle}
            </p>
            <h1 className="text-4xl font-semibold uppercase leading-tight md:text-6xl">{pageTitle}</h1>
            <p className="mt-8 max-w-xl text-base text-black/60 md:text-lg">{pageDescription}</p>
          </div>

          <div className="mx-auto w-full max-w-[420px] rounded-[2rem] border border-black/15 bg-white p-4 shadow-xl">
            <div className="rounded-[1.6rem] border border-black/10 bg-[#f4f4f4] p-4">
              <div className="mb-4 rounded-xl bg-white p-3 shadow-sm">
                <p className="text-lg font-semibold">{expertName}</p>
                <p className="text-sm text-black/60">{expertTitle}</p>
              </div>
              <div className="space-y-2">
                {expertReviews.map((item) => (
                  <div
                    className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm"
                    key={item.id || item.title}
                  >
                    Отзыв: {item.title}
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
            <article className="space-y-3" key={review.id || `${review.year}-${review.title || 'video'}`}>
              <a
                className="group flex aspect-video w-full items-center justify-center rounded-sm bg-[#e7e7e7] transition hover:bg-[#dcdcdc]"
                href={review.videoUrl || '#'}
                rel={review.videoUrl ? 'noreferrer' : undefined}
                target={review.videoUrl ? '_blank' : undefined}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#5f9c61] text-2xl text-[#5f9c61] transition group-hover:scale-105">
                  ▶
                </span>
              </a>
              <p className="text-right text-2xl font-black tracking-wide text-white/85">{review.year}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container pt-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {textReviews.map((review) => {
            const documentUrl =
              review.document && typeof review.document === 'object' ? review.document.url || '' : ''

            return (
              <article className="space-y-3" key={review.id || `${review.year}-${review.title || 'text'}`}>
                <div className="aspect-[4/5] w-full rounded-sm bg-gradient-to-b from-[#dedede] to-[#f2f2f2] p-6">
                  <div className="mx-auto flex h-full max-w-[280px] flex-col items-center justify-center gap-3 rounded-sm border border-black/20 bg-white p-4 text-center text-sm text-black/70 shadow-[0_12px_25px_rgba(0,0,0,.22)]">
                    <p>{review.title || 'Текстовый отзыв'}</p>
                    {documentUrl ? (
                      <a
                        className="text-xs text-[#5f9c61] underline underline-offset-2"
                        href={documentUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Открыть документ
                      </a>
                    ) : null}
                  </div>
                </div>
                <p className="text-right text-2xl font-black tracking-wide text-white/85">{review.year}</p>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const reviewsPageData = await getCachedGlobal('reviewsPage', 1)()

  return {
    title: reviewsPageData.meta?.title || 'Отзывы | RunwayTrans',
    description:
      reviewsPageData.meta?.description || 'Видео-отзывы и письма благодарности от клиентов RunwayTrans.',
  }
}

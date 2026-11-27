import type { Metadata } from 'next/types'
import { Play } from 'lucide-react'
import Link from 'next/link'

import { Media } from '@/components/Media'
import { SectionUnderConstruction } from '@/components/SectionUnderConstruction'
import { getConcreteVideoLink } from '@/Reviews/videoLink'
import type { Media as MediaType } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

import PageClient from './page.client'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import { getPageText, pageMessages } from '@/i18n/pageMessages'

const demoDescriptions = new Set(
  [
    'Мы имеем более 60 видео-отзывов и более 100 благодарностей на фирменных бланках от своих клиентов.',
    'Our clients have shared more than 60 video testimonials and over 100 letters of appreciation on company letterhead.',
    'Клиенттеріміз 60-тан астам бейнепікір және фирмалық бланкіде 100-ден астам алғыс хат жолдады.',
    'Nos clients nous ont adressé plus de 60 témoignages vidéo et plus de 100 lettres de remerciement sur papier à en-tête.',
    '客户提供了 60 多条视频评价和 100 多封以公司信笺书写的感谢信。',
  ].map(normalizeText),
)
const demoReviewers = new Set([
  'управляющий проекта: сечин семён валерьевич',
  'владелец компании: иванов дмитрий владимирович',
  'мэр г. москва: лужков сергей иванович',
])
const demoExpertNames = new Set(['—', 'виктория кондакова', 'victoria kondakova'])
const demoExpertRoles = new Set([
  '—',
  'эксперт по эксплуатации отелей в рф',
  'hotel operations expert in russia',
  'ресейдегі қонақүйлерді пайдалану жөніндегі сарапшы',
  'experte en exploitation hôtelière en russie',
  '俄罗斯酒店运营专家',
])
const demoReviewLabels = new Set(['family place', 'glamping moon', 'отель атмосфера'])

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

function normalizeText(value: string | null | undefined) {
  return value?.trim().replace(/\s+/g, ' ').toLowerCase() ?? ''
}

function imageResource(media: number | MediaType | null | undefined) {
  return typeof media === 'object' && media?.url && media.mimeType?.startsWith('image/')
    ? media
    : null
}

function normalizeReviewDetails(review: VideoReview | TextReview, key: string) {
  const reviewer = review.reviewer?.trim()
  const year = review.year
  return {
    key: review.id || key,
    companyName: review.companyName?.trim(),
    reviewer,
    year: year && Number.isInteger(year) && year > 0 ? year : null,
  }
}

function normalizeVideoReviews(videoReviews: VideoReview[] | null | undefined) {
  return (videoReviews ?? []).flatMap((review, index) => {
    const videoUrl = getConcreteVideoLink(review.videoUrl)
    if (!videoUrl || demoReviewers.has(normalizeText(review.reviewer))) return []

    return [
      {
        ...normalizeReviewDetails(review, `video-${index}`),
        videoUrl,
        previewImage: imageResource(review.previewImage),
      },
    ]
  })
}

function normalizeTextReviews(textReviews: TextReview[] | null | undefined) {
  return (textReviews ?? []).flatMap((review, index) => {
    const documentImage = imageResource(review.documentImage)
    if (!documentImage || demoReviewers.has(normalizeText(review.reviewer))) return []

    return [{ ...normalizeReviewDetails(review, `text-${index}`), documentImage }]
  })
}

function ReviewDetails({ review }: { review: ReturnType<typeof normalizeReviewDetails> }) {
  return (
    <>
      {(review.companyName || review.year) && (
        <div className="mt-4 flex flex-wrap items-start justify-between gap-2 text-sm">
          {review.companyName && (
            <h3 className="font-semibold wrap-anywhere">{review.companyName}</h3>
          )}
          {review.year && <span className="text-muted-foreground">{review.year}</span>}
        </div>
      )}
      {review.reviewer && (
        <p className="mt-3 text-sm leading-snug whitespace-pre-line wrap-anywhere text-muted-foreground">
          {review.reviewer}
        </p>
      )}
    </>
  )
}

export default async function ReviewsPage() {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].reviews
  const ru = pageMessages.ru.reviews
  const reviewsPageData = await getCachedGlobal('reviewsPage', locale, 1)()

  const breadcrumbsTitle = getPageText(
    locale,
    reviewsPageData.breadcrumbsTitle,
    ru.breadcrumbsTitle,
    t.breadcrumbsTitle,
  )
  const pageTitle =
    normalizeText(reviewsPageData.pageTitle) === normalizeText('Видео-отзывы наших партнёров')
      ? t.title
      : getPageText(locale, reviewsPageData.pageTitle, ru.title, t.title)
  const pageDescription = getPageText(
    locale,
    demoDescriptions.has(normalizeText(reviewsPageData.pageDescription))
      ? null
      : reviewsPageData.pageDescription,
    ru.description,
    t.description,
  )
  const expertName = reviewsPageData.expertName?.trim()
  const expertRole = demoExpertRoles.has(normalizeText(reviewsPageData.expertRole))
    ? null
    : reviewsPageData.expertRole?.trim()
  const expertReviewLabels = (reviewsPageData.expertReviewLabels ?? []).filter(
    ({ label }) => label?.trim() && !demoReviewLabels.has(normalizeText(label)),
  )
  const hasExpert = expertName && !demoExpertNames.has(normalizeText(expertName))
  const videoReviews = normalizeVideoReviews(reviewsPageData.videoReviews)
  const textReviews = normalizeTextReviews(reviewsPageData.textReviews)
  const heroImage = imageResource(reviewsPageData.heroImage)
  const documentsSectionTitle = getPageText(
    locale,
    reviewsPageData.documentsSectionTitle,
    ru.documentsSectionTitle,
    t.documentsSectionTitle,
  )
  const documentsSectionDescription = getPageText(
    locale,
    reviewsPageData.documentsSectionDescription,
    ru.documentsSectionDescription,
    t.documentsSectionDescription,
  )

  return (
    <main className="bg-background pb-24 text-foreground">
      <PageClient />

      <div className="container pt-8 md:pt-11">
        <p className="mb-7 text-sm text-muted-foreground">
          <Link
            className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
            href={`/${locale}`}
          >
            {t.homeLink}
          </Link>{' '}
          <span aria-hidden="true" className="mx-2">
            ›
          </span>{' '}
          {breadcrumbsTitle}
        </p>

        <section
          className={
            heroImage || hasExpert
              ? 'grid overflow-hidden rounded-xl bg-card text-card-foreground md:min-h-[530px] md:grid-cols-[1.15fr_0.85fr]'
              : 'rounded-xl bg-card text-card-foreground'
          }
        >
          <div className="flex flex-col justify-start px-7 py-12 md:px-16 md:py-16">
            <h1 className="max-w-[660px] text-[2.25rem] font-bold uppercase leading-[1.18] wrap-anywhere md:text-5xl lg:text-[3.35rem]">
              {pageTitle}
            </h1>
            <p className="mt-6 max-w-[590px] text-sm leading-relaxed text-muted-foreground md:text-base">
              {pageDescription}
            </p>
          </div>

          {(heroImage || hasExpert) && (
            <div className="relative flex min-h-[280px] min-w-0 items-end justify-center px-6 pt-8 md:justify-start md:px-0 md:pt-7">
              {heroImage ? (
                <Media
                  alt={getPageText(
                    locale,
                    reviewsPageData.heroImageAlt,
                    ru.heroImageAlt,
                    t.heroImageAlt,
                  )}
                  fill
                  imgClassName="h-full w-full object-contain object-bottom"
                  pictureClassName="relative h-full w-full max-w-[520px]"
                  resource={heroImage}
                />
              ) : (
                <div className="mb-6 w-full max-w-[370px] rounded-2xl border border-border bg-background p-4 shadow-sm">
                  <div className="rounded-xl bg-card p-4">
                    <div className="rounded bg-background p-3">
                      <p className="text-lg font-semibold wrap-anywhere">{expertName}</p>
                      {expertRole && (
                        <p className="mt-1 text-xs wrap-anywhere text-muted-foreground">
                          {expertRole}
                        </p>
                      )}
                    </div>
                    {expertReviewLabels.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {expertReviewLabels.map((item, index) => (
                          <div
                            key={item.id || `review-label-${index}`}
                            className="border border-border bg-background px-3 py-3 text-xs wrap-anywhere"
                          >
                            {t.reviewPrefix} {item.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      {videoReviews.length > 0 && (
        <section className="container pt-12 md:pt-14">
          {reviewsPageData.videoSectionTitle ? (
            <h2 className="mb-8 text-center text-2xl font-semibold">
              {reviewsPageData.videoSectionTitle}
            </h2>
          ) : null}
          <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {videoReviews.map((review) => (
              <article key={review.key}>
                <a
                  className="group relative flex aspect-[3/2] w-full items-center justify-center overflow-hidden border border-border bg-card transition hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4"
                  href={review.videoUrl}
                  rel="noreferrer"
                  target="_blank"
                  aria-label={
                    review.companyName
                      ? `${t.openVideoAria} — ${review.companyName}`
                      : t.openVideoAria
                  }
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
                <ReviewDetails review={review} />
              </article>
            ))}
          </div>
        </section>
      )}

      {textReviews.length > 0 && (
        <section className="container pt-12 md:pt-14">
          <div className="mb-8">
            <h2 className="text-center text-xl font-semibold md:text-2xl">
              {documentsSectionTitle}
            </h2>
            <p className="mt-5 text-sm text-muted-foreground">{documentsSectionDescription}</p>
          </div>

          <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {textReviews.map((review) => (
              <article key={review.key}>
                <div className="relative aspect-square w-full overflow-hidden bg-card">
                  <Media
                    fill
                    imgClassName="h-full w-full object-contain"
                    pictureClassName="relative h-full w-full"
                    resource={review.documentImage}
                  />
                </div>
                <ReviewDetails review={review} />
              </article>
            ))}
          </div>
        </section>
      )}

      {videoReviews.length === 0 && textReviews.length === 0 && (
        <SectionUnderConstruction locale={locale} />
      )}
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].reviews
  const ru = pageMessages.ru.reviews
  const reviewsPageData = await getCachedGlobal('reviewsPage', locale, 1, false)()

  return {
    title: getPageText(locale, reviewsPageData.meta?.title, ru.metadata.title, t.metadata.title),
    description: getPageText(
      locale,
      reviewsPageData.meta?.description,
      ru.metadata.description,
      t.metadata.description,
    ),
  }
}

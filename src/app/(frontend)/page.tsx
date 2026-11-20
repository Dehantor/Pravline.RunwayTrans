import {
  Award,
  Box,
  Cog,
  Container,
  Factory,
  FileCheck2,
  Forklift,
  Mountain,
  Snowflake,
  TriangleAlert,
  Truck,
  UsersRound,
} from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { HomeBanner } from '@/components/HomeBanner'
import {
  bannerControls,
  homeBannerContent,
  homeBannerImages,
} from '@/components/HomeBanner/content'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import { defaultLocale } from '@/i18n/locales'
import { homeMessages } from '@/i18n/messages'

import styles from './home.module.css'

const serviceImages = [
  '/media/home-service-vityaz.webp',
  '/media/home-service-winter-road.webp',
  '/media/home-service-all-terrain.webp',
  '/media/home-service-crane.webp',
]

const cargoIcons = [Container, Forklift, Cog, TriangleAlert, Factory, UsersRound]
const advantageIcons = [Truck, Box, Mountain, Snowflake, FileCheck2, Award]

export default async function HomePage() {
  const locale = await getRequestLocale()
  const t = homeMessages[locale] ?? homeMessages[defaultLocale]

  if (!t) {
    return null
  }

  return (
    <main className="bg-background text-foreground">
      <HomeBanner
        content={homeBannerContent[locale]}
        controls={bannerControls[locale]}
        images={homeBannerImages}
        locale={locale}
      />
      <section aria-labelledby="home-transport-title" className={styles.section}>
        <div className="container">
          <div className={styles.transportIntro}>
            <h2 className={styles.sectionTitle} id="home-transport-title">
              {t.transportCapabilitiesTitle}
            </h2>
            <p className={styles.sectionDescription}>{t.transportCapabilitiesDescription}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {t.coreServices.map((item, index) => {
              const image = serviceImages[index]

              return (
                <article className={styles.serviceCard} key={item.label}>
                  {image ? (
                    <div className={styles.serviceImage}>
                      <Image
                        alt=""
                        className="h-full w-full object-cover"
                        height={128}
                        src={image}
                        unoptimized
                        width={183}
                      />
                    </div>
                  ) : null}
                  <div className={styles.serviceBody}>
                    <h3 className={styles.cardTitle}>{item.label}</h3>
                    <p className={styles.cardDescription}>{item.description}</p>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-7 text-center sm:mt-8">
            <Link className={styles.action} href="/contacts">
              {t.ctaRequest}
              <span aria-hidden>›</span>
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="home-cargo-title" className={`${styles.section} ${styles.cargo}`}>
        <div className="container">
          <h2 className={styles.sectionTitle} id="home-cargo-title">
            {t.cargoTitle}
          </h2>
          <p className={styles.sectionDescription}>{t.cargoDescription}</p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.capabilities.map((item, index) => {
              const Icon = cargoIcons[index] ?? Box

              return (
                <article className={`${styles.iconCard} items-center`} key={item}>
                  <Icon aria-hidden="true" className={styles.cardIcon} strokeWidth={1.65} />
                  <h3 className={styles.cardTitle}>{item}</h3>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="home-advantages-title" className={styles.section}>
        <div className="container">
          <h2 className={styles.sectionTitle} id="home-advantages-title">
            {t.advantagesTitle}
          </h2>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.advantages.map((item, index) => {
              const Icon = advantageIcons[index] ?? Award

              return (
                <article className={`${styles.iconCard} items-start`} key={item.label}>
                  <Icon aria-hidden="true" className={styles.cardIcon} strokeWidth={1.65} />
                  <div>
                    <h3 className={styles.cardTitle}>{item.label}</h3>
                    <p className={styles.cardDescription}>{item.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="container pb-16">
        <div className="flex h-[340px] items-center justify-center rounded-xl border border-border bg-muted">
          <button
            aria-label={t.playVideoAria}
            className="h-16 w-16 rounded-full border-4 border-brand-green text-brand-green transition hover:scale-105"
            type="button"
          >
            ▶
          </button>
        </div>
      </section>

      <section className="container pb-16">
        <div className="h-[310px] rounded-xl border border-border bg-[linear-gradient(160deg,var(--background),var(--muted))]" />
        <div className="mt-4 text-center">
          <Link className={styles.action} href="/contacts">
            {t.mapButton}
          </Link>
        </div>
      </section>

      <section className="bg-brand-green-hover py-7">
        <div className="container grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-5 text-on-dark">
          {t.metrics.map((item) => (
            <div key={item.label}>
              <p className="text-3xl">{item.value}</p>
              <p className="mt-2 text-xs uppercase tracking-wide">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.cargo} py-10 sm:py-16`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>{t.workWithUsTitle}</h2>

          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
            <div className="flex h-full flex-col justify-between">
              <Image
                src="/media/image-2.png"
                alt={t.imageAlt}
                className="mt-8 h-auto w-full max-w-[620px] object-contain"
                height={530}
                unoptimized
                width={604}
              />

              <label className="mt-10 flex items-center gap-2 text-[16px]">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-brand-green" />
                <span>
                  {t.personalDataAgreementPrefix}{' '}
                  <Link href={`/${locale}/privacy`} className="underline underline-offset-3">
                    {t.personalDataPolicy}
                  </Link>
                </span>
              </label>
            </div>

            <div>
              <ul className="mb-12 list-disc space-y-3 pl-5 text-[16px] leading-snug marker:text-brand-green">
                {t.consultationPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <form className="space-y-4">
                <div className="grid items-center gap-4 sm:grid-cols-[90px_1fr]">
                  <label htmlFor="home-consultation-name">{t.form.name}</label>
                  <input className={styles.field} id="home-consultation-name" />
                </div>

                <div className="grid items-center gap-4 sm:grid-cols-[90px_1fr]">
                  <label htmlFor="home-consultation-phone">{t.form.phone}</label>
                  <input className={styles.field} id="home-consultation-phone" />
                </div>

                <div className="grid items-center gap-4 sm:grid-cols-[90px_1fr]">
                  <label htmlFor="home-consultation-email">{t.form.email}</label>
                  <input className={styles.field} id="home-consultation-email" />
                </div>

                <div className="grid items-start gap-4 sm:grid-cols-[90px_1fr]">
                  <label className="sm:pt-2" htmlFor="home-consultation-message">
                    {t.form.message}
                  </label>
                  <textarea
                    className={`${styles.field} resize-y`}
                    id="home-consultation-message"
                    rows={3}
                  />
                </div>

                <div className="sm:ml-[106px]">
                  <button className={`${styles.action} w-full`} type="submit">
                    {t.form.submit}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = homeMessages[locale] ?? homeMessages[defaultLocale]

  if (!t) {
    return {}
  }

  return {
    title: t.metadata.title,
    description: t.metadata.description,
  }
}

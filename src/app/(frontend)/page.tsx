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

import { geographyFilterMessages, kazakhGeographyPageLabels } from '@/Geography/filterMessages'
import { getGeographyDeliveries } from '@/Geography/getGeographyDeliveries'
import { CompanyLife } from '@/components/CompanyLife'
import { GeographyOverview } from '@/components/GeographyMap/Overview'
import { hasRouteGeometry } from '@/components/GeographyMap/routes'
import { HomeBanner } from '@/components/HomeBanner'
import { HomeConsultationForm } from '@/components/HomeConsultationForm'
import {
  bannerControls,
  homeBannerContent,
  homeBannerImages,
} from '@/components/HomeBanner/content'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import { consultationMessages } from '@/i18n/consultationMessages'
import { defaultLocale } from '@/i18n/locales'
import { homeMessages } from '@/i18n/messages'
import { pageMessages } from '@/i18n/pageMessages'
import { getConsultationPolicyHref } from '@/consultation/policy'

import styles from './home.module.css'

const serviceImages = [
  '/media/home-transport-vityaz.jpg',
  '/media/home-transport-winter-road.jpg',
  '/media/home-transport-all-terrain.jpg',
  '/media/home-transport-crane.jpg',
]

const cargoIcons = [Container, Forklift, Cog, TriangleAlert, Factory, UsersRound]
const advantageIcons = [Truck, Box, Mountain, Snowflake, FileCheck2, Award]

export default async function HomePage() {
  const locale = await getRequestLocale()
  const t = homeMessages[locale] ?? homeMessages[defaultLocale]

  if (!t) {
    return null
  }

  const deliveries = await getGeographyDeliveries(locale)
  const overviewRoutes = deliveries
    .filter(({ points }) => hasRouteGeometry(points))
    .map(({ id, title, color, points }) => ({ id, title, color, points }))
  const geographyLabels =
    locale === 'kk' ? kazakhGeographyPageLabels : pageMessages[locale].geography
  const { title: geographyTitle, intro, cta, ...overviewMessages } = t.geography
  const consultation = consultationMessages[locale]

  return (
    <main className="bg-background text-foreground">
      <HomeBanner
        content={homeBannerContent[locale]}
        controls={bannerControls[locale]}
        images={homeBannerImages}
        locale={locale}
      />
      <section aria-labelledby="home-transport-title" className={styles.section}>
        <div className={styles.sectionFrame}>
          <div className={styles.sectionIntro}>
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
                        height={198}
                        src={image}
                        unoptimized
                        width={264}
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
            <Link className={`${styles.action} ${styles.transportAction}`} href="/contacts">
              {t.ctaRequest}
              <svg aria-hidden="true" className={styles.actionArrow} fill="none" viewBox="0 0 7 12">
                <path
                  d="M1 1L6 6L1 11"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="home-cargo-title" className={`${styles.section} ${styles.cargo}`}>
        <div className={styles.sectionFrame}>
          <div className={styles.sectionIntro}>
            <h2 className={styles.sectionTitle} id="home-cargo-title">
              {t.cargoTitle}
            </h2>
            <p className={styles.sectionDescription}>{t.cargoDescription}</p>
          </div>

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
        <div className={styles.sectionFrame}>
          <h2 className={styles.centeredTitle} id="home-advantages-title">
            {t.advantagesTitle}
          </h2>

          <div className={styles.advantages}>
            {t.advantages.map((item, index) => {
              const Icon = advantageIcons[index] ?? Award

              return (
                <article className={styles.advantage} key={item.label}>
                  <div className={styles.advantageCircle}>
                    <Icon aria-hidden="true" strokeWidth={1.65} />
                  </div>
                  <h3>{item.label}</h3>
                  <p>{item.description}</p>
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

      <section aria-labelledby="home-geography-title" className={styles.geography}>
        <div className={styles.sectionFrame}>
          <h2 className={styles.geographyTitle} id="home-geography-title">
            {geographyTitle}
          </h2>
          <p className={styles.geographyIntro}>{intro}</p>
          <div className={styles.geographyMap}>
            <GeographyOverview
              label={geographyFilterMessages[locale].mapBadge}
              messages={overviewMessages}
              routes={overviewRoutes}
              zoomInLabel={geographyLabels.zoomIn}
              zoomOutLabel={geographyLabels.zoomOut}
            />
          </div>
          <div className={styles.geographyAction}>
            <Link
              className={styles.action}
              href={`/${locale}/geografiya?view=routes#geography-filters`}
            >
              {cta}
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="home-company-overview-title">
        <div className={styles.sectionFrame}>
          <h2 className={styles.companyTitle} id="home-company-overview-title">
            {t.company.title}
          </h2>
          <p className={styles.companyIntro}>{t.company.intro}</p>
        </div>
        <div className={styles.metricBand}>
          <dl className={styles.metrics}>
            {t.company.metrics.map(({ label, value }) => (
              <div className={styles.metric} key={label}>
                <dt className={styles.metricLabel}>{label}</dt>
                <dd className={styles.metricValue}>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CompanyLife messages={t.company.life} />

      <section aria-labelledby="home-consultation-title" className={styles.consultation}>
        <div className={styles.sectionFrame}>
          <h2 className={styles.centeredTitle} id="home-consultation-title">
            {consultation.title}
          </h2>
          <HomeConsultationForm
            contactsHref={`/${locale}/contacts`}
            illustration={
              <Image
                alt={consultation.imageAlt}
                height={490}
                loading="lazy"
                src="/media/home-consultation-vityaz.webp"
                unoptimized
                width={1142}
              />
            }
            messages={consultation}
            policyHref={getConsultationPolicyHref()}
          />
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

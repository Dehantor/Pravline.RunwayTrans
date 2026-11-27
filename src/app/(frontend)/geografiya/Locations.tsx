import { ChevronRight, Factory, Fuel, MapPin, Wrench } from 'lucide-react'
import Link from 'next/link'

import { kazakhGeographyPageLabels } from '@/Geography/filterMessages'
import { getGeographyMapPoints } from '@/Geography/getGeographyMapPoints'
import { geographyLocationMessages } from '@/Geography/locationMessages'
import { GeographyLocationClient } from '@/components/GeographyMap/LocationClient'
import type { AppLocale } from '@/i18n/locales'
import { pageMessages } from '@/i18n/pageMessages'

import styles from './locations.module.css'

const locationIcons = [MapPin, Factory, Wrench] as const

export async function GeographyLocations({ locale }: { locale: AppLocale }) {
  const labels = locale === 'kk' ? kazakhGeographyPageLabels : pageMessages[locale].geography
  const t = geographyLocationMessages[locale]
  const points = await getGeographyMapPoints(locale)

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav aria-label={labels.breadcrumbsAria} className={styles.breadcrumbs}>
          <Link href={`/${locale}`}>{labels.homeLink}</Link>
          <ChevronRight aria-hidden="true" />
          <span aria-current="page">{labels.title}</span>
        </nav>
        <h1 className="sr-only">{labels.title}</h1>

        <p className={styles.introduction}>{t.introduction}</p>
        <ul className={styles.list}>
          {t.locations.map((location, index) => {
            const Icon = locationIcons[index]

            return (
              <li key={location}>
                <span
                  aria-hidden="true"
                  className={`${styles.locationIcon} ${index === 0 ? styles.officeIcon : styles.baseIcon}`}
                >
                  <Icon />
                </span>
                <span>{location}</span>
              </li>
            )
          })}
        </ul>

        <p className={styles.operations}>{t.operations}</p>
        <ul className={styles.list}>
          {t.regions.map((region) => (
            <li key={region}>
              <span aria-hidden="true" className={styles.regionIcon}>
                <Fuel />
              </span>
              <span>{region}</span>
            </li>
          ))}
        </ul>

        <div className={styles.map}>
          <ul aria-label={t.map.label} className="sr-only">
            {points.map(({ id, title, description }) => (
              <li key={id}>
                {title}
                {description ? `. ${description}` : null}
              </li>
            ))}
          </ul>
          <GeographyLocationClient
            messages={t.map}
            points={points}
            zoomInLabel={labels.zoomIn}
            zoomOutLabel={labels.zoomOut}
          />
        </div>

        <p className={styles.conclusion}>{t.conclusion}</p>
        <div className={styles.actions}>
          <Link className={styles.action} href={`/${locale}/contacts`}>
            {t.cta}
          </Link>
        </div>
      </div>
    </main>
  )
}

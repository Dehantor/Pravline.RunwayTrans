import type { Metadata } from 'next'

import {
  geographyFilterMessages,
  kazakhGeographyDirections,
  kazakhGeographyFilterLabels,
  kazakhGeographyPageLabels,
} from '@/Geography/filterMessages'
import { getGeographyDeliveries } from '@/Geography/getGeographyDeliveries'
import { GeographyArchiveFilters } from '@/components/GeographyMap/ArchiveFilters'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import type { AppLocale } from '@/i18n/locales'
import { pageMessages } from '@/i18n/pageMessages'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { GeographyLocations } from './Locations'

const directions = [
  ['Coat of Arms of Chukotka.svg', 'chukotka'],
  ['Coat of arms of Sakha.svg', 'sakha'],
  ['Coat of arms of Nenets Autonomous Okrug.svg', 'nenets'],
  ['Coat of Arms of Kamchatka Krai.svg', 'kamchatka'],
  ['Coat of arms of Krasnoyarsk Krai.svg', 'krasnoyarsk'],
  ['Coat of Arms of Magadan oblast.svg', 'magadan'],
  ['Coat of Arms of Yamal Nenetsia.svg', 'yamal'],
] as const

function getCommonsFileUrl(fileName: string) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}`
}

async function GeographyRoutesArchive({ locale }: { locale: AppLocale }) {
  const t = pageMessages[locale].geography
  const pageLabels = locale === 'kk' ? kazakhGeographyPageLabels : t
  const deliveries = await getGeographyDeliveries(locale)
  const directionLabels = locale === 'kk' ? kazakhGeographyDirections : t.directions
  const filterLabels =
    locale === 'kk'
      ? kazakhGeographyFilterLabels
      : {
          periodLabel: t.periodLabel,
          vehicleAllTerrain: t.vehicleAllTerrain,
          vehicleCars: t.vehicleCars,
          cargoType: t.cargoType,
          region: t.region,
        }

  return (
    <main className="bg-background pt-5 pb-6 text-foreground md:pt-6">
      <div className="mx-auto w-full max-w-[1344px] space-y-5 px-4 md:space-y-6 md:px-8">
        <nav aria-label={pageLabels.breadcrumbsAria} className="flex items-center gap-3 text-sm">
          <Link
            className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            href={`/${locale}`}
          >
            {pageLabels.homeLink}
          </Link>
          <ChevronRight aria-hidden="true" className="size-4 text-muted-foreground" />
          <span aria-current="page">{pageLabels.title}</span>
        </nav>

        <header className="space-y-1">
          <h1 className="text-4xl leading-tight font-bold md:text-[40px]">{pageLabels.title}</h1>
          <p className="max-w-[62rem] text-[17px] leading-snug text-muted-foreground md:text-lg">
            {pageLabels.intro}
          </p>
        </header>

        <section aria-labelledby="geography-directions" className="space-y-4 md:space-y-5">
          <h2
            className="text-center text-2xl leading-tight font-bold md:text-[26px]"
            id="geography-directions"
          >
            {pageLabels.directionsTitle}
          </h2>

          <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-12">
            {directions.map(([fileName, key], index) => (
              <li
                className={`flex min-h-[94px] min-w-0 items-center gap-3.5 rounded-[10px] border border-border bg-on-dark px-3.5 py-2.5 text-card-foreground dark:bg-card ${
                  index < 4 ? 'lg:col-span-3' : 'lg:col-span-4'
                }`}
                key={key}
              >
                <img
                  alt=""
                  className="size-[62px] shrink-0 object-contain md:size-16"
                  height={64}
                  loading="lazy"
                  src={getCommonsFileUrl(fileName)}
                  width={64}
                />
                <span className="min-w-0 leading-tight wrap-anywhere">{directionLabels[key]}</span>
              </li>
            ))}
          </ul>
        </section>

        <GeographyArchiveFilters
          deliveries={deliveries}
          mapLabel={pageLabels.mapAria}
          messages={{ ...filterLabels, ...geographyFilterMessages[locale] }}
          regions={directions.map(([, key]) => ({ value: key, label: directionLabels[key] }))}
          zoomInLabel={pageLabels.zoomIn}
          zoomOutLabel={pageLabels.zoomOut}
        />
      </div>
    </main>
  )
}

export default async function GeographyPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string | string[] }>
}) {
  const [locale, { view }] = await Promise.all([getRequestLocale(), searchParams])
  return view === 'routes' ? (
    <GeographyRoutesArchive locale={locale} />
  ) : (
    <GeographyLocations locale={locale} />
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  if (locale === 'kk') {
    return {
      title: kazakhGeographyPageLabels.title,
      description: kazakhGeographyPageLabels.description,
    }
  }

  const t = pageMessages[locale].geography

  return {
    title: t.metadata.title,
    description: t.metadata.description,
  }
}

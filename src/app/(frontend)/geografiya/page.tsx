import type { Metadata } from 'next'

import { getRequestLocale } from '@/i18n/getRequestLocale'
import { pageMessages } from '@/i18n/pageMessages'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { ChevronDown, ChevronRight, LocateFixed, Minus, Plus } from 'lucide-react'
import Link from 'next/link'

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

function SelectButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex h-12 min-w-36 items-center justify-between gap-5 rounded-md border border-neutral-300 bg-white px-5 text-base text-neutral-950 shadow-sm">
      <span>{children}</span>
      <ChevronDown className="size-5 text-[#4d8351]" />
    </button>
  )
}

export default async function GeographyPage() {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].geography
  const geographyPageData = await getCachedGlobal('geographyPage', locale)()
  const deliveries =
    geographyPageData.deliveries && geographyPageData.deliveries.length > 0
      ? geographyPageData.deliveries
      : t.fallbackDeliveries

  return (
    <main className="bg-white pb-20 pt-9 text-neutral-950">
      <div className="container max-w-[1440px] space-y-8">
        <nav aria-label={t.breadcrumbsAria} className="flex items-center gap-2 text-sm">
          <Link className="text-neutral-400 transition-colors hover:text-neutral-700" href="/">
            {t.homeLink}
          </Link>
          <ChevronRight className="size-4 text-neutral-400" />
          <span>{t.title}</span>
        </nav>

        <section className="space-y-8">
          <h1 className="sr-only">{t.title}</h1>
          <p className="max-w-[1330px] text-xl leading-snug">{t.intro}</p>

          <div className="space-y-7">
            <h2 className="text-center text-3xl font-semibold leading-tight">
              {t.directionsTitle}
            </h2>

            <div className="mx-auto grid max-w-[1220px] gap-x-20 gap-y-8 md:grid-cols-2 xl:grid-cols-3">
              {directions.map(([fileName, key], index) => (
                <article
                  className={`flex min-h-24 items-center gap-6 ${
                    index === directions.length - 1
                      ? 'md:col-span-2 md:justify-center xl:col-span-3'
                      : ''
                  }`}
                  key={key}
                >
                  <img
                    alt=""
                    className="size-24 shrink-0 object-contain"
                    loading="lazy"
                    src={getCommonsFileUrl(fileName)}
                  />
                  <h3 className="text-xl leading-tight">{t.directions[key]}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6" aria-label={t.mapAria}>
          <div className="relative h-[440px] overflow-hidden border border-neutral-300 bg-[#f6fbff] md:h-[700px]">
            <iframe
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=78.70%2C66.20%2C97.80%2C70.30&layer=mapnik"
              title={t.mapTitle}
            />

            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-3">
              <div className="overflow-hidden rounded-xl bg-white shadow-md">
                <button
                  aria-label={t.zoomIn}
                  className="flex size-11 items-center justify-center border-b border-neutral-200"
                >
                  <Plus className="size-5" />
                </button>
                <button aria-label={t.zoomOut} className="flex size-11 items-center justify-center">
                  <Minus className="size-5" />
                </button>
              </div>
              <button
                aria-label={t.locate}
                className="flex size-11 items-center justify-center rounded-full bg-white shadow-md"
              >
                <LocateFixed className="size-5 fill-neutral-700 text-neutral-700" />
              </button>
              <div className="flex size-14 items-center justify-center rounded-full border border-neutral-200 bg-white text-sm font-medium text-neutral-300 shadow-md">
                3D
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xl">
            <span>{t.periodLabel}</span>
            <SelectButton>2026</SelectButton>

            <div className="flex h-12 flex-wrap items-center gap-5 rounded-md border border-neutral-300 bg-white px-4 text-neutral-500 shadow-sm">
              <label className="inline-flex items-center gap-2">
                <span className="size-7 rounded-full border border-neutral-400 bg-neutral-200" />
                <span>{t.vehicleAllTerrain}</span>
                <span className="relative h-5 w-9 rounded-full bg-[#88bd3b]">
                  <span className="absolute right-0.5 top-0.5 size-4 rounded-full bg-white shadow" />
                </span>
              </label>
              <label className="inline-flex items-center gap-2">
                <span className="size-7 rounded-full border border-neutral-400 bg-neutral-200" />
                <span>{t.vehicleCars}</span>
                <span className="relative h-5 w-9 rounded-full bg-[#88bd3b]">
                  <span className="absolute right-0.5 top-0.5 size-4 rounded-full bg-white shadow" />
                </span>
              </label>
            </div>

            <SelectButton>{t.cargoType}</SelectButton>
            <SelectButton>{t.region}</SelectButton>
          </div>

          <div className="space-y-4 pt-3 text-xl">
            {deliveries.map((item) => (
              <div
                className="grid gap-4 md:grid-cols-[68px_260px_minmax(0,1fr)_340px_80px] md:items-center"
                key={item.id ?? item.title}
              >
                <span className="h-3 w-16" style={{ backgroundColor: item.color }} />
                <span>{item.period}</span>
                <span>{item.title}</span>
                <span>{item.route}</span>
                <span>{item.duration ?? ''}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].geography

  return {
    title: t.metadata.title,
    description: t.metadata.description,
  }
}

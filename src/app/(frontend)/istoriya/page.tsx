import type { Metadata } from 'next'

import Link from 'next/link'

import { getRequestLocale } from '@/i18n/getRequestLocale'
import { historyMessages } from '@/i18n/messages'

export default async function HistoryPage() {
  const locale = await getRequestLocale()
  const t = historyMessages[locale]

  return (
    <section className="bg-white py-12 text-black md:py-20">
      <div className="container">
        <nav aria-label={t.breadcrumbsAria} className="mb-10 text-sm text-zinc-400 md:mb-16">
          <Link className="hover:text-white" href="/">
            {t.homeLink}
          </Link>{' '}
          <span aria-hidden="true">›</span>{' '}
          <span className="text-zinc-200">{t.breadcrumbsTitle}</span>
        </nav>

        <h1 className="mb-10 text-3xl font-semibold md:mb-14 md:text-5xl">{t.pageTitle}</h1>

        <div className="relative overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950">
          <div aria-hidden className="pointer-events-none absolute top-0 right-[4%] bottom-0 hidden w-20 bg-zinc-200/90 lg:block" />

          <ul>
            {t.timeline.map((item, index) => {
              const isGreen = index % 2 === 0

              return (
                <li
                  className={`grid min-h-32 grid-cols-1 gap-4 px-5 py-6 md:min-h-36 md:grid-cols-[170px_1fr] md:px-8 md:py-8 ${
                    isGreen ? 'bg-[#5f8f5e]' : 'bg-zinc-500'
                  }`}
                  key={item.years}
                >
                  <p className="text-2xl leading-none font-semibold text-white/95">{item.years}</p>

                  <div>
                    <h2 className="text-xl font-medium text-white/95">{item.title}</h2>
                    <p className="mt-2 text-base leading-relaxed text-white/90">{item.description}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = historyMessages[locale]

  return {
    title: t.metadata.title,
    description: t.metadata.description,
  }
}

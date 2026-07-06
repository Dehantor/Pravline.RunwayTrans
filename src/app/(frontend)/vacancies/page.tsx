import type { Metadata } from 'next'

import RichText from '@/components/RichText'
import { VacancyApplicationModal } from '@/components/VacancyApplicationModal'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import type { AppLocale } from '@/i18n/locales'
import { pageMessages } from '@/i18n/pageMessages'
import configPromise from '@payload-config'
import { ChevronDown, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { getPayload } from 'payload'

export const dynamic = 'force-static'
export const revalidate = 600

const companyLabels: Record<AppLocale, string> = {
  ru: 'Компания',
  en: 'Company',
  fr: 'Entreprise',
  kk: 'Компания',
  zh: '公司',
}

const introMessages: Record<AppLocale, string> = {
  ru: 'Компания Ранвей Транс предлагает развитие и рост!',
  en: 'Runway Trans offers professional development and growth!',
  fr: 'Runway Trans vous offre des possibilités de développement et d’évolution !',
  kk: 'Runway Trans компаниясы даму мен өсу мүмкіндігін ұсынады!',
  zh: 'Runway Trans 为您提供职业发展和成长机会！',
}

const emptyMessages: Record<AppLocale, string> = {
  ru: 'Открытых вакансий пока нет.',
  en: 'There are no open vacancies at the moment.',
  fr: "Il n'y a aucun poste vacant pour le moment.",
  kk: 'Қазіргі уақытта ашық бос жұмыс орындары жоқ.',
  zh: '目前没有空缺职位。',
}

export default async function VacanciesPage() {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].vacancies
  const contactsCopy = pageMessages[locale].contacts
  const payload = await getPayload({ config: configPromise })
  const vacancies = await payload.find({
    collection: 'vacancies',
    locale,
    fallbackLocale: 'ru',
    depth: 1,
    limit: 100,
    overrideAccess: false,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })
  const publishedVacancies = vacancies.docs.filter(
    (vacancy) => vacancy.title && vacancy.description,
  )

  return (
    <main className="bg-background-light pb-24 text-ink">
      <div className="container pt-12 sm:pt-16">
        <nav aria-label={contactsCopy.breadcrumbsAria} className="flex items-center gap-3 text-sm">
          <Link className="text-neutral-400 transition-colors hover:text-brand-green" href="/">
            {contactsCopy.homeLink}
          </Link>
          <ChevronRight className="size-5 text-neutral-400" />
          <Link
            className="text-neutral-400 transition-colors hover:text-brand-green"
            href="/ranvey-trans-segodnya"
          >
            {companyLabels[locale]}
          </Link>
          <ChevronRight className="size-5 text-neutral-400" />
          <span>{t.title}</span>
        </nav>

        <h1 className="sr-only">{t.title}</h1>
        <p className="mt-12 text-lg leading-relaxed sm:text-xl">{introMessages[locale]}</p>

        {publishedVacancies.length > 0 ? (
          <div className="mt-7 border-t border-black/40">
            {publishedVacancies.map((vacancy, index) => (
              <details
                className="group border-b border-black/40"
                key={vacancy.id}
                open={index === Math.min(1, publishedVacancies.length - 1)}
              >
                <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-6 px-6 py-7 text-lg marker:hidden sm:px-14 sm:text-xl [&::-webkit-details-marker]:hidden">
                  <span className="transition-colors group-open:font-semibold group-open:text-brand-green">
                    {vacancy.title}
                  </span>
                  <span className="flex items-center gap-5 font-semibold text-brand-green">
                    {vacancy.salary || ''}
                    <ChevronDown className="size-5 transition-transform group-open:rotate-180" />
                  </span>
                </summary>

                <div className="grid gap-10 px-6 pb-10 sm:px-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(260px,0.8fr)]">
                  <div>
                    <RichText
                      className="prose-p:my-2 prose-headings:mt-6 prose-headings:mb-2"
                      data={vacancy.description}
                      enableGutter={false}
                    />
                  </div>

                  <aside className="space-y-7 text-lg">
                    {vacancy.contactPhone ? (
                      <div>
                        <p>Телефон для консультации по вакансии</p>
                        <Link
                          className="mt-2 inline-block font-semibold hover:text-brand-green"
                          href={`tel:${vacancy.contactPhone.replace(/[^\d+]/g, '')}`}
                        >
                          {vacancy.contactPhone}
                        </Link>
                      </div>
                    ) : null}

                    {vacancy.contactEmail ? (
                      <div>
                        <p>Адрес электронной почты для резюме</p>
                        <Link
                          className="mt-2 inline-block font-semibold hover:text-brand-green"
                          href={`mailto:${vacancy.contactEmail}`}
                        >
                          {vacancy.contactEmail}
                        </Link>
                      </div>
                    ) : null}

                    <VacancyApplicationModal vacancyId={vacancy.id} vacancyTitle={vacancy.title} />
                  </aside>
                </div>
              </details>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-neutral-600">{emptyMessages[locale]}</p>
        )}
      </div>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].vacancies

  return {
    title: t.metadata.title,
  }
}

import type { Metadata } from 'next'

import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { getRequestLocale } from '@/i18n/getRequestLocale'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function VacanciesPage() {
  const locale = await getRequestLocale()
  const payload = await getPayload({ config: configPromise })

  const vacancies = await payload.find({
    collection: 'vacancies',
    locale,
    fallbackLocale: 'ru',
    depth: 0,
    limit: 100,
    overrideAccess: false,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  return (
    <section className="container py-24">
      <h1 className="text-4xl font-semibold mb-8">Вакансии</h1>

      <div className="grid gap-4">
        {vacancies.docs.map((vacancy) => (
          <article className="rounded-lg border border-border p-6" key={vacancy.id}>
            <h2 className="text-2xl font-medium mb-2">
              <Link className="underline-offset-4 hover:underline" href={`/vacancies/${vacancy.slug}`}>
                {vacancy.title}
              </Link>
            </h2>

            <div className="text-sm text-muted-foreground mb-4">
              {vacancy.location} • {vacancy.employmentType}
            </div>

            <p className="mb-4">{vacancy.summary}</p>

            <Link className="font-medium underline underline-offset-4" href={`/vacancies/${vacancy.slug}`}>
              Подробнее и отклик →
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Вакансии',
  }
}

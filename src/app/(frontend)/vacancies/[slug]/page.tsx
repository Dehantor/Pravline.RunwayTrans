import type { Metadata } from 'next'

import RichText from '@/components/RichText'
import { VacancyApplicationForm } from '@/components/VacancyApplicationForm'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { cache } from 'react'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export default async function VacancyPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const vacancy = await queryVacancyBySlug({ slug: decodedSlug })

  if (!vacancy) {
    notFound()
  }

  return (
    <section className="container py-24">
      <h1 className="text-4xl font-semibold mb-3">{vacancy.title}</h1>
      <p className="text-muted-foreground mb-2">
        {vacancy.location} • {vacancy.employmentType}
      </p>
      {vacancy.salary && <p className="mb-8 font-medium">{vacancy.salary}</p>}

      <div className="prose dark:prose-invert max-w-none mb-12">
        <RichText data={vacancy.description} />
      </div>

      <div className="max-w-2xl rounded-lg border border-border p-6">
        <h2 className="mb-4 text-2xl font-medium">Отклик на вакансию</h2>
        <VacancyApplicationForm vacancyId={vacancy.id} />
      </div>
    </section>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const vacancy = await queryVacancyBySlug({ slug: decodedSlug })

  return {
    title: vacancy?.title ? `${vacancy.title} — Вакансии` : 'Вакансия',
    description: vacancy?.summary ?? undefined,
  }
}

const queryVacancyBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'vacancies',
    depth: 2,
    draft,
    limit: 1,
    overrideAccess: draft ? true : false,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs[0] || null
})

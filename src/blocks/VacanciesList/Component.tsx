import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

type Props = {
  title?: string | null
  limit?: number | null
}

export const VacanciesListBlock = async ({ title, limit }: Props) => {
  const payload = await getPayload({ config: configPromise })

  const vacancies = await payload.find({
    collection: 'vacancies',
    depth: 0,
    limit: limit ?? 12,
    overrideAccess: false,
    sort: '-publishedAt',
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  if (!vacancies.docs.length) {
    return (
      <section className="container">
        <h2 className="text-3xl font-semibold mb-6">{title || 'Открытые вакансии'}</h2>
        <p className="text-muted-foreground">Сейчас открытых вакансий нет.</p>
      </section>
    )
  }

  return (
    <section className="container">
      <h2 className="text-3xl font-semibold mb-6">{title || 'Открытые вакансии'}</h2>

      <div className="grid gap-4">
        {vacancies.docs.map((vacancy) => (
          <article className="rounded-lg border border-border p-6" key={vacancy.id}>
            <h3 className="text-2xl font-medium mb-2">
              <Link className="underline-offset-4 hover:underline" href={`/vacancies/${vacancy.slug}`}>
                {vacancy.title}
              </Link>
            </h3>

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

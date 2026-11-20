import { LowImpactHero } from '@/heros/LowImpact'
import { casesMessages, getCaseExamples } from '@/i18n/casesMessages'
import type { AppLocale } from '@/i18n/locales'

export function CasesFallback({ locale }: { locale: AppLocale }) {
  const t = casesMessages[locale]

  return (
    <main className="pb-24">
      <LowImpactHero>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{t.title}</h1>
      </LowImpactHero>

      <section aria-labelledby="case-examples" className="container mt-10">
        <h2 className="mb-5 text-2xl font-semibold" id="case-examples">
          {t.examplesTitle}
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {getCaseExamples(locale).map(({ id, title, route, period, duration }) => (
            <li
              className="rounded-lg border border-border bg-card p-5 text-card-foreground"
              key={id}
            >
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2">{route}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                {period}
                {duration && <span> · {duration}</span>}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

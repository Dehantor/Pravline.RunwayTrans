import { SectionUnderConstruction } from '@/components/SectionUnderConstruction'
import { LowImpactHero } from '@/heros/LowImpact'
import { casesMessages } from '@/i18n/casesMessages'
import type { AppLocale } from '@/i18n/locales'

export function CasesFallback({ locale }: { locale: AppLocale }) {
  const t = casesMessages[locale]

  return (
    <main className="pb-24">
      <LowImpactHero>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{t.title}</h1>
      </LowImpactHero>

      <SectionUnderConstruction locale={locale} />
    </main>
  )
}

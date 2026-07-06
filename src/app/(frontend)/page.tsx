import type { Metadata } from 'next'
import Link from 'next/link'

import { getRequestLocale } from '@/i18n/getRequestLocale'
import { defaultLocale } from '@/i18n/locales'
import { homeMessages } from '@/i18n/messages'

export default async function HomePage() {
  const locale = await getRequestLocale()
  const t = homeMessages[locale] ?? homeMessages[defaultLocale]

  if (!t) {
    return null
  }

  return (
    <main className="bg-background-light text-ink">
      <section className="relative min-h-[500px] border-b border-brand-green pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--hero-overlay-start),var(--hero-overlay-end)_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--hero-overlay-start)_0%,var(--hero-overlay-end)_100%)]" />
        <div className="container relative z-10 py-20 text-center">
          <p className="text-3xl font-light uppercase tracking-[0.08em] text-brand-green sm:text-4xl">
            {t.hero.eyebrow}
          </p>
          <h1 className="mx-auto mt-2 max-w-4xl text-3xl leading-tight font-light uppercase sm:text-5xl">
            {t.hero.title}
          </h1>
        </div>
      </section>
      <section>
        <p className="w-full m-[14px_46px_18px_30px] text-[20px] font-semibold text-center text-black">
          {t.transportCapabilitiesTitle}
        </p>
        <p className="w-full m-[18px_20px_20px] text-[16px] font-normal text-black">
          {t.transportCapabilitiesDescription}
        </p>
      </section>

      <section className="container py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {t.coreServices.map((item, index) => (
            <article className="text-center" key={index}>
              <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-zinc-200" />
              <p className="text-sm leading-relaxed text-brand-green">{item.label}</p>
              <p className="text-xs leading-relaxed text-brand-green">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            className="inline-flex items-center gap-2 rounded-none border border-brand-green bg-brand-green px-6 py-2 text-sm text-on-dark hover:bg-brand-green-hover"
            href="/contacts"
          >
            {t.ctaRequest}
            <span aria-hidden>›</span>
          </Link>
        </div>
      </section>

      <section className="container pb-16">
        <p className="w-full m-[14px_46px_18px_30px] text-[20px] font-semibold text-center text-black">
          {t.cargoTitle}
        </p>
        <p className="w-full m-[18px_20px_20px] text-[16px] font-normal text-black">
          {t.cargoDescription}
        </p>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {t.capabilities.map((item) => (
            <article className="text-center" key={item}>
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-zinc-300" />
              <p className="text-sm text-brand-green">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container py-16">
        <p className="w-full m-[14px_46px_18px_30px] text-[20px] font-semibold text-center text-black">
          {t.advantagesTitle}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.advantages.map((item, index) => (
            <article className="text-center" key={index}>
              <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-zinc-200" />
              <p className="text-sm leading-relaxed text-brand-green">{item.label}</p>
              <p className="text-xs leading-relaxed text-brand-green">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container pb-16">
        <div className="flex h-[340px] items-center justify-center bg-zinc-300/90">
          <button
            aria-label={t.playVideoAria}
            className="h-16 w-16 rounded-full border-4 border-brand-green text-brand-green transition hover:scale-105"
            type="button"
          >
            ▶
          </button>
        </div>
      </section>

      <section className="container pb-16">
        <div className="h-[310px] border border-background-muted bg-[linear-gradient(160deg,var(--background-light),var(--background-muted))]" />
        <div className="mt-4 text-center">
          <Link
            className="inline-block bg-brand-green px-6 py-2 text-sm text-on-dark"
            href="/contacts"
          >
            {t.mapButton}
          </Link>
        </div>
      </section>

      <section className="bg-brand-green py-7">
        <div className="container grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-5 text-on-dark">
          {t.metrics.map((item) => (
            <div key={item.label}>
              <p className="text-3xl">{item.value}</p>
              <p className="mt-2 text-xs uppercase tracking-wide">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 text-black">
        <div className="container">
          <h2 className="mb-10 text-center text-[22px] font-semibold">{t.workWithUsTitle}</h2>

          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
            <div className="flex h-full flex-col justify-between">
              <img
                src="/images/home/transport-machine.png"
                alt={t.imageAlt}
                className="mt-8 w-full max-w-[620px] object-contain"
              />

              <label className="mt-10 flex items-center gap-2 text-[16px] text-ink">
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-brand-green" />
                <span>
                  {t.personalDataAgreementPrefix}{' '}
                  <Link href="/privacy" className="text-brand-blue hover:underline">
                    {t.personalDataPolicy}
                  </Link>
                </span>
              </label>
            </div>

            <div>
              <ul className="mb-12 list-disc space-y-3 pl-5 text-[16px] leading-snug marker:text-brand-green">
                {t.consultationPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <form className="space-y-4">
                <div className="grid items-center gap-4 sm:grid-cols-[90px_1fr]">
                  <label className="text-[16px]">{t.form.name}</label>
                  <input className="h-[36px] w-full border border-background-muted bg-background-light px-3 outline-none focus:border-brand-green" />
                </div>

                <div className="grid items-center gap-4 sm:grid-cols-[90px_1fr]">
                  <label className="text-[16px]">{t.form.phone}</label>
                  <input className="h-[36px] w-full border border-background-muted bg-background-light px-3 outline-none focus:border-brand-green" />
                </div>

                <div className="grid items-center gap-4 sm:grid-cols-[90px_1fr]">
                  <label className="text-[16px]">{t.form.email}</label>
                  <input className="h-[36px] w-full border border-background-muted bg-background-light px-3 outline-none focus:border-brand-green" />
                </div>

                <div className="grid items-start gap-4 sm:grid-cols-[90px_1fr]">
                  <label className="pt-2 text-[16px]">{t.form.message}</label>
                  <textarea className="h-[80px] w-full resize-none border border-background-muted bg-background-light px-3 py-2 outline-none focus:border-brand-green" />
                </div>

                <div className="sm:ml-[106px]">
                  <button
                    className="h-[46px] w-full bg-brand-green text-[16px] font-semibold text-on-dark hover:bg-brand-green-hover"
                    type="submit"
                  >
                    {t.form.submit}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = homeMessages[locale] ?? homeMessages[defaultLocale]

  if (!t) {
    return {}
  }

  return {
    title: t.metadata.title,
    description: t.metadata.description,
  }
}

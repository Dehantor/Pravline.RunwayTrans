import type { Metadata } from 'next'
import React from 'react'

type Partner = {
  name: string
  title: string
  description: string
  accent: string
  logoClassName: string
}

const partners: Partner[] = [
  {
    name: 'Apple',
    title: 'Эппл',
    description:
      'Технологическая компания из США, разрабатывающая устройства, программное обеспечение и онлайн-сервисы.',
    accent: 'text-neutral-200',
    logoClassName: 'bg-neutral-900 text-neutral-100',
  },
  {
    name: 'Volvo',
    title: 'Вольво',
    description:
      'Шведская транснациональная корпорация по производству автомобилей, строительной техники и промышленных двигателей.',
    accent: 'text-blue-400',
    logoClassName: 'bg-blue-950 text-blue-300',
  },
  {
    name: 'Vodafone',
    title: 'Водафон',
    description:
      'Международная телекоммуникационная компания, предоставляющая мобильную связь, интернет и цифровые сервисы.',
    accent: 'text-red-400',
    logoClassName: 'bg-red-950 text-red-300',
  },
  {
    name: 'Toshiba',
    title: 'Тошиба',
    description:
      'Японская корпорация, работающая в сферах энергетики, инфраструктуры, электронных устройств и цифровых решений.',
    accent: 'text-red-500',
    logoClassName: 'bg-red-950 text-red-300',
  },
  {
    name: 'Lexus',
    title: 'Лексус',
    description:
      'Премиальный автомобильный бренд, известный надежностью, технологиями безопасности и высоким качеством сборки.',
    accent: 'text-neutral-300',
    logoClassName: 'bg-neutral-800 text-neutral-200',
  },
  {
    name: 'Reddit',
    title: 'Реддит',
    description:
      'Социальная платформа сообществ, где пользователи публикуют новости, обсуждения и тематический контент.',
    accent: 'text-orange-400',
    logoClassName: 'bg-orange-950 text-orange-300',
  },
]

export default function PartnersPage() {
  return (
    <main className="bg-black pb-24 pt-24 text-white">
      <div className="container space-y-12">
        <header className="space-y-4">
          <p className="text-sm text-neutral-400">Главная / Партнеры</p>
          <h1 className="text-4xl font-bold uppercase tracking-wide">Партнеры</h1>
          <p className="max-w-3xl text-neutral-300">
            Компании, с которыми мы сотрудничаем в международной логистике и комплексных
            поставках.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {partners.map((partner) => {
            return (
              <article
                className="rounded border border-neutral-800 bg-neutral-950 p-5 transition hover:border-green-500"
                key={partner.name}
              >
                <div
                  className={`mb-4 flex h-20 items-center justify-center rounded text-3xl font-bold uppercase ${partner.logoClassName}`}
                >
                  {partner.name}
                </div>
                <h2 className="mb-3 text-lg font-semibold">{partner.title}</h2>
                <p className="text-sm leading-relaxed text-neutral-300">{partner.description}</p>
                <p className={`mt-4 text-sm font-medium ${partner.accent}`}>{partner.name}</p>
              </article>
            )
          })}
        </section>

        <div className="flex justify-center">
          <a
            className="inline-flex rounded bg-green-700 px-10 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
            href="https://www.youtube.com"
            rel="noreferrer"
            target="_blank"
          >
            Смотреть видео отзывы
          </a>
        </div>
      </div>
    </main>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Партнеры',
    description: 'Страница партнеров Runway Trans.',
  }
}

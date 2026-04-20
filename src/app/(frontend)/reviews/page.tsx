import type { Metadata } from 'next/types'
import React from 'react'

import PageClient from './page.client'

const videoReviews = [2023, 2022, 2021, 2023, 2022, 2021]
const letterReviews = [2023, 2022, 2021, 2023, 2022, 2021]

export default function ReviewsPage() {
  return (
    <main className="bg-black text-white pb-24">
      <PageClient />

      <section className="bg-[#ececec] text-black">
        <div className="container grid gap-10 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <p className="mb-6 text-sm text-black/60">Главная / Отзывы</p>
            <h1 className="text-4xl font-semibold uppercase leading-tight md:text-6xl">
              Видео-отзывы
              <br />
              наших партнёров
            </h1>
            <p className="mt-8 max-w-xl text-base text-black/60 md:text-lg">
              Мы имеем более 60 видео-отзывов и более 100 благодарностей на фирменных бланках от
              своих клиентов.
            </p>
          </div>

          <div className="mx-auto w-full max-w-[420px] rounded-[2rem] border border-black/15 bg-white p-4 shadow-xl">
            <div className="rounded-[1.6rem] border border-black/10 bg-[#f4f4f4] p-4">
              <div className="mb-4 rounded-xl bg-white p-3 shadow-sm">
                <p className="text-lg font-semibold">Виктория Кондакова</p>
                <p className="text-sm text-black/60">Эксперт по эксплуатации отелей в РФ</p>
              </div>
              <div className="space-y-2">
                {['Family Place', 'Glamping Moon', 'Отель Атмосфера'].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm"
                  >
                    Отзыв: {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-14 md:py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {videoReviews.map((year, index) => (
            <article key={`${year}-${index}`} className="space-y-3">
              <button
                type="button"
                className="group flex aspect-video w-full items-center justify-center rounded-sm bg-[#e7e7e7] transition hover:bg-[#dcdcdc]"
                aria-label="Открыть видео-отзыв"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#5f9c61] text-2xl text-[#5f9c61] transition group-hover:scale-105">
                  ▶
                </span>
              </button>
              <p className="text-right text-2xl font-black tracking-wide text-white/85">{year}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container pt-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {letterReviews.map((year, index) => (
            <article key={`letter-${year}-${index}`} className="space-y-3">
              <div className="aspect-[4/5] w-full rounded-sm bg-gradient-to-b from-[#dedede] to-[#f2f2f2] p-6">
                <div className="mx-auto h-full max-w-[280px] rounded-sm border border-black/20 bg-white shadow-[0_12px_25px_rgba(0,0,0,.22)]" />
              </div>
              <p className="text-right text-2xl font-black tracking-wide text-white/85">{year}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export const metadata: Metadata = {
  title: 'Отзывы | RunwayTrans',
  description: 'Видео-отзывы и письма благодарности от клиентов RunwayTrans.',
}

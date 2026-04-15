import type { Metadata } from 'next'

import Link from 'next/link'

type TimelineItem = {
  years: string
  title: string
  description: string
}

const timeline: TimelineItem[] = [
  {
    years: '2008',
    title: 'Основание компании',
    description: 'Были приобретены 2 тягача Iveco с полуприцепами, а также 1 болотоход «Витязь».',
  },
  {
    years: '2009',
    title: 'Работа в новых для нас регионах',
    description: 'Приобретение ещё одного «Витязя». Транспортные услуги на болотоходах на длинные расстояния.',
  },
  {
    years: '2010',
    title: 'Признание в области транспортных услуг',
    description: 'Руководители других компаний лично прилетали для благодарности ООО «Ранвей Транс».',
  },
  {
    years: '2011',
    title: 'Появление на Таймыре',
    description: 'Участие в разработке новых нефтяных месторождений.',
  },
  {
    years: '2012–2016',
    title: 'Понимание сильных и слабых сторон техники',
    description: 'Приобретение новых единиц спецтехники.',
  },
  {
    years: '2016–2020',
    title: 'Расширение присутствия компании',
    description: 'Иркутская область.',
  },
  {
    years: '2020–2022',
    title: 'Приобретение новых видов спецтехники',
    description: 'Экскаваторные и аварийные комплексы.',
  },
  {
    years: '2023',
    title: 'Занимаем лидирующие позиции',
    description: 'Наши вездеходы на всех месторождениях страны.',
  },
]

export default function HistoryPage() {
  return (
    <section className="bg-black py-12 text-white md:py-20">
      <div className="container">
        <nav aria-label="Хлебные крошки" className="mb-10 text-sm text-zinc-400 md:mb-16">
          <Link className="hover:text-white" href="/">
            Главная
          </Link>{' '}
          <span aria-hidden="true">›</span>{' '}
          <span className="text-zinc-200">История</span>
        </nav>

        <h1 className="mb-10 text-3xl font-semibold md:mb-14 md:text-5xl">История</h1>

        <div className="relative overflow-hidden rounded-sm border border-zinc-800 bg-zinc-950">
          <div aria-hidden className="pointer-events-none absolute top-0 right-[4%] bottom-0 hidden w-20 bg-zinc-200/90 lg:block" />

          <ul>
            {timeline.map((item, index) => {
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

export const metadata: Metadata = {
  title: 'История',
  description: 'Ключевые этапы развития компании RunwayTrans с 2008 года по настоящее время.',
}

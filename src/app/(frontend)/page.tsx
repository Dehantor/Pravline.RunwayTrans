import type { Metadata } from 'next'
import Link from 'next/link'

const coreServices = [
  'Грузоперевозки в ЯНАО, Красноярском крае и ХМАО',
  'Вывоз и перевозка промышленного оборудования в труднодоступные районы Севера',
  'Перевозка крупногабаритных и тяжеловесных грузов',
]

const capabilities = [
  'Круглогодичные перевозки',
  'Организация временных трасс',
  'Полярная логистика',
  'Спутниковый GPS',
  'Маршрутный мониторинг',
  'Парк спецтехники',
  'Погрузка и крепление',
  'Работа в труднодоступных районах',
  'Надёжные экипажи',
  'Команда инженеров',
  'Сопровождение на маршруте',
  'Отгрузки 24/7',
]

const metrics = [
  { label: 'Год основания', value: '2008' },
  { label: 'Перевозок в год', value: '>690' },
  { label: 'Единиц спецтехники', value: '14' },
  { label: 'Клиентов', value: '>50' },
  { label: 'Собственных маршрутов', value: '80%' },
]

const gallery = [
  'Экстремальные условия на Крайнем Севере',
  'Работа на ледовых переправах',
  'Перевозка квадроциклов и техники',
  'Доставка промышленных самосвалов',
]

export default function HomePage() {
  return (
    <main className="bg-white text-black">
      <section className="relative min-h-[500px] border-b border-[#19482f] pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(135,191,152,0.35),rgba(0,0,0,0.92)_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,31,20,0.55)_0%,rgba(0,0,0,0.95)_100%)]" />
        <div className="container relative z-10 py-20 text-center">
          <p className="text-3xl font-light uppercase tracking-[0.08em] text-[#76c493] sm:text-4xl">
            Грузоперевозки
          </p>
          <h1 className="mx-auto mt-2 max-w-4xl text-3xl leading-tight font-light uppercase sm:text-5xl">
            В труднодоступные районы Севера
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-sm text-zinc-200 sm:text-base">
            Обеспечиваем логистику в регионах со сложной дорожной обстановкой: от проектирования маршрута до
            доставки груза «под ключ».
          </p>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((item) => (
            <article className="text-center" key={item}>
              <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-zinc-200" />
              <p className="text-sm leading-relaxed text-[#8ce7aa]">{item}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            className="inline-flex items-center gap-2 rounded-none border border-[#5a8f68] bg-[#5c8f61] px-6 py-2 text-sm hover:bg-[#6aa671]"
            href="/contacts"
          >
            Обратная связь
            <span aria-hidden>›</span>
          </Link>
        </div>
      </section>

      <section className="container pb-16">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
            <article className="text-center" key={item}>
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-zinc-300" />
              <p className="text-sm text-[#84d79f]">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container pb-16">
        <div className="flex h-[340px] items-center justify-center bg-zinc-300/90">
          <button
            aria-label="Воспроизвести видео"
            className="h-16 w-16 rounded-full border-4 border-[#5f9965] text-[#5f9965] transition hover:scale-105"
            type="button"
          >
            ▶
          </button>
        </div>
      </section>

      <section className="container pb-16">
        <div className="h-[310px] border border-zinc-700 bg-[linear-gradient(160deg,#deebf8,#c8d9e3)]" />
        <div className="mt-4 text-center">
          <Link className="inline-block bg-[#5d8e61] px-6 py-2 text-sm" href="/contacts">
            Смотреть маршрут на карте
          </Link>
        </div>
      </section>

      <section className="bg-[#68916b] py-7">
        <div className="container grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-5">
          {metrics.map((item) => (
            <div key={item.label}>
              <p className="text-3xl">{item.value}</p>
              <p className="mt-2 text-xs uppercase tracking-wide">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((item) => (
            <article className="group relative h-56 overflow-hidden border border-zinc-700" key={item}>
              <div className="absolute inset-0 bg-[linear-gradient(160deg,#4d5c4f,#222)] transition group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40" />
              <p className="absolute right-3 bottom-3 left-3 text-sm text-zinc-100">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container pb-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
          <div>
            <div className="h-52 max-w-xl bg-[linear-gradient(160deg,#8d9a90,#49584d)]" />
            <p className="mt-6 text-sm text-[#57a7ff]">МАШИНЫ ДЛЯ РЕШЕНИЯ СЛОЖНЫХ ЗАДАЧ</p>
          </div>

          <form className="space-y-3">
            <input className="w-full border border-zinc-500 bg-transparent px-3 py-2" placeholder="Ваше имя" />
            <input className="w-full border border-zinc-500 bg-transparent px-3 py-2" placeholder="Телефон" />
            <input className="w-full border border-zinc-500 bg-transparent px-3 py-2" placeholder="E-mail" />
            <textarea
              className="h-24 w-full resize-none border border-zinc-500 bg-transparent px-3 py-2"
              placeholder="Комментарий"
            />
            <button className="w-full bg-[#6b946f] py-3 text-sm" type="submit">
              Отправить
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export const metadata: Metadata = {
  title: 'RunwayTrans — грузоперевозки в труднодоступные районы Севера',
  description:
    'Профессиональные перевозки тяжеловесных и негабаритных грузов, логистика и сопровождение в северных регионах.',
}

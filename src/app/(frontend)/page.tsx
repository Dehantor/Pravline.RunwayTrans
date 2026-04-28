import type { Metadata } from 'next'
import Link from 'next/link'

const coreServices = [
  { label: 'Грузоперевозки на Витязях', description: 'Основной вид деятельности. Доставляем всё!' },
  {
    label: 'Грузоперевозки по зимникам',
    description: 'Доставка грузов полуприцепами и тралами по специализированным дорогам и зимникам',
  },
  {
    label: 'Грузоперевозки на вездеходах',
    description: 'Грузоперевозки вездеходами на колёсах низкого давления',
  },
  {
    label: 'Услуги кранов и аварийных комплексов',
    description:
      'Услуги аварийного комплекса на базе болотохода ДТ-30 с оборудованным манипулятором и экскаватором',
  },
]

const capabilities = [
  'Крупногабаритные и тяжеловесные грузы',
  'Специальная и строительная техника',
  'Различное оборудование',
  'Опасные грузы',
  'Нефтепромысловое оборудование',
  'Люди',
]

const advantages = [
  {
    label: 'Собственный парк техники',
    description:
      'Располагаем надёжной техникой для работы в северном климаете. Подберём оптимальный транспорт под любую заявку',
  },
  {
    label: 'Готовы привезти любой груз',
    description: 'Крупногабаритные, длинномерные, тяжеловесные и опасные грузы',
  },
  {
    label: 'Работаем в сложных условиях',
    description:
      'Перевезём груз в труднодоступные районы, на месторождения и нефтегазовые объекты в тундре, выполним перевозку по зимникам',
  },
  {
    label: 'Работаем в любое время года',
    description: 'Бесперебойно работаем как летом, так и в самые невообразимые морозы',
  },
  {
    label: 'Комплексное решение в одном договоре',
    description:
      'Берём на себя задачи по разработке маршрута и подготовке расчётов, организации погрузки, безопасной доставке вашего груза',
  },
  {
    label: 'Огромный опыт',
    description: 'Стабильно входим в приоритетные компании по грузоперевозкам',
  },
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
        </div>
      </section>
      <section>
        <p className="w-full m-[14px_46px_18px_30px] text-[20px] font-semibold text-center text-black">
          Наши транспортные возможности
        </p>
        <p className="w-full m-[18px_20px_20px] text-[16px] font-normal text-black">
          В арсенале нашей компании есть все необходимые транспортные возможности, чтобы
          организовать перевозку груза оптимальным способом. С момента своего основания компания
          "Ранвей Транс" заработала репутацию одной из самых надёжных в отрасли. Доверьте нам
          решение своей задачи и убедитесь, что мы учитываем интересы каждого клиента и обеспечиваем
          высокое качество требуемого результата.
        </p>
      </section>

      <section className="container py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((item, index) => (
            <article className="text-center" key={index}>
              <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-zinc-200" />
              <p className="text-sm leading-relaxed text-[#598758]">{item.label}</p>
              <p className="text-xs leading-relaxed text-[#598758]">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            className="inline-flex items-center gap-2 rounded-none border border-[#5a8f68] bg-[#5c8f61] px-6 py-2 text-sm text-white hover:bg-[#6aa671]"
            href="/contacts"
          >
            Оформить заявку
            <span aria-hidden>›</span>
          </Link>
        </div>
      </section>

      <section className="container pb-16">
        <p className="w-full m-[14px_46px_18px_30px] text-[20px] font-semibold text-center text-black">
          Что мы перевозим
        </p>
        <p className="w-full m-[18px_20px_20px] text-[16px] font-normal text-black">
          Мы доставляем всё: от крупногабаритной спецтехники, оборудования, опасных грузов до
          малогабаритных сборных грузов.
        </p>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
            <article className="text-center" key={item}>
              <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-zinc-300" />
              <p className="text-sm text-[#598758]">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container py-16">
        <p className="w-full m-[14px_46px_18px_30px] text-[20px] font-semibold text-center text-black">
          Наши преимущества
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item, index) => (
            <article className="text-center" key={index}>
              <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-zinc-200" />
              <p className="text-sm leading-relaxed text-[#598758]">{item.label}</p>
              <p className="text-xs leading-relaxed text-[#598758]">{item.description}</p>
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
          <Link className="inline-block bg-[#5d8e61] px-6 py-2 text-sm text-white" href="/contacts">
            Смотреть маршрут на карте
          </Link>
        </div>
      </section>

      <section className="bg-[#598758] py-7">
        <div className="container grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-5 text-white">
          {metrics.map((item) => (
            <div key={item.label}>
              <p className="text-3xl">{item.value}</p>
              <p className="mt-2 text-xs uppercase tracking-wide">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 text-black">
  <div className="container">
    <h2 className="mb-10 text-center text-[22px] font-semibold">
      Начните работать с нами
    </h2>

    <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start">
      <div className="flex h-full flex-col justify-between">
        <img
          src="/images/home/transport-machine.png"
          alt="Вездеходная техника"
          className="mt-8 w-full max-w-[620px] object-contain"
        />

        <label className="mt-10 flex items-center gap-2 text-[16px] text-[#333]">
          <input
            type="checkbox"
            defaultChecked
            className="h-4 w-4 accent-[#5f8f63]"
          />
          <span>
            Я согласен с{' '}
            <Link href="/privacy" className="text-[#348ed8] hover:underline">
              политикой обработки персональных данных
            </Link>
          </span>
        </label>
      </div>

      <div>
        <ul className="mb-12 list-disc space-y-3 pl-5 text-[16px] leading-snug marker:text-[#5f8f63]">
          <li>Расчёт стоимости перевозки</li>
          <li>Сроки доставки</li>
          <li>Консультация специалистов</li>
          <li>Прочие вопросы</li>
        </ul>

        <form className="space-y-4">
          <div className="grid items-center gap-4 sm:grid-cols-[90px_1fr]">
            <label className="text-[16px]">Ваше имя*</label>
            <input className="h-[36px] w-full border border-[#b7b7b7] bg-white px-3 outline-none focus:border-[#5f8f63]" />
          </div>

          <div className="grid items-center gap-4 sm:grid-cols-[90px_1fr]">
            <label className="text-[16px]">Телефон*</label>
            <input className="h-[36px] w-full border border-[#b7b7b7] bg-white px-3 outline-none focus:border-[#5f8f63]" />
          </div>

          <div className="grid items-center gap-4 sm:grid-cols-[90px_1fr]">
            <label className="text-[16px]">E-mail</label>
            <input className="h-[36px] w-full border border-[#b7b7b7] bg-white px-3 outline-none focus:border-[#5f8f63]" />
          </div>

          <div className="grid items-start gap-4 sm:grid-cols-[90px_1fr]">
            <label className="pt-2 text-[16px]">Сообщение</label>
            <textarea className="h-[80px] w-full resize-none border border-[#b7b7b7] bg-white px-3 py-2 outline-none focus:border-[#5f8f63]" />
          </div>

          <div className="sm:ml-[106px]">
            <button
              className="h-[46px] w-full bg-[#5f8f63] text-[16px] font-semibold text-white hover:bg-[#6fa674]"
              type="submit"
            >
              Отправить
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

export const metadata: Metadata = {
  title: 'RunwayTrans — грузоперевозки в труднодоступные районы Севера',
  description:
    'Профессиональные перевозки тяжеловесных и негабаритных грузов, логистика и сопровождение в северных регионах.',
}

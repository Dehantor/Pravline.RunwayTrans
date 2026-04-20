import type { Metadata } from 'next'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Свяжитесь с Runway Trans — адрес, телефон, email и форма обратного звонка.',
}

const contacts = [
  {
    icon: MapPin,
    title: 'Наш головной офис',
    value: 'г. Красноярск, ул. Красной Армии, 10',
  },
  {
    icon: Phone,
    title: 'Телефон',
    value: '+7 (391) 000-00-00',
    href: 'tel:+73910000000',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'info@runwaytrans.ru',
    href: 'mailto:info@runwaytrans.ru',
  },
]

export default function ContactsPage() {
  return (
    <main className="container py-12 md:py-16">
      <nav aria-label="Хлебные крошки" className="mb-8 text-sm text-muted-foreground">
        <Link className="hover:text-foreground transition-colors" href="/">
          Главная
        </Link>{' '}
        / <span className="text-foreground">Контакты</span>
      </nav>

      <section className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start">
        <div className="space-y-8">
          <h1 className="text-3xl font-semibold tracking-tight">Контакты</h1>

          <ul className="space-y-5">
            {contacts.map(({ icon: Icon, title, value, href }) => (
              <li className="flex items-start gap-3" key={title}>
                <span className="mt-0.5 inline-flex size-10 items-center justify-center rounded-full bg-secondary text-foreground">
                  <Icon className="size-5" />
                </span>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{title}</p>
                  {href ? (
                    <Link className="font-medium hover:underline" href={href}>
                      {value}
                    </Link>
                  ) : (
                    <p className="font-medium">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <form className="space-y-4 rounded-lg border border-border bg-card p-5" method="post">
            <h2 className="text-lg font-medium">Заказать звонок</h2>
            <Input name="phone" placeholder="Ваш номер телефона" required type="tel" />
            <label className="flex items-start gap-2 text-sm text-muted-foreground">
              <input className="mt-1" name="consent" required type="checkbox" />
              Я согласен(а) на обработку персональных данных
            </label>
            <Button className="w-full" type="submit">
              Перезвонить
            </Button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-lg border border-border">
            <iframe
              allowFullScreen
              className="h-[480px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=92.84%2C56.00%2C93.00%2C56.03&layer=mapnik&marker=56.015%2C92.908"
              title="Карта офиса Runway Trans"
            />
          </div>

          <div className="max-w-[280px] rounded-lg border border-border bg-card p-3">
            <div className="aspect-[3/4] rounded-md border border-dashed border-muted-foreground/50 bg-muted" />
            <p className="mt-3 text-sm text-muted-foreground">
              Лицензия и реквизиты компании доступны по запросу.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

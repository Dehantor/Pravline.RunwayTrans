import type { Metadata } from 'next'
import type { LucideIcon } from 'lucide-react'

import { CallbackForm } from '@/components/CallbackForm'
import { ContactMap } from '@/components/ContactMap'
import { getRequestLocale } from '@/i18n/getRequestLocale'
import { getPageText, pageMessages } from '@/i18n/pageMessages'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-static'
export const revalidate = 600

const contactIcons: Record<string, LucideIcon> = {
  address: MapPin,
  email: Mail,
  hours: Clock,
  message: MessageCircle,
  phone: Phone,
}

const defaultMapLocation = {
  latitude: 56.008209,
  longitude: 92.881071,
}

function getMapLocation(value: string | null | undefined) {
  const decodedValue = value ? decodeURIComponent(value) : ''
  const markerMatch = decodedValue.match(/[?&]marker=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/)

  return {
    latitude: markerMatch ? Number(markerMatch[1]) : defaultMapLocation.latitude,
    longitude: markerMatch ? Number(markerMatch[2]) : defaultMapLocation.longitude,
  }
}

export default async function ContactsPage() {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].contacts
  const ru = pageMessages.ru.contacts
  const data = await getCachedGlobal('contactsPage', locale, 1, false)()

  const homeLinkLabel = getPageText(locale, data.homeLinkLabel, ru.homeLink, t.homeLink)
  const breadcrumbsTitle = getPageText(locale, data.breadcrumbsTitle, ru.title, t.title)
  const pageTitle = getPageText(locale, data.pageTitle, ru.title, t.title)
  const contactItems =
    data.contactItems && data.contactItems.length > 0
      ? data.contactItems
      : [
          {
            id: null,
            icon: 'address',
            label: t.addressTitle,
            value: t.addressValue,
          },
          {
            id: null,
            icon: 'phone',
            label: t.phoneTitle,
            value: '+7 (391) 000-00-00',
            href: 'tel:+73910000000',
          },
          {
            id: null,
            icon: 'email',
            label: t.emailTitle,
            value: 'info@runwaytrans.ru',
            href: 'mailto:info@runwaytrans.ru',
          },
        ]
  const requisitesImage =
    typeof data.requisitesImage === 'object' && data.requisitesImage ? data.requisitesImage : null
  const requisitesImageUrl = getMediaUrl(requisitesImage?.url)
  const requisitesText = getPageText(locale, data.requisitesText, ru.requisites, t.requisites)
  const mapLocation = getMapLocation(data.mapEmbedUrl)

  return (
    <main className="container py-12 md:py-16">
      <nav aria-label={t.breadcrumbsAria} className="mb-8 text-sm text-muted-foreground">
        <Link className="transition-colors hover:text-foreground" href="/">
          {homeLinkLabel}
        </Link>{' '}
        / <span className="text-foreground">{breadcrumbsTitle}</span>
      </nav>

      <section className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start">
        <div className="space-y-8">
          <h1 className="text-3xl font-semibold tracking-tight">{pageTitle}</h1>

          <ul className="space-y-5">
            {contactItems.map((item, index) => {
              const Icon = contactIcons[item.icon] ?? MapPin

              return (
                <li className="flex items-start gap-3" key={item.id || `${item.label}-${index}`}>
                  <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-foreground">
                    <Icon className="size-5" />
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <Link className="font-medium hover:underline" href={item.href}>
                        {item.value}
                      </Link>
                    ) : (
                      <p className="whitespace-pre-line font-medium">{item.value}</p>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>

          <CallbackForm
            consent={getPageText(locale, data.consentLabel, ru.consent, t.consent)}
            errorMessage={getPageText(
              locale,
              data.errorMessage,
              'Произошла ошибка при отправке.',
              'Произошла ошибка при отправке.',
            )}
            phonePlaceholder={getPageText(
              locale,
              data.phonePlaceholder,
              ru.phonePlaceholder,
              t.phonePlaceholder,
            )}
            submit={getPageText(locale, data.submitLabel, ru.submit, t.submit)}
            submitting={getPageText(locale, data.submittingLabel, 'Отправка...', 'Отправка...')}
            successMessage={getPageText(
              locale,
              data.successMessage,
              'Заявка успешно отправлена.',
              'Заявка успешно отправлена.',
            )}
            title={getPageText(locale, data.callbackTitle, ru.callbackTitle, t.callbackTitle)}
          />
        </div>

        <div className="space-y-6">
          <div
            aria-label={getPageText(locale, data.mapTitle, ru.mapTitle, t.mapTitle)}
            className="h-[480px] overflow-hidden rounded-lg border border-border"
            role="img"
          >
            <ContactMap latitude={mapLocation.latitude} longitude={mapLocation.longitude} />
          </div>

          {requisitesImageUrl || requisitesText ? (
            <div className="max-w-[280px] rounded-lg border border-border bg-card p-3">
              {requisitesImageUrl ? (
                <img
                  alt={requisitesImage?.alt || requisitesText}
                  className="aspect-[3/4] w-full rounded-md object-cover"
                  src={requisitesImageUrl}
                />
              ) : (
                <div className="aspect-[3/4] rounded-md border border-dashed border-muted-foreground/50 bg-muted" />
              )}
              {requisitesText ? (
                <p className="mt-3 text-sm text-muted-foreground">{requisitesText}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  const t = pageMessages[locale].contacts
  const ru = pageMessages.ru.contacts
  const data = await getCachedGlobal('contactsPage', locale, 0, false)()

  return {
    title: getPageText(locale, data.meta?.title, ru.metadata.title, t.metadata.title),
    description: getPageText(
      locale,
      data.meta?.description,
      ru.metadata.description || '',
      t.metadata.description || '',
    ),
  }
}

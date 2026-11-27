import Link from 'next/link'

type ServiceCard = {
  href?: string
  id: number | string
  imageAlt: string
  imageUrl: string | null
  summary: string
  title: string
}

type ServicesCatalogProps = {
  buttonHref: string
  buttonLabel: string
  services: ServiceCard[]
}

export function ServicesCatalog({ buttonHref, buttonLabel, services }: ServicesCatalogProps) {
  return (
    <>
      <div className="grid gap-x-12 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article className="mx-auto w-full max-w-[390px] text-center" key={service.id}>
            <div className="mx-auto size-28 overflow-hidden rounded-full border border-border bg-muted sm:size-32">
              {service.imageUrl ? (
                <img
                  alt={service.imageAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  src={service.imageUrl}
                />
              ) : null}
            </div>

            <h3 className="mt-7 text-xl leading-tight font-semibold text-foreground">
              {service.href ? (
                <Link
                  className="underline decoration-brand-green-hover underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                  href={service.href}
                >
                  {service.title} <span aria-hidden>›</span>
                </Link>
              ) : (
                service.title
              )}
            </h3>
            <p className="mx-auto mt-5 max-w-[360px] text-lg leading-snug text-muted-foreground">
              {service.summary}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          className="inline-flex min-h-12 max-w-full items-center gap-4 rounded-md bg-brand-green-hover px-8 py-3 text-lg font-semibold text-on-dark transition hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          href={buttonHref}
        >
          {buttonLabel}
          <span aria-hidden className="text-3xl leading-none">
            ›
          </span>
        </Link>
      </div>
    </>
  )
}

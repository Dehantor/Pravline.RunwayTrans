'use client'

import { useState } from 'react'

import { ServiceOrderForm } from '@/components/ServiceOrderForm'
import { Button } from '@/components/ui/button'

type ServiceCard = {
  id: number | string
  imageUrl: string | null
  summary: string
  title: string
}

type ServicesCatalogProps = {
  services: ServiceCard[]
}

export function ServicesCatalog({ services }: ServicesCatalogProps) {
  const [selectedService, setSelectedService] = useState<ServiceCard | null>(null)

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article className="overflow-hidden rounded-sm border border-[#2b7f56] bg-white text-black" key={service.id}>
            {service.imageUrl ? (
              <img alt={service.title} className="h-56 w-full object-cover" loading="lazy" src={service.imageUrl} />
            ) : (
              <div className="flex h-56 w-full items-center justify-center bg-zinc-100 text-zinc-500">Нет изображения</div>
            )}

            <div className="min-h-48 bg-white p-5">
              <h2 className="mb-3 text-xl font-medium">{service.title}</h2>
              <p className="mb-4 text-sm text-zinc-700">{service.summary}</p>

              <Button onClick={() => setSelectedService(service)} type="button" variant="outline">
                Заказать услугу
              </Button>
            </div>
          </article>
        ))}
      </div>

      {selectedService ? (
        <div aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-lg bg-white p-6 text-black">
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="text-2xl font-semibold">Заказать: {selectedService.title}</h3>
              <Button onClick={() => setSelectedService(null)} size="sm" type="button" variant="ghost">
                Закрыть
              </Button>
            </div>

            <ServiceOrderForm serviceId={selectedService.id} />
          </div>
        </div>
      ) : null}
    </>
  )
}

'use client'

import { VacancyApplicationForm } from '@/components/VacancyApplicationForm'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type VacancyApplicationModalProps = {
  buttonLabel?: string
  vacancyId: number | string
  vacancyTitle: string
}

export function VacancyApplicationModal({
  buttonLabel = 'Откликнуться',
  vacancyId,
  vacancyTitle,
}: VacancyApplicationModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen])

  return (
    <>
      <button
        className="inline-flex min-h-11 items-center justify-center rounded-md bg-brand-green px-7 py-2 font-semibold text-on-dark transition-colors hover:bg-brand-green-hover"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        {buttonLabel}
      </button>

      {isOpen &&
        createPortal(
          <div
            aria-label={`Отклик на вакансию ${vacancyTitle}`}
            aria-modal="true"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
            onClick={() => setIsOpen(false)}
            role="dialog"
          >
            <div
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-background-light p-6 text-ink shadow-2xl sm:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                aria-label="Закрыть форму"
                className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full hover:bg-background-muted"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <X className="size-5" />
              </button>

              <h2 className="mb-6 pr-12 text-2xl font-semibold">Отклик: {vacancyTitle}</h2>
              <VacancyApplicationForm vacancyId={vacancyId} />
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

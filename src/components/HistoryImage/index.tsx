'use client'

import { Maximize2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type HistoryImageProps = {
  alt: string
  className: string
  src: string
}

export function HistoryImage({ alt, className, src }: HistoryImageProps) {
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
      <div className={className}>
        <button
          aria-label={`Открыть изображение: ${alt}`}
          className="group relative h-full w-full cursor-zoom-in"
          onClick={() => setIsOpen(true)}
          type="button"
        >
          <img alt={alt} className="h-full w-full object-cover" loading="lazy" src={src} />
          <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10 group-focus-visible:bg-black/10">
            <span className="flex size-11 scale-90 items-center justify-center rounded-sm bg-brand-green text-on-dark opacity-0 shadow-lg transition group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
              <Maximize2 className="size-5" />
            </span>
          </span>
        </button>
      </div>

      {isOpen &&
        createPortal(
          <div
            aria-label={alt}
            aria-modal="true"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4"
            onClick={() => setIsOpen(false)}
            role="dialog"
          >
            <button
              aria-label="Закрыть изображение"
              className="absolute top-5 right-5 flex size-11 items-center justify-center rounded-full bg-background-light text-ink shadow-lg"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <X className="size-6" />
            </button>
            <img
              alt={alt}
              className="max-h-[80vh] max-w-[80vw] object-contain shadow-2xl"
              onClick={(event) => event.stopPropagation()}
              src={src}
            />
          </div>,
          document.body,
        )}
    </>
  )
}

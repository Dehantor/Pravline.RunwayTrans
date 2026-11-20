'use client'

import { Maximize2, X } from 'lucide-react'
import { useRef } from 'react'

type HistoryImageProps = {
  alt: string
  className: string
  closeLabel: string
  openLabel: string
  src: string
}

export function HistoryImage({ alt, className, closeLabel, openLabel, src }: HistoryImageProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const opener = useRef<HTMLButtonElement>(null)

  return (
    <div className={className}>
      <button
        aria-label={`${openLabel}: ${alt}`}
        className="relative block aspect-[2.2] w-full cursor-zoom-in overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
        onClick={() => dialog.current?.showModal()}
        ref={opener}
        title={openLabel}
        type="button"
      >
        <img alt="" className="h-full w-full object-cover" loading="lazy" src={src} />
        <span className="absolute right-2 bottom-2 flex size-8 items-center justify-center rounded-md bg-card text-card-foreground shadow-sm">
          <Maximize2 aria-hidden="true" className="size-4" />
        </span>
      </button>

      <dialog
        aria-label={alt}
        className="m-auto max-w-[92vw] overflow-visible rounded-lg bg-card text-card-foreground backdrop:bg-[rgb(0_0_0/0.75)]"
        data-history-image
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close()
        }}
        onClose={() => opener.current?.focus()}
        ref={dialog}
      >
        <div className="relative overflow-hidden rounded-lg">
          <button
            aria-label={closeLabel}
            className="absolute top-2 right-2 flex size-11 items-center justify-center rounded-full bg-card text-card-foreground shadow-sm focus-visible:outline-2 focus-visible:outline-brand-green"
            onClick={() => dialog.current?.close()}
            title={closeLabel}
            type="button"
          >
            <X aria-hidden="true" className="size-6" />
          </button>
          <img
            alt={alt}
            className="max-h-[85vh] max-w-full object-contain"
            loading="lazy"
            src={src}
          />
        </div>
      </dialog>
    </div>
  )
}

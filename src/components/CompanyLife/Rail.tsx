'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import { type KeyboardEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react'

import styles from './styles.module.css'

type ScrollAvailability = { previous: boolean; next: boolean }
type ScrollMovement = 'previous' | 'next' | 'first' | 'last'

const snapTolerance = 1

function maximumScroll(viewport: HTMLUListElement) {
  return Math.max(viewport.scrollWidth - viewport.clientWidth, 0)
}

function snapOffsets(viewport: HTMLUListElement) {
  const maximum = maximumScroll(viewport)
  return [
    0,
    ...Array.from(viewport.children, (item) => Math.min((item as HTMLElement).offsetLeft, maximum)),
    maximum,
  ]
}

const keyboardMovements = {
  ArrowLeft: 'previous',
  ArrowRight: 'next',
  Home: 'first',
  End: 'last',
} satisfies Record<string, ScrollMovement>

export function CompanyLifeRail({
  children,
  labelledBy,
  next,
  previous,
}: {
  children: ReactNode
  labelledBy: string
  next: string
  previous: string
}) {
  const viewportId = useId()
  const viewportRef = useRef<HTMLUListElement>(null)
  const [availability, setAvailability] = useState<ScrollAvailability | null>(null)

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    let frame: number | undefined
    const scheduleSync = () => {
      if (frame !== undefined) return

      frame = window.requestAnimationFrame(() => {
        frame = undefined
        const position = viewport.scrollLeft
        const previous = position > snapTolerance
        const next = position < maximumScroll(viewport) - snapTolerance

        setAvailability((current) =>
          current?.previous === previous && current.next === next ? current : { previous, next },
        )
      })
    }

    viewport.addEventListener('scroll', scheduleSync, { passive: true })
    const observer =
      typeof window.ResizeObserver === 'function' ? new ResizeObserver(scheduleSync) : null
    observer?.observe(viewport)
    if (!observer) window.addEventListener('resize', scheduleSync)
    scheduleSync()

    return () => {
      viewport.removeEventListener('scroll', scheduleSync)
      observer?.disconnect()
      if (!observer) window.removeEventListener('resize', scheduleSync)
      if (frame !== undefined) window.cancelAnimationFrame(frame)
    }
  }, [])

  function move(movement: ScrollMovement) {
    const viewport = viewportRef.current
    if (!viewport) return

    const position = viewport.scrollLeft
    const offsets = snapOffsets(viewport)
    let target: number | undefined

    switch (movement) {
      case 'first':
        target = offsets[0]
        break
      case 'last':
        target = offsets[offsets.length - 1]
        break
      case 'next':
        target = offsets.find((offset) => offset > position + snapTolerance)
        break
      case 'previous':
        target = offsets.reverse().find((offset) => offset < position - snapTolerance)
        break
    }

    if (target !== undefined) viewport.scrollTo({ left: target, behavior: 'auto' })
  }

  function handleKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (
      event.target !== event.currentTarget ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey
    ) {
      return
    }

    const movement = keyboardMovements[event.key as keyof typeof keyboardMovements]
    if (!movement) return

    event.preventDefault()
    move(movement)
  }

  return (
    <>
      <ul
        aria-labelledby={labelledBy}
        className={styles.viewport}
        id={viewportId}
        onKeyDown={handleKeyDown}
        ref={viewportRef}
        role="list"
        tabIndex={0}
      >
        {children}
      </ul>
      <div className={styles.controls} data-ready={availability !== null}>
        <button
          aria-controls={viewportId}
          aria-disabled={!availability?.previous}
          aria-label={previous}
          className={styles.arrow}
          onClick={() => move('previous')}
          title={previous}
          type="button"
        >
          <ArrowLeft aria-hidden="true" className={styles.glyph} strokeWidth={1.75} />
        </button>
        <button
          aria-controls={viewportId}
          aria-disabled={!availability?.next}
          aria-label={next}
          className={styles.arrow}
          onClick={() => move('next')}
          title={next}
          type="button"
        >
          <ArrowRight aria-hidden="true" className={styles.glyph} strokeWidth={1.75} />
        </button>
      </div>
    </>
  )
}

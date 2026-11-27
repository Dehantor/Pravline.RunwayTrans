'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useId, useState, useSyncExternalStore } from 'react'

import type { AppLocale } from '@/i18n/locales'
import type { bannerControls, HomeBannerContent } from './content'
import styles from './styles.module.css'

const rotationDelay = 30_000
const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

function prefersReducedMotion() {
  return window.matchMedia(reducedMotionQuery).matches
}

type HomeBannerProps = {
  content: HomeBannerContent
  controls: (typeof bannerControls)[AppLocale]
  images: readonly string[]
  locale: AppLocale
}

export function HomeBanner({ content, controls, images, locale }: HomeBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const reduceMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    prefersReducedMotion,
    () => false,
  )
  const imageCount = images.length
  const hasMultipleImages = imageCount > 1
  const isRotating = hasMultipleImages && !reduceMotion && !hovered && !focused
  const imageId = useId()
  const image = images[activeIndex]

  useEffect(() => {
    if (!isRotating) return

    const timeout = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % imageCount)
    }, rotationDelay)

    return () => window.clearTimeout(timeout)
  }, [activeIndex, isRotating, imageCount])

  function moveBy(offset: number) {
    setActiveIndex((index) => (index + offset + imageCount) % imageCount)
  }

  return (
    <section
      aria-label={controls.region}
      className={styles.banner}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {image && (
        <Image
          id={imageId}
          alt=""
          className={styles.image}
          fill
          fetchPriority={activeIndex === 0 ? 'high' : 'auto'}
          loading="eager"
          src={image}
          unoptimized
        />
      )}
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.titleFirst}>{content.title[0]}</span>
          <span className={styles.titleSecond}>{content.title[1]}</span>
        </h1>
        <div className={styles.details}>
          <p className={styles.description}>{content.description.join('\n')}</p>
          <div className={styles.actions}>
            {content.actions.map(
              (action, index) =>
                action && (
                  <Link
                    className={index === 0 ? styles.primary : styles.secondary}
                    href={`/${locale}${action.path}`}
                    key={action.path}
                  >
                    {action.label}
                  </Link>
                ),
            )}
          </div>
        </div>
      </div>

      {hasMultipleImages && (
        <div className={styles.controls}>
          <button
            aria-controls={imageId}
            aria-label={controls.previous}
            className={`${styles.control} ${styles.previous}`}
            onClick={() => moveBy(-1)}
            title={controls.previous}
            type="button"
          >
            <svg aria-hidden="true" viewBox="0 0 50 50" fill="currentColor">
              <path
                d="M17.6 24.3l9.5-9.5c.2-.2.4-.3.7-.3s.5.1.7.3c.4.4.4 1 0 1.4L19.6 25l8.9 8.9c.4.4.4 1 0 1.3-.4.4-1 .4-1.3 0l-9.5-9.5c-.5-.4-.5-1-.1-1.4z"
                transform="translate(2 0)"
              />
            </svg>
          </button>
          <div className={styles.indicators}>
            {images.map((src, index) => {
              const label = `${controls.slide} ${index + 1}`

              return (
                <button
                  aria-controls={imageId}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  aria-label={label}
                  className={styles.indicator}
                  key={src}
                  onClick={() => setActiveIndex(index)}
                  title={label}
                  type="button"
                />
              )
            })}
          </div>
          <button
            aria-controls={imageId}
            aria-label={controls.next}
            className={`${styles.control} ${styles.next}`}
            onClick={() => moveBy(1)}
            title={controls.next}
            type="button"
          >
            <svg aria-hidden="true" viewBox="0 0 50 50" fill="currentColor">
              <path
                d="M32.4 25.7l-9.5 9.5c-.2.2-.4.3-.7.3s-.5-.1-.7-.3c-.4-.4-.4-1 0-1.4l8.9-8.8-8.9-8.9c-.4-.4-.4-1 0-1.3.4-.4 1-.4 1.3 0l9.5 9.5c.5.4.5 1 .1 1.4z"
                transform="translate(-2 0)"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}

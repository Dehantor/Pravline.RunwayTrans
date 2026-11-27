'use client'

import { useEffect, useRef, useState } from 'react'

import { GeographyMapClientOnly } from './ClientOnly'
import styles from './map.module.css'
import type { GeographyRoute } from './routes'

type GeographyOverviewProps = {
  label: string
  messages: { empty: string; loading: string; basemapUnavailable: string }
  routes: GeographyRoute[]
  zoomInLabel: string
  zoomOutLabel: string
}

export function GeographyOverview({
  label,
  messages,
  routes,
  zoomInLabel,
  zoomOutLabel,
}: GeographyOverviewProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [basemapStatus, setBasemapStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading')
  const hasRoutes = routes.length > 0

  useEffect(() => {
    const frame = frameRef.current
    if (!hasRoutes || active || !frame) return

    if (typeof window.IntersectionObserver !== 'function') {
      const frameId = window.requestAnimationFrame(() => setActive(true))
      return () => window.cancelAnimationFrame(frameId)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        setActive(true)
      },
      { rootMargin: '200px 0px' },
    )
    observer.observe(frame)

    return () => observer.disconnect()
  }, [active, hasRoutes])

  return (
    <div className={`${styles.frame} ${styles.overview}`} ref={frameRef}>
      {hasRoutes ? (
        <>
          {active && (
            <div className={styles.overviewMap}>
              <GeographyMapClientOnly
                focusRequest={null}
                label={label}
                mode="overview"
                onBasemapStatusChange={setBasemapStatus}
                routes={routes}
                zoomInLabel={zoomInLabel}
                zoomOutLabel={zoomOutLabel}
              />
            </div>
          )}
          <span className={styles.overviewBadge}>{label}</span>
          <p aria-atomic="true" className={styles.overviewStatus} role="status">
            {basemapStatus === 'loading'
              ? messages.loading
              : basemapStatus === 'unavailable'
                ? messages.basemapUnavailable
                : null}
          </p>
        </>
      ) : (
        <p className={styles.overviewEmpty}>{messages.empty}</p>
      )}
    </div>
  )
}

'use client'

import type { GeographyFilterLabels, GeographyFilterMessages } from '@/Geography/filterMessages'
import { ChevronRight, Clock } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import Select, { type AriaLiveMessages, type GroupBase, type StylesConfig } from 'react-select'
import { GeographyMapClientOnly } from './ClientOnly'
import styles from './map.module.css'
import { hasRouteGeometry, type GeographyDelivery, type RouteFocusRequest } from './routes'

type FilterOption = { value: string; label: string }

type DeliveryFiltersProps = {
  deliveries: GeographyDelivery[]
  mapLabel: string
  messages: GeographyFilterLabels & GeographyFilterMessages
  regions: FilterOption[]
  zoomInLabel: string
  zoomOutLabel: string
}

const initialFilters = { period: '', region: '', showAllTerrain: true, showCars: true }

const filterStyles: StylesConfig<FilterOption, false> = {
  control: (base, { isDisabled, isFocused }) => ({
    ...base,
    backgroundColor: isDisabled ? 'var(--muted)' : 'var(--background)',
    borderColor: isFocused ? 'var(--ring)' : 'var(--border)',
    borderRadius: '0.375rem',
    boxShadow: isFocused ? '0 0 0 2px var(--ring)' : undefined,
    minHeight: 44,
    '&:hover': { borderColor: isFocused ? 'var(--ring)' : 'var(--muted-foreground)' },
  }),
  dropdownIndicator: (base, { isDisabled }) => ({
    ...base,
    color: isDisabled ? 'var(--muted-foreground)' : 'var(--brand-green)',
    padding: '0 7px',
    '&:hover': { color: 'var(--foreground)' },
  }),
  indicatorSeparator: (base) => ({ ...base, display: 'none' }),
  menu: (base) => ({
    ...base,
    backgroundColor: 'var(--popover)',
    border: '1px solid var(--border)',
    color: 'var(--popover-foreground)',
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected || isFocused ? 'var(--muted)' : 'transparent',
    boxShadow: isSelected ? 'inset 3px 0 var(--ring)' : undefined,
    color: 'var(--popover-foreground)',
    fontWeight: isSelected ? 600 : undefined,
    overflowWrap: 'anywhere',
    '&:active': { backgroundColor: 'var(--muted)' },
  }),
  placeholder: (base) => ({ ...base, color: 'var(--muted-foreground)' }),
  singleValue: (base) => ({
    ...base,
    color: 'var(--foreground)',
    lineHeight: 1.2,
    overflowWrap: 'anywhere',
    whiteSpace: 'normal',
  }),
  valueContainer: (base) => ({ ...base, padding: '2px 7px' }),
}

function VehicleSwitch({
  checked,
  label,
  onChange,
}: {
  checked: boolean
  label: string
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="inline-flex min-h-11 cursor-pointer items-center gap-2">
      <span>{label}</span>
      <input
        checked={checked}
        className="peer sr-only"
        onChange={(event) => onChange(event.target.checked)}
        role="switch"
        type="checkbox"
      />
      <span
        aria-hidden="true"
        className="relative h-5 w-9 shrink-0 rounded-full border border-ring bg-muted after:absolute after:top-px after:left-px after:size-4 after:rounded-full after:bg-muted-foreground after:content-[''] peer-checked:border-brand-green peer-checked:bg-brand-green peer-checked:after:translate-x-4 peer-checked:after:bg-on-dark peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring"
      />
    </label>
  )
}

export function DeliveryFilters({
  deliveries,
  mapLabel,
  messages,
  regions,
  zoomInLabel,
  zoomOutLabel,
}: DeliveryFiltersProps) {
  const [{ period, region, showAllTerrain, showCars }, setFilters] = useState(initialFilters)
  const [focusRequest, setFocusRequest] = useState<RouteFocusRequest | null>(null)
  const mapFrameRef = useRef<HTMLDivElement>(null)

  function changeFilters(changes: Partial<typeof initialFilters>) {
    setFilters((current) => ({ ...current, ...changes }))
    setFocusRequest(null)
  }

  function showRoute(routeId: string) {
    setFocusRequest((current) => ({ routeId, revision: (current?.revision ?? 0) + 1 }))
    mapFrameRef.current?.scrollIntoView({ block: 'center', inline: 'nearest' })
  }
  const periods = Array.from(
    new Set(deliveries.map((delivery) => delivery.period.trim()).filter(Boolean)),
  )
  const periodOptions = [
    { value: '', label: messages.allPeriods },
    ...periods.map((value) => ({ value, label: value })),
  ]
  const regionOptions = [{ value: '', label: messages.allRegions }, ...regions]
  const selectedPeriod = periodOptions.find((option) => option.value === period) ?? periodOptions[0]
  const selectedRegion = regionOptions.find((option) => option.value === region) ?? regionOptions[0]
  const periodValue = selectedPeriod.value
  const regionValue = selectedRegion.value
  const visibleDeliveries = useMemo(
    () =>
      deliveries.filter((delivery) => {
        if (periodValue && delivery.period.trim() !== periodValue) return false
        if (regionValue && delivery.region !== regionValue) return false
        if (delivery.vehicle === 'allTerrain') return showAllTerrain
        if (delivery.vehicle === 'cars') return showCars
        return showAllTerrain && showCars
      }),
    [deliveries, periodValue, regionValue, showAllTerrain, showCars],
  )
  const ariaLiveMessages: AriaLiveMessages<FilterOption, false, GroupBase<FilterOption>> = {
    guidance: ({ context, isInitialFocus }) => {
      if (context === 'menu') return messages.selectNavigate
      return context === 'input' && isInitialFocus ? messages.selectOpen : ''
    },
    onChange: ({ label, labels }) => {
      const selected = label || labels[0]
      return selected ? messages.selectSelected.replace('{label}', selected) : ''
    },
    onFilter: ({ resultsMessage }) => resultsMessage,
    onFocus: ({ context, label, isAppleDevice, isSelected }) => {
      if (context !== 'menu' || !isAppleDevice) return ''
      return isSelected ? messages.selectSelected.replace('{label}', label) : label
    },
  }
  const screenReaderStatus = ({ count }: { count: number }) =>
    messages.selectOptions.replace('{count}', String(count))
  const hasUnspecifiedVehicles = deliveries.some((delivery) => delivery.vehicle === null)
  const focusedDelivery = visibleDeliveries.find(
    (delivery) => delivery.id === focusRequest?.routeId,
  )

  return (
    <div className="space-y-5">
      <section aria-labelledby="geography-map-title" className="space-y-3.5">
        <h2 className="text-2xl leading-tight font-bold md:text-[28px]" id="geography-map-title">
          {mapLabel}
        </h2>
        <div
          className={`${styles.frame} relative isolate aspect-[2.85] min-h-[270px] w-full min-w-0 overflow-hidden rounded-[10px] border border-border bg-muted`}
          id="geography-map"
          ref={mapFrameRef}
        >
          <span className="pointer-events-none absolute top-3 left-3 z-[500] max-w-[calc(100%-5rem)] rounded-lg border border-border bg-popover px-3 py-1.5 text-sm leading-tight font-medium text-popover-foreground shadow-sm">
            {messages.mapBadge}
          </span>
          <GeographyMapClientOnly
            focusRequest={focusRequest}
            label={mapLabel}
            routes={visibleDeliveries}
            zoomInLabel={zoomInLabel}
            zoomOutLabel={zoomOutLabel}
          />
        </div>
        <p className="sr-only" role="status">
          {focusedDelivery ? messages.focusedRoute.replace('{label}', focusedDelivery.title) : ''}
        </p>

        <div
          className="relative z-10 grid scroll-mt-6 items-start gap-x-3 gap-y-2.5 rounded-[9px] border border-border bg-on-dark p-3 text-sm text-card-foreground dark:bg-card sm:grid-cols-2 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1.75fr)_minmax(0,1fr)_minmax(0,1.25fr)]"
          id="geography-filters"
          tabIndex={-1}
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <label className="max-w-[40%] wrap-anywhere" htmlFor="geography-period">
              {messages.periodLabel}
            </label>
            <Select
              ariaLiveMessages={ariaLiveMessages}
              className="min-w-0 flex-1"
              inputId="geography-period"
              instanceId="geography-period"
              isSearchable={false}
              menuPlacement="auto"
              onChange={(option) => changeFilters({ period: option?.value ?? '' })}
              options={periodOptions}
              screenReaderStatus={screenReaderStatus}
              styles={filterStyles}
              tabSelectsValue={false}
              value={selectedPeriod}
            />
          </div>

          <fieldset
            aria-describedby={hasUnspecifiedVehicles ? 'geography-vehicle-hint' : undefined}
            className="min-w-0 lg:border-l lg:border-border lg:pl-3"
          >
            <legend className="sr-only">{messages.vehicleGroup}</legend>
            <div className="flex min-h-11 flex-wrap items-center gap-x-3">
              <VehicleSwitch
                checked={showAllTerrain}
                label={messages.vehicleAllTerrain}
                onChange={(checked) => changeFilters({ showAllTerrain: checked })}
              />
              <VehicleSwitch
                checked={showCars}
                label={messages.vehicleCars}
                onChange={(checked) => changeFilters({ showCars: checked })}
              />
            </div>
            {hasUnspecifiedVehicles && (
              <p className="mt-1 text-xs text-muted-foreground" id="geography-vehicle-hint">
                {messages.vehicleUnknownHint}
              </p>
            )}
          </fieldset>

          <div
            aria-describedby="geography-cargo-unavailable"
            aria-labelledby="geography-cargo-label"
            className="min-w-0 lg:border-l lg:border-border lg:pl-3"
            role="group"
          >
            <div className="flex items-center gap-2.5">
              <span className="max-w-[50%] wrap-anywhere" id="geography-cargo-label">
                {messages.cargoType}
              </span>
              <Select
                aria-labelledby="geography-cargo-label"
                className="min-w-0 flex-1"
                inputId="geography-cargo"
                instanceId="geography-cargo"
                isDisabled
                isSearchable={false}
                placeholder="—"
                styles={filterStyles}
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground" id="geography-cargo-unavailable">
              {messages.cargoUnavailable}
            </p>
          </div>

          <div className="flex min-w-0 items-center gap-2.5 lg:border-l lg:border-border lg:pl-3">
            <label className="max-w-[40%] wrap-anywhere" htmlFor="geography-region">
              {messages.region}
            </label>
            <Select
              ariaLiveMessages={ariaLiveMessages}
              className="min-w-0 flex-1"
              inputId="geography-region"
              instanceId="geography-region"
              isSearchable={false}
              menuPlacement="auto"
              onChange={(option) => changeFilters({ region: option?.value ?? '' })}
              options={regionOptions}
              screenReaderStatus={screenReaderStatus}
              styles={filterStyles}
              tabSelectsValue={false}
              value={selectedRegion}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="geography-routes-title" className="space-y-3.5">
        <h2 className="text-2xl leading-tight font-bold md:text-[28px]" id="geography-routes-title">
          {messages.routesTitle}
        </h2>
        {visibleDeliveries.length > 0 ? (
          <ul className="space-y-3">
            {visibleDeliveries.map((delivery) => (
              <li
                className="relative flex min-h-[90px] items-center gap-1.5 rounded-[9px] border border-border bg-on-dark py-3 pr-2 pl-8 text-card-foreground dark:bg-card sm:gap-5 sm:pr-2.5 sm:pl-14"
                key={delivery.id}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-3.5 left-3 w-2 rounded-full sm:left-5 sm:w-2.5"
                  style={{ backgroundColor: delivery.color }}
                />
                <div className="grid min-w-0 flex-1 items-center gap-2.5 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-5">
                  <div className="min-w-0 wrap-anywhere">
                    <p className="text-sm text-muted-foreground">{delivery.period}</p>
                    <h3 className="text-[19px] leading-tight font-bold md:text-xl">
                      {delivery.title}
                    </h3>
                    <p className="leading-snug">{delivery.route}</p>
                  </div>
                  {delivery.duration && (
                    <div className="flex min-w-0 items-start gap-2.5 sm:w-44 sm:border-l sm:border-border sm:py-1 sm:pl-5">
                      <Clock
                        aria-hidden="true"
                        className="mt-0.5 size-5 shrink-0 text-muted-foreground"
                      />
                      <div className="min-w-0 wrap-anywhere">
                        <p className="text-sm leading-tight text-muted-foreground">
                          {messages.deliveryDuration}
                        </p>
                        <p className="text-lg leading-tight font-bold">{delivery.duration}</p>
                      </div>
                    </div>
                  )}
                </div>
                {hasRouteGeometry(delivery.points) && (
                  <button
                    aria-controls="geography-map"
                    aria-label={`${messages.focusRoute} — ${delivery.title}`}
                    className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    onClick={() => showRoute(delivery.id)}
                    title={messages.focusRoute}
                    type="button"
                  >
                    <ChevronRight aria-hidden="true" className="size-6" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p
            className="rounded-[9px] border border-border bg-on-dark px-4 py-5 text-muted-foreground dark:bg-card"
            role="status"
          >
            {messages.noResults}
          </p>
        )}
      </section>
    </div>
  )
}

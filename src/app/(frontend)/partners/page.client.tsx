'use client'

import React, { useMemo, useState } from 'react'

type Partner = {
  key: string
  name: string
  description: string
  logoUrl: string | null
}

type PartnersGridProps = {
  noLogoLabel: string
  partners: Partner[]
}

const desktopColumns = 3

function chunkPartners(partners: Partner[]) {
  const rows: Partner[][] = []

  for (let index = 0; index < partners.length; index += desktopColumns) {
    rows.push(partners.slice(index, index + desktopColumns))
  }

  return rows
}

export function PartnersGrid({ noLogoLabel, partners }: PartnersGridProps) {
  const [activeKey, setActiveKey] = useState(partners[1]?.key || partners[0]?.key || null)
  const rows = useMemo(() => chunkPartners(partners), [partners])
  const activePartner = partners.find((partner) => partner.key === activeKey) || partners[0]

  if (!activePartner) return null

  return (
    <section className="space-y-9">
      <div className="space-y-8 max-md:hidden">
        {rows.map((row) => {
          const rowHasActivePartner = row.some((partner) => partner.key === activePartner.key)

          return (
            <React.Fragment key={row.map((partner) => partner.key).join('-')}>
              <div className="grid grid-cols-3 items-end gap-x-14 gap-y-8">
                {row.map((partner) => (
                  <button
                    aria-pressed={partner.key === activePartner.key}
                    className="group flex min-h-32 min-w-0 flex-col items-center justify-end rounded text-center focus-visible:outline-2 focus-visible:outline-offset-4"
                    key={partner.key}
                    onClick={() => setActiveKey(partner.key)}
                    type="button"
                  >
                    <span className="flex h-24 w-full items-center justify-center">
                      {partner.logoUrl ? (
                        <img
                          alt=""
                          className="max-h-24 max-w-full object-contain transition duration-200 group-hover:scale-[1.03]"
                          loading="lazy"
                          src={partner.logoUrl}
                        />
                      ) : (
                        <span className="flex h-20 w-full items-center justify-center bg-muted text-sm text-muted-foreground">
                          {noLogoLabel}
                        </span>
                      )}
                    </span>
                    <span
                      className={`mt-5 text-base wrap-anywhere transition ${
                        partner.key === activePartner.key
                          ? 'font-semibold text-foreground'
                          : 'text-muted-foreground group-hover:text-foreground'
                      }`}
                    >
                      {partner.name}
                    </span>
                  </button>
                ))}
              </div>

              {rowHasActivePartner ? (
                <div className="bg-muted px-8 py-9 text-left">
                  <p className="max-w-4xl text-base leading-7 wrap-anywhere text-foreground">
                    {activePartner.description || activePartner.name}
                  </p>
                  <p className="mt-6 text-base font-semibold wrap-anywhere">{activePartner.name}</p>
                </div>
              ) : null}
            </React.Fragment>
          )
        })}
      </div>

      <div className="space-y-6 md:hidden">
        {partners.map((partner) => {
          const isActive = partner.key === activePartner.key

          return (
            <div className="space-y-4" key={partner.key}>
              <button
                aria-pressed={isActive}
                className="flex w-full flex-col items-center rounded text-center focus-visible:outline-2 focus-visible:outline-offset-4"
                onClick={() => setActiveKey(partner.key)}
                type="button"
              >
                <span className="flex h-24 w-full items-center justify-center">
                  {partner.logoUrl ? (
                    <img
                      alt=""
                      className="max-h-24 max-w-full object-contain"
                      loading="lazy"
                      src={partner.logoUrl}
                    />
                  ) : (
                    <span className="flex h-20 w-full items-center justify-center bg-muted text-sm text-muted-foreground">
                      {noLogoLabel}
                    </span>
                  )}
                </span>
                <span
                  className={`mt-4 text-base wrap-anywhere ${isActive ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}
                >
                  {partner.name}
                </span>
              </button>

              {isActive ? (
                <div className="bg-muted px-5 py-6 text-left">
                  <p className="text-base leading-7 wrap-anywhere text-foreground">
                    {partner.description || partner.name}
                  </p>
                  <p className="mt-5 text-base font-semibold wrap-anywhere">{partner.name}</p>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </section>
  )
}

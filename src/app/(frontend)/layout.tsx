import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { Open_Sans } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { LiveChat } from '@/components/LiveChat'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import 'leaflet/dist/leaflet.css'
import { getServerSideURL } from '@/utilities/getURL'
import { getRequestLocale } from '@/i18n/getRequestLocale'

const openSans = Open_Sans({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-open-sans',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const locale = await getRequestLocale()

  return (
    <html
      className={cn(openSans.variable, GeistMono.variable)}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
          <LiveChat />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'Runway Trans',
  description: 'Грузоперевозки в труднодоступные районы Севера.',
  metadataBase: new URL(getServerSideURL()),
  icons: {
    icon: [
      { url: '/favicon.ico?v=runway-trans', type: 'image/x-icon', sizes: '16x16 32x32 48x48' },
      { url: '/favicon.svg?v=runway-trans', type: 'image/svg+xml', sizes: 'any' },
    ],
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}

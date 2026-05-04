import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getLocaleFromAcceptLanguage, isAppLocale, type AppLocale } from './i18n/locales'

const localeCookieName = 'rw_locale'

function resolveLocale(request: NextRequest): AppLocale {
  const cookieLocale = request.cookies.get(localeCookieName)?.value?.toLowerCase()

  if (cookieLocale && isAppLocale(cookieLocale)) {
    return cookieLocale
  }

  return getLocaleFromAcceptLanguage(request.headers.get('accept-language'))
}

function isFileRequest(pathname: string): boolean {
  return /\.[^/]+$/.test(pathname)
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/next') ||
    pathname.startsWith('/graphql') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/media') ||
    pathname.startsWith('/website-template-OG') ||
    isFileRequest(pathname)
  ) {
    return NextResponse.next()
  }

  const [, maybeLocale, ...restSegments] = pathname.split('/')

  if (maybeLocale && isAppLocale(maybeLocale)) {
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = restSegments.length > 0 ? `/${restSegments.join('/')}` : '/'

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-rw-locale', maybeLocale)

    const response = NextResponse.rewrite(rewriteUrl, {
      request: {
        headers: requestHeaders,
      },
    })
    response.cookies.set(localeCookieName, maybeLocale, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    })
    return response
  }

  const locale = resolveLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`

  const response = NextResponse.redirect(url)
  response.cookies.set(localeCookieName, locale, {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  })

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

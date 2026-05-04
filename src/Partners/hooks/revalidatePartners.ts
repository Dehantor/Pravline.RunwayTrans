import type { GlobalAfterChangeHook } from 'payload'

import { locales } from '@/i18n/locales'
import { revalidateTag } from 'next/cache'

export const revalidatePartners: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating partners page')

    revalidateTag('global_partnersPage', 'max')
    locales.forEach((locale) => revalidateTag(`global_partnersPage_${locale}`, 'max'))
  }

  return doc
}

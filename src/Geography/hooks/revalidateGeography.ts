import type { GlobalAfterChangeHook } from 'payload'

import { locales } from '@/i18n/locales'
import { revalidateTag } from 'next/cache'

export const revalidateGeography: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating geography page')

    revalidateTag('global_geographyPage', 'max')
    locales.forEach((locale) => revalidateTag(`global_geographyPage_${locale}`, 'max'))
  }

  return doc
}

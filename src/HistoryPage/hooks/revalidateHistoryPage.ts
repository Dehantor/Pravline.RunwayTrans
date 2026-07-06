import type { GlobalAfterChangeHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

import { locales } from '@/i18n/locales'

export const revalidateHistoryPage: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info('Revalidating history page')

  revalidatePath('/istoriya')
  locales.forEach((locale) => {
    revalidatePath(`/${locale}/istoriya`)
    revalidateTag(`global_historyPage_${locale}`, 'max')
  })

  return doc
}

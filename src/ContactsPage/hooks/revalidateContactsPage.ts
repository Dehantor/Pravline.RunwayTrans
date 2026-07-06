import type { GlobalAfterChangeHook } from 'payload'

import { locales } from '@/i18n/locales'
import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateContactsPage: GlobalAfterChangeHook = ({
  doc,
  req: { context, payload },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating contacts page')

    revalidatePath('/contacts')
    revalidateTag('global_contactsPage', 'max')
    locales.forEach((locale) => revalidateTag(`global_contactsPage_${locale}`, 'max'))
  }

  return doc
}

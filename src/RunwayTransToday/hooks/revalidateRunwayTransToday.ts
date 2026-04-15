import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateRunwayTransToday: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating runway trans today page')

    revalidateTag('global_runwayTransTodayPage', 'max')
  }

  return doc
}

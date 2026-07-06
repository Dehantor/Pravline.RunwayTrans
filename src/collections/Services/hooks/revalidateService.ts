import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Service } from '../../../payload-types'

export const revalidateService: CollectionAfterChangeHook<Service> = ({
  doc,
  previousDoc,
  req: { context, payload },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating services pages')
    revalidatePath('/uslugi')

    if (doc.slug) revalidatePath(`/uslugi/${doc.slug}`)
    if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
      revalidatePath(`/uslugi/${previousDoc.slug}`)
    }
  }

  return doc
}

export const revalidateServiceDelete: CollectionAfterDeleteHook<Service> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath('/uslugi')
    if (doc?.slug) revalidatePath(`/uslugi/${doc.slug}`)
  }

  return doc
}

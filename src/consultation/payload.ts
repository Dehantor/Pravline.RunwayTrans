import {
  APIError,
  type Access,
  type CollectionBeforeChangeHook,
  type CollectionBeforeDeleteHook,
  type Payload,
  type PayloadRequest,
} from 'payload'

import { userHasRole } from '@/access/roles'
import type { Form, FormSubmission } from '@/payload-types'

export const consultationFormTitle = 'Консультация с главной страницы'
export const consultationSubmissionMarker = Symbol('consultation submission')
export const consultationProvisionMarker = Symbol('consultation provisioning')

type ConsultationContext = {
  [consultationSubmissionMarker]?: number
  [consultationProvisionMarker]?: boolean
}

const isOperator = (user: unknown) => userHasRole(user, ['admin', 'office-manager'])

export async function findConsultationForms(payload: Payload, req?: PayloadRequest) {
  const { docs } = await payload.find({
    collection: 'forms',
    where: { title: { equals: consultationFormTitle } },
    depth: 0,
    pagination: false,
    limit: 0,
    overrideAccess: true,
    req,
  })
  return docs
}

function formId(value: unknown) {
  const id = typeof value === 'string' && /^\d+$/.test(value) ? Number(value) : value
  return typeof id === 'number' && Number.isSafeInteger(id) && id > 0 ? id : null
}

export const createConsultationSubmission: Access<FormSubmission> = async ({ data, req }) => {
  if (!data) return true
  const id = formId(data.form)
  if (id === null) return false

  const context = req.context as ConsultationContext
  if (req.payloadAPI === 'local' && context[consultationSubmissionMarker] === id) return true

  const reserved = await req.payload.find({
    collection: 'forms',
    where: {
      and: [{ id: { equals: id } }, { title: { equals: consultationFormTitle } }],
    },
    limit: 1,
    depth: 0,
    select: { title: true },
    overrideAccess: true,
    req,
  })
  return reserved.docs.length === 0
}

export const manageConsultationSubmissions: Access<FormSubmission> = async ({ req }) => {
  if (!req.user) return false
  if (isOperator(req.user)) return true

  const protectedForms = await findConsultationForms(req.payload, req)
  if (protectedForms.length === 0) return true
  return { form: { not_in: protectedForms.map(({ id }) => id) } }
}

export const protectConsultationForm: CollectionBeforeChangeHook<Form> = ({
  data,
  operation,
  originalDoc,
  req,
}) => {
  if (operation === 'update' && originalDoc?.title === consultationFormTitle) {
    if (data.title !== undefined && data.title !== consultationFormTitle) {
      throw new APIError(
        'Название служебной формы консультаций закреплено за главной страницей.',
        400,
      )
    }

    return { ...data, emails: [] }
  }

  if ((data.title ?? originalDoc?.title) === consultationFormTitle) {
    const context = req.context as ConsultationContext
    if (req.payloadAPI !== 'local' || context[consultationProvisionMarker] !== true) {
      throw new APIError('Форма консультаций настраивается служебной командой.', 403)
    }
    return { ...data, emails: [] }
  }

  return data
}

export const preserveConsultationForm: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const form = await req.payload.findByID({
    collection: 'forms',
    id,
    depth: 0,
    select: { title: true },
    overrideAccess: true,
    req,
  })
  if (form.title === consultationFormTitle) {
    throw new APIError('Служебную форму консультаций нельзя удалить из редактора.', 400)
  }
}

export const consultationFields = ['name', 'phone', 'email', 'message', 'consent'] as const
export type ConsultationField = (typeof consultationFields)[number]

export const consultationLimits = { name: 120, phone: 32, email: 254, message: 2000 } as const
export const consultationBodyLimit = 16 * 1024

type ConsultationSubmission = {
  name: string
  phone: string
  email: string
  message: string
  consent: true
}

export type ConsultationResponse =
  | { ok: true }
  | {
      ok: false
      code: 'validation' | 'tooLarge' | 'unsupported' | 'unavailable' | 'failed'
      fields?: ConsultationField[]
    }

type Validation =
  | { kind: 'valid'; data: ConsultationSubmission }
  | { kind: 'invalid'; fields: ConsultationField[] }
  | { kind: 'ignored' }

const emailLocalPattern =
  /^[a-z0-9!#$%&'*+\/=?^_\x60{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_\x60{|}~-]+)*$/i
const emailDomainLabelPattern = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i
const phonePattern = /^\+?[0-9 ().-]+$/
const acceptedKeys = new Set<string>([...consultationFields, 'website'])

function isEmailAddress(value: string) {
  const [local, domain, extra] = value.split('@')
  if (!domain || extra !== undefined || local.length > 64 || !emailLocalPattern.test(local)) {
    return false
  }

  const labels = domain.split('.')
  return labels.length >= 2 && labels.every((label) => emailDomainLabelPattern.test(label))
}

export function validateConsultation(input: unknown): Validation {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { kind: 'invalid', fields: [] }
  }

  if (Object.keys(input).some((key) => !acceptedKeys.has(key))) {
    return { kind: 'invalid', fields: [] }
  }

  const {
    name,
    phone,
    email = '',
    message = '',
    consent,
    website = '',
  } = input as Record<string, unknown>
  if (typeof website !== 'string') return { kind: 'invalid', fields: [] }
  if (website !== '') return { kind: 'ignored' }

  const formErrors: ConsultationField[] = []
  const cleanName = typeof name === 'string' ? name.trim() : ''
  const cleanPhone = typeof phone === 'string' ? phone.trim() : ''
  const cleanEmail = typeof email === 'string' ? email.trim() : ''
  const cleanMessage = typeof message === 'string' ? message.trim() : ''
  const digits = cleanPhone.replace(/[^0-9]/g, '')

  if (!cleanName || cleanName.length > consultationLimits.name || /[\r\n\t\0]/.test(cleanName)) {
    formErrors.push('name')
  }
  if (
    cleanPhone.length > consultationLimits.phone ||
    !phonePattern.test(cleanPhone) ||
    digits.length < 7 ||
    digits.length > 15
  ) {
    formErrors.push('phone')
  }
  if (
    typeof email !== 'string' ||
    cleanEmail.length > consultationLimits.email ||
    cleanEmail.includes('\0') ||
    (cleanEmail !== '' && !isEmailAddress(cleanEmail))
  ) {
    formErrors.push('email')
  }
  if (
    typeof message !== 'string' ||
    cleanMessage.length > consultationLimits.message ||
    cleanMessage.includes('\0')
  ) {
    formErrors.push('message')
  }
  if (consent !== true) formErrors.push('consent')

  if (formErrors.length > 0) return { kind: 'invalid', fields: formErrors }

  return {
    kind: 'valid',
    data: {
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      message: cleanMessage,
      consent: true,
    },
  }
}

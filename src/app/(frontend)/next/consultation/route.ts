import configPromise from '@payload-config'
import { getPayload } from 'payload'

import {
  consultationBodyLimit,
  consultationFields,
  type ConsultationResponse,
  validateConsultation,
} from '@/consultation/contract'
import { consultationSubmissionMarker, findConsultationForms } from '@/consultation/payload'

function result(body: ConsultationResponse, status: number) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

async function readBody(
  request: Request,
): Promise<{ kind: 'ok'; value: unknown } | { kind: 'tooLarge' | 'validation' }> {
  const declaredLength = request.headers.get('content-length')
  if (declaredLength && Number(declaredLength) > consultationBodyLimit) return { kind: 'tooLarge' }
  if (!request.body) return { kind: 'validation' }

  const reader = request.body.getReader()
  const buffer = new Uint8Array(consultationBodyLimit)
  let bytes = 0

  try {
    for (;;) {
      const chunk = await reader.read()
      if (chunk.done) break
      if (bytes + chunk.value.byteLength > consultationBodyLimit) {
        void reader.cancel().catch(() => undefined)
        return { kind: 'tooLarge' }
      }
      buffer.set(chunk.value, bytes)
      bytes += chunk.value.byteLength
    }

    const body = new TextDecoder('utf-8', { fatal: true }).decode(buffer.subarray(0, bytes))
    return { kind: 'ok', value: JSON.parse(body) as unknown }
  } catch {
    return { kind: 'validation' }
  } finally {
    reader.releaseLock()
  }
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase()
  if (contentType !== 'application/json') return result({ ok: false, code: 'unsupported' }, 415)

  const body = await readBody(request)
  if (body.kind !== 'ok') {
    return result({ ok: false, code: body.kind }, body.kind === 'tooLarge' ? 413 : 400)
  }

  const submission = validateConsultation(body.value)
  if (submission.kind === 'ignored') return result({ ok: true }, 201)
  if (submission.kind === 'invalid') {
    return result({ ok: false, code: 'validation', fields: submission.fields }, 400)
  }

  try {
    const payload = await getPayload({ config: configPromise })
    const forms = await findConsultationForms(payload)
    const [form] = forms
    if (forms.length !== 1 || !form || form.emails?.length) {
      payload.logger.warn({ msg: 'Consultation submission form unavailable.' })
      return result({ ok: false, code: 'unavailable' }, 503)
    }

    const { data } = submission
    await payload.create({
      collection: 'form-submissions',
      context: { [consultationSubmissionMarker]: form.id },
      data: {
        form: form.id,
        submissionData: consultationFields.flatMap((field) => {
          const value = String(data[field])
          return value ? [{ field, value }] : []
        }),
      },
      depth: 0,
      overrideAccess: false,
    })

    return result({ ok: true }, 201)
  } catch {
    console.error('Consultation submission could not be saved.')
    return result({ ok: false, code: 'failed' }, 500)
  }
}

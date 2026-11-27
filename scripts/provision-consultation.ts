import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'

import {
  consultationFormTitle,
  consultationProvisionMarker,
  findConsultationForms,
} from '../src/consultation/payload'

const consentLabel = 'Согласие на обработку персональных данных'
const previousConsentLabel = 'Согласие с политикой обработки персональных данных'

const fields = [
  { name: 'name', label: 'Имя', blockType: 'text', required: true },
  { name: 'phone', label: 'Телефон', blockType: 'text', required: true },
  { name: 'email', label: 'Электронная почта', blockType: 'email', required: false },
  { name: 'message', label: 'Сообщение', blockType: 'textarea', required: false },
  {
    name: 'consent',
    label: consentLabel,
    blockType: 'checkbox',
    required: true,
    defaultValue: false,
  },
] satisfies NonNullable<RequiredDataFromCollectionSlug<'forms'>['fields']>

const formData: RequiredDataFromCollectionSlug<'forms'> = {
  title: consultationFormTitle,
  fields,
  confirmationType: 'message',
  confirmationMessage: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', text: 'Заявка принята.', detail: 0, format: 0, version: 1 }],
          direction: null,
          format: '',
          indent: 0,
          version: 1,
        },
      ],
      direction: null,
      format: '',
      indent: 0,
      version: 1,
    },
  },
  emails: [],
  submitButtonLabel: 'Отправить',
}

async function provision() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required.')
  }
  process.env.PAYLOAD_DB_PUSH = 'false'
  const { default: config } = await import('../src/payload.config')
  const payload = await getPayload({ config })

  try {
    const guard = await payload.db.pool.connect()
    try {
      const { rows } = await guard.query<{ locked: boolean }>(
        'select pg_try_advisory_lock(hashtext($1), hashtext($2)) as locked',
        ['runway-trans', 'main-consultation-form'],
      )
      if (!rows[0]?.locked) throw new Error('Another consultation provisioning command is running.')

      const forms = await findConsultationForms(payload)
      if (forms.length > 1) throw new Error('Multiple consultation forms exist.')

      const [form] = forms
      if (form) {
        const configuredFields = form.fields ?? []
        const sameFields =
          configuredFields.length === fields.length &&
          fields.every((field) =>
            configuredFields.some(
              (configured) =>
                'name' in configured &&
                configured.name === field.name &&
                configured.blockType === field.blockType &&
                Boolean(configured.required) === field.required &&
                (configured.blockType !== 'checkbox' || configured.defaultValue !== true),
            ),
          )
        if (!sameFields || form.emails?.length) {
          throw new Error(
            'The existing consultation form does not match the expected configuration.',
          )
        }
        const consent = configuredFields.find(
          (field) => field.blockType === 'checkbox' && field.name === 'consent',
        )
        if (consent?.blockType === 'checkbox' && consent.label === previousConsentLabel) {
          await payload.update({
            collection: 'forms',
            id: form.id,
            data: {
              fields: configuredFields.map((field) =>
                field === consent ? { ...consent, label: consentLabel } : field,
              ),
            },
            depth: 0,
            overrideAccess: true,
          })
          console.info(`Consultation form consent label updated (ID ${form.id}).`)
          return
        }
        console.info(`Consultation form already exists (ID ${form.id}).`)
        return
      }

      const created = await payload.create({
        collection: 'forms',
        context: { [consultationProvisionMarker]: true },
        data: formData,
        depth: 0,
        overrideAccess: true,
      })
      console.info(`Consultation form created (ID ${created.id}).`)
    } finally {
      guard.release(true)
    }
  } finally {
    // The advisory-lock connection has been closed. Limit final shutdown so
    // adapter background handles cannot keep this standalone command running.
    let shutdownTimer: ReturnType<typeof setTimeout> | undefined
    try {
      await Promise.race([
        payload.destroy().finally(() => payload.db.pool.end()),
        new Promise<void>((resolve) => {
          shutdownTimer = setTimeout(resolve, 3000)
        }),
      ])
    } finally {
      clearTimeout(shutdownTimer)
    }
  }
}

provision().then(
  () => {
    process.stdout.write('', () => process.exit(0))
  },
  (error: unknown) => {
    const safeMessages = new Set([
      'DATABASE_URL is required.',
      'Another consultation provisioning command is running.',
      'Multiple consultation forms exist.',
      'The existing consultation form does not match the expected configuration.',
    ])
    const message = error instanceof Error && safeMessages.has(error.message) ? error.message : null
    process.stderr.write(`${message ?? 'Could not provision the consultation form.'}\n`, () =>
      process.exit(1),
    )
  },
)

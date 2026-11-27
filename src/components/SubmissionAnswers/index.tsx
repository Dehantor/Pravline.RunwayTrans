import type { FormSubmission } from '@/payload-types'
import { ArrayField } from '@payloadcms/ui'
import type { ArrayFieldServerComponent } from 'payload'

import './styles.scss'

const copy = {
  en: { title: 'Answers', empty: 'This submission has no answers.' },
  ru: { title: 'Ответы', empty: 'В этой записи нет ответов.' },
}

const SubmissionAnswers: ArrayFieldServerComponent = async (props) => {
  const { data, i18n, payload, user } = props
  const submission: Partial<FormSubmission> = data ?? {}

  if (!submission.id) {
    return (
      <ArrayField
        field={props.clientField}
        path={props.path}
        permissions={props.permissions}
        readOnly={props.readOnly}
        schemaPath={props.schemaPath}
      />
    )
  }

  const { title, empty } = i18n.language === 'en' ? copy.en : copy.ru
  const answers = submission.submissionData ?? []
  const formId = typeof submission.form === 'object' ? submission.form?.id : submission.form
  const form =
    answers.length && formId && user
      ? await payload.findByID({
          collection: 'forms',
          id: formId,
          depth: 0,
          select: { fields: true },
          disableErrors: true,
          overrideAccess: false,
          user,
        })
      : null

  const labels = new Map<string, string>()
  for (const field of form?.fields ?? []) {
    if ('name' in field && field.label?.trim()) labels.set(field.name, field.label.trim())
  }

  return (
    <section className="submission-answers" aria-labelledby="submission-answers-title">
      <h2 id="submission-answers-title">{title}</h2>
      {answers.length ? (
        <dl>
          {answers.map(({ field, id, value }, index) => (
            <div className="submission-answers__row" key={id ?? index}>
              <dt>{labels.get(field) ?? field}</dt>
              <dd>{value?.trim() ? value : '—'}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="submission-answers__empty">{empty}</p>
      )}
    </section>
  )
}

export default SubmissionAnswers

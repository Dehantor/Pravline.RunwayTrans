'use client'

import Link from 'next/link'
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'

import {
  consultationFields,
  consultationLimits,
  type ConsultationField,
  type ConsultationResponse,
  validateConsultation,
} from '@/consultation/contract'
import type { ConsultationMessages } from '@/i18n/consultationMessages'

import styles from './styles.module.css'

type ConsultationFormProps = {
  contactsHref: string
  illustration: ReactNode
  messages: ConsultationMessages
  policyHref: string | null
}

const formFields = [
  { name: 'name', type: 'text', autoComplete: 'name', required: true },
  { name: 'phone', type: 'tel', autoComplete: 'tel', required: true },
  { name: 'email', type: 'email', autoComplete: 'email', required: false },
  { name: 'message', type: 'textarea', autoComplete: 'off', required: false },
] as const

type Toast = { tone: 'status' | 'alert'; text: string }

const subscribeToHydration = () => () => undefined
const clientSnapshot = () => true
const serverSnapshot = () => false

export function HomeConsultationForm({
  contactsHref,
  illustration,
  messages,
  policyHref,
}: ConsultationFormProps) {
  const id = useId()
  const inFlight = useRef(false)
  const [pending, setPending] = useState(false)
  const [toast, setToast] = useState<Toast | null>(null)
  const [errors, setErrors] = useState<ConsultationField[]>([])
  const hydrated = useSyncExternalStore(subscribeToHydration, clientSnapshot, serverSnapshot)
  const disabled = pending
  const fieldId = (name: ConsultationField) => `${id}-${name}`
  const errorId = (name: ConsultationField) => `${fieldId(name)}-error`

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 8000)
    return () => window.clearTimeout(timer)
  }, [toast])

  function showErrors(form: HTMLFormElement, fields: ConsultationField[]) {
    setErrors(fields)
    setToast({ tone: 'alert', text: fields.length ? messages.invalid : messages.failed })
    const first = fields[0] ? form.elements.namedItem(fields[0]) : null
    if (first instanceof HTMLElement) first.focus()
  }

  function clearError(event: FormEvent<HTMLFormElement>) {
    const target = event.target
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return
    setErrors((current) =>
      current.some((name) => name === target.name)
        ? current.filter((name) => name !== target.name)
        : current,
    )
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (inFlight.current) return

    const form = event.currentTarget
    const values = new FormData(form)
    const body = {
      name: values.get('name'),
      phone: values.get('phone'),
      email: values.get('email'),
      message: values.get('message'),
      consent: values.has('consent'),
      website: values.get('website'),
    }
    const validation = validateConsultation(body)
    if (validation.kind === 'invalid') {
      showErrors(form, validation.fields)
      return
    }

    setErrors([])
    setToast(null)
    inFlight.current = true
    setPending(true)

    try {
      const response = await fetch('/next/consultation', {
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const result: ConsultationResponse = await response.json()
      if (response.ok && result.ok) {
        form.reset()
        setToast({ tone: 'status', text: messages.success })
        return
      }

      if (!result.ok && result.code === 'validation' && Array.isArray(result.fields)) {
        const fields = consultationFields.filter((field) => result.fields?.includes(field))
        if (fields.length) {
          window.requestAnimationFrame(() => showErrors(form, fields))
          return
        }
      }

      const message =
        !result.ok && result.code === 'unavailable'
          ? messages.policyUnavailable
          : !result.ok && result.code === 'tooLarge'
            ? messages.tooLarge
            : messages.failed
      setToast({ tone: 'alert', text: message })
    } catch {
      setToast({ tone: 'alert', text: messages.failed })
    } finally {
      setPending(false)
      inFlight.current = false
    }
  }

  return (
    <form
      action="/next/consultation"
      aria-busy={pending}
      className={styles.form}
      method="post"
      noValidate
      onChange={clearError}
      onSubmit={submit}
    >
      <div className={styles.illustration}>{illustration}</div>

      <ul className={styles.points}>
        {messages.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      <div className={styles.fields}>
        {formFields.map(({ name, type, autoComplete, required }) => {
          const error = errors.includes(name)
          const props = {
            'aria-describedby': error ? errorId(name) : undefined,
            'aria-invalid': error || undefined,
            autoComplete,
            className: styles.field,
            disabled,
            id: fieldId(name),
            maxLength: consultationLimits[name],
            name,
            required,
          }

          return (
            <div className={styles.row} key={name}>
              <label htmlFor={fieldId(name)}>
                {messages.labels[name]}
                {required && <span aria-hidden="true">*</span>}
              </label>
              <div className={styles.control}>
                {type === 'textarea' ? (
                  <textarea {...props} rows={3} />
                ) : (
                  <input {...props} type={type} />
                )}
                {error && (
                  <p className={styles.error} id={errorId(name)}>
                    {messages.errors[name]}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div aria-hidden="true" className={styles.trap}>
        <input autoComplete="off" name="website" tabIndex={-1} type="text" />
      </div>

      <div className={styles.consent}>
        <label htmlFor={fieldId('consent')}>
          <input
            aria-describedby={errors.includes('consent') ? errorId('consent') : undefined}
            aria-invalid={errors.includes('consent') || undefined}
            disabled={disabled}
            id={fieldId('consent')}
            name="consent"
            required
            type="checkbox"
          />
          <span>
            {policyHref ? (
              <>
                {messages.consentPrefix}{' '}
                <Link className={styles.link} href={policyHref}>
                  {messages.policy}
                </Link>
              </>
            ) : (
              messages.consentStandalone
            )}
          </span>
        </label>
        {errors.includes('consent') && (
          <p className={styles.error} id={errorId('consent')}>
            {messages.errors.consent}
          </p>
        )}
        <noscript>
          <p className={styles.disabledMessage}>
            {messages.javascriptRequired}{' '}
            <Link className={styles.link} href={contactsHref}>
              {messages.contacts}
            </Link>
          </p>
        </noscript>
      </div>

      <button className={styles.submit} disabled={disabled || !hydrated} type="submit">
        {pending ? messages.submitting : messages.submit}
      </button>

      <div className={styles.toasts}>
        <p aria-atomic="true" className={styles.toast} role="status">
          {toast?.tone === 'status' ? toast.text : null}
        </p>
        <p aria-atomic="true" className={styles.toast} role="alert">
          {toast?.tone === 'alert' ? toast.text : null}
        </p>
      </div>
    </form>
  )
}

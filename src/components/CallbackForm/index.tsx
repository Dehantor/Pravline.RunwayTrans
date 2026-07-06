'use client'

import { useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type CallbackFormProps = {
  consent: string
  errorMessage: string
  phonePlaceholder: string
  submit: string
  submitting: string
  successMessage: string
  title: string
}

export function CallbackForm({
  consent,
  errorMessage,
  phonePlaceholder,
  submit,
  submitting,
  successMessage,
  title,
}: CallbackFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    setStatus('idle')
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/next/callback', {
        body: formData,
        method: 'POST',
      })

      if (!response.ok) {
        const data = (await response.json()) as { error?: string }
        throw new Error(data.error ?? errorMessage)
      }

      form.reset()
      setStatus('success')
    } catch (submitError) {
      setStatus('error')
      setError(submitError instanceof Error ? submitError.message : errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      className="space-y-4 rounded-lg border border-border bg-card p-5"
      id="callback-form"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-medium">{title}</h2>
      <Input name="phone" placeholder={phonePlaceholder} required type="tel" />
      <label className="flex items-start gap-2 text-sm text-muted-foreground">
        <input className="mt-1" name="consent" required type="checkbox" />
        {consent}
      </label>
      <Button className="w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? submitting : submit}
      </Button>
      {status === 'success' && <p className="text-sm text-emerald-600">{successMessage}</p>}
      {status === 'error' && <p className="text-sm text-destructive">{error}</p>}
    </form>
  )
}

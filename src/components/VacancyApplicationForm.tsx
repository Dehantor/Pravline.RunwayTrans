'use client'

import { useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type VacancyApplicationFormProps = {
  vacancyId: number | string
}

export function VacancyApplicationForm({ vacancyId }: VacancyApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    formData.set('vacancyId', String(vacancyId))

    setStatus('idle')
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/next/vacancies/apply', {
        body: formData,
        method: 'POST',
      })

      if (!response.ok) {
        const data = (await response.json()) as { error?: string }
        throw new Error(data.error ?? 'Не удалось отправить отклик.')
      }

      form.reset()
      setStatus('success')
    } catch (submitError) {
      setStatus('error')
      setError(
        submitError instanceof Error ? submitError.message : 'Произошла ошибка при отправке отклика.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="fullName">ФИО</Label>
        <Input id="fullName" name="fullName" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact">Контакт для связи</Label>
        <Input id="contact" name="contact" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="resume">Резюме</Label>
        <Input accept=".pdf,.doc,.docx" id="resume" name="resume" required type="file" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverLetter">Сопроводительный текст</Label>
        <Textarea id="coverLetter" name="coverLetter" required rows={6} />
      </div>

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Отправка...' : 'Отправить отклик'}
      </Button>

      {status === 'success' && <p className="text-sm text-emerald-600">Отклик успешно отправлен.</p>}
      {status === 'error' && <p className="text-sm text-destructive">{error}</p>}
    </form>
  )
}

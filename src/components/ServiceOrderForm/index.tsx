'use client'

import { useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

type ServiceOrderFormProps = {
  serviceId: number | string
}

export function ServiceOrderForm({ serviceId }: ServiceOrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    formData.set('serviceId', String(serviceId))

    setStatus('idle')
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/next/services/order', {
        body: formData,
        method: 'POST',
      })

      if (!response.ok) {
        const data = (await response.json()) as { error?: string }
        throw new Error(data.error ?? 'Не удалось отправить заявку.')
      }

      form.reset()
      setStatus('success')
    } catch (submitError) {
      setStatus('error')
      setError(
        submitError instanceof Error ? submitError.message : 'Произошла ошибка при отправке заявки.',
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
        <Label htmlFor="company">Компания (опционально)</Label>
        <Input id="company" name="company" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="details">Детали заказа</Label>
        <Textarea id="details" name="details" required rows={6} />
      </div>

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Отправка...' : 'Заказать услугу'}
      </Button>

      {status === 'success' && <p className="text-sm text-emerald-600">Заявка успешно отправлена.</p>}
      {status === 'error' && <p className="text-sm text-destructive">{error}</p>}
    </form>
  )
}

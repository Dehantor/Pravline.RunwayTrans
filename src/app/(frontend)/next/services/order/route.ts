import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const fullName = formData.get('fullName')
    const contact = formData.get('contact')
    const company = formData.get('company')
    const details = formData.get('details')
    const serviceIdRaw = formData.get('serviceId')

    if (
      typeof fullName !== 'string' ||
      typeof contact !== 'string' ||
      typeof details !== 'string' ||
      typeof serviceIdRaw !== 'string'
    ) {
      return Response.json({ error: 'Заполните все поля формы корректно.' }, { status: 400 })
    }

    const serviceId = Number(serviceIdRaw)

    if (Number.isNaN(serviceId)) {
      return Response.json({ error: 'Некорректная услуга.' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'service-orders',
      data: {
        company: typeof company === 'string' && company.trim().length > 0 ? company : undefined,
        contact,
        details,
        fullName,
        service: serviceId,
      },
      overrideAccess: true,
    })

    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Не удалось отправить заявку. Попробуйте позже.' }, { status: 500 })
  }
}

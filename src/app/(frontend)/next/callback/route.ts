import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const phone = formData.get('phone')
    const consent = formData.get('consent')

    if (typeof phone !== 'string' || phone.trim().length === 0 || consent !== 'on') {
      return Response.json({ error: 'Заполните форму корректно.' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'callback-requests',
      data: {
        phone: phone.trim(),
      },
      overrideAccess: true,
    })

    return Response.json({ success: true })
  } catch {
    return Response.json(
      { error: 'Не удалось отправить заявку. Попробуйте позже.' },
      { status: 500 },
    )
  }
}

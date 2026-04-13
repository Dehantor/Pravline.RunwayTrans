import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const fullName = formData.get('fullName')
    const contact = formData.get('contact')
    const coverLetter = formData.get('coverLetter')
    const vacancyIdRaw = formData.get('vacancyId')
    const resume = formData.get('resume')

    if (
      typeof fullName !== 'string' ||
      typeof contact !== 'string' ||
      typeof coverLetter !== 'string' ||
      typeof vacancyIdRaw !== 'string' ||
      !(resume instanceof File)
    ) {
      return Response.json({ error: 'Заполните все поля формы корректно.' }, { status: 400 })
    }

    const vacancyId = Number(vacancyIdRaw)

    if (Number.isNaN(vacancyId)) {
      return Response.json({ error: 'Некорректная вакансия.' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    const resumeDoc = await payload.create({
      collection: 'media',
      data: {
        alt: `Резюме кандидата ${fullName}`,
      },
      file: {
        data: Buffer.from(await resume.arrayBuffer()),
        mimetype: resume.type,
        name: resume.name,
        size: resume.size,
      },
      overrideAccess: true,
    })

    await payload.create({
      collection: 'vacancy-applications',
      data: {
        contact,
        coverLetter,
        fullName,
        resume: resumeDoc.id,
        vacancy: vacancyId,
      },
      overrideAccess: true,
    })

    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Не удалось отправить отклик. Попробуйте позже.' }, { status: 500 })
  }
}

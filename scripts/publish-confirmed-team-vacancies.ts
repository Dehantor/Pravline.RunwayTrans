import { randomBytes } from 'node:crypto'
import { readFile, readdir, unlink } from 'node:fs/promises'
import { resolve } from 'node:path'
import {
  commitTransaction,
  createLocalReq,
  getPayload,
  killTransaction,
  type PayloadRequest,
} from 'payload'
import sharp from 'sharp'

import { locales, type AppLocale } from '../src/i18n/locales'
import type { GuidePage, Vacancy } from '../src/payload-types'

type Localized<T> = Record<AppLocale, T>
type VacancyCopy = { title: string; salary: string; description?: string }

const team = [
  {
    fullName: 'Владислав Николаевич Пимонов',
    position: { ru: 'Директор', en: 'Director', fr: 'Directeur', kk: 'Директор', zh: '总经理' },
  },
  {
    fullName: 'Вера Валентиновна Пучкова',
    position: { ru: 'Бухгалтер', en: 'Accountant', fr: 'Comptable', kk: 'Бухгалтер', zh: '会计' },
  },
  {
    fullName: 'Эдуард Павлович Жуков',
    position: {
      ru: 'Специалист по переговорам',
      en: 'Negotiation specialist',
      fr: 'Spécialiste de la négociation',
      kk: 'Келіссөздер жөніндегі маман',
      zh: '谈判专员',
    },
  },
  {
    fullName: 'Иван Васильевич Судовой',
    position: { ru: 'Юрист', en: 'Lawyer', fr: 'Juriste', kk: 'Заңгер', zh: '法律顾问' },
  },
  {
    fullName: 'Роман Андреевич Симонов',
    position: {
      ru: 'Специалист по кредитам',
      en: 'Credit specialist',
      fr: 'Spécialiste du crédit',
      kk: 'Несие жөніндегі маман',
      zh: '信贷专员',
    },
  },
  {
    fullName: 'Семён Семёнович Брюлёв',
    position: { ru: 'Снайпер', en: 'Sniper', fr: 'Tireur d’élite', kk: 'Мерген', zh: '狙击手' },
  },
] satisfies { fullName: string; position: Localized<string> }[]

const noDescription: Localized<string> = {
  ru: 'Подробное описание вакансии пока не опубликовано.',
  en: 'A detailed job description has yet to be published.',
  fr: 'La description détaillée du poste n’a pas encore été publiée.',
  kk: 'Бос жұмыс орнының толық сипаттамасы әлі жарияланған жоқ.',
  zh: '该岗位的详细说明尚未发布。',
}

const vacancies: {
  slug: string
  contactPhone?: string
  contactEmail?: string
  copy: Localized<VacancyCopy>
}[] = [
  {
    slug: 'vityaz-driver-mechanic',
    copy: {
      ru: { title: 'Водитель-механик «Витязя»', salary: '280 000 ₽' },
      en: { title: 'Vityaz driver-mechanic', salary: '280,000 ₽' },
      fr: { title: 'Chauffeur-mécanicien de Vityaz', salary: '280 000 ₽' },
      kk: { title: '«Витязь» көлігінің жүргізуші-механигі', salary: '280 000 ₽' },
      zh: { title: '“维捷兹”全地形车驾驶兼维修员', salary: '280,000 ₽' },
    },
  },
  {
    slug: 'mi-8-helicopter-copilot',
    contactPhone: '298-44-56',
    contactEmail: 'pimonov@rwt.ru',
    copy: {
      ru: {
        title: 'Второй пилот вертолёта МИ-8',
        salary: '95 000 ₽ + премия',
        description: `Требования
Профильное (лётное) образование.
Готовый специалист (НЕ ПЕРЕУЧИВАЕМ).
Перерыв в лётной работе не более 3-х лет.

Обязанности
Владеть техникой пилотирования и вертолетовождения.

Условия
5-дневная рабочая неделя.
«Белая» заработная плата.
Премиальные выплаты к профессиональным праздникам.
Дополнительные социальные гарантии по коллективному договору.
Ежегодные премиальные выплаты.
Частые командировки в зоны ЧС.
Имеются вакансии в г. Красноярск, г. Абакан, г. Иркутск, г. Екатеринбург.`,
      },
      en: {
        title: 'Mi-8 helicopter co-pilot',
        salary: '95,000 ₽ + bonus',
        description: `Requirements
Relevant flight training and education.
Fully qualified specialist (no retraining).
A break from flying duties of no more than three years.

Duties
Be proficient in helicopter piloting and navigation.

Terms
Five-day working week.
Fully declared salary.
Bonuses for professional holidays.
Additional social benefits under the collective agreement.
Annual bonuses.
Frequent assignments in emergency areas.
Vacancies in Krasnoyarsk, Abakan, Irkutsk and Yekaterinburg.`,
      },
      fr: {
        title: 'Copilote d’hélicoptère Mi-8',
        salary: '95 000 ₽ + prime',
        description: `Exigences
Formation spécialisée au pilotage.
Spécialiste déjà qualifié (aucune reconversion).
Interruption de l’activité de vol de trois ans maximum.

Missions
Maîtriser les techniques de pilotage et de navigation en hélicoptère.

Conditions
Semaine de cinq jours.
Salaire intégralement déclaré.
Primes lors des fêtes professionnelles.
Garanties sociales supplémentaires prévues par la convention collective.
Primes annuelles.
Déplacements fréquents dans des zones d’urgence.
Postes à Krasnoïarsk, Abakan, Irkoutsk et Iekaterinbourg.`,
      },
      kk: {
        title: 'МИ-8 тікұшағының екінші ұшқышы',
        salary: '95 000 ₽ + сыйақы',
        description: `Талаптар
Бейіндік ұшу білімі.
Білікті маман (қайта даярлау қарастырылмаған).
Ұшу жұмысындағы үзіліс үш жылдан аспауы керек.

Міндеттер
Тікұшақты басқару және әуе навигациясы техникасын меңгеру.

Шарттар
Бес күндік жұмыс аптасы.
Толық ресми жалақы.
Кәсіби мерекелерге сыйақы төлеу.
Ұжымдық шарт бойынша қосымша әлеуметтік кепілдіктер.
Жыл сайынғы сыйақылар.
Төтенше жағдай аймақтарына жиі іссапарлар.
Красноярск, Абакан, Иркутск және Екатеринбург қалаларында бос жұмыс орындары бар.`,
      },
      zh: {
        title: '米-8直升机副驾驶',
        salary: '95,000 ₽ + 奖金',
        description: `岗位要求
具备相关飞行专业教育背景。
已具备任职资格（不提供转训）。
飞行工作中断不得超过三年。

岗位职责
熟练掌握直升机驾驶与导航技术。

工作条件
每周工作五天。
工资全额依法申报。
行业节日奖金。
按集体协议提供额外社会保障。
年度奖金。
经常前往应急区域出差。
克拉斯诺亚尔斯克、阿巴坎、伊尔库茨克和叶卡捷琳堡均有空缺。`,
      },
    },
  },
  {
    slug: 'northern-videographer',
    copy: {
      ru: { title: 'Видеооператор на Север', salary: '795 000 ₽' },
      en: { title: 'Videographer for northern assignments', salary: '795,000 ₽' },
      fr: { title: 'Vidéaste pour des missions dans le Nord', salary: '795 000 ₽' },
      kk: { title: 'Солтүстікке бейнеоператор', salary: '795 000 ₽' },
      zh: { title: '北方地区摄像师', salary: '795,000 ₽' },
    },
  },
]

const placeholderStem = 'runway-confirmed-team-placeholder'
const placeholderName = `${placeholderStem}.png`
const mediaDirectory = resolve('public/media')
const placeholderSize = 220
const gray = 217

function description(text: string): Vacancy['description'] {
  const makeParagraph = (line: string) => ({
    type: 'paragraph',
    children: line
      ? [{ type: 'text', text: line, detail: 0, format: 0, mode: 'normal', style: '', version: 1 }]
      : [],
    direction: null,
    format: '' as const,
    indent: 0,
    version: 1,
  })
  return {
    root: {
      type: 'root',
      children: text.split('\n').map(makeParagraph),
      direction: null,
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

function vacancyText(vacancy: (typeof vacancies)[number], locale: AppLocale) {
  const copy = vacancy.copy[locale]
  return {
    title: copy.title,
    salary: copy.salary,
    description: description(copy.description ?? noDescription[locale]),
  }
}

function isPlaceholderFilename(filename: string) {
  return filename.startsWith(placeholderStem)
}

async function isPlaceholderFile(filename: string) {
  const data = await readFile(resolve(mediaDirectory, filename))
  const image = sharp(data)
  const { format, width, height, hasAlpha } = await image.metadata()
  if (format !== 'png' || !width || !height || hasAlpha) return false
  if (filename === placeholderName && (width !== placeholderSize || height !== placeholderSize))
    return false
  return (await image.stats()).channels.every(({ min, max }) => min === gray && max === gray)
}

class PublicationError extends Error {}

function errorDetails(error: unknown) {
  const details: string[] = []
  for (let cause = error, depth = 0; cause instanceof Error && depth < 4; depth += 1) {
    const { name, code, data, table, column, constraint } = cause as Error & {
      code?: string
      data?: { errors?: { path?: string }[] }
      table?: string
      column?: string
      constraint?: string
    }
    if (/^[A-Za-z][A-Za-z0-9]+$/.test(name)) details.push(name)
    if (code && /^[A-Z0-9_]{4,16}$/.test(code)) details.push(code)
    for (const field of [table, column, constraint]) {
      if (field && /^[a-zA-Z0-9_.]+$/.test(field)) details.push(field)
    }
    for (const { path } of data?.errors ?? []) {
      if (path && /^[a-zA-Z0-9_.]+$/.test(path)) details.push(path)
    }
    cause = cause.cause
  }
  return [...new Set(details)].join(', ')
}

async function cleanUncommittedPlaceholder(req: PayloadRequest) {
  const files = (await readdir(mediaDirectory)).filter((file) => isPlaceholderFilename(file))
  if (!files.length) return

  const { docs } = await req.payload.find({
    collection: 'media',
    where: { filename: { in: [placeholderName, ...files] } },
    depth: 0,
    limit: 1,
  })
  if (docs.length > 0) return

  for (const filename of files) {
    if (
      filename !== placeholderName &&
      !/^runway-confirmed-team-placeholder-\d+x\d+\.png$/.test(filename)
    )
      continue
    if (await isPlaceholderFile(filename)) await unlink(resolve(mediaDirectory, filename))
  }
}

function assertTeam(people: GuidePage['peopleCards'], mediaId: number, locale: AppLocale) {
  if (
    people?.length !== team.length ||
    people.some(
      (person, index) =>
        person.fullName !== team[index].fullName ||
        person.position !== team[index].position[locale] ||
        person.photo !== mediaId,
    )
  ) {
    throw new PublicationError(`Management cards conflict in locale ${locale}.`)
  }
}

function descriptionLines(doc: Vacancy['description']) {
  return doc.root.children.map((paragraph) =>
    Array.isArray(paragraph.children)
      ? paragraph.children.map((child: { text?: string }) => child.text ?? '').join('')
      : '',
  )
}

function assertVacancy(saved: Vacancy, vacancy: (typeof vacancies)[number], locale: AppLocale) {
  const expected = vacancyText(vacancy, locale)
  if (
    saved.slug !== vacancy.slug ||
    saved._status !== 'published' ||
    saved.title !== expected.title ||
    saved.salary !== expected.salary ||
    (saved.contactPhone ?? '') !== (vacancy.contactPhone ?? '') ||
    (saved.contactEmail ?? '') !== (vacancy.contactEmail ?? '') ||
    JSON.stringify(descriptionLines(saved.description)) !==
      JSON.stringify(descriptionLines(expected.description))
  ) {
    throw new PublicationError(`Vacancy conflict for ${vacancy.slug} in locale ${locale}.`)
  }
}

async function publish(mode: '--check' | '--apply') {
  if (!process.env.DATABASE_URL) throw new PublicationError('DATABASE_URL is required.')
  process.env.PAYLOAD_DB_PUSH = 'false'
  const { default: config } = await import('../src/payload.config')
  const payload = await getPayload({ config })
  const req = await createLocalReq({ context: { disableRevalidate: true } }, payload)
  const lock = await payload.db.pool.connect()
  let attemptedUpload = false
  let phase = 'preflight'

  try {
    const { rows } = await lock.query<{ acquired: boolean }>(
      'select pg_try_advisory_lock(hashtext($1), hashtext($2)) as acquired',
      ['runway-trans', 'publish-confirmed-team-vacancies'],
    )
    if (!rows[0]?.acquired)
      throw new PublicationError('Another team and vacancy publication is running.')
    const transactionID = await payload.db.beginTransaction({ isolationLevel: 'serializable' })
    if (!transactionID) throw new PublicationError('Could not start the publication transaction.')
    req.transactionID = transactionID

    const readGuide = (locale: AppLocale) =>
      payload.findGlobal({ slug: 'guidePage', locale, fallbackLocale: false, depth: 0, req })
    const guides: GuidePage[] = []
    for (const locale of locales) {
      guides.push(await readGuide(locale))
    }
    const { docs: media } = await payload.find({
      collection: 'media',
      where: { filename: { equals: placeholderName } },
      depth: 0,
      limit: 2,
      req,
    })
    const files = (await readdir(mediaDirectory)).filter(isPlaceholderFilename)
    const matches: Vacancy[] = []
    for (const vacancy of vacancies) {
      const { docs } = await payload.find({
        collection: 'vacancies',
        where: {
          or: [{ slug: { equals: vacancy.slug } }, { title: { equals: vacancy.copy.ru.title } }],
        },
        locale: 'ru',
        fallbackLocale: false,
        draft: true,
        depth: 0,
        limit: 2,
        req,
      })
      if (docs.length > 1) throw new PublicationError(`Duplicate vacancy for ${vacancy.slug}.`)
      if (docs[0]) matches.push(docs[0])
    }

    if (
      guides.some(({ peopleCards }) => peopleCards?.length) ||
      media.length ||
      files.length ||
      matches.length
    ) {
      if (
        media.length !== 1 ||
        matches.length !== vacancies.length ||
        !files.includes(placeholderName) ||
        !(await isPlaceholderFile(placeholderName))
      ) {
        throw new PublicationError(
          'Existing management, vacancy or placeholder content conflicts with publication.',
        )
      }
      locales.forEach((locale, index) => assertTeam(guides[index].peopleCards, media[0].id, locale))
      for (const [index, vacancy] of vacancies.entries()) {
        const joined = matches[index]
        const previous = matches[index - 1]
        if (
          !joined.publishedAt ||
          (previous?.publishedAt && previous.publishedAt <= joined.publishedAt)
        ) {
          throw new PublicationError(
            'Existing vacancy publication order conflicts with the approved order.',
          )
        }
        for (const locale of locales) {
          for (const draft of [false, true]) {
            const record = await payload.findByID({
              collection: 'vacancies',
              id: joined.id,
              locale,
              fallbackLocale: false,
              draft,
              depth: 0,
              req,
            })
            assertVacancy(record, vacancy, locale)
          }
        }
      }
      await commitTransaction(req)
      return 'All six management cards and three vacancies are already present.'
    }

    if (mode === '--check') {
      await commitTransaction(req)
      return 'Ready to publish six management cards and three vacancies.'
    }

    const data = await sharp({
      create: {
        width: placeholderSize,
        height: placeholderSize,
        channels: 3,
        background: { r: gray, g: gray, b: gray },
      },
    })
      .png()
      .toBuffer()
    phase = 'placeholder upload'
    attemptedUpload = true
    const photo = await payload.create({
      collection: 'media',
      data: { alt: '' },
      file: { name: placeholderName, data, mimetype: 'image/png', size: data.byteLength },
      req,
    })
    if (photo.filename !== placeholderName)
      throw new PublicationError('Unexpected placeholder filename.')

    phase = 'management copy'
    const guide = await payload.updateGlobal({
      slug: 'guidePage',
      locale: 'ru',
      depth: 0,
      data: {
        peopleCards: team.map(({ fullName, position }) => ({
          fullName,
          photo: photo.id,
          position: position.ru,
        })),
      },
      req,
    })
    assertTeam(guide.peopleCards, photo.id, 'ru')
    // Payload's per-locale global write can reinsert the same array row IDs.
    // Write only these new rows with all locales together through the Postgres adapter.
    phase = 'localized management copy'
    await payload.db.updateGlobal({
      slug: 'guidePage',
      data: {
        peopleCards: team.map(({ fullName, position }) => ({
          id: randomBytes(12).toString('hex'),
          fullName: Object.fromEntries(locales.map((locale) => [locale, fullName])),
          photo: photo.id,
          position,
        })),
      },
      req,
    })
    for (const locale of locales) {
      phase = `management locale ${locale}`
      assertTeam((await readGuide(locale)).peopleCards, photo.id, locale)
    }

    const publicationTime = Date.now()
    for (const [index, vacancy] of vacancies.entries()) {
      phase = `create vacancy ${vacancy.slug}`
      const publishedAt = new Date(publicationTime - 1000 * index).toISOString()
      const publishFields = { _status: 'published', publishedAt } as const
      const created = await payload.create({
        collection: 'vacancies',
        data: {
          ...vacancyText(vacancy, 'ru'),
          ...publishFields,
          generateSlug: false,
          slug: vacancy.slug,
          contactPhone: vacancy.contactPhone,
          contactEmail: vacancy.contactEmail,
        },
        locale: 'ru',
        req,
      })
      assertVacancy(created, vacancy, 'ru')

      for (const locale of locales) {
        if (locale === 'ru') continue
        phase = `vacancy ${vacancy.slug} locale ${locale}`
        const updated = await payload.update({
          collection: 'vacancies',
          id: created.id,
          data: { ...vacancyText(vacancy, locale), ...publishFields },
          locale,
          req,
        })
        assertVacancy(updated, vacancy, locale)
      }
    }

    phase = 'commit'
    await commitTransaction(req)
    // The adapter can finish a failed commit without throwing.
    phase = 'commit verification'
    assertTeam((await readGuide('ru')).peopleCards, photo.id, 'ru')
    return 'Published six management cards and three vacancies in five locales.'
  } catch (error) {
    await killTransaction(req)
    if (attemptedUpload) await cleanUncommittedPlaceholder(req)
    if (error instanceof PublicationError) throw error
    const details = errorDetails(error)
    throw new PublicationError(
      `Team and vacancy publication failed during ${phase}${details ? ` (${details})` : ''}.`,
    )
  } finally {
    lock.release(true)
  }
}

async function main() {
  const [mode, ...otherArgs] = process.argv.slice(2)
  if ((mode !== '--check' && mode !== '--apply') || otherArgs.length) {
    throw new PublicationError(
      'Usage: npx tsx scripts/publish-confirmed-team-vacancies.ts --check|--apply',
    )
  }
  return publish(mode)
}

main().then(
  (message) => process.stdout.write(`${message}\n`, () => process.exit(0)),
  (error: unknown) => {
    const details = errorDetails(error)
    const message =
      error instanceof PublicationError
        ? error.message
        : `Team and vacancy publication failed${details ? ` (${details})` : ''}.`
    process.stderr.write(`${message}\n`, () => process.exit(1))
  },
)

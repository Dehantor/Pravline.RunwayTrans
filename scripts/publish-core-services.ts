import { readFile, readdir, unlink } from 'node:fs/promises'
import { resolve } from 'node:path'
import {
  commitTransaction,
  createLocalReq,
  getPayload,
  initTransaction,
  killTransaction,
} from 'payload'

import { locales, type AppLocale } from '../src/i18n/locales'
import { homeMessages } from '../src/i18n/messages'
import type { Service } from '../src/payload-types'

const coreServices = [
  { slug: 'vityaz', source: 'vityaz' },
  { slug: 'winter-road', source: 'winter-road' },
  { slug: 'all-terrain', source: 'all-terrain' },
  { slug: 'emergency-complex', source: 'crane' },
] as const

function copyFor(locale: AppLocale, index: number) {
  const copy = homeMessages[locale]?.coreServices[index]
  if (!copy?.label || !copy.description) throw new Error(`Missing service text for ${locale}.`)
  return { title: copy.label, summary: copy.description }
}

function description(summary: string): Service['description'] {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: summary,
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              version: 1,
            },
          ],
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
  }
}

async function publish() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required.')
  if (!process.argv.includes('--apply'))
    throw new Error('Pass --apply after checking DATABASE_URL.')
  process.env.PAYLOAD_DB_PUSH = 'false'

  const mediaDirectory = resolve('public/media')
  const assets = await Promise.all(
    coreServices.map(async ({ slug, source }, index) => {
      locales.forEach((locale) => copyFor(locale, index))
      const data = await readFile(resolve(mediaDirectory, `home-transport-${source}.jpg`))
      return { slug, data, filename: `runway-service-${slug}.jpg`, index }
    }),
  )
  const { default: config } = await import('../src/payload.config')
  const payload = await getPayload({ config })
  const lock = await payload.db.pool.connect()
  const pending: typeof assets = []
  const attempted: typeof assets = []
  const req = await createLocalReq({ context: { disableRevalidate: true } }, payload)

  try {
    const { rows } = await lock.query<{ acquired: boolean }>(
      'select pg_try_advisory_lock(hashtext($1), hashtext($2)) as acquired',
      ['runway-trans', 'publish-core-services'],
    )
    if (!rows[0]?.acquired) throw new Error('Another service publication is running.')
    if (!(await initTransaction(req))) throw new Error('Could not start a service transaction.')
    const existingFiles = await readdir(mediaDirectory)

    for (const asset of assets) {
      const { slug, filename, index, data } = asset
      const copy = copyFor('ru', index)
      const { docs: existingServices } = await payload.find({
        collection: 'services',
        where: { slug: { equals: slug } },
        locale: 'ru',
        draft: true,
        depth: 1,
        limit: 2,
        req,
      })
      if (existingServices.length) {
        const [existing] = existingServices
        const image = existing.image
        if (
          existingServices.length !== 1 ||
          existing._status !== 'published' ||
          existing.title !== copy.title ||
          existing.summary !== copy.summary ||
          !image ||
          typeof image !== 'object' ||
          image.filename !== filename ||
          existing.sortOrder !== (index + 1) * 10 ||
          !(await readFile(resolve(mediaDirectory, filename))).equals(data)
        ) {
          throw new Error(`Existing content conflict for service ${slug}.`)
        }
        for (const locale of locales) {
          const translation = copyFor(locale, index)
          const localized = await payload.findByID({
            collection: 'services',
            id: existing.id,
            depth: 0,
            locale,
            fallbackLocale: false,
            req,
          })
          if (localized.title !== translation.title || localized.summary !== translation.summary) {
            throw new Error(`Existing content conflict for service ${slug} (${locale}).`)
          }
        }
        continue
      }

      const { docs: existingMedia } = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        depth: 0,
        limit: 2,
        req,
      })
      if (existingMedia.length || existingFiles.includes(filename)) {
        throw new Error(`Existing media conflict for service ${slug}.`)
      }
      pending.push(asset)
    }

    for (const asset of pending) {
      const { slug, filename, data, index } = asset
      const copy = copyFor('ru', index)
      attempted.push(asset)
      const image = await payload.create({
        collection: 'media',
        data: { alt: copy.title },
        file: { name: filename, data, mimetype: 'image/jpeg', size: data.byteLength },
        req,
      })
      if (image.filename !== filename)
        throw new Error(`Unexpected upload name for service ${slug}.`)

      const service = await payload.create({
        collection: 'services',
        data: {
          ...copy,
          description: description(copy.summary),
          generateSlug: false,
          image: image.id,
          slug,
          sortOrder: (index + 1) * 10,
          _status: 'published',
        },
        locale: 'ru',
        req,
      })
      for (const locale of locales) {
        if (locale === 'ru') continue
        const translation = copyFor(locale, index)
        await payload.update({
          collection: 'services',
          id: service.id,
          data: {
            ...translation,
            description: description(translation.summary),
            _status: 'published',
          },
          locale,
          req,
        })
      }
    }
    await commitTransaction(req)
  } catch (error) {
    await killTransaction(req)
    for (const { data, filename } of attempted) {
      const filePath = resolve(mediaDirectory, filename)
      const written = await readFile(filePath).catch(() => null)
      if (!written?.equals(data)) continue

      const { docs } = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        depth: 0,
        limit: 1,
      })
      if (docs.length === 0) await unlink(filePath)
    }
    throw error
  } finally {
    lock.release(true)
  }
}

publish().then(
  () => process.stdout.write('Four public services verified.\n', () => process.exit(0)),
  (error: unknown) => {
    const safeMessage =
      /^(?:Missing service text|DATABASE_URL is required|Pass --apply|Existing (?:content|media) conflict|Unexpected upload name|Another service publication|Could not start a service transaction)/
    const message =
      error instanceof Error && safeMessage.test(error.message)
        ? error.message
        : 'Service publication failed.'
    process.stderr.write(`${message}\n`, () => process.exit(1))
  },
)

import Image from 'next/image'

import type { CompanyLifeMessages } from '@/i18n/messages'

import { CompanyLifeRail } from './Rail'
import styles from './styles.module.css'

const stories = [
  { key: 'taimyrSnow', year: 2025, image: 'taimyr-snow.webp' },
  { key: 'krasnoyarskRepair', year: 2025, image: 'krasnoyarsk-repair.webp' },
  { key: 'moscowMotorcycles', year: 2024, image: 'moscow-motorcycles.webp' },
  { key: 'taimyrAntigravity', year: 2025, image: 'taimyr-antigravity.webp' },
] satisfies ReadonlyArray<{
  key: keyof CompanyLifeMessages['stories']
  year: number
  image: string
}>

const headingId = 'home-company-life-title'

export function CompanyLife({ messages }: { messages: CompanyLifeMessages }) {
  return (
    <section aria-labelledby={headingId} className={styles.section}>
      <h2 className={styles.heading} id={headingId}>
        {messages.title}
      </h2>
      <CompanyLifeRail labelledBy={headingId} next={messages.next} previous={messages.previous}>
        {stories.map(({ key, year, image }) => {
          const { location, title } = messages.stories[key]
          return (
            <li className={styles.item} key={key}>
              <article className={styles.card} tabIndex={0}>
                <Image
                  alt=""
                  className={styles.image}
                  fill
                  loading="lazy"
                  src={`/media/company-life/${image}`}
                  unoptimized
                />
                <div className={styles.meta}>
                  <span>{location}</span>
                  <time dateTime={String(year)}>{year}</time>
                </div>
                <h3 className={styles.title}>{title}</h3>
              </article>
            </li>
          )
        })}
      </CompanyLifeRail>
    </section>
  )
}

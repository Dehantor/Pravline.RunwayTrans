import Image from 'next/image'
import type { ReactNode } from 'react'

type SocialNetwork = { label: string } & (
  | { palette: string; mark: ReactNode }
  | { image: string }
)

const tiktokMark =
  'M14.2 2.7h3.1c.3 2.4 2.1 4.1 4.5 4.3v3.1a8 8 0 0 1-4.5-1.5v6.1a6 6 0 1 1-6-6h.8v3.1a3 3 0 1 0 2.1 2.9Z'

export const socialNetworks: readonly SocialNetwork[] = [
  {
    label: 'Telegram',
    palette: 'bg-social-telegram',
    mark: (
      <>
        <path
          d="M2.2 11.1 20.9 3.5c.8-.3 1.5.3 1.2 1.3l-3 14.4c-.2 1-1 1.3-1.8.7l-5.1-3.8-2.5 2.5c-.4.4-1.1.2-1.3-.4l-1.7-4.7-4.4-1.1c-.8-.2-1-.9-.1-1.3Z"
          fill="currentColor"
        />
        <path d="m6.7 13.5 12.4-7.2-9.2 8.8-1 3.6Z" fill="#b5dbef" />
      </>
    ),
  },
  {
    label: 'WhatsApp',
    palette: 'bg-social-whatsapp',
    mark: (
      <path
        d="M5.7 3.1c-.7-.2-1.5 0-2 .6-1.5 1.6-1.7 4.1-.8 6.3 1.8 4.5 5.6 8.3 10.1 10.1 2.2.9 4.7.7 6.3-.8.6-.5.8-1.3.6-2l-.3-.6-4.2-1.8c-.4-.2-.8-.1-1.1.3l-1.3 1.5c-.2.3-.7.4-1 .2a15 15 0 0 1-5.9-5.9c-.2-.3-.1-.8.2-1l1.5-1.3c.4-.3.5-.7.3-1.1L6.3 3.4l-.6-.3Z"
        fill="currentColor"
      />
    ),
  },
  {
    label: 'YouTube',
    palette: 'bg-social-youtube',
    mark: (
      <>
        <rect x="0.5" y="3.8" width="23" height="16.4" rx="4.3" fill="currentColor" />
        <path d="m9.5 8.6 6 3.4-6 3.4Z" fill="var(--social-youtube)" />
      </>
    ),
  },
  {
    label: 'Rutube',
    image: '/media/social/tel.svg',
  },
  {
    label: 'ВКонтакте',
    palette: 'bg-social-vk',
    mark: (
      <path
        d="M14.2 17.5H13c-5.7 0-8.9-4-10.2-10.6h3.6c.9 3.6 2.1 5.3 3.2 5.6V8.7c0-.9-.1-1.3-1-1.8h4.6c.5 0 .7.2.7.7v5.2c1.1-.3 2.5-2.1 3.9-5.9h3.6c-.5 2.1-1.9 4-3 5.3-.4.4-.4.7.1 1.2 1.2 1.1 2.6 2.5 3.2 4.1h-4.1c-.9-1.5-2.1-2.9-3.7-3.2v2.3c0 .5-.2.9-.7.9Z"
        fill="currentColor"
      />
    ),
  },
  {
    label: 'Одноклассники',
    image: '/media/social/vk.svg',
  },
  {
    label: 'TikTok',
    palette: 'bg-ink',
    mark: (
      <>
        <path d={tiktokMark} fill="#25f4ee" transform="translate(-.65 -.5)" />
        <path d={tiktokMark} fill="#fe2c55" transform="translate(.65 .5)" />
        <path d={tiktokMark} fill="currentColor" />
      </>
    ),
  },
]

export function SocialIcon({
  network,
  className = 'size-8',
  markClassName = 'size-5',
}: {
  network: SocialNetwork
  className?: string
  markClassName?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full text-on-dark ${className} ${
        'palette' in network ? network.palette : ''
      }`}
    >
      {'image' in network ? (
        <Image alt="" className="size-full" height={39} src={network.image} width={39} />
      ) : (
        <svg className={markClassName} viewBox="0 0 24 24">
          {network.mark}
        </svg>
      )}
    </span>
  )
}

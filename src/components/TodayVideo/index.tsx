'use client'

import { Play } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

type TodayVideoProps = {
  embedUrl?: string
  fileUrl?: string
  playLabel: string
  posterUrl: string
  title: string
  unsupportedMessage: string
}

export function TodayVideo({
  embedUrl,
  fileUrl,
  playLabel,
  posterUrl,
  title,
  unsupportedMessage,
}: TodayVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (isPlaying && embedUrl) {
    return (
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="h-full w-full"
        referrerPolicy="strict-origin-when-cross-origin"
        src={embedUrl}
        title={title}
      />
    )
  }

  if (isPlaying && fileUrl) {
    return (
      <video
        aria-label={title}
        autoPlay
        className="h-full w-full bg-black"
        controls
        playsInline
        preload="metadata"
        src={fileUrl}
      >
        {unsupportedMessage}
      </video>
    )
  }

  return (
    <button
      aria-label={playLabel}
      className="group relative flex h-full w-full cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-on-dark"
      onClick={() => setIsPlaying(true)}
      type="button"
    >
      <Image alt="" className="object-cover" fill src={posterUrl} unoptimized />
      <span className="relative flex size-14 items-center justify-center rounded-full border-2 border-on-dark bg-brand-green text-on-dark transition-colors group-hover:bg-brand-green-hover sm:size-[4.5rem]">
        <Play aria-hidden="true" className="ml-1 size-6 fill-current sm:size-8" />
      </span>
    </button>
  )
}

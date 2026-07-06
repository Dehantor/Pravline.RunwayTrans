'use client'

import { Play } from 'lucide-react'
import { useState } from 'react'

type TodayVideoProps = {
  embedUrl?: string
  fileUrl?: string
  placeholder: string
  posterUrl?: string
  title: string
}

export function TodayVideo({ embedUrl, fileUrl, placeholder, posterUrl, title }: TodayVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const hasVideo = Boolean(embedUrl || fileUrl)

  if (isPlaying && embedUrl) {
    return (
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="aspect-video w-full"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        src={embedUrl}
        title={title}
      />
    )
  }

  if (isPlaying && fileUrl) {
    return (
      <video
        autoPlay
        className="aspect-video w-full bg-ink"
        controls
        preload="metadata"
        src={fileUrl}
      >
        {placeholder}
      </video>
    )
  }

  return (
    <button
      aria-label={hasVideo ? `Воспроизвести: ${title}` : placeholder}
      className="group relative flex aspect-video w-full items-center justify-center overflow-hidden bg-ink"
      disabled={!hasVideo}
      onClick={() => setIsPlaying(true)}
      type="button"
    >
      {posterUrl ? (
        <img alt="" className="absolute inset-0 h-full w-full object-cover" src={posterUrl} />
      ) : null}
      <span className="absolute inset-0 bg-black/25" />
      <span className="relative flex size-28 items-center justify-center rounded-full border-[10px] border-brand-green text-brand-green transition-transform group-enabled:group-hover:scale-105">
        <Play className="ml-2 size-14 fill-current" />
      </span>
    </button>
  )
}

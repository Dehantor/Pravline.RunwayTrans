import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = ({ className }: Props) => {
  return (
    <div className={clsx('flex items-center', className)}>
      <svg
        aria-hidden
        className="h-10 w-12 shrink-0"
        viewBox="0 0 92 70"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="30" cy="35" fill="var(--ink)" r="28" />
        <path d="M4 53h53l-9 13H0z" fill="var(--brand-yellow)" />
        <path d="M15 36h42l-7 11H8z" fill="var(--brand-yellow)" opacity="0.85" />
      </svg>
    </div>
  )
}

import type { MouseEventHandler, ReactNode } from 'react'

type NavItemProps = {
  children: ReactNode
  isOpen: boolean
  label: string
  onMouseEnter: MouseEventHandler<HTMLDivElement>
  onMouseLeave: MouseEventHandler<HTMLDivElement>
  onToggle: () => void
}

export const NavItem = ({
  children,
  isOpen,
  label,
  onMouseEnter,
  onMouseLeave,
  onToggle,
}: NavItemProps) => {
  return (
    <div
      className="group relative"
      data-open={isOpen}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        aria-expanded={isOpen}
        className="inline-flex items-center gap-1 text-primary"
        onClick={onToggle}
        type="button"
      >
        <span>{label}</span>
        <span aria-hidden className="text-xs">
          ▼
        </span>
      </button>

      {children}
    </div>
  )
}

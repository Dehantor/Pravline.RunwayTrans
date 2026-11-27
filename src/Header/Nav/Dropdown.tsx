import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'

type HeaderNavItem = NonNullable<HeaderType['navItems']>[number]
type ChildLink = NonNullable<HeaderNavItem['children']>[number]['link']

type DropdownProps = {
  dismissed: boolean
  items: ChildLink[]
}

export const Dropdown = ({ dismissed, items }: DropdownProps) => {
  return (
    <div
      className={`invisible absolute top-full left-0 z-30 w-60 pt-2 opacity-0 transition-opacity duration-200 ${
        dismissed
          ? ''
          : 'group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100'
      }`}
    >
      <div className="rounded-md border border-background-muted bg-background-light p-2 text-ink shadow-xl">
        {items.length > 0 ? (
          <ul className="space-y-1">
            {items.map((link, index) => {
              if (!link) {
                return null
              }

              return (
                <li className="text-sm" key={index}>
                  <CMSLink
                    {...link}
                    className="block rounded-sm px-3 py-2 transition-colors hover:bg-background-muted hover:text-brand-green focus-visible:bg-background-muted focus-visible:outline-2 focus-visible:outline-brand-green"
                  />
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="px-3 py-2 text-sm text-brand-green">Нет страниц</p>
        )}
      </div>
    </div>
  )
}

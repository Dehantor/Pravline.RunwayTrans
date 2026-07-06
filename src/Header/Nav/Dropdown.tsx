import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'

type HeaderNavItem = NonNullable<HeaderType['navItems']>[number]
type ChildLink = NonNullable<HeaderNavItem['children']>[number]['link']

type DropdownProps = {
  items: ChildLink[]
}

export const Dropdown = ({ items }: DropdownProps) => {
  return (
    <div className="invisible absolute top-full left-0 z-30 mt-2 w-60 rounded-md border border-background-muted bg-background-light p-2 text-ink opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100 data-[open=true]:visible data-[open=true]:opacity-100">
      {items.length > 0 ? (
        <ul className="space-y-1">
          {items.map((link, index) => {
            if (!link) {
              return null
            }

            return (
              <li
                className="rounded-sm px-3 py-2 text-sm transition-colors hover:bg-background-muted hover:text-brand-green"
                key={index}
              >
                <CMSLink {...link} />
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="px-3 py-2 text-sm text-brand-green">Нет страниц</p>
      )}
    </div>
  )
}

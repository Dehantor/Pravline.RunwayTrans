import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'

type HeaderNavItem = NonNullable<HeaderType['navItems']>[number]
type ChildLink = NonNullable<HeaderNavItem['children']>[number]['link']

type DropdownProps = {
  items: ChildLink[]
}

export const Dropdown = ({ items }: DropdownProps) => {
  return (
    <div className="invisible absolute left-0 top-full z-30 mt-3 w-56 rounded-sm border border-[#2f794e] bg-white p-3 text-[#89d57d] opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100 data-[open=true]:visible data-[open=true]:opacity-100">
      {items.length > 0 ? (
        <ul className="space-y-1">
          {items.map((link, index) => {
            if (!link) {
              return null
            }

            return (
              <li
                className="rounded-sm px-3 py-2 text-sm transition-colors hover:bg-[#1d2a1e]"
                key={index}
              >
                <CMSLink {...link} />
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="px-3 py-2 text-sm text-[#6aa262]">Нет страниц</p>
      )}
    </div>
  )
}

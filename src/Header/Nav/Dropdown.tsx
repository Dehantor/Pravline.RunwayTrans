import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'

type HeaderNavItem = NonNullable<HeaderType['navItems']>[number]
type ChildLink = NonNullable<HeaderNavItem['children']>[number]['link']

type DropdownProps = {
  items: ChildLink[]
}

export const Dropdown = ({ items }: DropdownProps) => {
  return (
    <div className="invisible absolute left-0 top-full z-30 mt-3 w-56 rounded-2xl bg-white p-3 text-black opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100 data-[open=true]:visible data-[open=true]:opacity-100">
      {items.length > 0 ? (
        <ul className="space-y-1">
          {items.map((link, index) => {
            if (!link) {
              return null
            }

            return (
              <li className="rounded-lg px-3 py-2 text-base transition-colors hover:bg-gray-100" key={index}>
                <CMSLink {...link} />
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="px-3 py-2 text-sm text-gray-500">Нет страниц</p>
      )}
    </div>
  )
}

import Link from 'next/link'

type ChildPage = {
  id: number | string
  title?: string | null
  slug?: string | null
}

type DropdownProps = {
  isLoading: boolean
  items: ChildPage[]
}

export const Dropdown = ({ isLoading, items }: DropdownProps) => {
  return (
    <div className="invisible absolute left-0 top-full z-30 mt-3 w-56 rounded-2xl bg-white p-3 text-black opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100 data-[open=true]:visible data-[open=true]:opacity-100">
      {isLoading ? (
        <p className="px-3 py-2 text-sm text-gray-500">Загрузка...</p>
      ) : items.length > 0 ? (
        <ul className="space-y-1">
          {items.map((page) => {
            if (!page?.slug) {
              return null
            }

            return (
              <li key={page.id}>
                <Link
                  className="block rounded-lg px-3 py-2 text-base transition-colors hover:bg-gray-100"
                  href={`/${page.slug}`}
                >
                  {page.title || page.slug}
                </Link>
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

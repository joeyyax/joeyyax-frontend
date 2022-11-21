import { classNames } from "lib/classNames"

export type FiltersType = Map<
  string,
  {
    slug: string
    title: string
    abbreviatedTitle?: string
    description?: string
    count?: number
  }
>

export type Props = {
  minItems?: number
  useAbbreviatedTitles?: boolean
  filters: FiltersType
  activeFilter: string | null | undefined
  setFilter: (filter: string | null) => void
}

const FilterBar = ({
  minItems = 3,
  useAbbreviatedTitles = false,
  filters,
  activeFilter,
  setFilter,
}: Props) => {
  // exit if there are no filters
  if (filters.size <= 1) return <></>

  return (
    <div className="hidden items-center gap-4 rounded-lg bg-slate-200 py-2 px-8 text-sm md:flex">
      <span className="font-bold">Filters:</span>
      <>
        {Array.from(filters.values()).map(
          ({ slug, title, abbreviatedTitle, count }: any) => {
            const thisSlug = slug == "everything" ? null : slug

            if (count <= minItems) return null

            return (
              <button
                className={classNames(
                  "cursor-pointer",
                  thisSlug === activeFilter ? "underline" : ""
                )}
                data-category={slug}
                key={slug}
                onClick={(): void => setFilter(thisSlug)}
              >
                {useAbbreviatedTitles && abbreviatedTitle
                  ? abbreviatedTitle
                  : title}
              </button>
            )
          }
        )}
      </>
    </div>
  )
}

export default FilterBar

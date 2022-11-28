"use client"

import Tags from "../../components/molecules/Tags"
import Section from "../atoms/Section"
import FilterBar from "./FilterBar"
import { TagType } from "components/atoms/Tag"
import { merge } from "lib/classNames"
import { client, groq } from "lib/sanity"
import { useEffect, useState } from "react"

// !todo: update to new data fetching pattern

export type Props = {
  className?: any
  [key: string]: any
}

const FilterableTags = ({ className, props }: Props) => {
  const [data, setData] = useState<TagType[]>([])
  const [filter, setFilter] = useState<string | null>(null)

  useEffect(() => {
    client
      .fetch(
        groq`*[_type == 'tag'] | order(title asc) {
          title,
          abbreviatedTitle,
          "slug": slug.current,
          description,
          "categories": category[]->{
            title,
            abbreviatedTitle,
            "slug": slug.current,
            description
          }
        }`
      )
      .then((data) => {
        setData(data)
      })
  }, [])

  let filters = new Map()

  // add an "everything" filter
  filters.set("everything", {
    slug: "everything",
    title: "Everything",
    count: data.length,
  })

  // extract categories from tags to use as filters
  data.map((tag: any) => {
    tag.categories = tag.categories.filter((category: any) => category) // remove empty array items

    tag.categories?.map(
      ({ slug, title, abbreviatedTitle, description }: any) => {
        if (!filters.get(slug)) {
          filters.set(slug, {
            slug,
            title: title,
            abbreviatedTitle: abbreviatedTitle,
            description,
            count: 1,
          })
        } else {
          filters.set(slug, {
            ...filters.get(slug),
            count: filters.get(slug).count + 1,
          })
        }
      }
    )
  })

  return (
    <>
      <Section classes={merge("filterable-tags", className)} {...props}>
        <Section.Header className="flex-row gap-8">
          <Section.Title>Skills</Section.Title>
          <FilterBar
            useAbbreviatedTitles={true}
            filters={filters}
            activeFilter={filter}
            setFilter={setFilter}
          />
        </Section.Header>
        <Section.Body>
          {data && (
            <Tags useAbbreviatedTitles={true} data={data} filter={filter} />
          )}
        </Section.Body>
      </Section>
    </>
  )
}

export default FilterableTags

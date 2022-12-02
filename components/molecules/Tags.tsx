"use client"

import Tag, { TagSizeType, TagThemeType, TagType } from "components/atoms/Tag"
import { motion } from "framer-motion"
import { merge } from "lib/classNames"

export type TagsType = {
  data: TagType[]
  className?: any
  useAbbreviatedTitles?: boolean
  size?: TagSizeType
  theme?: TagThemeType
  delay?: number // delay appearance
  filter?: string | null
  animated?: boolean
}

const Tags = ({
  data,
  className,
  useAbbreviatedTitles = false,
  size,
  theme,
  delay = 0,
  filter = null,
  animated = true,
}: TagsType) => {
  if (!data) return <></>

  let filteredData = data

  if (filter != null) {
    filteredData = data?.filter((tag: TagType) => {
      const categories = tag.categories.map((category: any) => category.slug)
      return categories.includes(filter)
    })
  }

  const tagsAnimation = animated
    ? {
        hidden: {
          transition: {
            opacity: 0,
            when: "afterChildren",
            staggerDirection: -1,
          },
        },
        visible: {
          opacity: 1,
          transition: {
            when: "beforeChildren",
            delay: delay,
            staggerChildren: 0.05,
            staggerDirection: 1,
          },
        },
      }
    : { hidden: {}, visible: {} }

  const tagAnimation = animated
    ? {
        hidden: { scale: 0 },
        visible: { scale: 1 },
      }
    : {}

  return (
    <motion.div
      className={merge("mt-4 flex w-full flex-row flex-wrap gap-4", className)}
      variants={tagsAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {filteredData?.map(({ title, abbreviatedTitle, slug }) => (
        <Tag
          variants={tagAnimation}
          useAbbreviatedTitle={useAbbreviatedTitles}
          title={title}
          abbreviatedTitle={abbreviatedTitle}
          slug={slug}
          key={slug}
          size={size}
          theme={theme}
        />
      ))}
    </motion.div>
  )
}

export default Tags

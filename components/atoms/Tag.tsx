import { motion } from "framer-motion"
import { merge } from "lib/classNames"

export type TagSizeType = "small" | "medium" | "large" | undefined
export type TagThemeType =
  | "primary"
  | "secondary"
  | "info"
  | "light"
  | "dark"
  | undefined

export type TagType = {
  title?: string
  abbreviatedTitle?: string
  useAbbreviatedTitle?: boolean
  className?: any
  children?: any
  size?: TagSizeType
  theme?: TagThemeType
  [key: string]: any
}

const Tag = ({
  title,
  abbreviatedTitle,
  useAbbreviatedTitle = false,
  className,
  children,
  size = "medium",
  theme = "info",
  ...props
}: TagType) => {
  return (
    <motion.span
      className={merge(
        "inline-flex items-center rounded-full",
        "leading-sm whitespace-nowrap font-bold",
        size == "small" && "px-3 py-1 text-xs",
        size == "medium" && "px-4 py-2 text-sm",
        size == "large" && "px-4 py-2 text-sm",
        theme == "light" && "bg-slate-200 bg-opacity-20 text-white",
        theme == "dark" && "bg-slate-800 bg-opacity-5 text-slate-700",
        theme == "info" && "bg-sky-200 bg-opacity-70 text-sky-800",
        className
      )}
      {...props}
    >
      {(useAbbreviatedTitle && abbreviatedTitle ? abbreviatedTitle : title) ||
        children}
    </motion.span>
  )
}

export default Tag

"use client"

import ConditionalLink from "./ConditionalLink"
import { motion } from "framer-motion"
import { merge } from "lib/classNames"

export type TitleSizeType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

export type TitleType = {
  className?: any
  size?: TitleSizeType
  el?: any // optionally change the element type but keep the size, if undefined it will assign size param
  href?: any
  children?: any
  animation?: any // override default animation
  delay?: number // delay appearance
  [key: string]: any
}

const Title = ({
  className,
  size = "h2",
  el = undefined,
  href,
  animation,
  delay = 0,
  children,
  ...props
}: TitleType) => {
  const Component = `${el ? el : size}` as keyof JSX.IntrinsicElements // https://stackoverflow.com/questions/40960411/rendering-custom-html-tag-with-react-js

  const titleAnimation = animation
    ? animation
    : {
        initial: {},
        animate: { transition: { delay } },
        exit: {},
      }

  return (
    <motion.span {...titleAnimation}>
      <Component
        className={merge(
          "title relative items-center",
          size == "h1" && "text-4xl md:text-6xl",
          size == "h2" && "text-4xl md:text-5xl",
          size == "h3" && "text-3xl md:text-4xl",
          size == "h4" && "text-2xl md:text-3xl",
          size == "h5" && "text-xl md:text-2xl",
          size == "h6" && "text-lg md:text-xl",
          "font-bold leading-tight md:leading-tight",
          className
        )}
        {...props}
      >
        <ConditionalLink href={href}>{children}</ConditionalLink>
      </Component>
    </motion.span>
  )
}

Title.displayName = "Title"

export default Title

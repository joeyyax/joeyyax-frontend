"use client"

import { motion } from "framer-motion"
import { merge } from "lib/classNames"

import { LinkIconProps } from "components/molecules/Link"

import ConditionalLink from "./ConditionalLink"

export type PreTitleType = {
  className?: any
  href?: any
  icon?: LinkIconProps
  delay?: number // delay appearance
  children?: any
}

const HeroPreTitle = ({
  className,
  href,
  icon = undefined,
  delay = 1,
  children,
}: PreTitleType) => {
  return (
    <motion.span
      className={merge(
        "pretitle font-semibold opacity-50 md:text-lg",
        className
      )}
      initial={{ position: "relative", opacity: 0, bottom: -20 }}
      animate={{ opacity: 1, bottom: 0, transition: { delay: delay } }}
      exit={{ opacity: 0, bottom: -20 }}
    >
      <ConditionalLink href={href} icon={icon}>
        {children}
      </ConditionalLink>
    </motion.span>
  )
}

export default HeroPreTitle

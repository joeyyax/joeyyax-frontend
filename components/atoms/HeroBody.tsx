"use client"

import { motion } from "framer-motion"
import { merge } from "lib/classNames"

export type HeroBodyType = {
  className?: any
  children?: any
  animation?: any
  [key: string]: any
}

const HeroBody = ({
  children,
  animation,
  className,
  ...props
}: HeroBodyType) => {
  const bodyAnimation = animation
    ? animation
    : {
        initial: {},
        animate: {},
        exit: {},
      }

  return (
    <motion.div
      className={merge("hero-body relative max-w-[55ch] opacity-80", className)}
      {...bodyAnimation}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default HeroBody

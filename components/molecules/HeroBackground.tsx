"use client"

import classNames from "classnames/dedupe"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export type Props = {
  color: any
  image: any
  className?: string
  children?: any
}

const HeroBackground = ({
  color,
  image = { src: "/img/bg-gradient.webp", width: 1200, height: 750 },
  className,
  children,
}: Props) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 3000], ["0%", "30%"])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, borderRadius: "100%" }}
      animate={{ opacity: 1, scale: 1, borderRadius: 0 }}
      className={classNames(
        "supporting-background",
        "absolute -top-96 right-0 left-0 -z-10 h-[calc(theme(spacing.96)+75%)] overflow-hidden", // negative margin to prevent body bg from showing due to inertial scrolling
        className
      )}
      style={{
        backgroundColor: color, // dynamic values cannot be injected into tw https://v2.tailwindcss.com/docs/just-in-time-mode#known-limitations
        y,
      }}
    >
      {children}
      {image && (
        <div className="absolute inset-0 z-0 opacity-50">
          <Image src={image?.blurDataURL} alt="" fill={true} />
        </div>
      )}
    </motion.div>
  )
}

export default HeroBackground

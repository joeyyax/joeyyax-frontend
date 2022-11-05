"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const HeroMedia = ({ slug, image, children }: any) => {
  return (
    <div className="relative flex w-full flex-col items-center">
      <motion.div
        layoutId={`${slug}-image`}
        className="z-10 overflow-hidden rounded-xl"
        initial={{ opacity: 1, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.15 } }}
      >
        <Image
          src={image?.src}
          alt=""
          width={image?.width}
          height={image?.height}
          placeholder="blur"
          blurDataURL={image?.blurDataURL}
          priority
        />
        {children}
      </motion.div>
    </div>
  )
}

HeroMedia.displayName = "Hero Media"

export default HeroMedia

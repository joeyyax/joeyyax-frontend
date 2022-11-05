"use client"

import { motion, useInView } from "framer-motion"
import { classNames, merge } from "lib/classNames"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import LinkIcon from "components/atoms/LinkIcon"
import Title from "components/atoms/Title"
import Tags, { TagsType } from "components/molecules/Tags"

export type ProjectCardFormatType = "cols" | "rows"
export type ProjectCardSizeType = "medium" | "large"

export type Props = {
  slug: string | undefined
  className?: string
  title: string
  subtitle?: string
  tags?: TagsType
  color?: string
  thumbnail?: ThumbnailType
  format?: ProjectCardFormatType
  size?: ProjectCardSizeType
  rounded?: boolean
  onClick?: () => void
}

type ThumbnailType = {
  src: string
  width: number
  height: number
  alt?: string
  title?: string
  blurDataURL?: string
}

const ProjectCard = ({
  slug,
  className,
  title,
  subtitle,
  tags,
  thumbnail = { src: "/img/bg-gradient.webp", width: 1200, height: 750 },
  color,
  format = "rows",
  size = "medium",
  rounded = true,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const thumbnailRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [animateDistance, setAnimateDistance] = useState(50)

  // use a larger animate distance on larger screens
  useEffect(() => {
    if (window.innerWidth > 1024) {
      setAnimateDistance(100)
    }
  }, [])

  const handleClick = () => {
    // scroll fully into view
    // if (ref.current) {
    //   ref.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "center",
    //     inline: "center",
    //   })
    // }
    // const projectCards = document.querySelectorAll(".project-card")
    // projectCards.forEach((projectCard) => {
    //   if (projectCard != ref.current) {
    //     projectCard.style.opacity = 0
    //     // projectCard.classList.add("opacity-0")
    //   }
    // })
  }

  return (
    <motion.div
      ref={ref}
      className={merge(
        "project-card group",
        "relative flex flex-col bg-slate-800",
        size == "medium" && "rounded-lg p-10 md:p-12",
        size == "large" && "rounded-xl p-10 md:p-16",
        !rounded && "rounded-none",
        "overflow-hidden",
        className
      )}
      title={title}
      style={{
        backgroundColor: color,
      }}
      initial={{ opacity: 0, y: animateDistance }}
      animate={
        isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: animateDistance }
      }
      whileHover={{
        scale: 1.01,
      }}
      onTap={handleClick}
      whileTap={{ scale: 1, translateY: 5 }}
    >
      <Link href={`/work/${slug}`} key={slug}>
        <div
          className={classNames(
            format == "rows" && "flex flex-col gap-4",
            format == "cols" &&
              "flex flex-col gap-4 md:grid md:grid-cols-12 md:gap-16",
            "relative z-20"
          )}
          aria-label={`View ${title} project details`}
        >
          <motion.div
            ref={thumbnailRef}
            layoutId={`${slug}-image`}
            transition={{ duration: 0 }} // prevent animating when card
            className={classNames(
              "w-full",
              format == "cols" && "md:col-span-7 md:overflow-hidden",
              size == "medium" && "rounded-md",
              size == "large" && "rounded-lg",
              "overflow-hidden transition-all group-hover:scale-105"
            )}
          >
            <Image
              src={thumbnail.src}
              width={thumbnail.width}
              height={thumbnail.height}
              alt={thumbnail.alt ? thumbnail.alt : title}
              title={thumbnail.title}
              className=""
              placeholder="blur"
              blurDataURL={thumbnail.blurDataURL}
            />
          </motion.div>

          <div
            className={classNames(
              "content flex flex-col justify-center gap-2 pt-4 text-white",
              format == "cols" && "col-span-5"
            )}
          >
            <Title as="h3" size={size == "medium" ? "h3" : "h2"}>
              {title}
              <LinkIcon />
            </Title>
            {subtitle && (
              <div
                className={classNames(
                  "opacity-90",
                  size == "medium" && "text-md",
                  size == "large" && "text-lg"
                )}
              >
                {subtitle}
              </div>
            )}
            {tags && (
              <Tags {...tags} theme="light" size="small" animated={false} />
            )}
          </div>
        </div>
        <motion.div
          className={classNames(
            "absolute inset-0 z-0 scale-110 opacity-50 transition-all duration-500",
            "group-hover:opacity-40"
          )}
          style={{
            backgroundImage: `url(${thumbnail.blurDataURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Link>
    </motion.div>
  )
}

export default ProjectCard

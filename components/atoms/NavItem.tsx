"use client"

import Button, { ButtonThemeType } from "../../components/atoms/Button"
import { motion } from "framer-motion"
import { merge } from "lib/classNames"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Ref, forwardRef } from "react"

export interface NavItemProps {
  href: string
  icon?: any
  button?: ButtonThemeType
  onClick?: any
  className?: string
  children: any
}

const NavItem = (
  { href = "/", icon = false, button, className, children }: NavItemProps,
  ref: Ref<HTMLButtonElement>
) => {
  const pathname = usePathname()

  // check if current page
  const isCurrentPage = pathname === href

  // check if current page is a child of the nav item
  const isAncestor = pathname?.includes(href) && href !== "/" ? true : false

  if (button) {
    return (
      <Button
        ref={ref}
        href={href}
        theme={button}
        disabled={isCurrentPage ? true : false}
        icon={icon}
        className={className}
      >
        Contact
      </Button>
    )
  }

  return (
    <Link
      href={href}
      className={merge(
        "nav-item relative z-10 inline-flex h-full transform font-medium transition-all",
        "items-center p-4 md:py-0 md:px-5",
        "rounded-lg text-slate-700 text-opacity-70",
        (isCurrentPage || isAncestor) && "text-opacity-100",
        "hover:text-opacity-100 ",
        "active:translate-y-[1px] active:text-opacity-100",
        className
      )}
      aria-label={`Go to ${children} page`}
    >
      <span className="relative z-10">{children}</span>
      {(isCurrentPage || isAncestor) && (
        <motion.div
          className="active-nav-item-indicator absolute inset-0 -z-10 rounded-lg bg-black/5"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        />
      )}
    </Link>
  )
}

export default forwardRef(NavItem)

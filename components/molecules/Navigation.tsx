"use client"

import classNames from "classnames"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import {
  AiOutlineClose as CloseMenuIcon,
  AiOutlineMenu as MenuIcon,
} from "react-icons/ai"

import NavItem from "../atoms/NavItem"

const Navigation = () => {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)

  // handle nav menu button clicks
  const handleMobileNavToggle = () => {
    setIsExpanded(!isExpanded)
  }

  // close nav if pathname changes
  useEffect(() => {
    setIsExpanded(false)
  }, [pathname])

  const MobileNavIcon = !isExpanded ? MenuIcon : CloseMenuIcon

  return (
    <>
      <nav
        id="navbar-primary"
        className={classNames(
          "nav",
          !isExpanded && "hidden",
          isExpanded &&
            "absolute top-20 right-4 z-50 flex h-auto w-1/2 flex-col rounded-lg bg-slate-200 bg-opacity-70 p-8 backdrop-blur-md",
          "items-stretch md:flex md:flex-row"
        )}
      >
        <NavItem href="/">Home</NavItem>
        <NavItem href="/work">Work</NavItem>
        <NavItem href="/about">About</NavItem>
        <NavItem href="/contact" className="md:hidden">
          Contact
        </NavItem>
      </nav>
      <span
        className="inline-flex cursor-pointer text-3xl md:hidden"
        data-collapse-toggle="navbar-primary"
        aria-controls="navbar-primary"
        aria-expanded="false"
        onClick={handleMobileNavToggle}
      >
        <MobileNavIcon />
      </span>
    </>
  )
}

export default Navigation

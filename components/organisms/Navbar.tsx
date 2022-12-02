"use client"

/**
 * Behavior
 * - Navbar always visible when scrolled to top of page
 * - Scrolling down will gradually hide navbar
 * - Scrolling up will gradually show navbar if hidden
 * - Hovering over a partially visible navbar will bring it fully into view
 **/
import classNames from "classnames/dedupe"
import Container from "components/atoms/Container"
import NavItem from "components/atoms/NavItem"
import Branding from "components/molecules/Branding"
import Navigation from "components/molecules/Navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const MIN_SCROLL_START = 0
const SCROLL_MULTIPLIER = 2

const Navbar = () => {
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const { scrollY } = useScroll()
  const [height, setHeight] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down")
  const [scrollStart, setScrollStart] = useState(0)

  const y = useTransform(
    scrollY,
    [scrollStart, scrollStart + height * SCROLL_MULTIPLIER],
    [0, -100]
  )

  const animationStyles = { y }

  // set the height of the navbar - used for calculating scroll speed
  useEffect(() => {
    const el = ref?.current
    if (el) {
      const height = el.offsetTop + el.offsetHeight
      setHeight(height)
    }
  }, [])

  // temp hack to reset scroll position to the top
  useEffect(() => {
    window.scrollTo(0, 0)
    setScrollDirection("down")
    setScrollStart(0)
  }, [pathname])

  const isIntersecting = () => {
    const el = ref.current
    if (el) {
      const rect = el.getBoundingClientRect()
      return rect.y < 0 && rect.y > rect.height * -1 ? true : false
    }
  }

  const calcScrollStart = () => {
    const scrollPos = scrollY.get()

    if (isIntersecting()) return // exit if midway through transition

    let newScrollStart = scrollPos

    if (scrollDirection === "up") {
      newScrollStart = scrollPos - height * SCROLL_MULTIPLIER
    }

    if (newScrollStart < MIN_SCROLL_START) {
      newScrollStart = MIN_SCROLL_START
    }

    if (newScrollStart !== scrollStart) {
      setScrollStart(newScrollStart)
    }
  }

  useEffect(() => {
    scrollY.onChange(() => {
      const scrollPos = scrollY.get()
      const prevScrollPos = scrollY.getPrevious()
      const currentScrollDir = scrollPos > prevScrollPos ? "down" : "up"
      setScrollDirection(currentScrollDir)
    })
  }, [scrollY])

  // if scroll direction changes, update scroll start position
  useEffect(() => {
    calcScrollStart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollDirection])

  return (
    <motion.div
      ref={ref}
      id="navbar"
      className={classNames("navbar z-50 w-full justify-center", "fixed top-0")}
      style={animationStyles}
      initial={{
        y: -100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 100,
        transition: { delay: 0.1, when: "beforeChildren" },
      }}
      exit="exit"
      whileHover={{ y: 0 }}
      onHoverStart={() => setScrollStart(scrollY.get())}
    >
      <Container
        className={classNames(
          "flex-row items-stretch justify-between",
          "gap-4 py-4 md:gap-12 md:py-4 lg:py-4",
          "text-lg text-slate-700",
          "rounded-b-xl border border-t-0 border-b-2 border-black border-opacity-10 bg-white",
          "relative"
        )}
      >
        <Branding />
        <Navigation />
        <NavItem
          button="dark"
          href="/contact"
          className="umami--click--navbar-contact hidden md:inline-block"
          icon={false}
        >
          Contact
        </NavItem>
      </Container>
    </motion.div>
  )
}

export default Navbar

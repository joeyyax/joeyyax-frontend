"use client"

import { useWindowWidth } from "@react-hook/window-size"
import { classNames } from "lib/classNames"
import { useEffect, useRef, useState } from "react"

export type OverflowContainerProps = {
  className?: string
  children?: React.ReactNode
  [key: string]: any
}

const OverflowContainer = ({
  className,
  children,
  ...props
}: OverflowContainerProps) => {
  const [parentWidth, setParentWidth] = useState<string | number>("100%")
  const windowWidth = useWindowWidth()
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current as unknown as HTMLElement

    // get parent above the overflow container to determine content width
    let width = element?.parentElement?.parentElement?.offsetWidth

    if (typeof width === "number") {
      setParentWidth(width)
    }
  }, [ref, windowWidth])

  return (
    <div
      ref={ref}
      className={classNames(className)}
      style={{
        width: parentWidth,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export default OverflowContainer

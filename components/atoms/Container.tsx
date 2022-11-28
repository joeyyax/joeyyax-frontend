import ConditionalLink from "./ConditionalLink"
import { merge } from "lib/classNames"
import { Ref, forwardRef } from "react"

export type ContainerType = {
  className?: string
  href?: any
  stack?: boolean
  center?: boolean
  padded?: boolean
  fullWidth?: boolean
  children?: any
  [key: string]: any
}

const Container = (
  { className, href, padded = true, children, ...props }: ContainerType,
  ref: Ref<HTMLDivElement>
) => {
  return (
    <ConditionalLink href={href}>
      <div
        ref={ref}
        key="container"
        className={merge(
          "container",
          "flex flex-col items-start gap-4",
          padded && "p-4 md:p-6 lg:p-8",
          "relative",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ConditionalLink>
  )
}

export default forwardRef(Container)

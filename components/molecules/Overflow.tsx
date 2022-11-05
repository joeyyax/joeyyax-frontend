/**
 * Stretches content outside of the container. This is useful for when you want to have a background
 * color that extends beyond the container.
 *
 * Optionally include the Container to contain content to the parent width
 *
 * @param {string} className - Optional class name
 * @param {React.ReactNode} children
 *
 * @returns {React.ReactNode}
 */
import { classNames } from "lib/classNames"

import OverflowContainer from "./OverflowContainer"

export type OverflowProps = {
  className?: string
  [key: string]: any
}

const Overflow = ({ className, children, ...props }: OverflowProps) => {
  return (
    <div
      className={classNames(
        "overflow flex h-full self-stretch overflow-hidden md:w-[100vw]",
        "rounded-xl md:rounded-l-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

Overflow.Container = OverflowContainer

export default Overflow

import { merge } from "lib/classNames"
import { FiArrowDownRight as DownRightArrow } from "react-icons/fi"

export type GutterTextProps = {
  className?: any
  asTitle?: boolean
  children?: any
}

const GutterText = ({
  className,
  asTitle = false,
  children,
}: GutterTextProps) => {
  const Component = asTitle ? "h2" : "span"

  return (
    <Component
      className={merge(
        "gutter-text flex flex-row items-center gap-2",
        "md:text-md font-mono text-xs uppercase leading-tight tracking-wide md:text-sm md:leading-tight",
        "sticky top-24 left-0 translate-y-32 -translate-x-6 lg:left-2",
        "origin-top-left -rotate-90",
        className
      )}
    >
      <DownRightArrow className="w-3 rotate-90 animate-pulse" />
      {children}
    </Component>
  )
}

export default GutterText

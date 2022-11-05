import { merge } from "lib/classNames"
import { cloneElement } from "react"
import {
  BsArrowLeft as LeftIcon,
  BsArrowRight as RightIcon,
} from "react-icons/bs"

export type LinkIconProps = {
  value?: any
  position?: "left" | "right"
  className?: string
  [key: string]: any
}

const LinkIcon = ({
  value,
  position = "right",
  className,
  ...props
}: LinkIconProps) => {
  const classes = merge(
    "inline transition-all group-hover:animate-pulse",
    position == "left" && "mr-2",
    position == "left" && !value && "group-hover:-translate-x-1", // only animate if not using a custom icon
    position == "right" && "ml-2",
    position == "right" && !value && "group-hover:translate-x-1", // only animate if not using a custom icon
    className
  )

  // set icon based on position
  let Icon = position == "right" ? RightIcon : LeftIcon

  // if custom value is passed, use that instead of the default icons
  if (value) {
    return cloneElement(value, {
      className: merge(classes, value.props.className),
      ...props,
    })
  }

  return <Icon className={classes} {...props} />
}

export default LinkIcon

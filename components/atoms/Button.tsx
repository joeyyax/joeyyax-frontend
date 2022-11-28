"use client"

import LinkIcon, { LinkIconProps } from "./LinkIcon"
import { merge } from "lib/classNames"
import Link from "next/link"

export type ButtonSizeType = "small" | "medium" | "large" | undefined
export type ButtonThemeType =
  | "primary"
  | "secondary"
  | "muted"
  | "light"
  | "dark"
  | undefined

export type Props = {
  type?: "link" | "button" | "submit"
  href?: string
  onClick?: any
  theme?: ButtonThemeType
  size?: ButtonSizeType
  fill?: boolean
  icon?: LinkIconProps
  className?: string
  children?: any
  disabled?: boolean
  [key: string]: any
}

const Button = ({
  type = "link",
  href = "/",
  onClick,
  theme = "dark",
  size = undefined,
  fill = false,
  icon = {
    position: "right",
  },
  className,
  children,
  disabled = false,
  ...props
}: Props) => {
  const handleClick = (e: any) => {
    if (disabled) {
      e.stopPropagation()
      e.preventDefault()
    }

    if (onClick) {
      onClick(e)
    }
  }

  const classes = merge(
    "btn group",
    "inline-flex w-auto relative rounded-lg items-center justify-center transform transition",
    "py-3 px-5 text-md font-semibold",
    size == "small" && "py-2 px-3 text-sm",
    size == "large" && "py-3 px-6 text-lg",
    "hover:bg-action-hover hover:text-white hover:scale-[101%]",
    "active:translate-y-[1px] active:scale-100",
    theme == "primary" && "bg-action-base text-white hover:bg-action-hover",
    theme == "secondary" && "bg-blue-500 text-white hover:bg-blue-400",
    theme == "light" && "bg-slate-100 text-slate-600",
    theme == "dark" && "bg-slate-800 text-white",
    theme == "muted" && "bg-slate-300 text-slate-600",
    fill && "w-full",
    disabled && "opacity-30 cursor-default",
    className
  )

  if (type == "button" || type == "submit") {
    return (
      <button
        className={classes}
        onClick={handleClick}
        type={type}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }

  return (
    <Link href={href} passHref legacyBehavior>
      <a
        className={classes}
        onClick={handleClick}
        aria-disabled={disabled}
        href={href}
        {...props}
      >
        {icon && icon.position == "left" && <LinkIcon {...icon} />}
        {children}
        {icon && icon.position != "left" && <LinkIcon {...icon} />}
      </a>
    </Link>
  )
}

export default Button

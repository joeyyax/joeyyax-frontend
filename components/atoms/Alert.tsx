// utilities
// components
import ConditionalLink from "./ConditionalLink"
import { merge } from "lib/classNames"

export type AlertSizeType = "small" | "medium" | "large" | undefined
export type AlertThemeType =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "caution"
  | "muted"
  | "light"
  | "dark"
  | "danger"
  | undefined

export type Props = {
  icon?: any
  href?: string
  theme?: AlertThemeType
  size?: AlertSizeType
  className?: string
  children?: any
  [key: string]: any
}

const Button = ({
  icon = undefined,
  href = undefined,
  theme = "dark",
  size = undefined,
  className,
  children,
  ...props
}: Props) => {
  return (
    <ConditionalLink href={href}>
      <span
        className={merge(
          "alert",
          "flex items-center gap-2",
          size == "small" && "text-sm",
          size == "medium" && "text-md",
          size == "large" && "text-lg",
          theme == "primary" && " text-slate-500",
          theme == "secondary" && "text-blue-500",
          theme == "light" && "text-white",
          theme == "dark" && "text-slate-800",
          theme == "muted" && "text-slate-400",
          theme == "success" && "text-green-600",
          theme == "info" && "text-blue-500",
          theme == "danger" && "text-red-600",
          theme == "caution" && "text-amber-600",
          className
        )}
        {...props}
      >
        {icon}
        {children}
      </span>
    </ConditionalLink>
  )
}

export default Button

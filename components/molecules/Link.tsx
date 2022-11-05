import { merge } from "lib/classNames"

import LinkIcon from "components/atoms/LinkIcon"

export type LinkIconProps = {
  icon?: any
  className?: string
  children?: any
  [key: string]: any
}

const Link = ({
  icon = undefined,
  className,
  children,
  ...props
}: LinkIconProps) => {
  return (
    <Link {...props} className={merge(className)}>
      {children}
      <LinkIcon value={icon} />
    </Link>
  )
}

export default Link

import Link from "next/link"

import LinkIcon from "components/atoms/LinkIcon"
import { LinkIconProps } from "components/molecules/Link"

export type Props = {
  href?: string | null | undefined
  icon?: LinkIconProps
  children: any
  [key: string]: any
}

const ConditionalLink = ({
  href = undefined,
  icon = undefined,
  children,
  ...props
}: Props) => {
  if (href) {
    return (
      <Link href={href} className="link group" {...props}>
        {icon && icon.position == "left" && <LinkIcon {...icon} />}
        {children}
        {icon && icon.position == "right" && <LinkIcon {...icon} />}
      </Link>
    )
  }

  return <>{children}</>
}

export default ConditionalLink

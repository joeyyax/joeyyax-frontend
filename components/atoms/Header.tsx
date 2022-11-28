import PreTitle from "./PreTitle"
import Title from "./Title"
import { merge } from "lib/classNames"

interface Props {
  id?: string
  name?: string
  className?: string
  children: any
  [key: string]: any
}

const Header = ({ id, name, className, children, ...props }: Props) => {
  return (
    <div
      key={id || name}
      id={id}
      className={merge(
        name,
        "z-10 flex w-full flex-col justify-start gap-3 text-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

Header.Title = Title
Header.PreTitle = PreTitle

export default Header

import { merge } from "lib/classNames"

interface Props {
  className?: any
  cols?: boolean | number
  lg?: boolean
  children?: any
  [key: string]: any
}

const Body = ({
  className,
  cols = false,
  lg = false,
  children,
  ...props
}: Props) => {
  return (
    <div
      {...props}
      className={merge(
        "flex w-full flex-row gap-4 md:gap-8",
        cols && "flex-col",
        lg && "text-lg",
        className
      )}
    >
      {children}
    </div>
  )
}

export default Body

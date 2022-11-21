import { memo } from "react"

export type Props = {
  htmlFor: string
  children: any
} & React.LabelHTMLAttributes<HTMLLabelElement>

const FormLabel = ({ htmlFor, children }: Props) => {
  return (
    <label
      htmlFor={htmlFor}
      className="relative z-20 block text-xs font-bold tracking-wide text-gray-700"
    >
      {children}
    </label>
  )
}

export default memo(FormLabel)

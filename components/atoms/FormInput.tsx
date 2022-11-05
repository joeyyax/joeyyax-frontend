import { memo } from "react"

export type Props = {
  name?: string
  type: "text" | "email"
  placeholder?: string
  register: any
  [key: string]: any
}

const FormInput = ({ name, type, placeholder, register, ...props }: Props) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className="block w-full appearance-none rounded border border-slate-300 bg-white py-3 px-4 leading-tight text-slate-700 focus:border-slate-700 focus:bg-white focus:outline-none"
      {...register}
      {...props}
    />
  )
}

export default memo(FormInput)

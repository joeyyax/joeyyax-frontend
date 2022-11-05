import { memo } from "react"

export type Props = {
  register: any
  [key: string]: any
}

const FormInput = ({ register, ...props }: Props) => {
  return (
    <textarea
      className="block min-h-[100px] w-full appearance-none rounded border border-slate-300 bg-white py-3 px-4 leading-tight text-slate-700 focus:border-slate-700 focus:bg-white focus:outline-none"
      {...register}
      {...props}
    />
  )
}

export default memo(FormInput)

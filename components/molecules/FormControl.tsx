import { memo } from "react"

import FormLabel from "components/atoms/FormLabel"

export type Props = {
  children?: any
  description?: any
  error?: any
  label?: any
  labelFor?: any
}

const FormControl = ({
  children,
  description,
  error,
  label,
  labelFor,
}: Props) => {
  return (
    <div className="form-control flex w-full flex-col gap-2">
      <div className="label flex w-full gap-4 text-xs">
        {label && <FormLabel htmlFor={labelFor}>{label}</FormLabel>}

        {!error && description && (
          <div className="text-slate-400">{description}</div>
        )}
        {error && (
          <div className="error-message italic text-red-600">{error}</div>
        )}
      </div>
      {children}
    </div>
  )
}

export default memo(FormControl)

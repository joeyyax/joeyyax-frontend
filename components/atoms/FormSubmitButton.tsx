import Button from "./Button"

export type Props = {
  children?: any
  [key: string]: any
}

const FormSubmitButton = ({ children, ...props }: Props) => {
  return (
    <Button type="submit" theme="primary" {...props}>
      {children}
    </Button>
  )
}

export default FormSubmitButton

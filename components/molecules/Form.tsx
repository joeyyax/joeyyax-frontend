import FormInput from "components/atoms/FormInput"
import FormSubmitButton from "components/atoms/FormSubmitButton"
import FormTextArea from "components/atoms/FormTextArea"
import Title from "components/atoms/Title"
import FormControl from "components/molecules/FormControl"
import { motion } from "framer-motion"
import { AiOutlineCheckCircle as CheckIcon } from "react-icons/ai"

export type FormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  success?: boolean
  error?: boolean
  children: React.ReactNode
} & React.FormHTMLAttributes<HTMLFormElement>

const Form = ({ children, success, error, ...props }: FormProps) => {
  if (success) {
    return (
      <div className="thank-you flex min-h-[300px] w-full flex-col justify-center gap-8 rounded-lg bg-green-100 p-8">
        <div className="flex w-full flex-row items-center justify-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
            exit="exit"
          >
            <CheckIcon className="items-center text-6xl text-green-700" />
          </motion.div>
          <div className="flex flex-col gap-2 text-green-900">
            <Title size="h4" as="h2">
              Thanks for reaching out!
            </Title>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              exit="exit"
            >
              I&apos;ll get back to within one business day.
            </motion.p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <form {...props}>{children}</form>

      {error && (
        <div className="form-error flex w-full flex-col gap-8">
          <div className="flex flex-col gap-2 text-red-900">
            <Title size="h4" as="h2">
              Well, this is embarrassing...
            </Title>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              exit="exit"
            >
              Something went wrong on my end. Please try again later. If this
              persists please email me directly.
            </motion.p>
          </div>
        </div>
      )}
    </>
  )
}

Form.Control = FormControl
Form.Input = FormInput
Form.TextArea = FormTextArea
Form.SubmitButton = FormSubmitButton

export default Form

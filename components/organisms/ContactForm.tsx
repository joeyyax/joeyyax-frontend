"use client"

import useWeb3Forms from "@web3forms/react"
import { useState } from "react"
import { useForm } from "react-hook-form"

import Form from "components/molecules/Form"

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    mode: "onTouched",
  })

  const [isSuccess, setIsSuccess] = useState(false)

  const { submit: onSubmit } = useWeb3Forms({
    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "",
    settings: {
      from_name: "joeyyax.com",
      subject: "New Contact Message from your Website",
    },
    onSuccess: () => {
      setIsSuccess(true)
      reset()
    },
    onError: () => {
      setIsSuccess(false)
      // TODO: notify me of {msg} and {data}
    },
  })

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      success={isSubmitSuccessful && isSuccess ? true : false}
      error={isSubmitSuccessful && !isSuccess ? true : false}
    >
      <input
        type="checkbox"
        id=""
        className="hidden"
        {...register("botcheck")}
      />

      <Form.Control error={errors.name?.message} label="Name" labelFor="name">
        <Form.Input
          name="name"
          placeholder="Name"
          type="text"
          register={{
            ...register("name", {
              required: "What should I call you?",
              maxLength: 80,
            }),
          }}
        />
      </Form.Control>

      <Form.Control
        description="I'll keep this between us"
        error={errors.email?.message}
        label="Email"
        labelFor="email"
      >
        <Form.Input
          name="email"
          placeholder="you@domain.com"
          type="email"
          register={{
            ...register("email", {
              required: "I need your email address so I can get back to you.",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Hmm, that doesn't look right.",
              },
            }),
          }}
        />
      </Form.Control>

      <Form.Control
        error={errors.phone?.message}
        label="Phone"
        labelFor="phone"
      >
        <Form.Input
          name="phone"
          type="text"
          register={{
            ...register("phone", {
              maxLength: 80,
            }),
          }}
        />
      </Form.Control>

      <Form.Control
        error={errors.message?.message}
        label="Message"
        labelFor="message"
      >
        <Form.TextArea
          name="message"
          register={{
            ...register("message", {
              required: "Please enter a message",
            }),
          }}
        />
      </Form.Control>

      <Form.SubmitButton>
        {isSubmitting ? (
          <svg
            className="mx-auto h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          "Send Message"
        )}
      </Form.SubmitButton>
    </Form>
  )
}

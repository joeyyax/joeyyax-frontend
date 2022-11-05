import { merge } from "lib/classNames"

import Button from "components/atoms/Button"

import Section from "../atoms/Section"

export type CalloutProps = {
  className?: any
}

const Callout = ({ className }: CalloutProps) => {
  return (
    <>
      <Section
        className={merge(
          "callout z-10 items-start text-lg lg:text-2xl",
          className
        )}
      >
        <Section.Container className="h-48 justify-center rounded-xl bg-slate-900 text-slate-100">
          <Section.Body className="justify-between">
            <Section.Title>I&apos;m Available for work</Section.Title>
            <Button href="/contact" theme="primary">
              Let&apos;s Connect
            </Button>
          </Section.Body>
        </Section.Container>
      </Section>
    </>
  )
}

export default Callout

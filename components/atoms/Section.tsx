import { merge } from "lib/classNames"
import { Fragment } from "react"

import Body from "./Body"
import Container, { ContainerType } from "./Container"
import GutterText from "./GutterText"
import Header from "./Header"
import PreTitle from "./PreTitle"
import Title from "./Title"

interface Props {
  id?: string
  name?: string
  className?: string
  padded?: boolean
  noContainer?: boolean // optionally disable the container to be included manually or excluded entirely
  container?: ContainerType
  children: any
  [key: string]: any
}

const Section = ({
  id,
  name,
  className,
  padded = false,
  noContainer = false,
  container = {},
  children,
  ...props
}: Props) => {
  const ConditionalContainer = noContainer ? Fragment : Container

  return (
    <section
      key={id || name}
      id={id}
      className={merge(
        name,
        "z-10 flex w-full flex-col justify-start",
        padded && "p-4 md:p-6 lg:p-8",
        className
      )}
      {...props}
    >
      <ConditionalContainer {...container}>{children}</ConditionalContainer>
    </section>
  )
}

Section.displayName = "Section"

Section.Container = Container
Section.Header = Header
Section.Title = Title
Section.PreTitle = PreTitle
Section.Body = Body
Section.GutterText = GutterText

export default Section

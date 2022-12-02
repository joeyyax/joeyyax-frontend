import HeroBody, { HeroBodyType } from "components/atoms/HeroBody"
import HeroMedia from "components/atoms/HeroMedia"
import PreTitle, { PreTitleType } from "components/atoms/PreTitle"
import Section from "components/atoms/Section"
import Title, { TitleType } from "components/atoms/Title"
import HeroBackground from "components/molecules/HeroBackground"
import Tags, { TagsType } from "components/molecules/Tags"
import { merge } from "lib/classNames"

export type HeroType = {
  theme?: "light" | "dark"
  title?: TitleType
  titleText?: string
  preTitle?: PreTitleType
  preTitleText?: string
  body?: HeroBodyType
  tags?: TagsType
  className?: any
  children?: any
  backgroundColor?: string
  backgroundImage?: any
  [key: string]: any
}

const Hero = ({
  theme = "dark",
  title,
  titleText,
  preTitle,
  preTitleText,
  body,
  tags,
  className,
  children,
  backgroundColor,
  backgroundImage,
  ...props
}: HeroType) => {
  if (titleText) {
    title = { children: titleText, ...title }
  }

  if (preTitleText) {
    preTitle = { children: preTitleText, ...preTitle }
  }

  return (
    <Section
      className={merge(
        "hero relative z-10 items-start overflow-visible text-lg lg:text-2xl",
        theme == "light" && "text-white",
        className
      )}
      noContainer={true}
      {...props}
    >
      <Section.Container className="pb-4 md:pb-4 lg:pb-4">
        <div className="flex flex-col md:gap-2">
          {preTitle && <PreTitle {...preTitle}>{preTitle.children}</PreTitle>}

          {title && (
            <Title size="h1" {...title}>
              {title.children}
            </Title>
          )}

          {body && <HeroBody {...body} />}

          {tags && <Tags {...tags} theme={theme} />}

          {children && <div className="mt-12">{children}</div>}
        </div>
      </Section.Container>
      {backgroundColor && (
        <HeroBackground color={backgroundColor} image={backgroundImage} />
      )}
    </Section>
  )
}

Hero.displayName = "Hero"

export default Object.assign(Hero, {
  PreTitle,
  Title,
  Tags,
  Media: HeroMedia,
})

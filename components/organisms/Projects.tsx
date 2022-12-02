import ProjectCard, {
  ProjectCardFormatType,
  ProjectCardSizeType,
} from "../../components/molecules/ProjectCard"
import Section from "../atoms/Section"
import { GutterTextProps } from "components/atoms/GutterText"
import { classNames } from "lib/classNames"
import { client, groq } from "lib/sanity"

export type Props = {
  gutterText?: GutterTextProps
  cols?: number
  format?: ProjectCardFormatType
  size?: ProjectCardSizeType
  compact?: boolean
}

const getData = async () => {
  const data = client
    .fetch(
      groq`*[_type == 'project'] | order(orderRank) {
          title, 
          "slug": slug.current,
          subtitle, 
          color, 
          tags[]->{
            title,
            "slug": slug.current
          },
          thumbnail{
            "src": asset->url,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height,
            "alt": asset->metadata.alt,
            "blurDataURL": asset->metadata.lqip
          }
        }`
    )
    .then((data) => {
      return data
    })

  return data
}

const Projects = async ({
  gutterText,
  cols = 1,
  format,
  size,
  compact = false,
}: Props) => {
  const data = await getData()

  return (
    <Section className="projects">
      {gutterText && <Section.GutterText {...gutterText} />}
      <Section.Body
        className={classNames(
          "grid w-full rounded-xl",
          cols == 1 && "grid-cols-1",
          cols == 2 && "grid-cols-1 md:grid-cols-2",
          compact && "gap-0 overflow-hidden rounded-lg md:gap-0"
        )}
      >
        {data?.map((project: any) => {
          return (
            <ProjectCard
              format={format}
              size={size}
              rounded={!compact}
              key={project.slug}
              slug={project.slug}
              title={project.title}
              subtitle={project.subtitle}
              color={project.color}
              tags={{ data: project.tags }}
              thumbnail={
                project.thumbnail && {
                  src: project.thumbnail.src,
                  width: project.thumbnail.width,
                  height: project.thumbnail.height,
                  alt: "",
                  placeholder: "blur",
                  blurDataURL: project.thumbnail.blurDataURL,
                }
              }
            />
          )
        })}
      </Section.Body>
    </Section>
  )
}

export default Projects

import { classNames } from "lib/classNames"
import { Text, client, groq } from "lib/sanity"
import {
  AiOutlineInfoCircle as InfoIcon,
  AiOutlineExclamationCircle as MaintainerIcon,
  AiOutlineTeam as PartnerIcon,
} from "react-icons/ai"
import { BsPersonBadge as EmployeeIcon } from "react-icons/bs"

import Alert from "components/atoms/Alert"
import Button from "components/atoms/Button"
import Section from "components/atoms/Section"
import Overflow from "components/molecules/Overflow"
import Hero from "components/organisms/Hero"
import ProjectNavigation from "components/organisms/ProjectNavigation"

// Generates `/work/{project}` and required for sitemap generation
export async function generateStaticParams() {
  const projectSlugs = await client.fetch(
    groq`*[_type == 'project'] | order(orderRank) {"slug": slug.current}`
  )

  return projectSlugs?.map((project: any) => ({
    project: project.slug,
  }))
}

const getData = async (slug: string) => {
  const data = client
    .fetch(
      groq`*[_type == 'project' && slug.current==$slug][0]{
        title,
        "slug": slug.current,
        subtitle,
        color,
        url,
        tags[]->{
          title,
          abbreviatedTitle,
          "slug": slug.current,
          description
        },
        heroImage{
          "src": asset->url,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
          "alt": asset->metadata.alt,
          "blurDataURL": asset->metadata.lqip
        },
        "roles": role[]->{
          title,
          abbreviatedTitle,
          "slug": slug.current,
          description,
        },
        employer->{
          title,
          "slug": slug.current
        },
        "partners": partner[]->{
          title,
          "slug": slug.current
        },
        status,
        notice,
        nextProject->{
          title,
          "slug": slug.current,
          subtitle,
          thumbnail{
            "src": asset->url,
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height,
            "alt": asset->metadata.alt,
            "blurDataURL": asset->metadata.lqip
          }
        },
        intro
      }`,
      {
        slug,
      }
    )
    .then((data) => {
      return data
    })

  return data
}

const Project = async ({ params: { project } }: any) => {
  const data = await getData(project)

  const employer = data.employer?.title

  const partners: string[] = []
  data.partners?.map((partner: any) => partners.push(partner.title))

  return (
    <>
      <Hero
        theme="light"
        slug={data.slug}
        title={{
          children: data.title,
          animation: {
            initial: { opacity: 0, y: 250, skewY: 15 },
            animate: { opacity: 1, y: 0, skewY: 0, transition: { delay: 0.5 } },
            exit: { opacity: 0, y: 0, skewY: 0 },
          },
        }}
        preTitle={{
          children: "Work",
          delay: 0.8,
          href: "/work",
          icon: { position: "left" },
        }}
        tags={{ data: data.tags, delay: 0.7 }}
        body={{
          children: data.subtitle,
          animation: {
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0, transition: { delay: 0.8 } },
            exit: { opacity: 0, y: 0 },
          },
        }}
        backgroundColor={data.color}
        backgroundImage={data.heroImage}
        className="origin-bottom-left"
      >
        <Hero.Media slug={data.slug} image={data.heroImage} />
      </Hero>

      {/* intro */}
      <Section className="relative overflow-x-hidden py-0">
        <div className="grid w-full grid-cols-1 gap-8 py-0 md:grid-cols-12 md:py-0 lg:py-0">
          <div className="md:col-span-7">
            <div className="prose">
              <Text value={data.intro} />
            </div>
            {data.url && (
              <p>
                <Button
                  href={data.url}
                  target="_blank"
                  className="mt-4"
                  theme="primary"
                >
                  Visit Website
                </Button>
              </p>
            )}

            <div className="mt-8 flex w-full flex-col items-start gap-4 ">
              {employer && (
                <Alert icon={<EmployeeIcon />} size="small" theme="muted">
                  This project was completed while employed at {employer}
                </Alert>
              )}

              {partners?.length > 0 && (
                <Alert icon={<PartnerIcon />} size="small" theme="muted">
                  This project was completed in partnership with{" "}
                  {partners.join(", ")}
                </Alert>
              )}

              {["handed-off", "not-maintained"].includes(data.status) && (
                <Alert icon={<MaintainerIcon />} size="small" theme="muted">
                  I no longer maintain this project
                </Alert>
              )}

              {data.notice && (
                <Alert icon={<InfoIcon />} size="small" theme="caution">
                  {data.notice}
                </Alert>
              )}
            </div>
          </div>
          {data.roles?.length > 0 && (
            <div
              className={classNames(
                "flex flex-col items-stretch text-slate-700 md:col-span-5"
              )}
            >
              <Overflow className="h-full bg-slate-100">
                <Overflow.Container className="flex flex-col justify-center gap-2 p-8 pr-0">
                  <Section.Title
                    size="h4"
                    className="flex flex-row gap-3 font-mono"
                  >
                    {data.roles?.length > 1 ? "Roles" : "Role"}
                  </Section.Title>
                  <Section.Body className="font-mono text-sm">
                    <ul className="list-lined">
                      {data.roles.map(({ title }: any, _index: number) => (
                        <li key={_index}>{title}</li>
                      ))}
                    </ul>
                  </Section.Body>
                </Overflow.Container>
              </Overflow>
            </div>
          )}
        </div>
      </Section>

      {/* TODO: dynamic sections to appear here */}

      {/* @ts-expect-error Server Component */}
      <ProjectNavigation nextProject={data.nextProject} />
    </>
  )
}

export default Project

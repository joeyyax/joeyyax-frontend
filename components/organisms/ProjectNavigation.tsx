import { merge } from "lib/classNames"
import { client, groq } from "lib/sanity"
import Image from "next/image"
import Link from "next/link"

import LinkIcon from "components/atoms/LinkIcon"
import Section from "components/atoms/Section"

export type ProjectNavigationProps = {
  nextProject: any
  className?: string
  [key: string]: any
}

const getData = async () => {
  const data = client
    .fetch(
      groq`*[_type == 'settings'][0] {
        available
      }`
    )
    .then((data) => {
      return data
    })

  return data
}

const ProjectNavigation = async ({
  nextProject,
  className,
  ...props
}: ProjectNavigationProps) => {
  const { available } = await getData()
  return (
    <Section className={merge("next-project", className)} {...props}>
      <Section.Body className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-12">
        {nextProject && (
          <Link href={`/work/${nextProject.slug}`} legacyBehavior>
            <div className="group relative z-10 grid cursor-pointer grid-cols-6 items-center gap-8 rounded-xl bg-slate-200 p-8 transition-all hover:scale-105 md:col-span-8 md:p-12">
              <div className="relative col-span-2 max-h-48 overflow-hidden rounded">
                <Image {...nextProject.thumbnail} alt="" />
              </div>
              <div className="col-span-4 flex flex-col items-start gap-2">
                <Section.PreTitle>Next Project</Section.PreTitle>
                <Section.Title size="h4" as="h3">
                  <>
                    {nextProject.title}
                    <LinkIcon />
                  </>
                </Section.Title>
              </div>
            </div>
          </Link>
        )}

        {!nextProject && (
          <Link
            href="/work"
            className="group relative z-10 grid cursor-pointer grid-cols-6 items-center gap-8 rounded-xl bg-slate-200 p-8 transition-all hover:scale-105 md:col-span-8 md:p-12"
          >
            <div className="col-span-6 flex flex-col items-start gap-2">
              <Section.PreTitle>
                But wait, there&apos;s more&hellip;
              </Section.PreTitle>
              <Section.Title size="h4" as="h3">
                <>
                  <LinkIcon position="left" />
                  All Projects
                </>
              </Section.Title>
            </div>
          </Link>
        )}

        <Link
          href="/contact"
          className="group relative z-0 flex cursor-pointer flex-col items-start justify-center gap-2 rounded-xl bg-indigo-100 p-8 transition-all hover:scale-105 md:col-span-4"
        >
          <Section.PreTitle>
            {available ? (
              <>I&apos;m Available for work</>
            ) : (
              <>Let&apos;s connect</>
            )}
          </Section.PreTitle>
          <Section.Title
            size="h4"
            as="h3"
            className="bg-gradient-to-br from-purple-400 to-pink-600 bg-clip-text text-transparent"
          >
            Let&apos;s connect
            <LinkIcon className="text-pink-600" />
          </Section.Title>
        </Link>
      </Section.Body>
    </Section>
  )
}

export default ProjectNavigation

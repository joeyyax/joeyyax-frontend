import { Text, client, groq } from "lib/sanity"
import Image from "next/image"
import { AiOutlineFilePdf as PdfIcon } from "react-icons/ai"

import Button from "components/atoms/Button"
import Section from "components/atoms/Section"
import Head from "components/molecules/Head"
import Callout from "components/organisms/Callout"
import FilterableTags from "components/organisms/FilterableTags"

const getData = async () => {
  const data = client
    .fetch(
      groq`*[_id == 'about'][0]{
      title,
      body,
      resume,
      photo{
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

const Page = async () => {
  const data = await getData()

  return (
    <>
      <Head title={data.title} />
      <Section>
        <Section.Body className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <Section.Header className="mb-6">
              <Section.Title size="h1">{data.title}</Section.Title>
            </Section.Header>
            <Section.Body lg>
              <div>
                <Text value={data.body} />
                {data.resume && (
                  <p className="pt-8">
                    <Button
                      theme="primary"
                      href={data.resume}
                      icon={{
                        position: "left",
                        value: <PdfIcon />,
                      }}
                    >
                      Download Resume
                    </Button>
                  </p>
                )}
              </div>
            </Section.Body>
          </div>
          <Section.Body className="justify-center">
            <Image
              src={data.photo.src}
              width={data.photo.width}
              height={data.photo.height}
              alt=""
              placeholder="blur"
              blurDataURL={data.photo.blurDataURL}
              priority
              className="rounded-lg"
            />
          </Section.Body>
        </Section.Body>
      </Section>
      <FilterableTags />
      <Callout />
    </>
  )
}

export default Page

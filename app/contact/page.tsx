import Section from "components/atoms/Section"
import ContactInformation from "components/molecules/ContactInformation"
import Head from "components/molecules/Head"
import Overflow from "components/molecules/Overflow"
import Socials from "components/molecules/Socials"
import ContactForm from "components/organisms/ContactForm"
import { Text, client, groq } from "lib/sanity"

const getData = async () => {
  const data = client
    .fetch(groq`*[_id == 'contact'][0]{title,body}`)
    .then((data) => {
      return data
    })

  return data
}

const Page = async () => {
  const data = await getData()

  return (
    <>
      <Head title="Contact" />
      <Section
        className="relative h-full overflow-x-hidden"
        container={{
          className: "grid grid-cols-1 md:grid-cols-2",
        }}
      >
        <Section.Body cols className="gap-8 pr-4 md:pr-8">
          <Section.Header>
            <Section.Title>{data.title}</Section.Title>
            <Text value={data.body} />
          </Section.Header>
          <ContactForm />
        </Section.Body>

        <Overflow
          direction="left"
          className="bg-gradient-to-tr from-slate-900 to-cyan-900 text-white text-opacity-75 mix-blend-luminosity"
        >
          <Overflow.Container className="flex flex-col justify-center gap-8 py-8 pl-4 md:py-12 md:pl-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold">Contact Information</h3>
              {/* @ts-expect-error Server Component */}
              <ContactInformation />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold">Find me on socials too</h3>
              {/* @ts-expect-error Server Component */}
              <Socials as="list" />
            </div>
          </Overflow.Container>
        </Overflow>
      </Section>
    </>
  )
}

export default Page

import { Text, client, groq } from "lib/sanity"

import Head from "components/molecules/Head"
import Hero from "components/organisms/Hero"
import Projects from "components/organisms/Projects"

const getData = async () => {
  const data = client.fetch(groq`*[_id == 'work'][0]`).then((data) => {
    return data
  })

  return data
}

const Page = async () => {
  const data = await getData()

  return (
    <>
      <Head ancestor="Work" title={data.title} />
      <Hero
        titleText={data.title}
        body={{ children: <Text value={data.body} /> }}
      />

      {/* @ts-expect-error Server Component */}
      <Projects format="cols" size="large" />
    </>
  )
}

export default Page

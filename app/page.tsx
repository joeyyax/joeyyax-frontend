import Head from "components/molecules/Head"
import Callout from "components/organisms/Callout"
import Hero from "components/organisms/Hero"
import Projects from "components/organisms/Projects"
import { client, groq, toPlainText } from "lib/sanity"

const getData = async () => {
  const data = client
    .fetch(groq`*[_id == 'home'][0]{title,body}`)
    .then((data) => {
      return data
    })

  return data
}

const HomePage = async () => {
  const data = await getData()

  return (
    <>
      <Head />
      <Hero
        className="min-h-[75vh] justify-center pb-16 md:pt-16 md:pb-24"
        title={{
          children: (
            <>
              <span className="bg-gradient-to-br from-yellow-300 to-orange-600 bg-clip-text text-transparent">
                {data.title}
              </span>{" "}
              <span>{toPlainText(data.body)}</span>
            </>
          ),
        }}
      ></Hero>

      {/* @ts-expect-error Server Component */}
      <Projects
        cols={2}
        size="medium"
        gutterText={{ asTitle: true, children: "Recent Projects" }}
      />

      <Callout />
    </>
  )
}

export default HomePage

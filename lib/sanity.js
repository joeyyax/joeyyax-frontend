import { PortableText as Text, toPlainText } from "@portabletext/react"
import sanityClient from "@sanity/client"
import groq from "groq"

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: process.env.NEXT_PUBLIC_SANITY_CDN || true, // `false` to ensure fresh data
  token: process.env.SANITY_TOKEN || null, // leave blank for unauthenticated usage
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2021-10-21",
})

// exporting client along with commonly used helpers so they don't have to be manually imported every time
export { client, groq, Text, toPlainText }

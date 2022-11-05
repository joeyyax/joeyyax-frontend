"use client"

import { useEffect, useState } from "react"

export type HeadProps = {
  ancestor?: string
  title?: string
  description?: string
}

const Head = ({ title, ancestor, description }: HeadProps) => {
  const [url, setURL] = useState("https://www.joeyyax.com")
  const separator = " - "
  const base = "Joey Yax"

  // create Set of title parts
  const titleParts = new Set()
  titleParts.add(base)
  if (title) titleParts.add(title)
  if (ancestor) titleParts.add(ancestor)

  // create title string
  const titleString = Array.from(titleParts).join(separator)

  useEffect(() => {
    document.title = titleString

    window.onblur = () => {
      document.title = `${titleString} 👋`
    }

    window.onfocus = () => {
      document.title = titleString
    }
  }, [titleString])

  useEffect(() => {
    setURL(window.location.href)
  }, [])

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />
      <title>{titleString}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={titleString} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      {/* <meta property="og:image" content="/images/fb-image.png" /> */}
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={base} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@joeyyax" />
      <meta name="twitter:creator" content="@joeyyax" />
      <meta name="twitter:title" content={titleString} />
      <meta name="twitter:description" content={description} />
      {/* <meta name="twitter:image" content="/images/tw-image.png" /> */}

      {/* <link rel="icon" href="/favicon.ico" /> */}
      {/* <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" /> */}
      {/* <link rel="manifest" href="/manifest.json" /> */}
      {/* <link rel="mask-icon" href="/images/safari-pinned-tab.svg" color="#000000" /> */}
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
    </>
  )
}

export default Head

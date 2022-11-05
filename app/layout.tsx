import "../styles/globals.css"

export type Props = {
  children: any
}

export default function Layout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <title>Joey Yax</title>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}

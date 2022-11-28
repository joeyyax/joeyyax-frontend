import "../styles/globals.css"
import { Inter } from "@next/font/google"
import Head from "components/molecules/Head"
import Footer from "components/organisms/Footer"
import Navbar from "components/organisms/Navbar"

// embed fonts with var so they can be accessed in the stylesheet and tailwind
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export type Props = {
  children: any
}

export default function Layout({ children }: Props) {
  return (
    <html lang="en" className={inter.variable}>
      <Head />
      {process.env.NODE_ENV === "production" && (
        <script
          async
          defer
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
          src={process.env.NEXT_PUBLIC_UMAMI_URL}
        />
      )}
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

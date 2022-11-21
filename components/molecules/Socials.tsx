import classNames from "classnames"
import { client, groq } from "lib/sanity"
import Link from "next/link"
import { IconType } from "react-icons"
import {
  FaGithub as GitHubIcon,
  FaLinkedin as LinkedInIcon,
  FaTwitter as TwitterIcon,
} from "react-icons/fa"

const iconMap: { [key: string]: IconType } = {
  github: GitHubIcon,
  twitter: TwitterIcon,
  linkedin: LinkedInIcon,
}

interface Props {
  as?: "icons" | "list"
  className?: string
}

const getData = async () => {
  const data = client
    .fetch(
      groq`*[_type == 'social'] | order(orderRank) {
        title,
        network,
        username,
        url
      }`
    )
    .then((data) => {
      return data
    })

  return data
}

const Socials = async ({ as = "icons", className }: Props) => {
  const data = await getData()

  if (as == "list") {
    return (
      <div className={classNames("socials flex", className)}>
        <ul className="w-full">
          {data?.map(({ title, network, username, url }: any) => {
            if (!url) return

            const Icon = iconMap[network]

            return (
              <li key={network} className="pb-2">
                <Link
                  href={url}
                  className={classNames(
                    "social flex flex-row items-center gap-2",
                    `social--${network}`,
                    `umami--click--social-${network}`
                  )}
                  title={`Follow ${username} on ${title}`}
                  target="_blank"
                >
                  <Icon /> {title}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div
      className={classNames("socials flex flex-row gap-4 text-2xl", className)}
    >
      {data?.map(({ title, username, network, url }: any) => {
        if (!url) return

        const Icon = iconMap[network]

        return (
          <Link
            href={url}
            key={network}
            className={classNames(
              "social hover:text-slate-500",
              `social--${network}`,
              `umami--click--social-${network}`
            )}
            title={`Follow ${username} on ${title}`}
            target="_blank"
          >
            <Icon />
          </Link>
        )
      })}
    </div>
  )
}

export default Socials

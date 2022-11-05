import classNames from "classnames/dedupe"
import Link from "next/link"

interface Props {
  withIcon?: boolean
  withLabel?: boolean
  theme?: "dark" | "light" | undefined
}

const Branding = ({ withIcon = true, withLabel = true, theme }: Props) => {
  const useDarkTheme = theme == "dark" ? true : false

  return (
    <Link
      href="/"
      passHref
      className={classNames(
        "branding",
        "no-break inline-flex items-center gap-2 font-bold uppercase",
        "dark:hover:text-action dark:text-slate-600",
        "opacity-80 hover:opacity-100",
        "umami--click--branding"
      )}
      aria-label="Go to homepage"
    >
      {withIcon && (
        <svg
          viewBox="0 0 30 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8"
        >
          <path
            d="M14.9853 3.95508L20.3994 7.28978L23.1446 5.60394L14.9853 0.576019L1.35643 8.97561L4.08775 10.6614L14.9853 3.95508Z"
            className={classNames(
              "icon-border opacity-60",
              !useDarkTheme && "fill-slate-700",
              useDarkTheme && "fill-white"
            )}
          />
          <path
            d="M25.876 7.28979L14.9853 13.9962L9.57124 10.6615L6.83299 12.3473L14.9853 17.3678L28.6211 8.97563L25.876 7.28979Z"
            className={classNames(
              "icon-character",
              !useDarkTheme && "fill-slate-700",
              useDarkTheme && "fill-white"
            )}
          />
          <path
            d="M3.54703 18.5731L0.808777 16.8873V26.9283L14.4376 35.3279V31.9563L3.54703 25.2425V18.5731Z"
            className={classNames(
              "icon-border opacity-60",
              !useDarkTheme && "fill-slate-700",
              useDarkTheme && "fill-white"
            )}
          />
          <path
            d="M0.808777 13.5155L11.6994 20.2218V26.8912L14.4376 28.5844V18.536L0.808777 10.1438V13.5155Z"
            className={classNames(
              "icon-character",
              !useDarkTheme && "fill-slate-700",
              useDarkTheme && "fill-white"
            )}
          />
          <path
            d="M23.6923 16.8872V13.5155L15.533 18.5361V35.3279L18.2712 33.642V20.2219L23.6923 16.8872Z"
            className={classNames(
              "icon-character",
              !useDarkTheme && "fill-slate-700",
              useDarkTheme && "fill-white"
            )}
          />
          <path
            d="M26.4236 11.8296V25.2424L21.0095 28.5844V31.9561L29.1688 26.9282V10.1438L26.4236 11.8296Z"
            className={classNames(
              "icon-border opacity-60",
              !useDarkTheme && "fill-slate-700",
              useDarkTheme && "fill-white"
            )}
          />
        </svg>
      )}
      {withLabel && (
        <span
          className={classNames(
            "branding-label font-mono text-sm",
            !useDarkTheme && "text-slate-700",
            useDarkTheme && "text text-slate-100"
          )}
        >
          Joey Yax
        </span>
      )}
    </Link>
  )
}

export default Branding

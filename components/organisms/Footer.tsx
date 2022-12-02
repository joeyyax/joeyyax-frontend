import Section from "components/atoms/Section"
import Branding from "components/molecules/Branding"
import Socials from "components/molecules/Socials"
import { classNames, merge } from "lib/classNames"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <Section
        id="footer"
        className={merge(
          "z-10 items-start",
          "text-slate-400",
          "bg-gradient-to-b from-transparent to-slate-200",
          "relative mt-auto"
        )}
      >
        <div
          className={classNames(
            "flex w-full flex-col-reverse items-center gap-4",
            "md:flex-row md:justify-between"
          )}
        >
          <div className="flex flex-row items-center gap-2">
            <Branding theme="light" withLabel={false} />
            <p className="text-sm">
              &copy; {currentYear} Joey Yax. All rights reserved.
            </p>
          </div>
          <div>
            {/* @ts-expect-error Server Component */}
            <Socials />
          </div>
        </div>
      </Section>
    </>
  )
}

export default Footer

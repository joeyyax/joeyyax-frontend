/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

let breakpoints = Object.assign({}, defaultTheme.screens)
delete breakpoints["2xl"] // delete the 2xl breakpoint

module.exports = {
  content: ["./{components,pages,app,styles}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      container: {
        screens: breakpoints,
        center: true,
      },
      colors: {
        action: {
          default: colors.pink["600"],
          base: colors.pink["600"],
          hover: colors.pink["500"],
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}

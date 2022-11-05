import { defineConfig } from "cypress"

export default defineConfig({
  // projectId: '',
  viewportWidth: 1280,
  viewportHeight: 800,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:3000",
    specPattern: "./{cypress,pages,components,lib}/**/*.spec.js",
  },
})

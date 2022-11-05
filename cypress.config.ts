import { defineConfig } from "cypress"

export default defineConfig({
  // projectId: '',
  viewportWidth: 1280,
  viewportHeight: 800,
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "./{cypress,app,components,lib}/**/*.spec.js",
  },
})

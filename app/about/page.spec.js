/// <reference types="cypress" />

describe("About Page", () => {
  beforeEach(() => {
    cy.visit("/about")
  })

  it("If exists, check if resume link is visible and works", () => {
    cy.get("body").then(($body) => {
      if ($body.find("a.download-resume").length > 0) {
        cy.get("a.download-resume").should("be.visible")
        cy.request(cy.get("a.download-resume")).its("status").should("eq", 200)
      }
    })
  })
})

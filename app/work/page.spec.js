/// <reference types="cypress" />

describe("Work Page", () => {
  beforeEach(() => {
    cy.visit("/work")
  })

  it("Projects appear", () => {
    cy.get(".projects").should("be.visible")
  })

  it("Project links are working", () => {
    cy.get("a.project-card").each(($el) => {
      cy.url().should("include", "/work")
      cy.request($el.prop("href")).its("status").should("eq", 200)
    })
  })
})

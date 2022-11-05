/// <reference types="cypress" />

describe("Abobut Page", () => {
  beforeEach(() => {
    cy.visit("/about")
  })

  it("Has link to resume", () => {
    cy.get("a").contains("Resume").should("be.visible")
  })

  it("Resume link works", () => {
    cy.request(cy.get("a").contains("Resume")).its("status").should("eq", 200)
  })
})

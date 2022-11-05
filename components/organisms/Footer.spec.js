/// <reference types="cypress" />

describe("Footer", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("Footer is present", () => {
    cy.get("#footer")
  })

  it("Footer has current copyright year", () => {
    cy.get("#footer").contains(new Date().getFullYear())
  })

  //   it("Footer has privacy policy link", () => {
  //     cy.get("#footer a[href*='/privacy']").should("be.visible")
  //   })
})

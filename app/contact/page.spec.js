/// <reference types="cypress" />

describe("Contact Page", () => {
  it("Email address is present", () => {
    cy.visit("/contact")
    cy.get(".email").contains("@joeyyax.com")
  })

  it("Phone number is present", () => {
    cy.get(".phone").should("be.visible")
  })

  it("Contact link is present", () => {
    cy.get('#navbar a[href*="/contact"]')
  })

  it("Form is present", () => {
    cy.get("form").should("be.visible")
  })

  it("Form should not submit without required fields", () => {
    cy.get("form").submit()

    cy.get(".thank-you").should("not.exist")
  })

  it("Form is working", () => {
    cy.get("form input[name='name']").type("E2E Test")
    cy.get("form input[name='email']").type("joey+cypress@joeyyax.com")
    cy.get("form input[name='phone']").type("503 000 0000")
    cy.get("form textarea[name='message']").type("E2E Test")
    cy.get("form button[type='submit']").click()
    cy.get(".thank-you").should("be.visible")
  })
})

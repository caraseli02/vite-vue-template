import SignIn from "./SignIn.vue";

describe("SignIn component", () => {
  beforeEach(() => {
    cy.visit("/signin");
  });

  it("displays email and password form fields", () => {
    cy.mount(SignIn);
    cy.get("[name=email]").should("be.visible");
    cy.get("[name=password]").should("be.visible");
  });

  it("submits form when email and password are entered", () => {
    cy.mount(SignIn);
    cy.get("[name=email]").type("test@example.com");
    cy.get("[name=password]").type("password123");
    cy.get("form").submit();
    // Assert that the authStore's loading state is set to true
  });

  it("shows forgot password form when button is clicked", () => {
    cy.mount(SignIn);
    cy.get(".font-medium").click();
    cy.get("forgot-password").should("be.visible");
  });
});

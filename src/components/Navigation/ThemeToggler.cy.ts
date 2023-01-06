import ThemeToggler from "./ThemeToggler.vue";

describe("ColorModeSwitcher component", () => {
  it("mount the componet with auto icon", () => {
    cy.mount(ThemeToggler);
    cy.get("svg").should("have.class", "DesktopComputerIcon").click();
    cy.get("svg").should("have.class", "MoonIcon").click();
    cy.get("svg").should("have.class", "SunIcon").click();
  });
});

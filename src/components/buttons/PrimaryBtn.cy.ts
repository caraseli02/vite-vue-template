import PrimaryBtn from "~/components/buttons/PrimaryBtn.vue";

describe("PrimaryBtn component", () => {
  it("renders a button with the default color class", () => {
    cy.mount(PrimaryBtn, { slots: { default: "Sign In" } });
    cy.get("button").should("have.class", "from-cyan-500 to-blue-500");
  });

  it("renders a button with the purpleBlue color class", () => {
    cy.mount(PrimaryBtn, {
      props: { color: "purpleBlue" },
      slots: { default: "Sign In" },
    });
    cy.get("button").should("have.class", "from-purple-600 to-blue-500");
  });

  it("renders a button with the greenBlue color class", () => {
    cy.mount(PrimaryBtn, {
      props: { color: "greenBlue" },
      slots: { default: "Sign In" },
    });
    cy.get("button").should("have.class", "from-green-400 to-blue-600");
  });

  it("renders a button with the pinkOrange color class", () => {
    cy.mount(PrimaryBtn, {
      props: { color: "pinkOrange" },
      slots: { default: "Sign In" },
    });
    cy.get("button").should("have.class", "from-pink-500 to-orange-400");
  });

  it("renders a button with the redYellow color class", () => {
    cy.mount(PrimaryBtn, {
      props: { color: "redYellow" },
      slots: { default: "Sign In" },
    });
    cy.get("button").should(
      "have.class",
      "from-red-200 via-red-300 to-yellow-200"
    );
  });
});

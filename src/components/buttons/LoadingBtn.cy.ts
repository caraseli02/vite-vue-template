import LoadingBtn from "~/components/buttons/LoadingBtn.vue";
const mount = cy.mount;
describe("LoadingBtn component", () => {
  it("renders a button with the given text", () => {
    mount(LoadingBtn, { slots: { default: "Sign In" } });
    cy.get("button").should("contain", "Sign In");
  });

  it("renders a spinner when the loading prop is true", () => {
    mount(LoadingBtn, { props: { loading: true } });
    cy.get("svg.animate-spin").should("be.visible");
  });

  it("renders an arrow icon when the loading prop is false", () => {
    mount(LoadingBtn, { props: { loading: false } });
    cy.get("svg.ArrowCircleRightIcon").should("be.visible");
  });
});

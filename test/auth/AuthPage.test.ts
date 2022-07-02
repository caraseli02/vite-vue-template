import { render, fireEvent } from "@testing-library/vue";
import { expect, it, describe } from "vitest";
import AuthPage from "~/pages/AuthPage.vue";

describe("AuthPage", () => {
  it("mount component", async () => {
    const { getByText } = render(AuthPage);

    getByText("Sign in");
  });
});

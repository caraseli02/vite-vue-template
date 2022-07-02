import { render, fireEvent } from "@testing-library/vue";
import { expect, it, describe } from "vitest";
import SignIn from "~/components/auth/SignIn.vue";

describe("AuthPage", () => {
  it("mount component", async () => {
    const { getByText } = render(SignIn);

    getByText("Sign in");
  });
});

import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderNavbar } from "./_helpers";

describe("Navbar component", () => {
  it("navigates to homepage when user clicks home button", async () => {
    const user = userEvent.setup();
    renderNavbar("/shop");

    const homeBtn = screen.getByRole("link", { name: /home/i });
    await user.click(homeBtn);

    expect(screen.getByText("Welcome to the Homepage")).toBeInTheDocument();
  });

  it("navigates to shop when user clicks shop button", async () => {
    const user = userEvent.setup();
    renderNavbar("/");

    const shopBtn = screen.getByRole("link", { name: /shop/i });
    await user.click(shopBtn);

    expect(screen.getByText("Welcome to the Shop")).toBeInTheDocument();
  });

  it("navigates to cart when user clicks cart button", async () => {
    const user = userEvent.setup();
    renderNavbar("/");

    const cartBtn = screen.getByRole("link", { name: /cart/i });
    await user.click(cartBtn);

    expect(screen.getByText("Welcome to the Cart")).toBeInTheDocument();
  });
});

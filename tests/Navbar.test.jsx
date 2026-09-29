import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRoutesStub, Outlet } from "react-router";
import userEvent from "@testing-library/user-event";
import { Navbar } from "../src/components/Navbar/Navbar";

function renderNavbar(initialPath) {
  const RouterStub = createRoutesStub([
    {
      path: "/",
      Component: () => (
        <>
          <Navbar />
          <Outlet />
        </>
      ),
      children: [
        { index: true, Component: () => <h1>Welcome to the Homepage</h1> },
        { path: "shop", Component: () => <h1>Welcome to the Shop</h1> },
        { path: "cart", Component: () => <h1>Welcome to the Cart</h1> },
      ],
    },
  ]);

  return render(<RouterStub initialEntries={[initialPath]} />);
}

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
    renderNavbar("/shop");

    const cartBtn = screen.getByRole("link", { name: /cart/i });
    await user.click(cartBtn);

    expect(screen.getByText("Welcome to the Cart")).toBeInTheDocument();
  });
});

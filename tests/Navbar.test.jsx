import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createRoutesStub, Outlet } from "react-router";
import userEvent from "@testing-library/user-event";
import { Navbar } from "../src/components/Navbar/Navbar";

describe("Navbar component", () => {
  it("navigates to homepage when user clicks home button", async () => {
    const user = userEvent.setup();

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
          { path: "shop", Component: () => <h1>Shop</h1> },
        ],
      },
    ]);

    render(<RouterStub initialEntries={["/shop"]} />);

    const homeBtn = screen.getByRole("link", { name: /home/i });
    await user.click(homeBtn);

    expect(screen.getByText("Welcome to the Homepage")).toBeInTheDocument();
  });
});

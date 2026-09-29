import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../src/routes";

export function renderShop() {
  const router = createMemoryRouter(routes, { initialEntries: ["/shop"] });
  return render(<RouterProvider router={router} />);
}

describe("App Form submission", () => {
  it("updates the input value as the user types in the search bar", async () => {
    const user = userEvent.setup();

    renderShop();
    const searchInput = screen.getByTestId("search-input");
    await user.type(searchInput, "Slippers");

    expect(searchInput).toHaveValue("Slippers");
  });

  it("submits the form with the correct query payload", async () => {
    const user = userEvent.setup();

    vi.stubEnv("DEV", "false");
    import.meta.env.DEV = false;

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: "Cozy Slippers" }],
    });
    vi.stubGlobal("fetch", mockFetch);

    renderShop();

    const searchInput = screen.getByTestId("search-input");
    await user.type(searchInput, "Slippers");

    const submitBtn = screen.getByRole("button", { name: /search/i });
    await user.click(submitBtn);

    const firstCall = mockFetch.mock.calls[0];
    expect(firstCall).toBeDefined();

    const [url, options] = firstCall;
    expect(url).toBe("/api/product_search");
    expect(options.method).toBe("POST");
    expect(options.body).toContain("Slippers");
  });
});

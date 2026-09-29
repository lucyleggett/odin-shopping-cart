import { vi, describe, it, expect, afterEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderShop } from "./_helpers";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

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

    vi.stubEnv("DEV", false);

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        response: {
          products: [
            {
              id: 1,
              title: "Cozy Slippers",
              offers: [{ price: { price: 12.5 } }],
              images: [],
            },
            {
              id: 2,
              title: "Warm Socks",
              offers: [{ price: { price: 5 } }],
              images: [],
            },
          ],
        },
      }),
    });
    vi.stubGlobal("fetch", mockFetch);

    renderShop();
    expect(await screen.findByText("Cozy Slippers")).toBeInTheDocument();

    await user.type(screen.getByTestId("search-input"), "Slippers");
    await user.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(2));

    const [firstUrl, firstOptions] = mockFetch.mock.calls[0];
    expect(JSON.parse(firstOptions.body)).toEqual({ query: "Miffy" });

    const [url, options] = mockFetch.mock.lastCall;
    expect(url).toBe("/api/product_search");
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body)).toEqual({ query: "Slippers" });
  });
});

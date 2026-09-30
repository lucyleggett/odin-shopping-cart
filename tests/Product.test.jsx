import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import { renderShop } from "./_helpers";
import userEvent from "@testing-library/user-event";

const testCart = [
  {
    id: 236363,
    quantity: 2,
  },
  {
    id: 729465,
    quantity: 1,
  },
  {
    id: 993294,
    quantity: 6,
  },
];

const products = [
  {
    id: 236363,
    title: "Miffy Cup",
    offers: [{ price: { price: 20 } }],
    images: [],
  },
  {
    id: 729465,
    title: "Miffy Bag",
    offers: [{ price: { price: 12 } }],
    images: [],
  },
];

beforeEach(() => {
  vi.stubEnv("DEV", false);
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ response: { products } }),
    }),
  );
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("Product component", () => {
  it("provides the price in $XX.XX format", async () => {
    renderShop();
    const cards = await screen.findAllByTestId("product-card");
    const cupCard = cards.find((c) => within(c).queryByText("Miffy Cup"));

    expect(within(cupCard).getByText("$20.00")).toBeInTheDocument();
  });

  it("increments quantity in cart when user clicks increment button", async () => {
    const user = userEvent.setup();
    renderShop({ initialCart: testCart });

    const cards = await screen.findAllByTestId("product-card");
    const cupCard = cards.find((c) => within(c).queryByText("Miffy Cup"));
    const card = within(cupCard);

    expect(card.getByText("2")).toBeInTheDocument();
    await user.click(card.getByRole("button", { name: "+" }));
    expect(card.getByText("3")).toBeInTheDocument();
  });
});

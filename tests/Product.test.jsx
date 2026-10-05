import { describe, it, expect, afterEach, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import { renderShop } from "./_helpers";
import { testCart } from "./_helper-data";
import userEvent from "@testing-library/user-event";

vi.mock("../src/hooks/useProducts", async () => {
  const { testProductData } = await import("./_helper-data");
  const value = {
    data: { response: { products: testProductData } },
    loading: false,
    error: null,
    spotlight: [],
  };
  return { useProducts: () => value, ProductsProvider: ({children}) => children,};
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("Product component", () => {
  it("provides the price in $XX.XX format", async () => {
    renderShop();
    const cards = await screen.findAllByTestId("product-card");
    const cupCard = cards.find((c) => within(c).queryByText("Measuring Cup"));

    expect(within(cupCard).getByText("$79.00")).toBeInTheDocument();
  });

  it("increments quantity on card when user clicks increment button", async () => {
    const user = userEvent.setup();
    renderShop({ initialCart: testCart });

    const cards = await screen.findAllByTestId("product-card");
    const cupCard = cards.find((c) => within(c).queryByText("Measuring Cup"));
    const card = within(cupCard);

    expect(card.getByText("2")).toBeInTheDocument();
    await user.click(card.getByRole("button", { name: "+" }));
    expect(card.getByText("3")).toBeInTheDocument();
  });

  it("decrements quantity on card when user clicks decrement button", async () => {
    const user = userEvent.setup();
    renderShop({
      initialCart: [
        {
          id: "236363",
          quantity: 2,
        },
      ],
    });

    const cards = await screen.findAllByTestId("product-card");
    const card = within(cards.find((c) => within(c).queryByText("Measuring Cup")));

    expect(card.getByText("2")).toBeInTheDocument();
    await user.click(card.getByRole("button", { name: "-" }));
    expect(card.getByText("1")).toBeInTheDocument();
  });
});

describe("Cart counter", () => {
  it("renders correctly", async () => {
    renderShop({ initialCart: testCart });

    const cartCounter = screen.getByTestId("cart-counter");
    expect(cartCounter).toHaveTextContent("9");
  });

  it("decrements when product is decremented", async () => {
    const user = userEvent.setup();
    renderShop({ initialCart: testCart });

    const cartCounter = screen.getByTestId("cart-counter");
    expect(cartCounter).toHaveTextContent("9");

    const cards = await screen.findAllByTestId("product-card");
    const bagCard = cards.find((c) => within(c).queryByText("Measuring Cup"));
    const card = within(bagCard);
    await user.click(card.getByRole("button", { name: "-" }));

    expect(cartCounter).toHaveTextContent("8");
  });

  it("increments when product is incremented", async () => {
    const user = userEvent.setup();
    renderShop({ initialCart: testCart });

    const cartCounter = screen.getByTestId("cart-counter");
    expect(cartCounter).toHaveTextContent("9");

    const cards = await screen.findAllByTestId("product-card");
    const bagCard = cards.find((c) => within(c).queryByText("Measuring Cup"));
    const card = within(bagCard);
    await user.click(card.getByRole("button", { name: "+" }));

    expect(cartCounter).toHaveTextContent("10");
  });
});

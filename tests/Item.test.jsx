import { describe, it, expect, vi } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderShop } from "./_helpers";
import { testCart } from "./_helper-data";

vi.mock("../src/hooks/useProducts", async () => {
  const { testProductData } = await import("./_helper-data");
  const value = {
    data: { response: { products: testProductData } },
    loading: false,
    error: null,
  };
  return { useProducts: () => value };
});

describe("Cart item", () => {
  it("renders all items in cart", async () => {
    renderShop({ initialCart: testCart, route: "/cart" });

    const cartItems = await screen.findAllByTestId("cart-item");
    expect(cartItems).toHaveLength(3);
  });

  it("doesn't render any items when cart is empty", async () => {
    renderShop({ initialCart: [], route: "/cart" });

    expect(screen.queryAllByTestId("cart-item")).toHaveLength(0);
  });

  it("renders all requisite item information", async () => {
    renderShop({
      initialCart: [
        {
          id: "236363",
          quantity: 2,
        },
      ],
      route: "/cart",
    });

    const cartItem = await screen.findByTestId("cart-item");

    expect(
      within(cartItem).getByAltText(
        "Miffy measuring cup box packaging with Miffy character illustration.",
      ),
    ).toBeInTheDocument();
    expect(within(cartItem).getByText("Measuring Cup")).toBeInTheDocument();
    expect(within(cartItem).getByText("EJIRY")).toBeInTheDocument();
    expect(within(cartItem).getByText("$158.00")).toBeInTheDocument();
    expect(within(cartItem).getByText("2")).toBeInTheDocument();
  });

  it("increments quantity in cart when user clicks increment button", async () => {
    const user = userEvent.setup();
    renderShop({
      initialCart: [{ id: "236363", quantity: 2 }],
      route: "/cart",
    });

    const cupItem = await screen.findByTestId("cart-item");

    expect(within(cupItem).getByText("2")).toBeInTheDocument();
    await user.click(within(cupItem).getByRole("button", { name: "+" }));
    expect(within(cupItem).getByText("3")).toBeInTheDocument();
  });

  it("decrements quantity in cart when user clicks decrement button", async () => {
    const user = userEvent.setup();
    renderShop({
      initialCart: [{ id: "993294", quantity: 6 }],
      route: "/cart",
    });

    const bagItem = await screen.findByTestId("cart-item");

    expect(within(bagItem).getByText("6")).toBeInTheDocument();
    await user.click(within(bagItem).getByRole("button", { name: "-" }));
    expect(within(bagItem).getByText("5")).toBeInTheDocument();
  });

  it("removes item from cart when user decrements to 0", async () => {
    const user = userEvent.setup();
    renderShop({
      initialCart: [{ id: "236363", quantity: 1 }],
      route: "/cart",
    });

    const cupItem = await screen.findByTestId("cart-item");

    expect(within(cupItem).getByText("1")).toBeInTheDocument();
    await user.click(within(cupItem).getByRole("button", { name: "-" }));
    expect(cupItem).not.toBeInTheDocument();
  });

  it("removes item from cart when user clicks 'x' button", async () => {
    const user = userEvent.setup();
    renderShop({
      initialCart: [{ id: "236363", quantity: 6 }],
      route: "/cart",
    });

    const cupItem = await screen.findByTestId("cart-item");

    expect(within(cupItem).getByText("6")).toBeInTheDocument();
    await user.click(within(cupItem).getByTestId("remove-btn"));
    expect(cupItem).not.toBeInTheDocument();
  });
});

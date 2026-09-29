import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderShop } from "./_helpers";

describe("ShopPage component", async () => {
  it("renders some products on page load", async () => {
    renderShop();

    const productCards = await screen.findAllByTestId("product-card");

    expect(productCards.length).toBeGreaterThan(0);
  });
});

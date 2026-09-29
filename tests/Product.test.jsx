import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderShop } from "./_helpers";

describe("Product component", async () => {
  it("provides the price in $XX.XX format", async () => {
    renderShop();
    const allPriceElements = await screen.findAllByText(/^\$/);
    const randomIndex = Math.floor(Math.random() * allPriceElements.length);
    const randomProductPrice = allPriceElements[randomIndex];

    expect(randomProductPrice.textContent).toMatch(/^\$\d+\.\d{2}$/);
  });
});

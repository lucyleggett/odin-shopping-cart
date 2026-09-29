import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../src/routes";
import { renderShop } from "./App.test";

describe("Product component", async () => {
  it("provides the price in $XX.XX format", async () => {
    renderShop();
    const allPriceElements = await screen.findAllByText(/^\$/);
    const randomIndex = Math.floor(Math.random() * allPriceElements.length);
    const randomProductPrice = allPriceElements[randomIndex];

    expect(randomProductPrice.textContent).toMatch(/^\$\d+\.\d{2}$/);
  });
});

import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../src/routes";
import { renderShop } from "./App.test";

describe("ShopPage component", async () => {
  it("renders some products on page load", async () => {
    renderShop();

    const container = await screen.getByTestId('products-container');
    const productCards = container.querySelectorAll('[class*="productCards"]');

    expect(productCards.length).toBeGreaterThan(0);
  });
});
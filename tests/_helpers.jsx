import { render } from "@testing-library/react";
import routes from "../src/routes";
import { createMemoryRouter, RouterProvider } from "react-router";
import { CartProvider } from "../src/components/CartProvider/CartProvider";

export function renderShop({ initialCart = [], route = "/shop" } = {}) {
  const router = createMemoryRouter(routes, { initialEntries: [route] });
  return render(
    <CartProvider initialCart={initialCart}>
      <RouterProvider router={router} />;
    </CartProvider>,
  );
}

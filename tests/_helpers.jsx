import { render } from "@testing-library/react";
import routes from "../src/routes";
import {
  createMemoryRouter,
  createRoutesStub,
  RouterProvider,
} from "react-router";
import { CartProvider } from "../src/components/CartProvider/CartProvider";
import { Navbar } from "../src/components/Navbar/Navbar";
import { Outlet } from "react-router";

export function renderShop({ initialCart = [], route = "/shop" } = {}) {
  const router = createMemoryRouter(routes, { initialEntries: [route] });
  return render(
    <CartProvider initialCart={initialCart}>
      <RouterProvider router={router} />
    </CartProvider>,
  );
}

export function renderNavbar(initialPath, { initialCart = [] } = {}) {
  const RouterStub = createRoutesStub([
    {
      path: "/",
      Component: () => (
        <>
          <Navbar />
          <Outlet />
        </>
      ),
      children: [
        { index: true, Component: () => <h1>Welcome to the Homepage</h1> },
        { path: "shop", Component: () => <h1>Welcome to the Shop</h1> },
        { path: "cart", Component: () => <h1>Welcome to the Cart</h1> },
      ],
    },
  ]);

  return render(
    <CartProvider initialCart={initialCart}>
      <RouterStub initialEntries={[initialPath]} />
    </CartProvider>,
  );
}

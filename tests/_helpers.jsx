import { render } from "@testing-library/react";
import routes from "../src/routes";
import { createMemoryRouter, RouterProvider } from "react-router";

export function renderShop() {
  const router = createMemoryRouter(routes, { initialEntries: ["/shop"] });
  return render(<RouterProvider router={router} />);
}

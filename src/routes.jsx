import App from "./App.jsx";
import { ShopPage } from "./components/ShopPage/ShopPage.jsx";
import { HomePage } from "./components/HomePage/HomePage.jsx";
import { CartPage } from "./components/CartPage/CartPage.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
        {index: true, element: <HomePage />},
        {path: "shop", element: <ShopPage />},
        {path: "cart", element: <CartPage />},
    ]
  },
];

export default routes;
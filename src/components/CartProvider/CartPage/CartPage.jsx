import styles from "./CartPage.module.css";
import { Cart } from "./Cart/Cart";
import { Summary } from "./Cart/Summary/Summary";

export function CartPage() {

  return (
    <div className="cart-container">
      <Cart></Cart>
      <Summary></Summary>
    </div>
  );
}

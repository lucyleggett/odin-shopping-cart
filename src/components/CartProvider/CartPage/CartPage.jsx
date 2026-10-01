import styles from "./CartPage.module.css";
import { Cart } from "./Cart/Cart";

export function CartPage() {
  return (
    <div className={styles.page}>
      <h2>Your cart</h2>
      <Cart></Cart>
    </div>
  );
}

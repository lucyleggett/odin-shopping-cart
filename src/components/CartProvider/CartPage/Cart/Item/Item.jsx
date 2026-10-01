import styles from "./Item.module.css";
import { useCart } from "../../../../../hooks/useCart";

export function Item({ id, brand, title, quantity, price }) {
  const { incrementItem, decrementItem, removeItem } = useCart();

  const totalPrice = quantity * price;

  return (
    <div className={styles.cartItem}>
      <h4>{title}</h4>
      <p className={styles.brand}>{brand}</p>
      <p className={styles.price}>{totalPrice}</p>
      <div className={styles.quantity}>
        <button onClick={() => decrementItem(id)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementItem(id)}>+</button>
      </div>
      <button onClick={() => removeItem(id)}>x</button>
    </div>
  );
}

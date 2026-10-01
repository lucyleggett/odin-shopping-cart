import styles from "./Item.module.css";
import { useCart } from "../../../../../hooks/useCart";
import { standardisePrice } from "../../../../../utils";

export function Item({ id, imgSrc, imgAlt, brand, title, quantity, price }) {
  const { incrementItem, decrementItem, removeItem } = useCart();

  const totalPrice = quantity * price;

  return (
    <div className={styles.cartItem} data-testid="cart-item">
      <img src={imgSrc} alt={imgAlt} />
      <div className={styles.productInfo}>
        <p className={styles.brand}>{brand}</p>
        <h4>{title}</h4>
        <p className={styles.price}>${standardisePrice(totalPrice)}</p>
      </div>
      <div className={styles.quantity}>
        <button onClick={() => decrementItem(id)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementItem(id)}>+</button>
      </div>
      <button
        className={styles.removeBtn}
        data-testid="remove-btn"
        onClick={() => removeItem(id)}
      >
        <span>x</span>
      </button>
    </div>
  );
}

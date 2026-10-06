import styles from "./Item.module.css";
import { useCart } from "../../../../../hooks/useCart";
import { standardisePrice } from "../../../../../utils";
import { Link } from "react-router";

export function Item({ id, imgSrc, imgAlt, brand, title, quantity, price }) {
  const { incrementItem, decrementItem, removeItem } = useCart();

  const totalPrice = quantity * price;

  return (
    <div className={styles.cartItem} data-testid="cart-item">
      <Link
        to={`/shop?product=${encodeURIComponent(id)}`}
        className={styles.link}
      >
        <img src={imgSrc} alt={imgAlt} />
      </Link>
      <div className={styles.productInfo}>
        <p className={styles.brand}>{brand}</p>
        <Link
          to={`/shop?product=${encodeURIComponent(id)}`}
          className={styles.link}
        >
          <h4>{title}</h4>
        </Link>
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

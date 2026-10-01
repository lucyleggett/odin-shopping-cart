import { standardisePrice } from "../../../../utils";
import styles from "./Product.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";

export function Product({
  id,
  imgSrc,
  imgAlt,
  title,
  brand,
  price,
  cart,
  incrementItem,
  decrementItem,
}) {
  const quantity = cart?.find((item) => item.id === id)?.quantity ?? 0;

  return (
    <div className={styles.productCard} data-testid="product-card">
      <img src={imgSrc} alt={imgAlt} />
      <div className={styles.productInfo}>
        <p className={styles.brand}>{brand}</p>
        <h3 className={[styles.title, styles.multiLineLimit].join(" ")}>
          {title}
        </h3>
        <p className={styles.price}>${standardisePrice(price)}</p>
      </div>
      <div className={styles.addItem}>
        {quantity === 0 ? (
          <button
            className={styles.basketBtn}
            onClick={() => incrementItem(id)}
            aria-label="Add to cart"
          >
            <FontAwesomeIcon icon={faBasketShopping} />
          </button>
        ) : (
          <div className={styles.quantity}>
            <button onClick={() => decrementItem(id)}>-</button>
            <p>{quantity}</p>
            <button onClick={() => incrementItem(id)}>+</button>
          </div>
        )}
      </div>
    </div>
  );
}

import { standardisePrice } from "../../../utils";
import styles from "./Product.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { QuickView } from "./QuickView/QuickView";
import { useState } from "react";

export function Product({
  id,
  product,
  imgSrc,
  imgAlt,
  title,
  brand,
  price,
  cart,
  incrementItem,
  decrementItem,
}) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const quantity = cart?.find((item) => item.id === id)?.quantity ?? 0;

  return (
    <>
      <div className={styles.productCard} data-testid="product-card">
        <img
          src={imgSrc}
          alt={imgAlt}
          onClick={() => setIsQuickViewOpen(true)}
        />
        <div className={styles.productText}>
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
                <span className={styles.plusIcon}>+</span>
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
      </div>

      {isQuickViewOpen && (
        <QuickView
          product={product}
          imgSrc={imgSrc}
          imgAlt={imgAlt}
          title={title}
          brand={brand}
          price={price}
          quantity={quantity}
          incrementItem={incrementItem}
          decrementItem={decrementItem}
          onClose={() => setIsQuickViewOpen(false)}
        />
      )}
    </>
  );
}

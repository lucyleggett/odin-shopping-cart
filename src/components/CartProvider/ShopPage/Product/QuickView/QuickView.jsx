import styles from "./QuickView.module.css";
import { standardisePrice } from "../../../../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "./Carousel/Carousel";

export function QuickView({
  onClose,
  product,
  imgSrc,
  imgAlt,
  title,
  brand,
  price,
  quantity,
  incrementItem,
  decrementItem,
}) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.quickView}>
        <button className={styles.closeBtn} onClick={onClose}>
          x
        </button>
        <Carousel
          leadImgSrc={imgSrc}
          leadImgAlt={imgAlt}
          productName={title}
          images={product.images}
        ></Carousel>
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
              onClick={() => incrementItem(product.id)}
              aria-label="Add to cart"
            >
              <FontAwesomeIcon icon={faBasketShopping} />
              <span className={styles.plusIcon}>+</span>
            </button>
          ) : (
            <div className={styles.quantity}>
              <button onClick={() => decrementItem(product.id)}>-</button>
              <p>{quantity}</p>
              <button onClick={() => incrementItem(product.id)}>+</button>
            </div>
          )}
        </div>
        <div className={styles.productDetails}>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.highlights}>
            <h3>Key features</h3>
            <p>{product.key_features}</p>
          </div>
          <div className={styles.materials}>
            <h3>Materials</h3>
            <p>{product.materials}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

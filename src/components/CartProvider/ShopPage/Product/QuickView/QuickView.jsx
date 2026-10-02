import styles from "./QuickView.module.css";
import quantityStyles from "../Product.module.css"
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
        <div className={styles.text}>
          <div className={styles.productInfo}>
            <p className={styles.brand}>{brand}</p>
            <h3 className={[styles.title, styles.multiLineLimit].join(" ")}>
              {title}
            </h3>
            <p className={styles.price}>${standardisePrice(price)}</p>
          </div>
          <div className={quantityStyles.addItem}>
            {quantity === 0 ? (
              <button
                className={quantityStyles.basketBtn}
                onClick={() => incrementItem(product.id)}
                aria-label="Add to cart"
              >
                <FontAwesomeIcon icon={faBasketShopping} />
                <span className={quantityStyles.plusIcon}>+</span>
              </button>
            ) : (
              <div className={quantityStyles.quantity}>
                <button onClick={() => decrementItem(product.id)}>-</button>
                <p>{quantity}</p>
                <button onClick={() => incrementItem(product.id)}>+</button>
              </div>
            )}
          </div>
          <div className={styles.productDetails}>
            <div className={styles.description}>
                <h3>Description</h3>
                <p>{product.description}</p>
            </div>
            <div className={styles.features}>
              <h3>Key features</h3>
              <ul>
                {product.key_features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className={styles.materials}>
              <h3>Materials</h3>
              <ul>
                {product.materials.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

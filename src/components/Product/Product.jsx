import { standardisePrice } from "../../utils";
import styles from "./Product.module.css";

export function Product({ imgSrc, imgAlt, title, brand, price }) {
  return (
    <div className={styles.productCard}>
      <img src={imgSrc} alt={imgAlt} />
      <div className={styles.productInfo}>
        <p className={styles.brand}>{brand}</p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>${standardisePrice(price)}</p>
      </div>
    </div>
  );
}

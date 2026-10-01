import { standardisePrice } from "../../../utils";
import styles from "./Spotlight.module.css";

export function Spotlight({
  imgSrc,
  imgAlt,
  title,
  brand,
  description,
  flowerSrc,
  flowerAlt,
  price,
}) {
  return (
    <div className={styles.productSpotlight} data-testid="product-spotlight">
      <img src={imgSrc} alt={imgAlt} />
      <div className={styles.productInfo}>
        <h3 className={styles.title}>
          {brand} {title}
        </h3>
        <p>{description}</p>
        <div className={styles.price}>
          <img src={flowerSrc} alt={flowerAlt} />${standardisePrice(price)}
        </div>
      </div>
    </div>
  );
}

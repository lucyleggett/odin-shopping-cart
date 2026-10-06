import { standardisePrice } from "../../../utils";
import styles from "./Spotlight.module.css";
import btnStyles from "../../ShopPage/QuickView/QuickView.module.css";
import { Link } from "react-router";

export function Spotlight({
  imgSrc,
  imgAlt,
  title,
  description,
  flowerSrc,
  flowerAlt,
  price,
  id,
}) {
  return (
    <div className={styles.productSpotlight} data-testid="product-spotlight">
      <img src={imgSrc} alt={imgAlt} />
      <div className={styles.productInfo}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.multiLineLimit}>{description}</p>
        <div className={styles.cta}>
          <div className={styles.price}>
            <img src={flowerSrc} alt={flowerAlt} />${standardisePrice(price)}
          </div>
          <Link
            to={`/shop?product=${encodeURIComponent(id)}`}
            className={btnStyles.basketBtn}
          >
            View in shop
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}

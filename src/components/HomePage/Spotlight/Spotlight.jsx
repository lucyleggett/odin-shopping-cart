import { standardisePrice } from "../../../utils";
import styles from "./Spotlight.module.css";

export function Spotlight({ imgSrc, imgAlt, title, brand, price }) {
  return (
    <div className={styles.productSpotlight} data-testid="product-spotlight">
      <img src={imgSrc} alt={imgAlt} />
      <div className={styles.productInfo}>
        <h3 className={styles.title}>{brand} {title}</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit irure ipsum culpa dolores repellendus eligendi quo minus tempor cupidatat aliquip at consequat ex sed tempore et amet duis omnis est atque mollit voluptas provident fugiat ut facilis dolore facilis excepturi non assumenda magna libero soluta aute veniam in autem at ea.</p>
        <p className={styles.price}>${standardisePrice(price)}</p>
      </div>
    </div>
  );
}
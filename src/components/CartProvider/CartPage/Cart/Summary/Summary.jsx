import styles from "../Summary/Summary.module.css";
import { Link } from "react-router";
import { standardisePrice } from "../../../../../utils";

export function Summary({ total }) {
  return (
    <div className={styles.panel}>
      <div className={styles.summary}>
        <div className={styles.summaryInfo}>
          <h3>Order summary</h3>
          <div className={styles.subtotal}>
            <p>Subtotal</p>
            <p>${standardisePrice(total)}</p>
          </div>
          <div className={styles.postage}>
            <p>Postage</p>
            <p>Calculated at checkout</p>
          </div>
          <div className={styles.total}>
            <p className={styles.total}>Total</p>
            <p>${standardisePrice(total)}</p>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.checkoutBtn}>Proceed to checkout</button>
        <Link to="/shop" className={styles.continueBtn}>
          Continue shopping
        </Link>
      </div>
    </div>
  );
}

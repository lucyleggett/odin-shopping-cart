import styles from "../Summary/Summary.module.css";
import { useCart } from "../../../../../hooks/useCart";

export function Summary() {
  const { cart } = useCart();

  return <div className={styles.summary}></div>;
}

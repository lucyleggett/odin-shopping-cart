import styles from "./Navbar.module.css";
import miffyGift from "../../assets/miffy_gift.png";
import house from "../../assets/house.png";
import dog from "../../assets/dog.png";

export function Navbar() {
  return (
    <nav>
      <div className={styles.buttonsContainer}>
        <button className={styles.homeBtn}>
          {" "}
          <img src={house} alt="Miffy's house" />
          <span>Home</span>
        </button>
        <button className={styles.shopBtn}>
          {" "}
          <img src={dog} alt="Yellow duck" />
          <span>Shop</span>
        </button>
        <button className={styles.cartBtn}>
          {" "}
          <img src={miffyGift} alt="Miffy holding a present" />
          <span>Cart</span>
        </button>
      </div>
    </nav>
  );
}

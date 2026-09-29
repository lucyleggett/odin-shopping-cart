import styles from "./Navbar.module.css";
import miffyGift from "../../assets/miffy_gift.png";
import house from "../../assets/house.png";
import dog from "../../assets/dog.png";
import { NavLink } from "react-router";

export function Navbar() {
  return (
    <nav>
      <div className={styles.buttonsContainer}>
        <NavLink to="/" className={styles.homeBtn}>
          <img src={house} alt="Miffy's house" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/shop" className={styles.shopBtn}>
          <img src={dog} alt="Yellow duck" />
          <span>Shop</span>
        </NavLink>
        <NavLink to="/cart" className={styles.cartBtn}>
          <img src={miffyGift} alt="Miffy holding a present" />
          <span>Cart</span>
        </NavLink>
      </div>
    </nav>
  );
}

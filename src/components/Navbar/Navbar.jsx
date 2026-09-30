import styles from "./Navbar.module.css";
import miffyGift from "../../assets/miffy_gift.png";
import house from "../../assets/house.png";
import dog from "../../assets/dog.png";
import { NavLink } from "react-router";
import { useCart } from "../../hooks/useCart";

export function Navbar() {
  const cart = useCart();

  const getCartCount = (cart) => {
    if (cart.length < 1) return 0;
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const cartCount = getCartCount(cart.cart);

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
          <span
            className={[styles.cartCounter, cartCount < 1 && styles.disabled]
              .filter(Boolean)
              .join(" ")}
            data-testid="cart-counter"
          >
            {cartCount}
          </span>
        </NavLink>
      </div>
    </nav>
  );
}

import styles from "./Cart.module.css";
import { useCart } from "../../../../hooks/useCart";
import { useProducts } from "../../../../hooks/useProducts";
import { Item } from "./Item/Item";

export function Cart() {
  const { cart } = useCart();
  const { data } = useProducts();

  return (
    <div className="cart-container">
      {cart.map((item) => {
        const productData = data?.response?.products?.find(
          (product) => product.id === item.id,
        );
        if (!productData) return null;

        return (
          <Item
            className={styles.cartItem}
            key={item.id}
            id={item.id}
            title={productData.title}
            brand={productData.brands?.[0]?.name}
            quantity={item.quantity}
            price={productData.offers?.[0]?.price?.price}
          ></Item>
        );
      })}
    </div>
  );
}

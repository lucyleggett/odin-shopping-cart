import styles from "./Cart.module.css";
import { useCart } from "../../../../hooks/useCart";
import { useProducts } from "../../../../hooks/useProducts";
import { Item } from "./Item/Item";
import { Summary } from "./Summary/Summary";
import { useState } from "react";

export function Cart() {
  const { cart } = useCart();
  const { data } = useProducts();

  const products = data?.response?.products ?? [];

  const total = cart.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    const price = product?.offers?.[0]?.price?.price ?? 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className={styles.cartContainer}>
      <div className={styles.itemsContainer}>
        {cart.map((item) => {
          const productData = products.find((p) => p.id === item.id);

          if (!productData) return null;

          const image =
            productData.images?.find((img) => img.is_main_image) ??
            productData.images?.[0];

          return (
            <Item
              className={styles.cartItem}
              key={item.id}
              id={item.id}
              imgSrc={image?.cleaned_url ?? image?.url}
              imgAlt={image?.alt_text ?? productData.title}
              title={productData.title}
              brand={productData.brands?.[0]?.name}
              quantity={item.quantity}
              price={productData.offers?.[0]?.price?.price}
            ></Item>
          );
        })}
      </div>
      <Summary total={total}></Summary>
    </div>
  );
}

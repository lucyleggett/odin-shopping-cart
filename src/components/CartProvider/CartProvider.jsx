import { useState } from "react";
import { CartContext } from "../../context/cartContext";
import { MAX_QUANTITY } from "../../utils";

export function CartProvider({ children, initialCart = [] }) {
  const [cart, setCart] = useState(initialCart);

  const incrementItem = (id) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);

      if (!existing) {
        return [...prev, { id, quantity: 1 }];
      }

      if (existing.quantity >= MAX_QUANTITY) {
        return prev;
      }

      return prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    });
  };

  const decrementItem = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, MAX_QUANTITY, incrementItem, decrementItem, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

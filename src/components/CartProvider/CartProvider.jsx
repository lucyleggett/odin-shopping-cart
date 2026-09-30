import { useState } from "react";
import { CartContext } from "../../context/cartContext";

export function CartProvider({ children, initialCart = [] }) {
  const [cart, setCart] = useState(initialCart);

  const incrementItem = (id) => {
    setCart((prev) =>
      prev.some((item) => item.id === id)
        ? prev.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...prev, { id, quantity: 1 }],
    );
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

  return (
    <CartContext.Provider value={{ cart, incrementItem, decrementItem }}>
      {children}
    </CartContext.Provider>
  );
}

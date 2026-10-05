import { Product } from "./Product/Product";
import styles from "./ShopPage.module.css";
import { Form } from "./Form/Form";
import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../../hooks/useCart";

export function ShopPage() {
  const [input, setInput] = useState("");
  const { data, loading, error, loadProducts } = useProducts();
  const { cart, incrementItem, decrementItem } = useCart();

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    loadProducts(input);
  };

  return (
    <div className={styles.page}>
      <Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        loading={loading}
        input={input}
      ></Form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div
        className={styles.productsContainer}
        data-testid="products-container"
      >
        {data?.response?.products?.map((product) => {
          const image =
            product.images?.find((img) => img.is_main_image) ??
            product.images?.[0];

          return (
            <Product
              key={product.id}
              id={product.id}
              product={product}
              imgSrc={image?.cleaned_url ?? image?.url}
              imgAlt={image?.alt_text ?? product.title}
              title={product.title}
              brand={product.brands?.[0]?.name}
              price={product.offers?.[0]?.price?.price}
              cart={cart}
              incrementItem={incrementItem}
              decrementItem={decrementItem}
            ></Product>
          );
        })}
      </div>
    </div>
  );
}

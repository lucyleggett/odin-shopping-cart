import { Product } from "../Product/Product";
import styles from "./ShopPage.module.css";
import { Form } from "../Form/Form";
import { useEffect, useState } from "react";
import mockData from "../../data/example.json";

export function ShopPage() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_ENDPOINT = "/api/product_search";

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loadProducts(input);
  };

  const loadProducts = async (input) => {
    const query = input?.trim() || "Miffy";

    try {
      setLoading(true);
      setError(null);

      if (import.meta.env.DEV) {
        setData(mockData);
      } else {
        const response = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });

        if (!response.ok)
          throw new Error(`HTTP error. Status: ${response.status}`);

        setData(await response.json());
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts("");
  }, []);

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
              imgSrc={image?.cleaned_url ?? image?.url}
              imgAlt={image?.alt_text ?? product.title}
              title={product.title}
              brand={product.brands?.[0]?.name}
              price={product.offers?.[0]?.price?.price}
            ></Product>
          );
        })}
      </div>
    </div>
  );
}

import { Product } from "../Product/Product";
import { useProducts } from "../../hooks/useProducts";
import styles from "./HomePage.module.css";

export function HomePage() {
  const { data, loading, error } = useProducts();

  console.log(data?.response?.products?.length);

  return (
    <div className={styles.productsContainer}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

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
  );
}

import { useProducts } from "../../hooks/useProducts";
import { useMemo } from "react";
import styles from "./HomePage.module.css";
import { getRandomIndices } from "../../utils";
import { Spotlight } from "./Spotlight/Spotlight";

export function HomePage() {
  const { data, loading, error } = useProducts();
  const indices = useMemo(() => {
    if (!data?.response?.products) return [];
    return getRandomIndices(data.response.products, 6);
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  const products = data?.response?.products;
  const leadImgIndices = indices?.slice(0, 3);
  const spotlightIndices = indices?.slice(3, 6);

  return (
    <>
      <div className={styles.imgHeader}>
        {leadImgIndices.map((index) => {
          const product = products?.[index];
          if (!product) return null;

          const leadImg =
            product.images?.find((img) => img.is_main_image) ??
            product.images?.[0];

          return (
            <img
              key={product.id}
              src={leadImg?.cleaned_url ?? leadImg?.url}
              alt={leadImg?.alt_text ?? product.title}
            />
          );
        })}
      </div>
      <div className={styles.spotlightContainer}>
        <h2>miffy's favourites</h2>
        {spotlightIndices.map((index) => {
          const product = products?.[index];
          if (!product) return null;

          const image =
            product.images?.find((img) => img.is_main_image) ??
            product.images?.[0];

          return (
            <Spotlight
              key={product.id}
              imgSrc={image?.cleaned_url ?? image?.url}
              imgAlt={image?.alt_text ?? product.title}
              title={product.title}
              brand={product.brands?.[0]?.name}
              price={product.offers?.[0]?.price?.price}
            ></Spotlight>
          );
        })}
      </div>
    </>
  );
}

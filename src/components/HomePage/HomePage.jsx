import { useProducts } from "../../hooks/useProducts";
import { useMemo } from "react";
import styles from "./HomePage.module.css";
import { getRandomIndices } from "../../utils";
import { Spotlight } from "./Spotlight/Spotlight";
import bagguImg from "../../assets/product-images/baggu-collab.webp.jpeg";
import cookwareImg from "../../assets/product-images/cookware.jpg";
import starbucksImg from "../../assets/product-images/starbucks-collab.jpg";
import blueFlower from "../../assets/blue-flower.png";
import redFlower from "../../assets/red-flower.png";
import yellowFlower from "../../assets/yellow-flower.png";

const flowers = [
  {
    flower: blueFlower,
    alt: "Blue flower",
  },
  {
    flower: redFlower,
    alt: "Red flower",
  },
  {
    flower: yellowFlower,
    alt: "Yellow flower",
  },
];

export function HomePage() {
  const { data, loading, error } = useProducts();

  const spotlightIndices = useMemo(() => {
    if (!data?.response?.products) return [];
    return getRandomIndices(data?.response?.products, 3);
  }, [data]);

  const products = data?.response?.products;

  return (
    <div className={styles.page}>
      <div className={styles.imgHeader}>
        <img
          className={styles.portrait}
          src={starbucksImg}
          alt={"Starbuck x Miffy resuable cup"}
        />
        <img src={bagguImg} alt={"Miffy x Baggu reusable shopping bags"} />
        <img src={cookwareImg} alt={"Miffy shaped chocolates in a box"} />
      </div>

      {loading && <div className={styles.message}>Loading...</div>}
      {error && <div className={styles.message}>Error loading products</div>}

      <div className={styles.spotlightContainer}>
        <h2>miffy's favourites</h2>
        {spotlightIndices.map((i, index) => {
          const product = products?.[i];
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
              description={product.description}
              flowerSrc={flowers[index].flower}
              flowerAlt={flowers[index].alt}
              price={product.offers?.[0]?.price?.price}
            ></Spotlight>
          );
        })}
      </div>
      <div />
    </div>
  );
}

import { useProducts } from "../../hooks/useProducts";
import styles from "./HomePage.module.css";
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
  const { loading, error, spotlight } = useProducts();

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
      {error && <div className={styles.message}>Error loading products.</div>}

      <div className={styles.spotlightContainer}>
        <h2>miffy's favourites</h2>
        {spotlight.map((product, index) => {
          const image =
            product.images?.find((img) => img.is_main_image) ??
            product.images?.[0];
          const { flower, alt } = flowers[index % flowers.length];

          return (
            <Spotlight
              key={product.id}
              imgSrc={image?.cleaned_url ?? image?.url}
              imgAlt={image?.alt_text ?? product.title}
              title={product.title}
              brand={product.brands?.[0]?.name}
              description={product.description}
              flowerSrc={flower}
              flowerAlt={alt}
              price={product.offers?.[0]?.price?.price}
              id={product.id}
            ></Spotlight>
          );
        })}
      </div>
      <div />
    </div>
  );
}

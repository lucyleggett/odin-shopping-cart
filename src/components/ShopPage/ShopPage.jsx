import { useOutletContext } from "react-router";
import { Product } from "../Product/Product";
import styles from "./ShopPage.module.css";
import { Form } from "../Form/Form";

export function ShopPage() {
  const { handleSubmit, handleChange, input, loading, error, data } =
    useOutletContext();

  return (
    <div className={styles.page}>
      <>
        <Form
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          loading={loading}
          input={input}
        ></Form>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div className={styles.productsContainer}>
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
      </>
    </div>
  );
}

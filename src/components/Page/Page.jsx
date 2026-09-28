import { Product } from "../Product/Product";
import "./Page.css";

export function Page({ customClass, loading, error, data }) {
  return (
    <div className={`page ${customClass}`}>
      {customClass === "shop" ? (
        <>
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
        </>
      ) : null}
    </div>
  );
}

import { Product } from "../Product/Product";
import "./Page.css";
import { Form } from "../Form/Form";

export function Page({
  customClass,
  handleSubmit,
  handleChange,
  input,
  loading,
  error,
  data,
}) {
  return (
    <div className={`page ${customClass}`}>
      {customClass === "shop" ? (
        <>
          <Form
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            loading={loading}
            input={input}
          ></Form>

          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          <div className="products-container">
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
      ) : null}
    </div>
  );
}

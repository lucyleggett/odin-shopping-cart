import { useSearchParams } from "react-router";
import { Product } from "./Product/Product";
import { QuickView } from "./QuickView/QuickView";
import styles from "./ShopPage.module.css";
import { Form } from "./Form/Form";
import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useCart } from "../../hooks/useCart";

function getMainImage(product) {
  const image =
    product.images?.find((img) => img.is_main_image) ?? product.images?.[0];
  return {
    src: image?.cleaned_url ?? image?.url,
    alt: image?.alt_text ?? product.title,
  };
}

export function ShopPage() {
  const [input, setInput] = useState("");
  const { data, loading, error, loadProducts } = useProducts();
  const { cart, incrementItem, decrementItem } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const products = data?.response?.products ?? [];
  const openId = searchParams.get("product");
  const openProduct = openId
    ? products.find((p) => p.id === openId)
    : undefined;

  const closeQuickView = () =>
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete("product");
        return next;
      },
      { replace: true },
    );

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    loadProducts(input);
  };

  const openImage = openProduct ? getMainImage(openProduct) : null;

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
        {products.map((product) => {
          const { src, alt } = getMainImage(product);

          return (
            <Product
              key={product.id}
              id={product.id}
              imgSrc={src}
              imgAlt={alt}
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

      {openProduct && (
        <QuickView
          product={openProduct}
          imgSrc={openImage.src}
          imgAlt={openImage.alt}
          title={openProduct.title}
          brand={openProduct.brands?.[0]?.name}
          price={openProduct.offers?.[0]?.price?.price}
          quantity={cart.find((i) => i.id === openProduct.id)?.quantity ?? 0}
          incrementItem={incrementItem}
          decrementItem={decrementItem}
          onClose={closeQuickView}
        />
      )}
    </div>
  );
}
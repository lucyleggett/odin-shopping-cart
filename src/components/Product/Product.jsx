import "./Product.css";

export function Product({ imgSrc, imgAlt, title, brand, price }) {
  return (
    <div className="product-container">
      <img src={imgSrc} alt={imgAlt} />
      <div className="product-info">
        <h3 className="title">{title}</h3>
        <p className="brand">{brand}</p>
        <p className="price">{price}</p>
      </div>
    </div>
  );
}

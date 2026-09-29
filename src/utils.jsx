export function standardisePrice(price) {
  const numericPrice = parseFloat(String(price).replace(/[^0-9.-]/g, ""));

  if (isNaN(numericPrice)) return "0.00";

  return numericPrice.toFixed(2);
}

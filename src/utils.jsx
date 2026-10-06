export const MAX_QUANTITY = 300;

export function standardisePrice(price) {
  const numericPrice = parseFloat(String(price).replace(/[^0-9.-]/g, ""));

  if (isNaN(numericPrice)) return "0.00";

  return numericPrice.toFixed(2);
}

export function getRandomIndices(array, num) {
  if (num > array.length) {
    throw new Error("Requested more indices than available in the array.");
  }

  let indices = [];
  while (indices.length < num) {
    const randomIndex = Math.floor(Math.random() * array.length);
    if (indices.includes(randomIndex)) continue;
    indices.push(randomIndex);
  }
  return indices;
}

export function extractImgId(url) {
  if (!url) return null;
  try {
    return new URL(url).pathname.split("/").filter(Boolean).pop();
  } catch {
    return null;
  }
}

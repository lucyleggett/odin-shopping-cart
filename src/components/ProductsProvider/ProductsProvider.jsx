import { useState, useEffect, useMemo, useCallback } from "react";
import mockData from "../../data/example.json"
import { getRandomIndices } from "../../utils";
import { ProductsContext } from "../../context/productContext";

const API_ENDPOINT = "/api/product_search";
const DEFAULT_QUERY = "Miffy";

async function fetchProducts(query) {
  if (import.meta.env.DEV) return mockData;

  const response = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  if (!response.ok) throw new Error(`HTTP error. Status: ${response.status}`);
  return response.json();
}


export function ProductsProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [spotlightIds, setSpotlightIds] = useState([]);

  useEffect(() => {
    let ignore = false;

    fetchProducts(DEFAULT_QUERY)
      .then((result) => {
        if (ignore) return;
        setData(result);
        const products = result?.response?.products ?? [];
        setSpotlightIds(
          getRandomIndices(products, 3).map((i) => products[i].id),
        );
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const loadProducts = useCallback(async (input) => {
    const query = input?.trim() || DEFAULT_QUERY;
    try {
      setLoading(true);
      setError(null);
      setData(await fetchProducts(query));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const spotlight = useMemo(() => {
    const products = data?.response?.products ?? [];
    return spotlightIds
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean);
  }, [data, spotlightIds]);

  const value = useMemo(
    () => ({ data, loading, error, loadProducts, spotlight }),
    [data, loading, error, loadProducts, spotlight],
  );

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
}
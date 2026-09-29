import { useState, useEffect, useCallback } from "react";
import mockData from "../data/example.json";

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

export function useProducts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    fetchProducts(DEFAULT_QUERY)
      .then((result) => {
        if (!ignore) setData(result);
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

  return { data, loading, error, loadProducts };
}

import { useEffect, useState } from "react";
import "./App.css";
import mockData from "./data/example.json";

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_ENDPOINT = "/api/product_search";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = input.trim();
    if (!query) return;

    try {
      setLoading(true);
      setError(null);

      let response;

      if (import.meta.env.DEV) {
        response = mockData;
        setData(response);
      } else {
        response = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query,
            filters: { brand_ids: ["YPRD"] },
            limit: 20,
          }),
        });

        if (!response.ok)
          throw new Error(`HTTP error. Status: ${response.status}`);

        setData(await response.json());
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search products..."
        />
        <button type="submit" disabled={loading}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {data?.response?.products?.map((product) => {
        const image =
          product.images?.find((img) => img.is_main_image) ??
          product.images?.[0];

        return (
          <div key={product.id}>
            {image && (
              <img
                src={image.cleaned_url ?? image.url}
                alt={image.alt_text ?? product.title}
                width={200}
              />
            )}
            <h3>{product.title}</h3>
            <p>{product.brands?.[0]?.name}</p>
            <p>{product.offers?.[0]?.price?.price}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;

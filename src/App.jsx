import { useEffect, useState } from "react";
import "./index.css";
import "./App.css";
import mockData from "./data/example.json";
import { Navbar } from "./components/Navbar/Navbar";
import { Page } from "./components/Page/Page";
import miffyWalking from "./assets/miffy_walking.png";

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_ENDPOINT = "/api/product_search";

  const handleChange = (e) => {
    setInput(e.target.value);
  };

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
    <div className="container">
      <div className="header">
        <img src={miffyWalking} alt="Miffy walking" />
        <h1 className="volta">Miffy at the shop</h1>
        <Navbar />
      </div>
      <Page
        customClass="shop"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        loading={loading}
        input={input}
        error={error}
        data={data}
      />
    </div>
  );
}

export default App;

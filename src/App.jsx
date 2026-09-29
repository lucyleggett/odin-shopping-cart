import { useState } from "react";
import { Outlet } from "react-router";
import "./index.css";
import styles from "./App.module.css";
import mockData from "./data/example.json";
import { Navbar } from "./components/Navbar/Navbar.jsx";
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
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          className={styles.heroImg}
          src={miffyWalking}
          alt="Miffy walking"
        />
        <h1 className="volta">Miffy at the shop</h1>
        <Navbar />
      </div>
      <Outlet
        context={{ handleSubmit, handleChange, loading, input, error, data }}
      />
    </div>
  );
}

export default App;

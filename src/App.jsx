import { Outlet } from "react-router";
import "./index.css";
import styles from "./App.module.css";
import { Navbar } from "./components/Navbar/Navbar.jsx";
import miffyWalking from "./assets/miffy_walking.png";

function App() {
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
      <Outlet />
    </div>
  );
}

export default App;

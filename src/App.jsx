import { Outlet } from "react-router";
import "./index.css";
import styles from "./App.module.css";
import { Navbar } from "./components/Navbar/Navbar.jsx";
import miffyWalking from "./assets/miffy_walking.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.miffy}>
          <img
            className={styles.heroImg}
            src={miffyWalking}
            alt="Miffy walking"
          />
          <h1 className="volta">miffy at the shop</h1>
        </div>
        <Navbar />
      </div>
      <Outlet />
      <div className={styles.footer}>
        <a
          href="https://github.com/lucyleggett/odin-shopping-cart"
          aria-label="GitHub (opens in a new tab)"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} />
          Developed by Lucy Leggett. © 2026.
        </a>
      </div>
    </div>
  );
}

export default App;

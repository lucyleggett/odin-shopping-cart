import styles from "./ErrorPage.module.css";
import { Link } from "react-router";
import { useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  console.error("Route error:", error);

  return (
    <div className={styles.page}>
      <div className={styles.error}>
        <h1>Oh no, this route doesn't exist!</h1>
        <Link to="/" className={styles.link}>
          Return to homepage here.
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

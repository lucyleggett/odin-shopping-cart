import { Link } from "react-router";
import { useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  console.error("Route error:", error);

  return (
    <div>
      <h1>Oh no, this route doesn't exist!</h1>
      <Link to="/">Return to homepage here.</Link>
    </div>
  );
};

export default ErrorPage;

import "./Navbar.css";
import { Form } from "../Form/Form";

export function Navbar({ handleSubmit, handleChange, loading, input }) {
  return (
    <nav>
      <Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        loading={loading}
        input={input}
      ></Form>
    </nav>
  );
}

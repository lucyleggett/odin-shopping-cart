import "./Form.css"

export function Form({ handleSubmit, handleChange, loading, input }) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search products..."
      />
      <button type="submit" disabled={loading}>
        Search
      </button>
    </form>
  );
}

import styles from "./Form.module.css";

export function Form({ handleSubmit, handleChange, loading, input }) {
  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        data-testid="search-input"
      />
      <button type="submit" disabled={loading}>
        Search
      </button>
    </form>
  );
}

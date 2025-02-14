import { useState } from "react";
import styles from "./SearchBar.module.css";

function SearchBar({ searchTracks }) {
  const [term, setTerm] = useState("");
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Enter a song"
        onChange={(e) => setTerm(e.target.value)}
      />
      <button
        className={styles.searchButton}
        onClick={() => searchTracks(term)}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;

import { useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList.jsx";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (query.trim() === "") {
      return;
    }

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            query,
          },
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjk0NGVmMzY4YzA4MzY1YzkwMWUyOWFlYmY1NTkwYyIsIm5iZiI6MTcyNDA0NjI3NS44NzE4MjIsInN1YiI6IjY2YzBjYTM3OWZkYTBlNTA5YzlkYzRlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xa4Np5sf7Vk2RAmnIHoBVnjYjWx629KUQoTOGBAgmvw",
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className={styles.moviesPageContainer}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search movies..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
      {movies.length > 0 && <MovieList movies={movies} />}{" "}
    </div>
  );
};

export default MoviesPage

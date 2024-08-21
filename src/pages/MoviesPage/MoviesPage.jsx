import { useState, useEffect } from "react";
import { useSearchParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const location = useLocation();

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const queryValue = form.elements.query.value.trim();
    if (queryValue === "") return;
    setSearchParams({ query: queryValue });
  };

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}`,
          {
            headers: {
              Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjk0NGVmMzY4YzA4MzY1YzkwMWUyOWFlYmY1NTkwYyIsIm5iZiI6MTcyNDA0NjI3NS44NzE4MjIsInN1YiI6IjY2YzBjYTM3OWZkYTBlNTA5YzlkYzRlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xa4Np5sf7Vk2RAmnIHoBVnjYjWx629KUQoTOGBAgmvw",
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch}>
        <input type="text" name="query" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;

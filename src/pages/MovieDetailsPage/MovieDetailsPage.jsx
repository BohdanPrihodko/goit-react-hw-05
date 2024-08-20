import { useState, useEffect } from "react";
import { useParams, useLocation, Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import MovieCast from "../../components/MovieCast/MovieCast.jsx";
import MovieReviews from "../../components/MovieReviews/MovieReviews.jsx";
import styles from "./MovieDetailsPage.module.css"; 

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? "/movies";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: "Bearer ваш_ключ",
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <Link to={backLinkHref} className={styles.backLink}>
        Go back
      </Link>
      <div className={styles.movieDetails}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
        <div>
          <h2>{movie.title}</h2>
          <p>User Score: {movie.vote_average}</p>
          <p>{movie.overview}</p>
          <p>Genres: {movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
      </Routes>
    </div>
  );
};

export default MovieDetailsPage;

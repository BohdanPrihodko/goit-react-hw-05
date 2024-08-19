import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMjk0NGVmMzY4YzA4MzY1YzkwMWUyOWFlYmY1NTkwYyIsIm5iZiI6MTcyNDA0NjI3NS44NzE4MjIsInN1YiI6IjY2YzBjYTM3OWZkYTBlNTA5YzlkYzRlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xa4Np5sf7Vk2RAmnIHoBVnjYjWx629KUQoTOGBAgmvw",
            },
          }
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div className={styles.castContainer}>
      {cast.length > 0 ? (
        <ul className={styles.castList}>
          {cast.map(({ id, name, character, profile_path }) => (
            <li key={id} className={styles.castItem}>
              {profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                  alt={name}
                  className={styles.castImage}
                />
              ) : (
                <div className={styles.noImage}>No Image</div>
              )}
              <p>{name}</p>
              <p>as {character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast information available.</p>
      )}
    </div>
  );
};

export default MovieCast

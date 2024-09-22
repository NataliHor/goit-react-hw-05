import { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { getProductCast } from "../../tmdb-movies";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getCast = async () => {
      try {
        setLoading(true);
        setError(false);
        const movieCast = await getProductCast(movieId, { signal });
        setCast(movieCast);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };
    getCast();
    return () => {
      controller.abort();
    };
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <div>
      {cast.length > 0 ? (
        <ul className={css.ul}>
          {cast.map(({ character, name, profile_path, id, gender }) => (
            <li key={id}>
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w92/${profile_path}`}
                  alt={name}
                  className={css.img}
                />

                <div className={css.cartComent}>
                  <p className={css.text}>
                    <strong>Actor:</strong> {name}
                  </p>
                  <p className={css.text}>
                    <strong>Character:</strong> {character}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.error}>We don't have movie!</p>
      )}
    </div>
  );
};

export default MovieCast;

import css from "./MovieReviews.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductReviews } from "../../tmdb-movies";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { NavLink, useLocation } from "react-router-dom";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getReviews = async () => {
      try {
        setLoading(true);
        setError(false);
        const movieReviews = await getProductReviews(movieId, { signal });
        setReviews(movieReviews);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    getReviews();

    return () => {
      controller.abort();
    };
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <div>
      {reviews.length > 0 ? (
        <ul className={css.ul}>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>
                {" "}
                <strong>{review.author}</strong>
              </p>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p> No reviews found.</p>
      )}
    </div>
  );
};

export default MovieReviews;

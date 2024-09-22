import css from "./MovieDetailsPage.module.css";
import { Suspense, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../tmdb-movies";
import { GoArrowLeft } from "react-icons/go";
import {
  NavLink,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

export default function MovieDetailsPage() {
  const [detail, setDetail] = useState("");
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const moviLinkRef = useRef(location.state ?? "/movies");
  const onClickBack = () => navigate(moviLinkRef.current);

  useEffect(() => {
    async function fechData() {
      try {
        setLoading(true);
        setError(false);
        setDetail("");
        const data = await getProductDetails(movieId);
        setDetail(data);
        setLoading(false);
      } catch (error) {
        setError("Sorry nothing found");
      }
    }
    fechData();
  }, [movieId]);
  // console.log(detail);
  return (
    <div className={css.movieDetails}>
      <button onClick={onClickBack} className={css.btn}>
        <GoArrowLeft className={css.icon} />{" "}
        <NavLink to={location.state ?? "/"}>Go back</NavLink>{" "}
      </button>
      <div className={css.movieHeader}>
        <img
          src={`https://image.tmdb.org/t/p/w200/${detail.poster_path}`}
          alt={detail.title}
          className={css.img}
        />
        <div>
          <h2>{detail.title}</h2>
          <p>({detail.release_date})</p>
          <p> User Score : {detail.vote_average}%</p>
          <h3> Overview</h3>
          <p>{detail.overview}</p>
          <h3> Status</h3>
          <p>{detail.status}</p>
        </div>
      </div>
      <section>
        <h3>Additional information</h3>
        <ul className={css.ul}>
          <li>
            <Link to="cast">
              {" "}
              <h3 className={css.link}>Cast</h3>{" "}
            </Link>
          </li>
          <li>
            <Link to="reviews">
              <h3 className={css.link}>Reviews</h3>{" "}
            </Link>
          </li>
        </ul>
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}

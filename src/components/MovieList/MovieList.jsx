import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ products }) {
  const location = useLocation();
  return (
    <div>
      <ul className={css.list}>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/movies/${product.id}`} state={location}>
              <h4 className={css.a}>{product.title}</h4>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

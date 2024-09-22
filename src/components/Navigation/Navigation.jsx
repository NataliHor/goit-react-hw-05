import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const newLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
  return (
    <nav className={css.nav}>
      <ul className={css.ul}>
        <li>
          <NavLink to="/" className={newLinkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={newLinkClass}>
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

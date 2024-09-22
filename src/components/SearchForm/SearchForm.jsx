import css from "./SearchForm.module.css";
import { useSearchParams } from "react-router-dom";

export default function SearchForm() {
  const [params, setParams] = useSearchParams();
  const handleSubmit = (event) => {
    event.preventDefault();
    params.set("owner", event.target.elements.owner.value);
    setParams(params);
    event.target.reset();
  };

  return (
    <div>
      <h4>Search movie</h4>
      <form onSubmit={handleSubmit}>
        <input type="text" name="owner" className={css.input} />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

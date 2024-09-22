import MovieList from "../../components/MovieList/MovieList";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm";
import { getProductsSerch } from "../../tmdb-movies";

export default function MaviesPage() {
  const [products, setProduct] = useState([]);
  const [params] = useSearchParams();
  const owner = params.get("owner") ?? "";

  useEffect(() => {
    async function fetchData() {
      const data = await getProductsSerch(owner);
      setProduct(data);
    }
    fetchData();
  }, [owner]);

  return (
    <>
      <main>
        <SearchForm />
        {products.length > 0 && <MovieList products={products} />}
      </main>
    </>
  );
}

import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTczY2IxZjljYjE4NDUzYzJmOWQ3ZjY5MWI4MzAzNiIsIm5iZiI6MTcyNjkzMzQzOC4xMzk0Nywic3ViIjoiNjZkZDg1Yjc3YmY3ZWY3M2ZkYjkzZTA2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.a7KpCFK9KKvglxgTYsmMUV4JiXwbhy8o1v-j02Q4pMo",
  },
});

async function getProductsSerch(query, page = 1) {
  const response = await instance.get(`/search/movie`, {
    params: {
      page,
      query,
      include_adult: false,
      language: "en-US",
      region: "string",
      year: "string",
    },
  });
  return response.data.results;
}
export { getProductsSerch };

export const getProductMovies = async () => {
  const response = await instance.get("/trending/movie/day");
  return response.data.results;
};

export const getProductDetails = async (movie_id) => {
  const response = await instance.get(`/movie/${movie_id}`);
  return {
    title: response.data.title,
    poster_path: response.data.poster_path,
    release_date: response.data.release_date,
    vote_average: response.data.vote_average,
    overview: response.data.overview,
    status: response.data.status,
  };
};

export const getProductCast = async (movie_id) => {
  const response = await instance.get(`/movie/${movie_id}/credits`, {
    params: {
      movie_id,
    },
  });
  return response.data.cast;
};

export const getProductReviews = async (movie_id) => {
  const response = await instance.get(`/movie/${movie_id}/reviews`, {
    params: {
      movie_id,
    },
  });

  return response.data.results;
};

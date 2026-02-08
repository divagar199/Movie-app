import { useEffect, useState } from "react";
import axios from "axios";

const Row = ({ title, fetchURL, isLargeRow }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  return (
    <div className="ml-5 text-white">
      <h2 className="text-xl font-bold mb-2 mt-4">{title}</h2>

      <div className="flex overflow-x-scroll scrollbar-hide gap-4 p-4 -ml-4">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`object-contain transition-transform duration-500 hover:scale-105 cursor-pointer rounded-sm 
              ${isLargeRow ? "h-[250px]" : "h-[150px]"}`}
            src={`https://image.tmdb.org/t/p/original${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
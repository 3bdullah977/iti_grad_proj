import Empty from "./components/empty";
import axios from "axios";
import { userID } from "../../components/atoms/userID";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function Favourite() {
  const [user] = useAtom(userID);
  const [ids, setIDs] = useState<number[]>([]);
  const [movies, setMovies] = useState<any[]>([]);

  const imagePath = "https://image.tmdb.org/t/p/original";

  async function getIDs() {
    try {
      const res = await axios.get(`http://localhost:8080/api/${user}/data`);
      setIDs(res.data.data.id);
    } catch (err) {
      console.error("Failed to fetch user favorites", err);
    }
  }

  async function fetchMovies(ids: number[]) {
    try {
      const moviePromises = ids.map(async (id) => {
        try {
          const res = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=67fe98bd3ea34f0d4e3a279c5387b342`
          );
          return { ...res.data, media_type: "movie" };
        } catch {
          const res = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}?api_key=67fe98bd3ea34f0d4e3a279c5387b342`
          );
          return { ...res.data, media_type: "tv" };
        }
      });

      const results = await Promise.all(moviePromises);
      setMovies(results);
    } catch (err) {
      console.error("Failed to fetch movie/TV details", err);
    }
  }

  async function DeleteFav(id: number) {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/${user}/data/${id}`
      );
      toast("Removed from favorites");
      setIDs((prev) => prev.filter((item) => item !== id));
    } catch (err) {
      console.error("Failed to remove from favorites", err);
    }
  }

  useEffect(() => {
    getIDs();
  }, []);

  useEffect(() => {
    if (ids.length > 0) {
      fetchMovies(ids);
    } else {
      setMovies([]);
    }
  }, [ids]);

  return (
    <>
      {movies.length > 0 ? (
        <div>
          <div className="p-4">
            <h1 className="text-2xl font-bold">Watch list</h1>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="flex gap-8 shadow-xl rounded-2xl p-4">
                <Link to={`/${movie.id}`}>
                  <div>
                    <img
                      src={imagePath + movie.poster_path}
                      alt={movie.title || movie.name}
                      className="rounded-lg min-w-[194px] h-[289px]"
                    />
                  </div>
                </Link>
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center">
                      <h2 className="text-3xl font-semibold mt-2">
                        {movie.title || movie.name}
                      </h2>
                      <Heart
                        fill="#052f4a"
                        stroke="#052f4a"
                        className="cursor-pointer"
                        onClick={() => DeleteFav(movie.id)}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      {movie.release_date || movie.first_air_date}
                    </p>
                    <p className="mt-2 text-sm text-gray-700">
                      {movie.overview}
                    </p>
                  </div>
                  <p className="mt-4 text-xs text-gray-400 italic">
                    Type: {movie.media_type.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </>
  );
}

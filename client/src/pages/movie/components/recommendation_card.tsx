import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

type RecommendationType = {
  id: number;
  title?: string;
  name?: string;
  backdrop_path: string | null;
  vote_average: number;
};

export default function RecommendationCard({ movie, cardType }) {
  const [data, setData] = useState<RecommendationType[]>([]);
  const imagePath = "https://image.tmdb.org/t/p/original";

  async function fetchRecommendations() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${cardType}/${movie}/recommendations?api_key=67fe98bd3ea34f0d4e3a279c5387b342`
      );
      const json = await res.json();
      setData(json.results);
    } catch (err) {
      console.error("Failed to fetch recommendations:", err);
    }
  }

  useEffect(() => {
    if (movie) fetchRecommendations();
  }, [movie]);

  return (
    <>
      {data.slice(0, 9).map((pic) => (
        <Link to={`/${pic.id}`} key={pic.id}>
          <div>
            {pic.backdrop_path ? (
              <img
                alt={pic.title || pic.name || "Media"}
                className="rounded-xl w-[100px] min-w-[250px]"
                src={imagePath + pic.backdrop_path}
                width={300}
                height={300}
              />
            ) : (
              <div className="w-[250px] h-[140px] bg-gray-300 rounded-xl flex items-center justify-center text-sm text-gray-700">
                No image
              </div>
            )}
            <div className="flex justify-between mt-1">
              <h1 className="font-bold text-sm truncate max-w-[200px]">
                {pic.title || pic.name}
              </h1>
              <p className="text-sm">{Math.floor(pic.vote_average * 10)}%</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}

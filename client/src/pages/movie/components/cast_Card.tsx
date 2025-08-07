import { useEffect, useState } from "react";

type CastType = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export default function Card({ movie, cardType }) {
  console.log("cast" + cardType);
  const [data, setData] = useState<CastType[]>([]);
  const imagePath = "https://image.tmdb.org/t/p/original";

  async function fetchCast() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${cardType}/${movie}/credits?api_key=67fe98bd3ea34f0d4e3a279c5387b342`
      );
      const json = await res.json();
      setData(json.cast);
    } catch (err) {
      console.error("Failed to fetch cast data:", err);
    }
  }

  useEffect(() => {
    if (movie) fetchCast();
  }, [movie]);

  return (
    <>
      {data.map(
        (pic, index) =>
          index < 9 && (
            <div key={pic.id} className="w-[150px] min-w-[100px]">
              {pic.profile_path ? (
                <img
                  alt={pic.name}
                  className="rounded-xl w-full"
                  src={imagePath + pic.profile_path}
                  width={300}
                  height={300}
                />
              ) : (
                <div className="w-full h-[300px] bg-gray-300 rounded-xl flex items-center justify-center text-sm text-gray-700">
                  No image
                </div>
              )}
              <h1 className="font-bold mt-1">{pic.name}</h1>
              <p className="font-serif text-sm text-gray-600">
                {pic.character}
              </p>
            </div>
          )
      )}
    </>
  );
}

import { useEffect, useState } from "react";

type KeywordType = {
  id: number;
  name: string;
};

export default function Keywords({ movie, cardType }) {
  const [data, setData] = useState<KeywordType[]>([]);

  async function fetchKeywords() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${cardType}/${movie}/keywords?api_key=67fe98bd3ea34f0d4e3a279c5387b342`
      );
      const json = await res.json();
      if (cardType === "tv") {
        setData(json.results);
      } else {
        setData(json.keywords);
      }
    } catch (err) {
      console.error("Failed to fetch keywords:", err);
    }
  }

  useEffect(() => {
    if (movie) fetchKeywords();
  }, [movie]);

  return (
    <div>
      <h1 className="py-2 text-sm font-bold">Keywords</h1>
      <div className="flex gap-1 flex-wrap">
        {data.map((key) => (
          <span
            key={key.id}
            className="text-xs font-normal bg-[rgba(0,0,0,0.10)] px-2 py-1 rounded">
            {key.name}
          </span>
        ))}
      </div>
    </div>
  );
}

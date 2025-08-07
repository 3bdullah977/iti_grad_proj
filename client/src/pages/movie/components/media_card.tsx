import { useAtom } from "jotai";
import { mediaImg } from "../../../components/atoms/mediaAtom";
import { useEffect, useState } from "react";

type MediaType = {
  file_path: string;
};

export default function MediaCard({ movie, cardType }) {
  const [state] = useAtom(mediaImg);
  const [data, setData] = useState<MediaType[]>([]);

  const imagePath = "https://image.tmdb.org/t/p/original";

  async function fetchMedia() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${cardType}/${movie}/images?api_key=67fe98bd3ea34f0d4e3a279c5387b342`
      );
      const json = await res.json();
      const images = state === "backdrops" ? json.backdrops : json.posters;
      setData(images);
    } catch (err) {
      console.error("Failed to fetch media images:", err);
    }
  }

  useEffect(() => {
    if (movie) fetchMedia();
  }, [state, movie]);

  return (
    <>
      {data.slice(0, 9).map((pic) => (
        <div key={pic.file_path}>
          <div>
            <img
              alt="Media"
              src={imagePath + pic.file_path}
              width={500}
              height={500}
              className={state === "backdrops" ? "max-w-none" : "min-w-[200px]"}
            />
          </div>
        </div>
      ))}
    </>
  );
}

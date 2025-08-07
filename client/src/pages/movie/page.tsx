import "../../../style/app.scss";
import { Percent } from "lucide-react";
import CastCard from "./components/cast";
import Recommendation from "./components/recommendation";
import Keywords from "./components/keywords";
import Media from "./components/media";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MovieDetail() {
  const { movie } = useParams();

  const [data, setData] = useState<any>(null);
  const [cardType, setCartType] = useState("tv");
  const imagePath = "https://image.tmdb.org/t/p/original";
  async function ID() {
    try {
      const data = await axios.get(
        `https://api.themoviedb.org/3/tv/${movie}?api_key=67fe98bd3ea34f0d4e3a279c5387b342`
      );
      const res = await data.data;
      console.log(res);
      setData(res);
      setCartType("tv");
    } catch (err) {
      try {
        const data = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie}?api_key=67fe98bd3ea34f0d4e3a279c5387b342`
        );
        const res = await data.data;
        setData(res);
        setCartType("movie");
      } catch (err) {
        console.log(err);
      }
    }
  }

  console.log("res:" + data);
  function getTime(time: number) {
    return (
      Math.floor(time / 60) +
      "h " +
      ("0" + Math.floor(time % 60)).slice(-2) +
      "m"
    );
  }
  useEffect(() => {
    ID();
  }, [movie]);
  if (!data) return <div>Loading...</div>;
  return (
    <>
      <div className="px-24 card-description">
        <div className="bg-img"></div>
        <img
          alt=""
          className="bg-img"
          src={imagePath + data.backdrop_path}
          width={1200}
          height={800}
        />
        <div className="main flex gap-8 pt-8">
          <div className="poster">
            <img
              alt=""
              className="rounded-xl min-w-[200px] translate-y-12"
              src={imagePath + data.poster_path}
              width={300}
              height={450}
            />
          </div>
          <div className="py-12 text-white font-bold">
            <div className="title text-4xl">
              <h1>{data.original_title}</h1>
            </div>
            <div className="rales-date text-base">
              {data.release_date} . {data.genres.map((name) => name.name + ",")}{" "}
              . {getTime(data.runtime)}
            </div>
            <div className="rate flex gap-2 items-center py-4">
              <div className="bg-sky-950 rounded-full w-8 h-8 p-8 flex items-center justify-center">
                <h1 className="flex text-xl">
                  {Math.floor(data.vote_average * 10)}{" "}
                  <Percent width={10} height={10} />
                </h1>
              </div>
              <h1>
                User
                <br />
                Score
              </h1>
            </div>
            <div className="type text-muted-foreground py-2">
              {data.tagline}
            </div>
            <div className="over-view">
              <h1 className="pb-2 text-2xl">Overview</h1>
              <p className="text-sm">{data.overview}</p>
            </div>
            <div className="production"></div>
          </div>
        </div>
      </div>
      <div className="description px-24">
        <div className="main overflow-scroll">
          <CastCard movie={movie} cardType={cardType} />
          <Media movie={movie} cardType={cardType} />
          <Recommendation movie={movie} cardType={cardType} />
        </div>
        <div className="aside">
          <div className="py-5">
            <div className="pt-5">
              <h1 className="font-bold text-sm">Status</h1>
              <p className="text-sm font-normal">{data.status}</p>
            </div>
            <div className="pt-5">
              <h1 className="font-bold text-sm">Original Language</h1>
              <p className="text-sm font-normal">{data.original_language}</p>
            </div>
            <div className="pt-5">
              <h1 className="font-bold text-sm">Budget</h1>
              <p className="text-sm font-normal">${data.budget}</p>
            </div>
            <div className="pt-5">
              <h1 className="font-bold text-sm">Revenue</h1>
              <p className="text-sm font-normal">${data.revenue}</p>
            </div>
          </div>
          <Keywords movie={movie} cardType={cardType} />
        </div>
      </div>
    </>
  );
}

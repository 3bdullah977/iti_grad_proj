import Card from "./card";
import { Button } from "../../../components/ui/button";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Popular() {
  const [popularState, setPopularState] = useState("streaming");
  const [data, setData] = useState<any>([]);
  async function PopularData() {
    const data = await fetch(
      popularState === "streaming"
        ? `https://api.themoviedb.org/3/movie/now_playing?api_key=67fe98bd3ea34f0d4e3a279c5387b342`
        : popularState === "onTv"
        ? `
        https://api.themoviedb.org/3/tv/on_the_air?api_key=67fe98bd3ea34f0d4e3a279c5387b342`
        : popularState === "forRent"
        ? `https://api.themoviedb.org/3/movie/upcoming?api_key=67fe98bd3ea34f0d4e3a279c5387b342`
        : "https://api.themoviedb.org/3/movie/top_rated?api_key=67fe98bd3ea34f0d4e3a279c5387b342"
    );
    const res = await data.json();
    const results = await res.results;
    setData(results);
  }
  const container: any = useRef();
  useEffect(() => {
    PopularData();
  }, [popularState]);
  useGSAP(() => {
    gsap.fromTo(
      container.current,
      { opacity: 1 },
      { opacity: 0, duration: 0.5, ease: "power1.inOut" }
    );
    gsap.fromTo(
      container.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power1.inOut" }
    );
  }, [popularState]);
  return (
    <>
      <div className="popular pt-10">
        <div className="pb-5 flex gap-8">
          <h1 className="font-bold text-2xl">What's Popular</h1>
          <div className="flex relative overflow-hidden gap-6 border-sky-950 border rounded-3xl items-center max-h-8">
            <div
              className={
                popularState === "streaming"
                  ? `absolute bg-sky-950 h-full w-1/4 z-0 rounded-3xl transition-all duration-300 ease-in-out`
                  : popularState === "onTv"
                  ? `absolute bg-sky-950 h-full w-1/4 z-0 rounded-3xl translate-x-full transition-all duration-300 ease-in-out`
                  : popularState === "forRent"
                  ? `absolute bg-sky-950 h-full w-1/4 z-0 rounded-3xl translate-x-[190%] transition-all duration-300 ease-in-out`
                  : `absolute bg-sky-950 h-full w-1/4 z-0 rounded-3xl translate-x-[300%] transition-all duration-300 ease-in-out`
              }></div>
            <Button
              onClick={() => setPopularState("streaming")}
              variant="outline"
              className="popular-btn text-white rounded-3xl px-4 h-0 font-extrabold text-sm z-10 bg-transparent border-none hover:bg-transparent">
              Streaming
            </Button>
            <Button
              onClick={() => setPopularState("onTv")}
              variant="outline"
              className="popular-btn text-white rounded-3xl px-4 h-0 font-extrabold text-sm z-10 bg-transparent border-none hover:bg-transparent">
              On TV
            </Button>
            <Button
              onClick={() => setPopularState("forRent")}
              variant="outline"
              className="popular-btn text-white rounded-3xl px-4 h-0 font-extrabold text-sm z-10 bg-transparent border-none hover:bg-transparent">
              For Rent
            </Button>
            <Button
              onClick={() => setPopularState("inTheaters")}
              variant="outline"
              className="popular-btn text-white rounded-3xl px-4 h-0 font-extrabold text-sm z-10 bg-transparent border-none hover:bg-transparent">
              In Theaters
            </Button>
          </div>
        </div>
        <div
          className="popular-cards flex overflow-x-scroll gap-5"
          ref={container}>
          {data.map((movie) => (
            <div key={movie.id}>
              <Card
                id={movie.id}
                title={movie.title ? movie.title : movie.name}
                poster_path={movie.poster_path}
                release_date={
                  movie.release_date ? movie.release_date : movie.first_air_date
                }
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

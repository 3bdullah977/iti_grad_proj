import Card from "./card";
import { Button } from "../../../components/ui/button";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import axios from "axios";

export default function Trending() {
  const [trendingState, setTrendingState] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  // console.log(data);
  async function TrendingData() {
    const data = await fetch(
      trendingState
        ? `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=67fe98bd3ea34f0d4e3a279c5387b342`
        : `https://api.themoviedb.org/3/trending/all/week?language=en-US&api_key=67fe98bd3ea34f0d4e3a279c5387b342`
    );
    const res = await data.json();
    const results = await res.results;
    setData(results);
  }
  const container: any = useRef();
  useEffect(() => {
    TrendingData();
  }, [trendingState]);
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
  }, [trendingState]);

  return (
    <>
      <div className="trending pt-10">
        <div className="pb-5  flex gap-8">
          <h1 className="font-bold text-2xl">Trending</h1>
          <div className="flex relative overflow-hidden gap-6 border-sky-950 border rounded-3xl items-center">
            <div
              className={
                trendingState
                  ? `absolute bg-sky-950 h-full w-2/4 z-0 rounded-3xl transition-all duration-300 ease-in-out`
                  : `absolute bg-sky-950 h-full w-2/4 z-0 rounded-3xl translate-x-full transition-all duration-300 ease-in-out`
              }></div>
            <Button
              onClick={() => setTrendingState(true)}
              variant="outline"
              className="trending-btn text-white rounded-3xl px-4 h-0 font-extrabold text-sm z-10 bg-transparent border-none hover:bg-transparent">
              Today
            </Button>
            <Button
              onClick={() => {
                setTrendingState(false);
              }}
              variant="outline"
              className="trending-btn text-white rounded-3xl px-4 h-0 font-extrabold text-sm z-10 bg-transparent border-none hover:bg-transparent">
              This Week
            </Button>
          </div>
        </div>
        <div className="flex overflow-x-scroll gap-5" ref={container}>
          {data.map((movie) => (
            <div key={movie.id}>
              <Card
                id={movie.id}
                title={movie.title || movie.name}
                poster_path={movie.poster_path}
                release_date={movie.release_date || movie.first_air_date}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

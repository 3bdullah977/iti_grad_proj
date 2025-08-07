import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { MoveRight } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { movieAtom } from "../../../components/atoms/movieParams";
import { useAtom } from "jotai";

export default function Welcome() {
  const [searchValue, setSearchValue] = useState("");
  const [resData, setResData] = useAtom(movieAtom);

  async function Search(query: string) {
    const dataSearch = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=67fe98bd3ea34f0d4e3a279c5387b342&query=${query}&include_adult=true&language=en-US&page=1`
    );
    const res = await dataSearch.json();
    setResData(res);
  }
  return (
    <>
      <div>
        <div className="top-part min-h-72 text-white">
          <div className="bg-img"></div>
          <div className="context px-12 py-14 gap-3 w-full">
            <h1 className="text-4xl font-extrabold">Welcome.</h1>
            <p className="text-2xl font-semibold">
              Millions of movies, TV shows and people to discover. Explore now.
            </p>
            <div className="search pt-9">
              <Input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchValue(e.target.value)
                }
                className="input bg-white rounded-3xl p-6 text-black border-none"
                placeholder="Search for a movie, tv show, person ......"
              />
              <Link to={searchValue ? `/search` : `/`}>
                <Button
                  onClick={() => Search(searchValue)}
                  className="button rounded-3xl p-6 border-none"
                  variant="outline">
                  Search
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="bottom-part min-h-72 text-white">
          <div className="bg-img"></div>
          <div className="context px-12 py-10 gap-3 w-full">
            <h1 className="text-6xl font-black">That&apos;s a</h1>
            <h1 className="text-6xl font-black py-4">Wrap 2025</h1>
            <p className="text-2xl font-semibold pb-2">
              The best (and worst) of the year from TMDB.
            </p>
            <Button
              className="button rounded-3xl p-4 bg-transparent font-semibold"
              variant="outline">
              Check it out
              <MoveRight className="pl-2" size={25} strokeWidth={3} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

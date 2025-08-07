import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../components/ui/menubar";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { Data } from "./atoms/movieNavDetails";
import { userID } from "./atoms/userID";

export default function Nav() {
  const [state, setState] = useAtom(Data);
  const [user, setUser] = useAtom(userID);

  return (
    <>
      <nav className="flex px-24 py-4 justify-between text-white bg-sky-950">
        <div className="left-side flex gap-8 items-center">
          <Link to={"http://localhost:5173"}>
            <img
              alt="the movie db"
              src={
                "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              }
              width={150}
              height={190}
            />
            {/* <h1 className="logo px-5 text-2xl font-extrabold">T M D B</h1> */}
          </Link>
          <Menubar className="bg-transparent border-0">
            <MenubarMenu>
              <MenubarTrigger>Movies</MenubarTrigger>
              <MenubarContent>
                <Link to={"/navThings"}>
                  <MenubarItem onClick={() => setState("popular")}>
                    Popular
                  </MenubarItem>
                </Link>
                <Link to={"/navThings"}>
                  <MenubarItem onClick={() => setState("upcoming")}>
                    Upcoming
                  </MenubarItem>
                </Link>
                <Link to={"/navThings"}>
                  <MenubarItem onClick={() => setState("now_playing")}>
                    Now Playing
                  </MenubarItem>
                </Link>
                <Link to={"/navThings"}>
                  <MenubarItem onClick={() => setState("top_rated")}>
                    Top Rated
                  </MenubarItem>
                </Link>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>TV Shows</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Popular</MenubarItem>
                <MenubarItem>Airing Today</MenubarItem>
                <MenubarItem>On TV</MenubarItem>
                <MenubarItem>Top Rated</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>People</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Popular People</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <div className="right-side flex gap-8 items-center">
          <Link to={"/favourites"}>
            <Plus strokeWidth={4} />
          </Link>
          <Link to={user ? "/logout" : "/login"}>
            {user ? <h3>Logout</h3> : <h3>Login</h3>}
          </Link>
          <h3>Join TMDB</h3>
          <Search strokeWidth={3} className="text-sky-500" />
        </div>
      </nav>
    </>
  );
}

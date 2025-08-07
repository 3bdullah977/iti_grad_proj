import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userID } from "../../../components/atoms/userID";
import axios from "axios";
import { toast } from "sonner";

type cardProps = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
};

export default function Card({
  id,
  title,
  poster_path,
  release_date,
}: cardProps) {
  const [user] = useAtom(userID);
  const [heartState, setHeartState] = useState(false);
  const imagePath = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const res = await axios.get(`http://localhost:8080/api/${user}/data`);
          if (res.data?.data?.id?.includes(id)) {
            setHeartState(true);
          }
        } catch (err) {
          console.error("Failed to fetch user favorites", err);
        }
      };

      fetchUserData();
    }
  }, []);

  async function PostFav() {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/${user}/data`,
        { id }
      );
      console.log("Added to favorites", response.data);
      toast("Added to favorites");
    } catch (err) {
      console.error("Failed to add to favorites", err);
    }
  }

  async function DeleteFav() {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/${user}/data/${id}`
      );
      console.log("Removed from favorites", response.data);
      toast("Removed from favorites");
    } catch (err) {
      console.log(id);
      console.error("Failed to remove from favorites", err);
    }
  }

  const toggleFavorite = () => {
    if (heartState) {
      DeleteFav();
    } else {
      PostFav();
    }
    setHeartState(!heartState);
  };

  return (
    <div className="min-h-[335px]">
      <Link to={`/${id}`}>
        <div className="w-40">
          <img
            alt={title}
            className="rounded-xl"
            src={imagePath + poster_path}
            width={400}
            height={600}
          />
        </div>
      </Link>
      <div>
        <h1 className="font-bold">{title}</h1>
        <div className="flex justify-between">
          <p className="font-serif">{release_date}</p>
          {user ? (
            <Heart
              onClick={toggleFavorite}
              fill={heartState ? "#052f4a" : "none"}
              stroke="#052f4a"
              style={{ cursor: "pointer" }}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

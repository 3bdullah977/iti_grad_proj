import { Button } from "../../../components/ui/button";
import heart from "../../../../public/heart.svg";
import { Link } from "react-router-dom";

export default function Empty() {
  return (
    <>
      <div>
        <div className="p-8">
          <h1 className="text-2xl font-bold">Watch list</h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 h-[75vh]">
          <img src={heart} alt="" />
          <p>No movie in watch list</p>
          <Link to={"http://localhost:5173"} className="w-full text-center">
            <Button
              variant="outline"
              className="bg-[#052f4a] text-white w-[20%] cursor-pointer">
              Back to home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

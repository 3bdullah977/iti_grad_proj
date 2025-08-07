import { movieAtom } from "../../components/atoms/movieParams";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";

export default function Search() {
  const [resData, setResData] = useAtom<any>(movieAtom);
  console.log("lol" + resData);
  const imagePath = "https://image.tmdb.org/t/p/original";
  const data = resData.results;
  // console.log(data);
  return (
    <>
      {data &&
        data.map((item) => (
          <div key={item.id} className="p-4">
            <Link to={`/${item.id}`}>
              <div className="flex gap-4 border rounded-lg max-h-[250px] overflow-hidden">
                <div className="w-28">
                  <img
                    className="w-full h-full rounded-tl-lg rounded-bl-lg min-w-[100px]"
                    alt="hey"
                    src={imagePath + item.poster_path}
                    width={500}
                    height={500}
                  />
                </div>
                <div className="py-5">
                  <h1 className="font-medium text-lg">{item.original_title}</h1>
                  <h2 className="text-muted-foreground text-sm pb-6">
                    {item.release_date}
                  </h2>
                  <p className="text-sm">{item.overview}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </>
  );
}

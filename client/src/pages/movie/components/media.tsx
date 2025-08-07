import MediaCard from "./media_card";
import { useAtom } from "jotai";
import { mediaImg } from "../../../components/atoms/mediaAtom";

export default function Media({ movie, cardType }: any) {
  const [state, setState] = useAtom(mediaImg);

  return (
    <>
      <div className="p-5">
        <div className="flex items-center gap-8">
          <h1 className="py-4 font-semibold text-xl">Media</h1>
          <div>
            <ul className="flex gap-5 font-semibold text-base cursor-pointer">
              <li onClick={() => setState("backdrops")}>Backdrops</li>
              <li onClick={() => setState("posters")}>Posters</li>
            </ul>
          </div>
        </div>
        <div className="flex rounded-xl overflow-x-scroll">
          <MediaCard movie={movie} cardType={cardType} />
        </div>
      </div>
    </>
  );
}

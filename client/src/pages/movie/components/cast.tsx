import CastCard from "./cast_Card";

export default function Cast({ movie, cardType }: any) {
  return (
    <>
      <div className="p-5">
        <h1 className="py-4 font-semibold text-xl">Top Billed Cast</h1>
        <div className="flex gap-5 overflow-scroll">
          <CastCard movie={movie} cardType={cardType} />
        </div>
      </div>
    </>
  );
}

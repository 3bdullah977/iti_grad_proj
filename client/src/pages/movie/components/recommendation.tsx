import RecommendationCard from "./recommendation_card";

export default function Recommendation({ movie, cardType }: any) {
  return (
    <>
      <div className="p-5">
        <h1 className="py-4 font-semibold text-xl">Recommendation</h1>
        <div className="flex gap-5 overflow-x-scroll">
          <RecommendationCard movie={movie} cardType={cardType} />
        </div>
      </div>
    </>
  );
}

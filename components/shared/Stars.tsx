import { getStars } from "@/lib/helper";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export function RatingStars({ rating }: { rating: number }) {
  const stars = getStars(rating);

  return (
    <div className="flex gap-1 text-yellow-500">
      {stars.map((s, i) => {
        if (s === "full") return <FaStar key={i} />;
        if (s === "half") return <FaStarHalfAlt key={i} />;
        return <FaRegStar key={i} />;
      })}
    </div>
  );
}

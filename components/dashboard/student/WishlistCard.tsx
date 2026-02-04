import { RatingStars } from "@/components/shared/Stars";
import Image from "next/image";
import Link from "next/link";

export default function WishlistCard({
  poster,
  title,
  avg_rating,
  total_reviews,
  level,
  price,
  id,
  isEnrolled,
}: {
  poster: string;
  title: string;
  avg_rating: number;
  total_reviews: number;
  level: string;
  price: number;
  id: string;
  isEnrolled: boolean;
}) {
  return (
    <div className="block bg-white shadow hover:shadow-lg transition">
      {/* Poster */}
      <div className="relative h-60 w-full">
        <Image
          src={poster}
          alt={title}
          fill
          sizes="100%"
          className="object-cover"
        />
      </div>

      <div className="p-4 space-y-2">
        {/* status */}
        <span
          className={`capitalize text-xs font-medium px-2 py-1  block w-fit rounded-sm ${
            isEnrolled
              ? "text-green-600 bg-green-100"
              : "text-yellow-600 bg-yellow-100"
          }`}
        >
          {isEnrolled ? "enrolled" : "not enrolled"}
        </span>

        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-900 font-semibold">Level: {level}</p>

        {/* rating */}
        <div className="flex items-center gap-2">
          <RatingStars rating={avg_rating} />
          <p className=" text-gray-600 ">({total_reviews})</p>
        </div>

        {/* price */}
        <p className="font-bold text-gray-900 text-xl">
          {price == 0 ? "Free" : `$${price}`}
        </p>

        {/* button */}
        <Link
          href={`/courses/${id}`}
          className="bg-blue-700 block text-gray-50 text-center font-semibold p-2 w-full cursor-pointer"
        >
          {isEnrolled ? "Go to Course" : "Enroll Now"}
        </Link>
      </div>
    </div>
  );
}

"use client";

import { FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";
import { RatingStars } from "../shared/Stars";

export default function CustomerCard({
  comment,
  rating,
  userName,
  avatar_url,
}: {
  comment: string;
  rating: number;
  userName: string;
  avatar_url: string;
}) {
  return (
    <div className="rounded-2xl shadow-blue-light p-4 border-2 border-gray-100 space-y-2 bg-white">
      <FaQuoteLeft className="text-2xl text-blue-500 mb-2" />
      <h2 className="font-semibold text-gray-700 ml-4">{comment}</h2>
      <div className="flex gap-2 mt-4 ml-4">
        <div className="w-15 h-15 relative overflow-hidden rounded-lg">
          <Image
            src={avatar_url}
            sizes="100%"
            fill
            alt="reviewer avatar"
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="capitalize text-gray-900 font-semibold mb-1">
            {userName}
          </h3>
          <RatingStars rating={rating} />
        </div>
      </div>
    </div>
  );
}

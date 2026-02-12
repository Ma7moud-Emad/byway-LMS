"use client";

import { RatingStars } from "@/components/shared/Stars";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { supabase } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

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
  const router = useRouter();
  const { id: user_id } = useParams();
  const [isRemoved, setIsRemoved] = useState<boolean>(false);

  async function deleteCourse() {
    setIsRemoved(true);
    const { error } = await supabase
      .from("wishlist_items")
      .delete()
      .eq("user_id", user_id)
      .eq("course_id", id);

    if (error) {
      toast.error("Failed to remove course");
    } else {
      toast.success("Removed course successfully");
      router.refresh();
    }

    setIsRemoved(false);
  }

  return (
    <div className="block bg-white shadow hover:shadow-lg transition">
      {/* Poster */}
      <div
        className="relative h-60 w-full cursor-pointer"
        onClick={() => router.push(`/courses/${id}`)}
      >
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

        <Button
          clickedFun={deleteCourse}
          classes="bg-blue-700 block text-gray-50 text-center font-semibold p-2 w-full "
        >
          {isRemoved ? <Spinner /> : "remove"}
        </Button>
      </div>
    </div>
  );
}

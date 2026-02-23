"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CustomerCard from "./CustomerCard";
import { useRef } from "react";

export type Review = {
  id: string;
  comment: string;
  rating: number;
  profiles: { avatar_url: string; full_name: string };
};

export default function Customers({ reviews }: { reviews: Review[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      const width = window.innerWidth;
      containerRef.current.scrollBy({ left: -width, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const width = window.innerWidth;
      containerRef.current.scrollBy({ left: width, behavior: "smooth" });
    }
  };

  return (
    <div className="px-4 py-8 bg-[#F8FAFC]">
      {/* header */}
      <div className="flex justify-between pb-8">
        <h1 className="font-bold text-gray-900 text-2xl">
          What Our Customer Say <br className="hidden sm:block" /> About Us
        </h1>
        <div className="flex gap-2 items-start pt-2.5">
          <button
            suppressHydrationWarning
            className="bg-gray-400 px-3 py-1.5 rounded-sm text-white cursor-pointer"
            onClick={scrollLeft}
          >
            <FaChevronLeft />
          </button>
          <button
            suppressHydrationWarning
            className="bg-gray-400 px-3 py-1.5 rounded-sm text-white cursor-pointer"
            onClick={scrollRight}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Cards */}
      {reviews && reviews.length > 0 && (
        <div
          className="flex flex-nowrap gap-4 overflow-x-scroll hide-scrollbar"
          ref={containerRef}
        >
          {reviews.map((review) => {
            return (
              <div
                key={review.id}
                className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 shrink-0"
              >
                <CustomerCard
                  rating={review.rating}
                  comment={review.comment}
                  userName={review.profiles.full_name}
                  avatar_url={review.profiles.avatar_url}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { supabase } from "@/lib/supabase";

import FilterResultsServer from "./FilterResultsServer";

import { CourseCardProps } from "@/lib/types";

export default function FilterResultsClient() {
  const searchParams = useSearchParams();

  const [courses, setCourses] = useState<CourseCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      setLoading(true);
      setError(null);

      let query = supabase.from("courses").select("*");

      // ===== Rating =====
      const rating = searchParams.get("rating");
      if (rating) {
        const value = Number(rating.replace("up to ", ""));
        query = query.lte("avg_rating", value);
      }

      // ===== Total Hours =====
      const totalHours = searchParams.get("total_hours");
      if (totalHours) {
        const value =
          totalHours === "25+"
            ? 1500
            : Number(totalHours.replace("up to ", "")) * 60;
        query = query.lte("total_time_minutes", value);
      }

      // ===== Level =====
      const level = searchParams.get("level");
      if (level) {
        query = query.in("level", level.split(","));
      }

      // ===== Language =====
      const language = searchParams.get("language");
      if (language) {
        query = query.overlaps("languages", language.split(","));
      }

      // ===== Price =====
      const price = searchParams.get("price");
      if (price === "free") query = query.eq("price", 0);
      if (price === "paid") query = query.gt("price", 0);

      // ===== Discount =====
      const discount = searchParams.get("discount");
      if (discount) {
        const maxDiscount = Number(
          discount.replace("up to ", "").replace("%", "")
        );
        query = query.lte("discount_price", maxDiscount);
      }

      // ===== Sort =====
      const sort = searchParams.get("sort");
      if (sort === "rating_desc")
        query = query.order("avg_rating", { ascending: false });
      if (sort === "newest")
        query = query.order("created_at", { ascending: false });
      if (sort === "most_popular")
        query = query.order("total_students", { ascending: false });

      const { data, error } = await query;
      if (error) setError(error.message);
      else setCourses(data || []);

      setLoading(false);
    }

    fetchCourses();
  }, [searchParams]);

  if (loading)
    return (
      <div className="flex mt-80 md:mt-40 items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;

  return <FilterResultsServer courses={courses} />;
}

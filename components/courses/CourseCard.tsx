import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { CourseCardProps } from "@/lib/types";
import { RatingStars } from "../shared/Stars";
import Link from "next/link";

export default async function CourseCard({
  title,
  avg_rating,
  discount_price,
  instructor_id,
  poster,
  total_lessons,
  total_reviews,
  total_time_minutes,
  level,
  price,
  short_description,
  id,
  type = "home",
  role = "instructor",
}: CourseCardProps) {
  const { data: instructor } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", instructor_id)
    .single();

  const { username } = instructor.username;

  return (
    <Link
      href={`/courses/${id}`}
      className={`rounded-2xl shadow-blue-light p-4 border-2 border-gray-100 ${
        type !== "home" ? "md:grid md:grid-cols-3 md:gap-4" : "cursor-pointer"
      }`}
    >
      <figure
        className={`relative h-40 rounded-lg overflow-hidden ${
          type !== "home" && "h-60"
        }`}
      >
        <Image
          src={poster}
          alt={title}
          fill
          className="object-top object-cover"
        />
      </figure>
      <div
        className={`${
          type !== "home" && "md:col-span-2 md:grid md:grid-cols-3"
        }`}
      >
        <div className={`${type !== "home" && "md:col-span-2"}`}>
          <h4 className="font-bold text-xl text-gray-900 pt-2">{title}</h4>

          {role !== "instructor" && (
            <p className={`text-sm text-gray-700 ${type !== "home" && "mb-2"}`}>
              by {username}
            </p>
          )}
          {type !== "home" && (
            <p className="text-sm text-gray-700">{short_description}</p>
          )}
          <section className="flex items-center gap-2 pt-2 pb-1">
            <RatingStars rating={avg_rating} />
            <p className="text-sm text-gray-700 font-medium">
              ({total_reviews})
            </p>
          </section>
          <p className="text-sm text-gray-700">
            {total_time_minutes / 60} Total Hours. {total_lessons} Lectures.{" "}
            {level}
          </p>
        </div>
        <div className="flex gap-2">
          {price === 0 ? (
            <p className="font-bold text-xl text-gray-900 pt-2 capitalize">
              free
            </p>
          ) : (
            <>
              {discount_price && (
                <p className="font-bold text-xl text-gray-900 pt-2">
                  ${discount_price}
                </p>
              )}
              <p
                className={`font-bold ${
                  discount_price
                    ? `text-gray-500 line-through text-sm pt-3 ${
                        type !== "home" && "pt-3.5"
                      }`
                    : "text-xl text-gray-900 pt-2"
                }`}
              >
                ${price}
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

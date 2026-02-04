import { RatingStars } from "@/components/shared/Stars";
import { CourseCardProps } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function ResultCard({ course }: { course: CourseCardProps }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="border-2 border-gray-100 rounded-sm"
    >
      <figure className="relative h-40 overflow-hidden ">
        <Image
          src={course.poster}
          alt={course.title}
          fill
          sizes="100%"
          className="object-top object-cover"
          priority
        />
      </figure>
      <div className="p-2">
        <div>
          <h4 className="font-bold text-xl text-gray-900 pt-2">
            {course.title}
          </h4>
          <section className="flex items-center gap-2 pt-2 pb-1">
            <RatingStars rating={course.avg_rating} />
            <p className="text-sm text-gray-700 font-medium">
              ({course.total_reviews})
            </p>
          </section>
          <p className="text-sm text-gray-700">
            {course.total_time_minutes / 60} Total Hours. {course.total_lessons}
            Lectures. {course.level}
          </p>
        </div>
        <div className="flex gap-2">
          {course.price === 0 ? (
            <p className="font-bold text-xl text-gray-900 pt-2 capitalize">
              free
            </p>
          ) : (
            <>
              {course.discount_price && (
                <p className="font-bold text-xl text-gray-900 pt-2">
                  ${course.discount_price}
                </p>
              )}
              <p
                className={`font-bold ${
                  course.discount_price
                    ? "text-gray-500 line-through text-sm pt-3"
                    : "text-xl text-gray-900 pt-2"
                }`}
              >
                ${course.price}
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

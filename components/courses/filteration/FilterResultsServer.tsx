"use client";

import { CourseCardProps } from "@/lib/types";

import Link from "next/link";
import Image from "next/image";
import { RatingStars } from "@/components/shared/Stars";

export default function FilterResultsServer({
  courses,
}: {
  courses: CourseCardProps[];
}) {
  if (!courses || courses.length === 0) {
    return (
      <p className="mt-80 md:mt-40 text-center font-bold text-gray-900">
        No courses found
      </p>
    );
  }

  return (
    <>
      <p className="text-sm text-gray-500 py-2 w-fit ml-auto -mt-12 mb-4 ">
        {courses.length} Results
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <ResultCard key={course.id as string} course={course} />
        ))}
      </div>
    </>
  );
}

function ResultCard({ course }: { course: CourseCardProps }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="rounded-2xl shadow-blue-light p-4 border-2 border-gray-100"
    >
      <figure className="relative h-40 rounded-lg overflow-hidden ">
        <Image
          src={course.poster}
          alt={course.title}
          fill
          sizes="100%"
          className="object-top object-cover"
          priority
        />
      </figure>
      <div>
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
            {course.total_time_minutes / 60} Total Hours. {course.total_lessons}{" "}
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

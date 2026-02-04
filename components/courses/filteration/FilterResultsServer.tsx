"use client";

import { CourseCardProps } from "@/lib/types";

import ResultCard from "./ResultCard";

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

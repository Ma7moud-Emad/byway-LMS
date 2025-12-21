import { CourseCardProps } from "@/lib/types";
import CourseCard from "../CourseCard";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.title} {...course} />
      ))}
    </div>
  );
}

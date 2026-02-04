"use client";

import { supabase } from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import NotFound from "@/components/dashboard/student/NotFound";
import MyCoursesCard from "@/components/dashboard/student/MyCoursesCard";

type Course = {
  progress_percentage: number;
  status: string;
  courses: {
    id: string;
    title: string;
    short_description: string;
    poster: string;
  };
};

export default function Page() {
  const { id } = useParams();

  // state for active filter and courses
  const [activeFilter, setActiveFilter] = useState("courses");

  // courses state
  const [courses, setCourses] = useState<Course[]>([]);

  // prepare query
  const query = supabase
    .from("enrollments")
    .select(
      `
    progress_percentage,
    status,
    courses (
      id,
      title,
      short_description,
      poster 
    )
  `,
    )
    .eq("student_id", id);

  switch (activeFilter) {
    case "complete":
      query.eq("status", "completed");
      break;
    case "active":
      query.eq("status", "active");
      break;
    case "cancel":
      query.eq("status", "canceled");
      break;
  }

  // handle filter change
  function handleQueryChange(query: string) {
    setActiveFilter(query);
  }

  // query enrollments on filter change
  useEffect(() => {
    async function fetchEnrollments() {
      const { data, error } = await query;

      if (error) {
        console.error("Error fetching enrollments:", error);
        return;
      }
      setCourses(data);
    }
    fetchEnrollments();
  }, [activeFilter]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">My Courses</h1>
      <header className="bg-white p-2 rounded-sm mb-6 shadow ">
        <ul className="text-gray-900 font-medium grid grid-cols-4 gap-6 text-center">
          {["courses", "complete", "active", "cancel"].map((query) => (
            <li
              key={query}
              className={`capitalize cursor-pointer px-2 py-1 md:py-2 md:text-xl ${
                activeFilter === query
                  ? "bg-blue-500 text-white rounded-sm"
                  : ""
              }`}
              onClick={() => handleQueryChange(query)}
            >
              {query}
            </li>
          ))}
        </ul>
      </header>
      {courses?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => {
            const {
              progress_percentage,
              courses: { id, poster, title, short_description },
            } = course;

            return (
              <MyCoursesCard
                key={id}
                poster={poster}
                title={title}
                short_description={short_description}
                id={id}
                progress_percentage={progress_percentage}
              />
            );
          })}
        </div>
      ) : (
        <NotFound msg="No courses were found" />
      )}
    </div>
  );
}

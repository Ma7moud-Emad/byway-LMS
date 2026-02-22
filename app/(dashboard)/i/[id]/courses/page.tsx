"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

import NotFound from "@/components/dashboard/student/NotFound";

import { GiStairs } from "react-icons/gi";
import { RiEdit2Fill } from "react-icons/ri";
import { FaStar, FaUsers } from "react-icons/fa";
import { MdPlayLesson, MdSmartDisplay } from "react-icons/md";

export type Course = {
  id: string;
  poster: string;
  title: string;
  status: string;
  short_description: string;
  level: "beginner" | "intermediate" | "advanced";
  avg_rating: number;
  total_reviews?: number;
  total_students: number;
  total_lessons: number;
  discount_price: number;
  price: number;
};

export default function Page() {
  const { id } = useParams();

  // state for active filter and courses
  const [activeFilter, setActiveFilter] = useState("all");

  // courses state
  const [courses, setCourses] = useState<Course[]>([]);

  // prepare query
  const query = supabase
    .from("courses")
    .select(
      `
      id,
      poster,
      title,
      short_description,
      level,
      avg_rating,
      total_reviews,
      total_students,
      total_lessons,
      discount_price,
      price`,
    )
    .eq("instructor_id", id);

  switch (activeFilter) {
    case "published":
      query.eq("status", "published");
      break;
    case "draft":
      query.eq("status", "draft");
      break;
    case "archived":
      query.eq("status", "archived");
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
      setCourses(data as Course[]);
    }
    fetchEnrollments();
  }, [activeFilter]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-900">My Courses</h1>
      <header className="bg-white p-2 rounded-sm mb-6 shadow ">
        <ul className="text-gray-900 font-medium grid grid-cols-[auto_auto_auto_auto] sm:grid-cols-4 sm:gap-6 text-center">
          {["all", "published", "archived", "draft"].map((query) => (
            <li
              key={query}
              className={`capitalize cursor-pointer px-2 py-1 sm:py-2 sm:text-xl ${
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
        <div className="grid grid-cols-1 gap-6">
          {courses.map((item) => {
            return <CourseCard key={item.id} course={item} />;
          })}
        </div>
      ) : (
        // <NotFound msg="No courses were found" />
        <p className="text-center text-gray-500">No courses were found</p>
      )}
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  const {
    id,
    poster,
    title,
    short_description,
    level,
    avg_rating,
    total_students,
    total_lessons,
    price,
    discount_price,
  } = course;
  return (
    <div className="relative rounded-2xl shadow-blue-light p-4 border-2 border-gray-100 sm:flex">
      <div className="sm:flex sm:gap-4">
        {/* Poster */}
        <div className="h-40 sm:h-55 overflow-hidden">
          <Image
            src={poster}
            width={500}
            height={500}
            alt={title}
            className="object-contain"
          />
        </div>
        <div className="max-w-sm">
          {/* title */}
          <h2 className="font-bold text-lg sm:text-2xl text-gray-900">
            {title}
          </h2>

          {/* description */}
          <p className="text-gray-700">{short_description}</p>

          {/* stats */}
          <div className="flex items-center justify-between my-3">
            <p className="flex items-center gap-1">
              <GiStairs className="text-gray-900" />
              <span className="capitalize text-gray-700">{level}</span>
            </p>
            <p className="flex items-center gap-1">
              <FaStar className="text-gray-900" />
              <span className="text-gray-700">{avg_rating}</span>
            </p>
            <p className="flex items-center gap-1">
              <FaUsers className="text-lg text-gray-900" />
              <span className="text-gray-700">{total_students}</span>
            </p>
            <p className="flex items-center gap-1">
              <MdPlayLesson className="text-gray-900" />
              <span className="text-gray-700">{total_lessons}</span>
            </p>
          </div>
          <p className="text-gray-900 mb-4 text-xl ">
            {discount_price > 0 && (
              <span className="font-semibold">${discount_price}</span>
            )}{" "}
            <span
              className={`${discount_price > 0 && price > 0 ? "text-gray-400 text-lg line-through" : "font-semibold"}`}
            >
              {price == 0 ? "Free" : `$${price}`}
            </span>
          </p>

          {/* actions */}
          <div className="flex items-center gap-4">
            <Link
              href={`/courses/${id}`}
              className="flex items-center justify-center gap-2 bg-gray-900 text-gray-50 py-1 capitalize text-lg font-medium rounded-sm w-full"
            >
              <MdSmartDisplay className="text-lg" />
              <span>view</span>
            </Link>
            <Link
              href={`courses/${id}`}
              className="flex items-center justify-center gap-2 bg-gray-900 text-gray-50 py-1 capitalize text-lg font-medium rounded-sm w-full"
            >
              <RiEdit2Fill className="text-lg" />
              edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

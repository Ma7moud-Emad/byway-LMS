"use client";

import Link from "next/link";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

import { GiStairs } from "react-icons/gi";
import { RiEdit2Fill } from "react-icons/ri";
import { FaStar, FaUsers } from "react-icons/fa";
import { MdPlayLesson } from "react-icons/md";
import Button from "@/components/ui/Button";
import { BsThreeDotsVertical } from "react-icons/bs";
import toast from "react-hot-toast";

export type Course = {
  id: string;
  poster: string;
  title: string;
  status: "published" | "draft" | "archived";
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

  //
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      let query = supabase
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
        price,
        status
      `,
        )
        .eq("instructor_id", id);

      // apply filter
      if (activeFilter !== "all") {
        query = query.eq("status", activeFilter);
      }

      const { data, error } = await query;

      if (error) {
        console.error(error);
        return;
      }

      setCourses(data as Course[]);
    }

    if (id) fetchCourses();
  }, [activeFilter, id]);

  // handle filter change
  function handleQueryChange(query: string) {
    setActiveFilter(query);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-900">My Courses</h1>
      <header className="bg-white p-2 rounded-sm mb-6 shadow ">
        <ul className="text-gray-900 font-medium grid grid-cols-[auto_auto_auto_auto] sm:grid-cols-4 sm:gap-6 text-center">
          {["all", "published", "archived", "draft"].map((query) => (
            <li
              key={query}
              className={`capitalize cursor-pointer px-2 py-1 sm:py-2 sm:text-xl ${
                activeFilter === query && "bg-blue-500 text-white rounded-sm"
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
            return (
              <CourseCard
                key={item.id}
                course={item}
                setCourses={setCourses}
                setActiveActions={setActiveMenu}
                activeActions={activeMenu}
                setActiveFilter={setActiveFilter}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-700 capitalize font-semibold text-xl mt-50">
          No courses were found
        </p>
      )}
    </div>
  );
}

function CourseCard({
  course,
  setCourses,
  setActiveActions,
  activeActions,
  setActiveFilter,
}: {
  course: Course;
  setCourses: Dispatch<SetStateAction<Course[]>>;
  activeActions: string | null;
  setActiveActions: Dispatch<SetStateAction<string | null>>;
  setActiveFilter: Dispatch<SetStateAction<string>>;
}) {
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
    status,
  } = course;

  async function updateCourseStatus(
    courseId: string,
    status: "published" | "draft" | "archived",
  ) {
    const { error } = await supabase
      .from("courses")
      .update({ status })
      .eq("id", courseId);
    if (error) {
      toast.error("Failed to update course status");
      throw new Error("Failed to update course status");
    } else {
      toast.success("Course status updated successfully");
      setActiveActions(null);
      setCourses((prev) =>
        prev.map((course) =>
          course.id === courseId ? { ...course, status } : course,
        ),
      );
      setActiveFilter(status);
    }
  }

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
        <div className="max-w-sm relative">
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
          <div className="flex items-center gap-2">
            <Link
              href={`courses/${id}`}
              className="flex items-center justify-center gap-2 bg-gray-900 text-gray-50 py-1 capitalize text-lg font-medium rounded-sm w-full"
            >
              <RiEdit2Fill className="text-lg" />
              edit
            </Link>
            <BsThreeDotsVertical
              size={24}
              className="cursor-pointer"
              onClick={() => setActiveActions(activeActions === id ? null : id)}
            />
          </div>

          {/* menu */}
          {activeActions === id && (
            <div className="absolute bottom-2 right-6 rounded-lg bg-white w-40 shadow p-2 flex flex-col gap-2">
              <Button classes="bg-gray-100 hover:bg-gray-200 transition text-left">
                <Link href={`/courses/${id}`}>view</Link>
              </Button>
              {status !== "published" && (
                <Button
                  classes="bg-gray-100 hover:bg-gray-200 transition text-left"
                  clickedFun={() => updateCourseStatus(id, "published")}
                >
                  published
                </Button>
              )}
              {status !== "draft" && (
                <Button
                  classes="bg-gray-100 hover:bg-gray-200 transition text-left"
                  clickedFun={() => updateCourseStatus(id, "draft")}
                >
                  draft
                </Button>
              )}
              {status !== "archived" && (
                <Button
                  classes="bg-gray-100 hover:bg-gray-200 transition text-left"
                  clickedFun={() => updateCourseStatus(id, "archived")}
                >
                  archived
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

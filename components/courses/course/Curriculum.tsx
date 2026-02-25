"use client";

import { useState } from "react";
import LessonPlayer from "./LessonPlayer";
import { Lesson, Module } from "@/lib/types";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { supabase } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Curriculum({
  modules,
  isEnrolled,
  isFree,
  user_id,
  enrollment_id,
}: {
  modules: Module[];
  isEnrolled: boolean;
  isFree: boolean;
  user_id: string;
  enrollment_id: string;
}) {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const router = useRouter();

  async function markCompleted(lesson_id: string) {
    const { error } = await supabase.from("user_progress").insert([
      {
        user_id: user_id,
        enrollment_id: enrollment_id,
        lesson_id: lesson_id,
        is_completed: true,
      },
    ]);
    if (error) {
      toast.error("Failed to mark lesson as completed.");
    } else {
      toast.success("Lesson marked as completed!");
      router.refresh();
    }
  }

  return (
    <>
      <section className="text-gray-900">
        <h2 className="text-2xl font-semibold mb-4">Course Content</h2>

        <div className="space-y-4">
          {/* modules */}
          {modules.length > 0 ? (
            modules.map((module) => (
              <div key={module.id} className="">
                <h3 className="font-semibold text-lg mb-1">{module.title}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {module.description}
                </p>

                <ul className="space-y-2">
                  {/*lessons of module */}
                  {module.lessons
                    // Arranging the lessons by order_number
                    .sort((a, b) => a.order_number - b.order_number)
                    .map((lesson) => (
                      <div key={lesson.id}>
                        <li
                          onClick={() => {
                            // When the student is enrolled for the course or the course is free
                            if (isEnrolled || isFree) {
                              setActiveLesson(lesson);
                            }
                            // Free preview of the open lesson only
                            else if (lesson.is_free_preview) {
                              setActiveLesson(lesson);
                            }
                          }}
                          className={`flex justify-between items-center px-1 py-2 bg-gray-100 transition-colors duration-200
                      ${
                        // different lesson style by is_free_preview | isEnrolled | isFree
                        lesson.is_free_preview || isEnrolled || isFree
                          ? "cursor-pointer hover:bg-gray-200"
                          : "cursor-not-allowed opacity-50"
                      }
                    `}
                        >
                          <span className="flex items-center gap-2">
                            {lesson.user_progress?.[0]?.is_completed ? (
                              <FaCheckSquare className="text-green-500" />
                            ) : (
                              <FaRegSquare className="text-xl" />
                            )}
                            {lesson.title}
                          </span>

                          <span>{lesson.duration_minutes} Min</span>
                        </li>
                        {/* open lesson video when clicked */}
                        {lesson.id === activeLesson?.id && (
                          <LessonPlayer
                            lesson={
                              activeLesson
                                ? {
                                    title: activeLesson.title,
                                    video_url: activeLesson.video_url || "",
                                    description: activeLesson.description || "",
                                  }
                                : null
                            }
                            onClose={() => setActiveLesson(null)}
                            endFun={() => {
                              if (
                                lesson.user_progress?.[0]?.is_completed ||
                                user_id === "" ||
                                enrollment_id === ""
                              )
                                return;

                              markCompleted(lesson.id);
                            }}
                          />
                        )}
                      </div>
                    ))}
                </ul>
              </div>
            ))
          ) : (
            <p>There is currently no content available for this course.</p>
          )}
        </div>
      </section>
    </>
  );
}

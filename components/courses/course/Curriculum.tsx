"use client";

import { useState } from "react";
import LessonPlayer from "./LessonPlayer";
import { Lesson, Module } from "@/lib/types";
import { FaRegSquare } from "react-icons/fa";

export default function Curriculum({
  modules,
  isEnrolled,
  isFree,
}: {
  modules: Module[];
  isEnrolled: boolean;
  isFree: boolean;
}) {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

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
                            <FaRegSquare className="text-xl" />
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

"use client";

import { useState } from "react";
import LessonPlayer from "./LessonPlayer";
import { IoCaretForwardSharp } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
import { Lesson, Module } from "@/lib/types";

export default function Curriculum({ modules }: { modules: Module[] }) {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  return (
    <>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Course Content</h2>

        <div className="space-y-4">
          {modules.map((module) => (
            <div key={module.id} className="bg-white rounded-xl shadow p-5">
              <h3 className="font-semibold text-lg mb-1">{module.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{module.description}</p>

              <ul className="space-y-2">
                {module.lessons.map((lesson) => (
                  <li
                    key={lesson.id}
                    onClick={() => {
                      if (lesson.is_free_preview) {
                        setActiveLesson(lesson);
                      }
                    }}
                    className={`flex justify-between items-center border-b pb-2 text-sm cursor-pointer
                      ${
                        lesson.is_free_preview
                          ? "hover:bg-gray-50"
                          : "opacity-50 cursor-not-allowed"
                      }
                    `}
                  >
                    <span className="flex items-center gap-2">
                      <IoCaretForwardSharp />
                      {lesson.title}
                      {lesson.is_free_preview ? (
                        <span className="ml-2 text-green-600">(Preview)</span>
                      ) : (
                        <span className="ml-2 text-red-500 flex items-center gap-1">
                          <CiLock className="text-lg" />
                          Locked
                        </span>
                      )}
                    </span>

                    <span className="text-gray-500">
                      {lesson.duration_minutes} min
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Video Player */}
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
    </>
  );
}

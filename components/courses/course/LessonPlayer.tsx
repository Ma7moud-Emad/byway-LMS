// components/course/LessonPlayer.tsx
"use client";

import { ShortLesson } from "@/lib/types";
import { FaXmark } from "react-icons/fa6";

export default function LessonPlayer({
  lesson,
  onClose,
}: {
  lesson: ShortLesson | null;
  onClose: () => void;
}) {
  if (!lesson) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4 h-screen">
      <div className="bg-white rounded-xl max-w-3xl w-full overflow-hidden">
        <div className="flex justify-between items-start p-4 border-b">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
            <h3 className=" text-gray-700">{lesson.description}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black cursor-pointer"
          >
            <FaXmark className="text-xl text-red-500" />
          </button>
        </div>

        <div className="aspect-video">
          <iframe
            src={lesson.video_url}
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

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
  console.log(lesson);

  return (
    <div>
      <div className="flex justify-between items-start p-4 bg-white">
        <p className=" text-gray-700">{lesson.description}</p>
        <button
          suppressHydrationWarning
          onClick={onClose}
          className="text-gray-700 bg-gray-100 p-1 rounded-sm cursor-pointer"
        >
          <FaXmark className="text-2xl" />
        </button>
      </div>
      <div className="aspect-video">
        <video
          src={lesson.video_url}
          className="w-full h-full"
          controls
          controlsList="nodownload "
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
}

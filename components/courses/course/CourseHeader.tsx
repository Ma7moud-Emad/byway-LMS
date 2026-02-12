"use client";

import { CourseHeaderProps } from "@/lib/types";
import { FaStar } from "react-icons/fa";
import { GoVideo } from "react-icons/go";
import { LuLanguages, LuTimer } from "react-icons/lu";
import { PiStudentFill } from "react-icons/pi";
import { SiTarget } from "react-icons/si";

export default function CourseHeader({
  title,
  shortDescription,
  avgRating,
  totalStudents,
  level,
  promoVideo,
  totalLessons,
  totalMinutes,
  languages,
}: CourseHeaderProps) {
  const ul_list = [
    {
      icon: PiStudentFill,
      title: `${totalStudents.toLocaleString()} students`,
    },
    { icon: SiTarget, title: level },
    { icon: FaStar, title: avgRating },
    { icon: GoVideo, title: `${totalLessons} lessons` },
    { icon: LuTimer, title: `${Math.round(totalMinutes / 60)} hours` },
    { icon: LuLanguages, title: languages.join(" / ") },
  ];
  return (
    <section className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
        <div className="rounded-xl overflow-hidden shadow-lg">
          <video
            src={promoVideo}
            className="w-full h-64 bg-black/50"
            controls
            controlsList="nodownload "
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-gray-300 mb-6">{shortDescription}</p>

          <ul className="text-sm text-gray-300 grid grid-cols-3 gap-y-4">
            {ul_list.map((li, index) => (
              <li key={index} className="flex items-center gap-1 capitalize">
                <li.icon className="text-gray-300 text-lg" />
                {li.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

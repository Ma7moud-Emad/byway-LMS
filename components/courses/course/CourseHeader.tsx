import { CourseHeaderProps } from "@/lib/types";
import { FaStar } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { SiTarget } from "react-icons/si";

export default function CourseHeader({
  title,
  shortDescription,
  avgRating,
  totalStudents,
  level,
  promoVideo,
}: CourseHeaderProps) {
  return (
    <section className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-gray-300 mb-6">{shortDescription}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1 capitalize">
              <FaStar className="text-yellow-500 text-lg" />
              {avgRating}
            </span>
            <span className="flex items-center gap-1 capitalize">
              <PiStudentFill className="text-xl text-white" />
              {totalStudents.toLocaleString()} students
            </span>
            <span className="flex items-center gap-1 capitalize">
              <SiTarget className="text-lg text-white" /> {level}
            </span>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe src={promoVideo} className="w-full h-64" allowFullScreen />
        </div>
      </div>
    </section>
  );
}

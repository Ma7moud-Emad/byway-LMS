import { InstruictorProps } from "@/lib/types";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";

export default function InstructorCard({
  name,
  headline,
  bio,
  expertise,
  avgRating,
  totalStudents,
  id,
}: InstruictorProps) {
  return (
    <section className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Instructor</h2>

      <Link href={`/instructors/${id}`} className="font-bold text-lg">
        {name}
      </Link>
      <p className="text-sm text-gray-600 mb-3">{headline}</p>

      <p className="text-gray-700 text-sm mb-4 whitespace-pre-line">{bio}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {expertise.map((skill, i) => (
          <span key={i} className="bg-gray-100 px-3 py-1 rounded-full text-xs">
            {skill}
          </span>
        ))}
      </div>

      <div className="flex gap-6 text-sm text-gray-600">
        <span className="flex items-center gap-1 capitalize">
          <FaStar className="text-yellow-500 text-lg" /> {avgRating}
        </span>
        <span className="flex items-center gap-1 capitalize">
          <PiStudentFill className="text-lg" /> {totalStudents.toLocaleString()}{" "}
          students
        </span>
      </div>
    </section>
  );
}

import { CourseProps } from "@/lib/types";
import { GoVideo } from "react-icons/go";
import { LuLanguages, LuTimer } from "react-icons/lu";

export default function CourseSidebar({
  price,
  discountPrice,
  totalLessons,
  totalMinutes,
  languages,
}: CourseProps) {
  return (
    <aside className="bg-white rounded-xl shadow p-6 h-fit">
      <div className="text-center mb-6">
        {price == 0 ? (
          <p className="text-3xl font-bold capitalize">free</p>
        ) : (
          <>
            <p className="text-3xl font-bold">{discountPrice} EGP</p>
            <p className="text-gray-400 line-through">{price} EGP</p>
          </>
        )}
      </div>

      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer">
        Enroll Now
      </button>

      <ul className="mt-6 space-y-3 text-sm text-gray-600">
        <li className="flex items-center gap-2 capitalize">
          <GoVideo className="text-lg" />
          {totalLessons} lessons
        </li>
        <li className="flex items-center gap-2 capitalize">
          <LuTimer className="text-lg" />
          {totalMinutes} minutes
        </li>
        <li className="flex items-center gap-2 capitalize">
          <LuLanguages className="text-lg" />
          {languages.join(" / ")}
        </li>
      </ul>
    </aside>
  );
}

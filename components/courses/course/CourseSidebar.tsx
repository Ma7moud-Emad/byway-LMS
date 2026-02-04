import { CourseProps } from "@/lib/types";

export default function CourseSidebar({
  price,
  discountPrice,
  role,
}: CourseProps) {
  return (
    <aside className="bg-white shadow p-6 h-fit">
      <div
        className={`text-center ${
          (role === "student" || role === null) && "mb-6"
        }`}
      >
        {price == 0 ? (
          <p className="text-3xl font-bold capitalize">free</p>
        ) : (
          <>
            <p className="text-3xl font-bold">{discountPrice} EGP</p>
            <p className="text-gray-400 line-through">{price} EGP</p>
          </>
        )}
      </div>
      {(role === "student" || role === null) && (
        <button
          suppressHydrationWarning
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
        >
          Enroll Now
        </button>
      )}
    </aside>
  );
}

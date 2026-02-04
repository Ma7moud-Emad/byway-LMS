import { supabase } from "@/lib/supabase/client";

import State from "@/components/dashboard/student/State";
import WishlistCard from "@/components/dashboard/student/WishlistCard";

import { FaHeart } from "react-icons/fa";
import { MdOutlineCheckCircle, MdOutlineLockOpen } from "react-icons/md";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const { data: wishlist_items, error } = await supabase
    .from("wishlist_items")
    .select("*, courses (*)")
    .eq("user_id", id);

  if (error) {
    console.error("Error fetching wishlist:", error);
    return <div>Error loading wishlist: {error.message}</div>;
  }

  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("*, courses (*)")
    .eq("student_id", id);

  const enrolledCourseIds = new Set(enrollments?.map((item) => item.course_id));
  const wishlistCourseIds = new Set(
    wishlist_items?.map((item) => item.course_id),
  );
  const commonCourseIds = [...enrolledCourseIds].filter((id) =>
    wishlistCourseIds.has(id),
  ).length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Wishlist Courses</h1>
      <div className="my-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <State
          icon={FaHeart}
          label="wishlist "
          count={wishlist_items.length}
          iconBgColor="bg-red-100"
          iconColor="text-red-500"
        />
        <State
          icon={MdOutlineCheckCircle}
          label="enrolled "
          count={commonCourseIds}
          iconBgColor="bg-green-100"
          iconColor="text-green-500"
        />
        <State
          icon={MdOutlineLockOpen}
          label="Not Enrolled"
          count={wishlist_items.length - commonCourseIds}
          iconBgColor="bg-yellow-100"
          iconColor="text-yellow-500"
        />
      </div>
      {wishlist_items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist_items.map((course) => {
            const isEnrolled = enrolledCourseIds.has(course.course_id);
            const {
              poster,
              title,
              avg_rating,
              total_reviews,
              level,
              price,
              id,
            } = course.courses;
            return (
              <WishlistCard
                key={id}
                poster={poster}
                title={title}
                avg_rating={avg_rating}
                total_reviews={total_reviews}
                level={level}
                price={price}
                id={id}
                isEnrolled={isEnrolled}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center mt-20">
          <h3 className=" capitalize font-semibold text-xl text-gray-900">
            No courses in your wishlist
          </h3>
          <p className=" text-gray-700 mb-4">
            Browse courses and add the ones you like to your wishlist
          </p>
          <Button>
            <Link href="/courses">View courses</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

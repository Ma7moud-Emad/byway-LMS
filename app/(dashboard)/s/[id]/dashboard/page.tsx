import NotFound from "@/components/dashboard/student/NotFound";
import Progress from "@/components/dashboard/student/Progress";
import Stats from "@/components/dashboard/student/Stats";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

type EnrollmentType = {
  progress_percentage: number;
  status: string;
  courses: { id: string; title: string; poster: string };
};

export default async function page({ params }: { params: { id: string } }) {
  const { id: userId } = await params;

  const { data: enrollments, error } = (await supabase
    .from("enrollments")
    .select(
      `
    progress_percentage, 
    status,
    courses(
    id,
    title,
    poster
    )
    `,
    )
    .eq("student_id", userId)
    .order("last_accessed_at", { ascending: false })) as {
    data: EnrollmentType[] | null;
    error: Error | null;
  };

  if (error) {
    console.error("Error fetching courses:", error);
    return <div>Error loading courses</div>;
  }
  const enrolled_courses = enrollments?.length;

  const completed_courses = enrollments?.filter(
    (e) => e.status === "completed",
  ).length;

  const active_courses = enrollments?.filter(
    (e) => e.status === "active",
  ).length;
  const cancelled_courses = enrollments?.filter(
    (e) => e.status === "cancelled",
  ).length;

  const coursesStats = {
    enrolled_courses,
    cancelled_courses,
    completed_courses,
    active_courses,
  };

  return (
    <div>
      {/* student status courses */}
      <Stats coursesStats={coursesStats} />

      {/* line seperate */}
      <hr className="mt-8 mb-4 text-gray-700 text-2xl border" />

      {/* last access course */}
      {enrollments && enrollments.length > 0 ? (
        <>
          <h1 className="text-2xl font-bold text-gray-900">
            Continue Learning
          </h1>
          <div
            className="flex justify-center items-center rounded-xl bg-white shadow hover:shadow-lg mt-4 p-4 transition w-full h-52 md:h-80 bg-cover bg-center bg-no-repeat relative after:absolute after:top-0 after:left-0 after:z-0 after:w-full after:h-full after:bg-gray-900/50 after:rounded-xl"
            style={{
              backgroundImage: `url(${enrollments?.[0].courses.poster})`,
            }}
          >
            <div className=" relative z-1">
              <h3 className="font-bold text-lg md:text-2xl lg:text-3xl xl:text-5xl text-gray-50">
                {enrollments?.[0].courses.title}
              </h3>

              <Progress
                progress_percentage={enrollments?.[0].progress_percentage || 0}
              />
              <Link
                href={`/courses/${enrollments?.[0].courses.id}`}
                className="block bg-blue-700 text-gray-50 text-center font-semibold mt-4 p-2 w-full cursor-pointer"
              >
                Continue
              </Link>
            </div>
          </div>
        </>
      ) : (
        <NotFound
          heading="No enrolled courses found"
          msg="Browse available courses and enroll to begin your learning journey"
          href="/courses"
          btnText="Browse courses"
        />
      )}
    </div>
  );
}

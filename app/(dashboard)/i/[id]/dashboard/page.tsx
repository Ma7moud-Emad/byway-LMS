import StudentsGrowthChart from "@/components/dashboard/instructor/StudentChart";
import State from "@/components/dashboard/student/State";
import { groupEnrollmentsByMonth } from "@/lib/helper";
import { supabase } from "@/lib/supabase/client";
import { FaStar } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import { MdReviews } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;

  // fetch instructor stats
  const { data: instructor, error: errorInstructor } = await supabase
    .from("instructors")
    .select(
      `
      total_courses,
      total_students,
      avg_rating,
      total_reviews
      `,
    )
    .eq("id", id)
    .single();

  if (errorInstructor) {
    console.error("Error fetching instructor:", errorInstructor);
    return <div>Error loading dashboard.</div>;
  }

  // fetch courses
  const { data: courses, error: errorCourses } = await supabase
    .from("courses")
    .select(
      `
      id
      `,
    )
    .eq("instructor_id", id);

  if (errorCourses) {
    console.error("Error fetching courses:", errorCourses);
    return <div>Error loading courses.</div>;
  }

  const courseIds = courses.map((course) => course.id);

  // fetch enrollments
  const { data: enrollments, error: errorEnrollments } = await supabase
    .from("enrollments")
    .select(
      `
      enrolled_at
      `,
    )
    .in("course_id", courseIds);

  if (errorEnrollments) {
    console.error("Error fetching enrollments:", errorEnrollments);
    return <div>Error loading enrollments.</div>;
  }

  const { total_courses, total_students, avg_rating, total_reviews } =
    instructor;

  const chartData = groupEnrollmentsByMonth(enrollments || []);

  const stats = [
    {
      icon: FaBookOpenReader,
      label: "courses",
      count: total_courses || 0,
      iconBgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      icon: PiStudentBold,
      label: "students",
      count: total_students || 0,

      iconBgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },

    {
      icon: FaStar,
      label: "rating",
      count: avg_rating || 0,
      iconBgColor: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      icon: MdReviews,
      label: "reviews",
      count: total_reviews || 0,
      iconBgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Quick Overview</h1>

      {/* quick stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-4">
        {stats.map((stat) => (
          <State
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            count={stat.count}
            iconBgColor={stat.iconBgColor}
            iconColor={stat.iconColor}
          />
        ))}
      </div>

      <StudentsGrowthChart chartData={chartData} />
    </div>
  );
}

import CourseDescription from "@/components/courses/course/CourseDescription";
import CourseHeader from "@/components/courses/course/CourseHeader";
import CourseSidebar from "@/components/courses/course/CourseSidebar";
import Curriculum from "@/components/courses/course/Curriculum";
import InstructorCard from "@/components/courses/course/InstructorCard";
import Outcomes_requirements_tags from "./../../../components/courses/course/Outcomes_requirements_tags";

import { supabaseServer } from "@/lib/supabase/server";

import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const supabase = await supabaseServer();

  // get user session
  const { data: userData } = await supabase.auth.getUser();

  // get user role
  const { data: profileUserData } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userData?.user?.id)
    .single();

  // get enrolled courses
  const { data: enrolledCourses } = await supabase
    .from("enrollments")
    .select("*")
    .eq("course_id", id)
    .eq("student_id", userData?.user?.id)
    .single();

  // course info
  const { data: course } = await supabase
    .from("courses")
    .select(`*`)
    .eq("id", id)
    .single();

  // instructor info
  const { data: instructor } = await supabase
    .from("instructors")
    .select(`*,profiles(*)`)
    .eq("id", course.instructor_id)
    .single();

  const { data: modules } = await supabase
    .from("modules")
    .select(
      `
    *,
    lessons (*)
  `,
    )
    .eq("course_id", course.id)
    .order("order_number", { ascending: true });

  const {
    title,
    short_description,
    promo_video,
    description,
    price,
    discount_price,
    total_lessons,
    total_time_minutes,
    languages,
    learning_outcomes,
    level,
    requirements,
    tags,
    is_free,
    instructor_id,
  } = course;

  const {
    headline,
    avg_rating,
    total_students,
    profiles: { full_name, username, avatar_url },
  } = instructor;

  return (
    <div className="bg-gray-50 min-h-screen">
      <CourseHeader
        title={title}
        shortDescription={short_description}
        avgRating={avg_rating}
        totalStudents={total_students}
        level={level}
        promoVideo={promo_video}
        totalLessons={total_lessons}
        totalMinutes={total_time_minutes}
        languages={languages}
      />

      <div className="container mx-auto px-6 py-6 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <CourseDescription description={description} />

          <Outcomes_requirements_tags
            title="What you will learn"
            icon={FiCheckCircle}
            items={learning_outcomes}
          />
          <Outcomes_requirements_tags
            title="Requirements"
            icon={FiAlertCircle}
            items={requirements}
            iconColor="text-gray-900"
          />
          <Curriculum
            modules={modules ?? []}
            isEnrolled={
              enrolledCourses || userData?.user?.id === course.instructor_id
                ? true
                : false
            }
            isFree={is_free}
          />

          {userData?.user?.id !== course.instructor_id ? (
            <InstructorCard
              id={instructor_id}
              name={full_name}
              avatar={avatar_url}
              headline={headline}
              username={username}
            />
          ) : (
            ""
          )}
          <Outcomes_requirements_tags
            title="Tags"
            items={tags}
            iconColor="text-blue-500"
            isFlex={true}
          />
        </div>

        {!enrolledCourses && (
          <CourseSidebar
            price={price}
            discountPrice={discount_price}
            role={profileUserData ? profileUserData.role : null}
          />
        )}
      </div>
    </div>
  );
}

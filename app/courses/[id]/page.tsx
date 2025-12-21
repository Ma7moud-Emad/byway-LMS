import CourseDescription from "@/components/courses/course/CourseDescription";
import CourseHeader from "@/components/courses/course/CourseHeader";
import CourseSidebar from "@/components/courses/course/CourseSidebar";
import Curriculum from "@/components/courses/course/Curriculum";
import InstructorCard from "@/components/courses/course/InstructorCard";
import LearningOutcomes from "@/components/courses/course/LearningOutcomes";
import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  const { data: instructor } = await supabase
    .from("instructors")
    .select("*")
    .eq("id", course.instructor_id)
    .single();

  const { data: instructorProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", course.instructor_id)
    .single();

  const { data: modules } = await supabase
    .from("modules")
    .select(
      `
    *,
    lessons (*)
  `
    )
    .eq("course_id", course.id)
    .order("order_number", { ascending: false });
  console.log(modules);

  return (
    <div className="bg-gray-50 min-h-screen">
      <CourseHeader
        title={course.title}
        shortDescription={course.short_description}
        avgRating={course.avg_rating}
        totalStudents={course.total_students}
        level={course.level}
        promoVideo={course.promo_video}
      />

      <div className="container mx-auto px-6 py-12 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          <CourseDescription description={course.description} />
          <LearningOutcomes items={course.learning_outcomes} />
          <Curriculum modules={modules ?? []} />

          <InstructorCard
            name={instructorProfile.full_name}
            headline={instructor.headline}
            bio={instructor.bio}
            expertise={instructor.expertise}
            avgRating={instructor.avg_rating}
            totalStudents={instructor.total_students}
            id={instructor.id}
          />
        </div>

        <CourseSidebar
          price={course.price}
          discountPrice={course.discount_price}
          totalLessons={course.total_lessons}
          totalMinutes={course.total_time_minutes}
          languages={course.languages}
        />
      </div>
    </div>
  );
}

import { supabase } from "@/lib/supabase/client";
import HomeContainer from "../shared/HomeContainer";
import CourseCard from "./CourseCard";

export default async function CoursesContainer() {
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .order("avg_rating", { ascending: false })
    .limit(4);

  if (error) {
    return <p>Failed to load courses.</p>;
  }

  return (
    <HomeContainer title="Most Popular Courses" ctaHref="/courses">
      <div className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((item) => (
          <CourseCard
            key={item.id}
            title={item.title}
            avg_rating={item.avg_rating}
            discount_price={item.discount_price}
            instructor_id={item.instructor_id}
            poster={item.poster}
            total_lessons={item.total_lessons}
            total_reviews={item.total_reviews}
            total_time_minutes={item.total_time_minutes}
            level={item.level}
            price={item.price}
            id={item.id}
          />
        ))}
      </div>
    </HomeContainer>
  );
}

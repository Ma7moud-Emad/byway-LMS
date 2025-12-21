import { supabase } from "@/lib/supabase";
import HomeContainer from "../shared/HomeContainer";
import InstructorCard from "./InstructorCard";

export default async function InstructorsContainer() {
  const { data: instructors } = await supabase
    .from("instructors")
    .select("*")
    .limit(4);
  return (
    <HomeContainer title="Top Instructors" ctaHref="instructors">
      <div className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {instructors?.map((item) => (
          <InstructorCard
            key={item.id}
            avg_rating={item.avg_rating}
            total_students={item.total_students}
            id={item.id}
          />
        ))}
      </div>
    </HomeContainer>
  );
}

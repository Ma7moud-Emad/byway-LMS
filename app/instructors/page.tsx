import InstructorCard from "@/components/instructors/InstructorCard";
import { supabase } from "@/lib/supabase/client";

export default async function Page() {
  const { data: instructors } = await supabase.from("instructors").select("*");

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {instructors?.map((item) => (
        <InstructorCard
          key={item.id}
          avg_rating={item.avg_rating}
          total_students={item.total_students}
          id={item.id}
        />
      ))}
    </div>
  );
}

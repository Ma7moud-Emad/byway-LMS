import CategioresContainer from "@/components/categiores/CategioresContainer";
import CoursesContainer from "@/components/courses/CoursesContainer";
import Customers, { Review } from "@/components/customers/Customers";
import BannerCarousal from "@/components/hero/BannerCarousal";
import EndSection from "@/components/hero/EndSection";
import InstructorsContainer from "@/components/instructors/InstructorsContainer";
import { supabase } from "@/lib/supabase/client";

export default async function Page() {
  const { data } = (await supabase.from("reviews").select(`
        id,
        comment,
        rating,
        profiles(avatar_url,full_name)`)) as {
    data: Review[];
  };

  return (
    <>
      {/* hero section */}
      <BannerCarousal />

      {/* available programs */}
      <CategioresContainer />

      {/* top 5 courses */}
      <CoursesContainer />

      {/* top 5 instructors */}
      <InstructorsContainer />

      {/* reviews */}
      <Customers reviews={data} />

      {/* CTA */}
      <EndSection />
    </>
  );
}

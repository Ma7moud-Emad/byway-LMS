import CategioresContainer from "@/components/categiores/CategioresContainer";
import CoursesContainer from "@/components/courses/CoursesContainer";
import Customers from "@/components/customers/Customers";
import BannerCarousal from "@/components/hero/BannerCarousal";
import EndSection from "@/components/hero/EndSection";
import InstructorsContainer from "@/components/instructors/InstructorsContainer";

export default function Page() {
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
      <Customers />

      {/* CTA */}
      <EndSection />
    </>
  );
}

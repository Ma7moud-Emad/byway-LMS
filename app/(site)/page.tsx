import CategioresContainer from "@/components/categiores/CategioresContainer";
import CoursesContainer from "@/components/courses/CoursesContainer";
import BannerCarousal from "@/components/hero/BannerCarousal";
import InstructorsContainer from "@/components/instructors/InstructorsContainer";

export default function Page() {
  return (
    <>
      <BannerCarousal />
      <CategioresContainer />
      <CoursesContainer />
      <InstructorsContainer />
    </>
  );
}

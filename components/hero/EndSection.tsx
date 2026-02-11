import EndCTA from "./EndCTA";

import image10 from "@/public/image 10.svg";
import image11 from "@/public/image 11.svg";

export default function EndSection() {
  return (
    <div className="p-6">
      <EndCTA
        image={image10}
        heading="Become an Instructor"
        paragrph="Instructors from around the world teach millions of students on Byway. We provide the tools and skills to teach what you love."
        ctaLink="/signup"
        ctaTitle="Start Your Instructor Journey"
      />
      <EndCTA
        image={image11}
        heading="Transform your life through education"
        paragrph="Learners around the world are launching new careers, advancing in their fields, and enriching their lives."
        ctaLink="/courses"
        ctaTitle="Checkout Courses"
        dir="right"
      />
    </div>
  );
}

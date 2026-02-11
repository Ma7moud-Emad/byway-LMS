"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import { supabase } from "@/lib/supabase/client";
import { toast } from "react-hot-toast";

type Instructor = {
  id: string;
  headline: string;
  expertise: string;
  social_links: {
    github: string;
    twitter: string;
    youtube: string;
    facebook: string;
    linkedin: string;
  };
};

export default function InstructorForm({
  instructor,
}: {
  instructor: Instructor;
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Instructor>({
    defaultValues: instructor,
  });

  const onSubmit: SubmitHandler<Instructor> = async (data) => {
    const { error: updateError } = await supabase
      .from("instructors")
      .update({
        ...data,
        expertise: Array.isArray(data.expertise)
          ? data.expertise
          : data.expertise
              .split(", ")
              .filter((item: string) => item.trim() !== ""),
      })
      .eq("id", data.id);

    if (updateError) {
      console.error("Update failed:", updateError.message);
    } else {
      toast.success("Updated successfully");
    }
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <Input label="headline" name="headline" register={register} />

      <Input label="expertise" name="expertise" register={register} />

      <div>
        <p className="text-sm font-bold text-gray-700 capitalize mb-2.5">
          Social Links
        </p>
        <Input label="GitHub" name="social_links.github" register={register} />
        <Input
          label="Twitter"
          name="social_links.twitter"
          register={register}
        />
        <Input
          label="YouTube"
          name="social_links.youtube"
          register={register}
        />
        <Input
          label="Facebook"
          name="social_links.facebook"
          register={register}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner /> : "save change"}
      </Button>
    </form>
  );
}

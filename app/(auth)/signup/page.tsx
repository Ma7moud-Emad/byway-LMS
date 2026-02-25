"use client";

import Image from "next/image";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import SignForm from "@/components/forms/SignForm";
import UserForm from "@/components/forms/UserForm";

import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase/client";

import { SignData, UserData } from "@/lib/types";
import { signSchema, userSchema } from "@/lib/schema";

import image from "@/public/signup.svg";
import { uploadFile } from "@/lib/helper";
import { useRouter } from "next/navigation";
import InstructorFormUp from "@/components/forms/InstructorFormUp";
import z from "zod";

async function isEmailExists(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email);

  if (error) {
    toast.error(`Supabase error: ${error.message}`);
    return false;
  }

  return data && data.length > 0 ? true : false;
}

type InstructorData = {
  headline: string;
  expertise: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  facebook?: string;
};
export default function Page() {
  const [orderForm, setOrderForm] = useState(1);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  const signForm = useForm<SignData>({
    resolver: zodResolver(signSchema),
  });

  const userForm = useForm<UserData>({
    resolver: zodResolver(userSchema),
  });

  const instructorForm = useForm<InstructorData>({
    resolver: zodResolver(
      z.object({
        headline: z.string().min(1, "Headline is required"),
        expertise: z.string().min(1, "Expertise is required"),
        github: z.string().url("Invalid GitHub URL").optional(),
        linkedin: z.string().url("Invalid LinkedIn URL").optional(),
        twitter: z.string().url("Invalid Twitter URL").optional(),
        youtube: z.string().url("Invalid YouTube URL").optional(),
        facebook: z.string().url("Invalid Facebook URL").optional(),
      }),
    ),
  });

  const signOnSubmit: SubmitHandler<SignData> = async (formData) => {
    const { email, password } = formData;

    const isEmailExist = await isEmailExists(email);

    if (isEmailExist) {
      toast.error(`Email already exists.`);
    } else {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast.error(`${error?.message}, Try again`);
      } else {
        toast.success("Congratulations!, Complete next step");
        setOrderForm(2);
        if (data.user) {
          setUserId(data.user.id);
        }
      }
    }
  };

  const userOnSubmit: SubmitHandler<UserData> = async (formData) => {
    const { avatar, user_name, full_name, role, bio, phone } = formData;

    const { error } = await supabase
      .from("profiles")
      .update({
        username: user_name,
        full_name: full_name,
        avatar_url: await uploadFile(avatar[0], "avatars", `${userId}/avatar`),
        bio: bio,
        role: role,
        phone: phone,
      })
      .eq("id", userId);
    if (error) {
      toast.error(`Upload error: ${error?.message}`);
      return;
    }
    toast.success("welcome to byway");

    if (role === "instructor") {
      setOrderForm(3);
    } else {
      router.push("/");
    }
  };

  const instructorOnSubmit: SubmitHandler<InstructorData> = async (
    formData,
  ) => {
    const {
      headline,
      expertise,
      github,
      linkedin,
      twitter,
      youtube,
      facebook,
    } = formData;

    const { error } = await supabase
      .from("instructors")
      .update({
        headline,
        expertise: expertise.split(",").map((item) => item.trim()),
        social_links: { github, linkedin, twitter, youtube, facebook },
      })
      .eq("id", userId);
    if (error) {
      toast.error(`Upload error: ${error?.message}`);
      return;
    }
    toast.success("welcome to byway");
    router.push("/");
  };

  return (
    <div className="max-sm:flex max-sm:justify-center max-sm:items-center sm:grid sm:grid-cols-2 h-[94vh] sm:h-[90vh]">
      <div className="my-auto px-4 max-sm:w-full py-4">
        <h1 className="text-center text-2xl text-gray-900 font-semibold capitalize mb-6">
          Create Your Account
        </h1>

        {orderForm == 1 && (
          <SignForm<SignData>
            register={signForm.register}
            errors={signForm.formState.errors}
            onSubmit={signForm.handleSubmit(signOnSubmit)}
            btnName="next step"
            signin={false}
            isSubmitting={signForm.formState.isSubmitting}
          />
        )}

        {orderForm == 2 && (
          <UserForm<UserData>
            register={userForm.register}
            errors={userForm.formState.errors}
            onSubmit={userForm.handleSubmit(userOnSubmit)}
            btnName="sign up"
            isSubmitting={userForm.formState.isSubmitting}
          />
        )}

        {orderForm == 3 && (
          <InstructorFormUp
            register={instructorForm.register}
            errors={instructorForm.formState.errors}
            onSubmit={instructorForm.handleSubmit(instructorOnSubmit)}
            btnName="sign up"
            isSubmitting={instructorForm.formState.isSubmitting}
          />
        )}
      </div>
      <div className="sm:h-full overflow-hidden">
        <Image
          src={image}
          alt="log-in"
          className="max-sm:hidden object-cover"
        />
      </div>
    </div>
  );
}

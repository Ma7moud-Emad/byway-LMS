"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import SignForm from "@/components/forms/SignForm";

import { supabase } from "@/lib/supabase";

import toast from "react-hot-toast";

import { loginSchema } from "@/lib/schema";

import image from "@/public/login.svg";
import { LoginData } from "@/lib/types";

export default function Page() {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginData> = async (formData) => {
    const { email, password } = formData;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(`${error?.message}, Try again`);
    } else {
      toast.success(`Welcome back to Byway!`);
    }
  };
  return (
    <div className="max-sm:flex max-sm:justify-center max-sm:items-center sm:grid sm:grid-cols-2 h-[94vh] sm:h-[90vh]">
      <div className="sm:h-full overflow-hidden">
        <Image
          src={image}
          alt="log-in"
          className="max-sm:hidden object-cover"
        />
      </div>
      <div className="my-auto px-4 max-sm:w-full">
        <h1 className="text-center text-2xl text-gray-700 font-semibold capitalize mb-6">
          Sign in to your account
        </h1>

        <SignForm<LoginData>
          register={form.register}
          errors={form.formState.errors}
          onSubmit={form.handleSubmit(onSubmit)}
          isSubmitting={form.formState.isSubmitting}
        />
      </div>
    </div>
  );
}

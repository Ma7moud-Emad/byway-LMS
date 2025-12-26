"use client";

import Image from "next/image";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import SignForm from "@/components/forms/SignForm";
import UserForm from "@/components/forms/UserForm";

import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";

import { SignData, UserData } from "@/lib/types";
import { signSchema, userSchema } from "@/lib/schema";

import image from "@/public/signup.svg";

export default function Page() {
  const [orderForm, setOrderForm] = useState(1);
  const [userId, setUserId] = useState<string | null>(null);

  const signForm = useForm<SignData>({
    resolver: zodResolver(signSchema),
  });

  const userForm = useForm<UserData>({
    resolver: zodResolver(userSchema),
  });

  // check if email is already exists
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

  // auth using email & password
  const signOnSubmit: SubmitHandler<SignData> = async (formData) => {
    const { email, password } = formData;

    const isEmailExist = await isEmailExists(email);

    if (isEmailExist) {
      toast.error(`Email already exists.`);
    } else {
      // sign up
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast.error(`${error?.message}, Try again`);
      } else {
        toast.success("Congratulations!, Complete next step");
        setOrderForm(2);
        if (data?.user?.id) {
          setUserId(data.user.id);
        }
      }
    }
  };

  // complete profile info
  const userOnSubmit: SubmitHandler<UserData> = async (formData) => {
    const { avatar, user_name, full_name, role, bio, phone } = formData;

    const fileName = `${userId}/avatar.${avatar[0].name.split(".")[1]}`;

    // upload avatar
    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatar[0], {
        upsert: false,
      });

    if (error) {
      toast.error(`Upload error: ${error?.message}`);
      return;
    } else {
      // update profile info
      const { error } = await supabase
        .from("profiles")
        .update({
          username: user_name,
          full_name: full_name,
          avatar_url: `https://vvmwizqlurbngruwobya.supabase.co/storage/v1/object/public/avatars/${userId}/avatar.jpg`,
          bio: bio,
          role: role,
          phone: phone,
        })
        .eq("id", userId)
        .select();
      if (error) {
        // del avatar when profile info is error
        const { error } = await supabase.storage
          .from("avatars")
          .remove([
            `https://vvmwizqlurbngruwobya.supabase.co/storage/v1/object/public/avatars/${userId}/avatar.jpg`,
          ]);

        toast.error(`Upload error: ${error?.message}`);
        return;
      }
      toast.success("welcome to byway");
      // setOrderForm(3)
    }
  };
  return (
    <div className="max-sm:flex max-sm:justify-center max-sm:items-center sm:grid sm:grid-cols-2 h-[94vh] sm:h-[90vh]">
      <div className="my-auto px-4 max-sm:w-full py-4">
        <h1 className="text-center text-2xl text-gray-700 font-semibold capitalize mb-6">
          Create Your Account
        </h1>

        {orderForm == 1 ? (
          <SignForm<SignData>
            register={signForm.register}
            errors={signForm.formState.errors}
            onSubmit={signForm.handleSubmit(signOnSubmit)}
            btnName="next step"
            signin={false}
            isSubmitting={signForm.formState.isSubmitting}
          />
        ) : (
          <UserForm<UserData>
            register={userForm.register}
            errors={userForm.formState.errors}
            onSubmit={userForm.handleSubmit(userOnSubmit)}
            btnName="sign up"
            isSubmitting={userForm.formState.isSubmitting}
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

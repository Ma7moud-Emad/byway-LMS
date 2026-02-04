"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase/client";
import { toast } from "react-hot-toast";

type FormInputs = {
  password: string;
  confirm_password: string;
};
const changePasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export default function ChangePass() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      toast.error(`Error: ${error?.message}`);
      throw error;
    } else {
      toast.success("Password changed successfully");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-4">
      <Input
        label="password"
        name="password"
        register={register}
        autocomplete="password"
        error={errors.password}
        placeholder="••••••"
      />
      <Input
        label="confirm password"
        name="confirm_password"
        register={register}
        autocomplete="confirm-password"
        error={errors.confirm_password}
        placeholder="••••••"
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner /> : "change password"}
      </Button>
    </form>
  );
}

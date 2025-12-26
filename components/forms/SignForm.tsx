"use client";

import { FieldValues, FieldError, Path } from "react-hook-form";

import Input from "./Input";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";

import { SignFormProps } from "@/lib/types";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";

export default function SignForm<T extends FieldValues>({
  register,
  errors,
  signin = true,
  btnName = "Log in",
  onSubmit,
  isSubmitting,
}: SignFormProps<T> & { isSubmitting?: boolean }) {
  return (
    <form onSubmit={onSubmit}>
      <Input<T>
        name={"email" as Path<T>}
        label="Email"
        type="email"
        register={register}
        placeholder="mahmoud@gmail.com"
        error={errors.email as FieldError | undefined}
        autocomplete="email"
      />
      <Input<T>
        name={"password" as Path<T>}
        label="Password"
        type="password"
        placeholder="••••••••"
        register={register}
        error={errors.password as FieldError | undefined}
        autocomplete="current-password"
      />
      {!signin && (
        <Input<T>
          name={"confirm_password" as Path<T>}
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          register={register}
          error={errors.confirm_password as FieldError | undefined}
          autocomplete="new-password"
        />
      )}
      <Button type="submit">
        {isSubmitting ? <Spinner /> : <>{btnName}</>}
      </Button>
      <hr className="w-4/5 mx-auto my-6 h-0.5 bg-gray-400 text-gray-400 overflow-visible relative after:content-['or'] after:absolute after:top-1/2 after:left-1/2 after:w-10 after:h-5 after:bg-white after:z-10 after:text-center after:uppercase after:-translate-1/2 after:leading-4" />
      <div className="flex gap-4 justify-center">
        <Button type="button" classes="border border-gray-300 text-blue-700">
          <p className="flex gap-2 justify-center ">
            <FaFacebook className="text-2xl" />
            Facebook
          </p>
        </Button>
        <Button type="button" classes="border border-gray-300 text-red-500">
          <p className="flex gap-2 justify-center">
            <FcGoogle className="text-2xl" />
            Google
          </p>
        </Button>
      </div>
    </form>
  );
}

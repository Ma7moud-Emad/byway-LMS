"use client";

import Input from "./Input";
import Button from "../ui/Button";
import { FieldValues, FieldError, Path } from "react-hook-form";
import Spinner from "../ui/Spinner";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { SignFormProps } from "@/lib/types";

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
      />
      <Input<T>
        name={"password" as Path<T>}
        label="Password"
        type="password"
        placeholder="••••••••"
        register={register}
        error={errors.password as FieldError | undefined}
      />
      {!signin && (
        <Input<T>
          name={"confirm_password" as Path<T>}
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          register={register}
          error={errors.confirm_password as FieldError | undefined}
        />
      )}

      <Button type="submit">
        {isSubmitting ? <Spinner /> : <>{btnName}</>}
      </Button>
      <hr className="my-4" />
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

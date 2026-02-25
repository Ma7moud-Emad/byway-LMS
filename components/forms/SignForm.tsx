"use client";

import { FieldValues, FieldError, Path } from "react-hook-form";

import Input from "./Input";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";

import { SignFormProps } from "@/lib/types";

export default function SignForm<T extends FieldValues>({
  register,
  errors,
  onSubmit,
  isSubmitting,
  btnName = "Log in",
  signin = true,
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

      <Button
        type="submit"
        classes="bg-gray-900 text-gray-50 w-1/2 block max-md:mx-auto md:mr-auto"
      >
        {isSubmitting ? <Spinner /> : <>{btnName}</>}
      </Button>
    </form>
  );
}

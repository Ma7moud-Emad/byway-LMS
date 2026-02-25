import { FieldError, FieldValues, Path } from "react-hook-form";
import Button from "../ui/Button";
import Input from "./Input";
import Spinner from "../ui/Spinner";
import { SignFormProps } from "@/lib/types";

export default function UserForm<T extends FieldValues>({
  register,
  errors,
  btnName,
  onSubmit,
  isSubmitting,
}: SignFormProps<T> & { isSubmitting?: boolean }) {
  return (
    <form onSubmit={onSubmit}>
      <Input<T>
        name={"full_name" as Path<T>}
        label="Full Name"
        placeholder="mahmoud emad"
        type="text"
        register={register}
        error={errors.full_name as FieldError | undefined}
        autocomplete="name"
      />

      <Input<T>
        name={"user_name" as Path<T>}
        label="User Name"
        placeholder="mahmoud-emad"
        type="text"
        register={register}
        error={errors.user_name as FieldError | undefined}
        autocomplete="username"
      />

      <Input<T>
        name={"bio" as Path<T>}
        label="Bio"
        placeholder="I'm a web development instructor."
        type="text"
        register={register}
        error={errors.bio as FieldError | undefined}
        autocomplete="organization-title"
      />

      <Input<T>
        name={"phone" as Path<T>}
        label="phone"
        placeholder="+2012 0726 1602"
        type="tel"
        register={register}
        error={errors.phone as FieldError | undefined}
        autocomplete="tel"
      />
      <Input<T>
        name={"avatar" as Path<T>}
        label="avatar"
        type="file"
        accept="image/*"
        register={register}
        error={errors.avatar as FieldError | undefined}
        autocomplete="avatar"
      />
      <div>
        <h1 className="mb-2.5 text-sm font-medium capitalize">Role</h1>
        <div className="mb-6 ">
          <label className="mb-2.5 text-sm capitalize flex gap-1 cursor-pointer">
            <input
              type="radio"
              value="student"
              {...register("role" as Path<T>)}
              className="cursor-pointer"
            />
            <p>student</p>
          </label>
          <label className="mb-2.5 text-sm capitalize flex gap-1 cursor-pointer">
            <input
              type="radio"
              value="instructor"
              {...register("role" as Path<T>)}
              className="cursor-pointer"
            />
            <p>instructor</p>
          </label>

          {errors.role && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors.role.message)}
            </p>
          )}
        </div>
      </div>
      <Button
        type="submit"
        classes="bg-gray-900 text-gray-50 w-1/2 block max-md:mx-auto md:mr-auto"
      >
        {isSubmitting ? <Spinner /> : <>{btnName}</>}
      </Button>
    </form>
  );
}

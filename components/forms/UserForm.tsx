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
        placeholder="mahmoud emad alfaramawy"
        type="text"
        register={register}
        error={errors.full_name as FieldError | undefined}
      />

      <Input<T>
        name={"user_name" as Path<T>}
        label="Full Name"
        placeholder="mahmoud emad"
        type="text"
        register={register}
        error={errors.user_name as FieldError | undefined}
      />

      <Input<T>
        name={"bio" as Path<T>}
        label="Full Name"
        placeholder="iam a seasoned web development instructor with over 3 years of experience
      bridging the gap between theory and real-world application. Specializing
      in modern JavaScript frameworks, responsive design, and full-stack
      development, they've empowered hundreds of students to launch careers in
      tech through hands-on, project-based learning."
        type="text"
        register={register}
        error={errors.bio as FieldError | undefined}
      />

      <Input<T>
        name={"phone" as Path<T>}
        label="phone"
        placeholder="+2012 0726 1602"
        type="tel"
        register={register}
        error={errors.phone as FieldError | undefined}
      />
      <Input<T>
        name={"avatar" as Path<T>}
        label="avatar"
        type="file"
        register={register}
        error={errors.avatar as FieldError | undefined}
      />
      <div>
        <h1 className="mb-2.5 text-sm font-medium capitalize">Role</h1>
        <div className="mb-6 ">
          <label className="mb-2.5 text-sm capitalize flex gap-1">
            <input
              type="radio"
              value="student"
              {...register("role" as Path<T>)}
            />
            <p>student</p>
          </label>
          <label className="mb-2.5 text-sm capitalize flex gap-1">
            <input
              type="radio"
              value="instructor"
              {...register("role" as Path<T>)}
            />
            <p>instructor</p>
          </label>
          <label className="mb-2.5 text-sm capitalize flex gap-1">
            <input
              type="radio"
              value="admin"
              {...register("role" as Path<T>)}
            />
            <p>admin</p>
          </label>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors.role.message)}
            </p>
          )}
        </div>
      </div>
      <Button type="submit">
        {isSubmitting ? <Spinner /> : <>{btnName}</>}
      </Button>
    </form>
  );
}

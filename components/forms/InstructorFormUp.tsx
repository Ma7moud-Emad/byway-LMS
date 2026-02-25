import { FieldError, FieldValues, Path } from "react-hook-form";
import Button from "../ui/Button";
import Input from "./Input";
import Spinner from "../ui/Spinner";
import { SignFormProps } from "@/lib/types";

export default function InstructorFormUp<T extends FieldValues>({
  register,
  errors,
  btnName,
  onSubmit,
  isSubmitting,
}: SignFormProps<T> & { isSubmitting?: boolean }) {
  return (
    <form onSubmit={onSubmit}>
      <Input<T>
        name={"headline" as Path<T>}
        label="Headline"
        placeholder="Mobile App Developer"
        type="text"
        register={register}
        error={errors.headline as FieldError | undefined}
        autocomplete="headline"
      />

      <Input<T>
        name={"expertise" as Path<T>}
        label="expertise"
        placeholder="Flutter, Dart, Firebase, Mobile UI"
        type="text"
        register={register}
        error={errors.expertise as FieldError | undefined}
        autocomplete="expertise"
      />

      <Input<T>
        name={"github" as Path<T>}
        label="github"
        placeholder="https://www.github.com/username"
        type="text"
        register={register}
        error={errors.github as FieldError | undefined}
        autocomplete="github"
      />
      <Input<T>
        name={"twitter" as Path<T>}
        label="twitter"
        placeholder="https://www.x.com/username"
        type="text"
        register={register}
        error={errors.twitter as FieldError | undefined}
        autocomplete="twitter"
      />
      <Input<T>
        name={"youtube" as Path<T>}
        label="youtube"
        placeholder="https://www.youtube.com/username"
        type="text"
        register={register}
        error={errors.youtube as FieldError | undefined}
        autocomplete="youtube"
      />

      <Input<T>
        name={"facebook" as Path<T>}
        label="facebook"
        placeholder="https://www.facebook.com/username"
        type="text"
        register={register}
        error={errors.facebook as FieldError | undefined}
        autocomplete="facebook"
      />
      <Input<T>
        name={"linkedin" as Path<T>}
        label="linkedin"
        placeholder="https://www.linkedin.com/in/username"
        type="text"
        register={register}
        error={errors.linkedin as FieldError | undefined}
        autocomplete="linkedin"
      />

      <Button
        type="submit"
        classes="bg-gray-900 text-gray-50 w-1/2 block max-md:mx-auto md:mr-auto"
      >
        {isSubmitting ? <Spinner /> : <>{btnName}</>}
      </Button>
    </form>
  );
}

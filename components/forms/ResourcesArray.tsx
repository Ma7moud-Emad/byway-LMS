import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { Course } from "./CreateForm";
import DynamicArrayField from "./DynamicArrayField";

export default function ResourcesArray({
  moduleIndex,
  lessonIndex,
  control,
  register,
}: {
  moduleIndex: number;
  lessonIndex: number;
  control: Control<Course>;
  register: UseFormRegister<Course>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.lessons.${lessonIndex}.resources`,
  });

  return (
    <DynamicArrayField<Course>
      label="Resources"
      name={`modules.${moduleIndex}.lessons.${lessonIndex}.resources`}
      fields={fields}
      append={append}
      remove={remove}
      register={register}
      placeholder="resource"
    />
  );
}

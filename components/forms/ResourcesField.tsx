"use client";

import { useFieldArray, Control, FieldValues } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

export default function ResourcesField({
  moduleIndex,
  lessonIndex,
  control,
}: {
  moduleIndex: number;
  lessonIndex: number;
  control: Control<FieldValues>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `modules.${moduleIndex}.lessons.${lessonIndex}.resources`,
  });

  return (
    <div className="mt-2">
      <label className="block font-semibold mb-1">Resources</label>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 mb-1">
          <input
            {...control.register(
              `modules.${moduleIndex}.lessons.${lessonIndex}.resources.${index}`,
            )}
            className="border text-gray-700 text-sm block w-full px-3 py-2.5 shadow-xs placeholder:text-gray-500 border-gray-300"
            placeholder={`Resourse ${index + 1}`}
          />
          <button
            suppressHydrationWarning
            type="button"
            onClick={() => remove(index)}
            className="text-red-500 cursor-pointer"
          >
            <MdDeleteOutline className="text-xl" />
          </button>
        </div>
      ))}
      <button
        suppressHydrationWarning
        type="button"
        onClick={() => append("")}
        className="flex items-center rounded-sm gap-1 bg-blue-700 px-3 py-1 mt-2 text-gray-50 font-semibold cursor-pointer"
      >
        <FiPlus /> Add Resource
      </button>
    </div>
  );
}

import { FiPlus } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import Button from "../ui/Button";

type DynamicArrayFieldProps<TForm extends FieldValues> = {
  label: string;
  name: Path<TForm>;
  fields: { id: string }[];
  append: (value: { value: string }) => void;
  remove: (index: number) => void;
  register: UseFormRegister<TForm>;
  placeholder?: string;
};

export default function DynamicArrayField<TForm extends FieldValues>({
  label,
  name,
  fields,
  append,
  remove,
  register,
  placeholder = "",
}: DynamicArrayFieldProps<TForm>) {
  return (
    <div className="md:col-span-2 mt-4">
      <label className="block font-semibold mb-2">{label}</label>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex gap-2 items-end bg-white rounded-sm shadow p-2 mb-4"
        >
          <input
            {...register(`${name}.${index}.value` as Path<TForm>)}
            className="w-full outline-0 capitalize"
            placeholder={`${placeholder} ${index + 1}`}
            suppressHydrationWarning
          />

          <button
            type="button"
            onClick={() => remove(index)}
            className="cursor-pointer text-red-500"
            suppressHydrationWarning
          >
            <MdDeleteOutline className="text-xl" />
          </button>
        </div>
      ))}

      <Button
        classes="bg-blue-700 transition-colors duration-150 "
        clickedFun={() => append({ value: "" })}
      >
        <p className="flex gap-2 items-center text-gray-50 ">
          <FiPlus className="text-lg" /> <span>add {placeholder}</span>
        </p>
      </Button>
    </div>
  );
}

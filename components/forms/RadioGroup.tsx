import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type RadioOption = string | { id: string; title: string };

type RadioGroupProps<TForm extends FieldValues, TOption extends RadioOption> = {
  label: string;
  name: Path<TForm>;
  options: TOption[];
  register: UseFormRegister<TForm>;
};

export default function RadioGroup<
  TForm extends FieldValues,
  TOption extends RadioOption,
>({ label, name, options, register }: RadioGroupProps<TForm, TOption>) {
  const getLabelValue = (opt: TOption) => {
    if (typeof opt === "string") {
      return {
        label: opt.charAt(0).toUpperCase() + opt.slice(1),
        value: opt,
      };
    }
    return {
      label: opt.title,
      value: opt.id,
    };
  };

  return (
    <div className="mb-6">
      <label className="block font-semibold mb-2.5 capitalize text-gray-900">
        {label}
      </label>

      <div className="flex flex-col gap-2">
        {options.map((opt) => {
          const { label, value } = getLabelValue(opt);

          return (
            <label
              key={value}
              htmlFor={`${name}-${value}`}
              className="flex items-center gap-2 cursor-pointer text-sm"
            >
              <input
                type="radio"
                id={`${name}-${value}`}
                value={value}
                {...register(name)}
                className="cursor-pointer"
              />
              {label}
            </label>
          );
        })}
      </div>
    </div>
  );
}

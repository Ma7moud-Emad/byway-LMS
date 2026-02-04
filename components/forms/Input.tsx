"use client";

import { InputProps } from "@/lib/types";
import { FieldValues } from "react-hook-form";

export default function Input<T extends FieldValues>({
  name,
  type = "text",
  feildType = "input",
  placeholder = "",
  label,
  register,
  error,
  accept,
  isReadOnly = false,
  rows,
}: InputProps<T>) {
  return (
    <div className="mb-6">
      {label && (
        <label
          htmlFor={String(name)}
          className="block mb-2.5 text-sm font-medium text-gray-700 capitalize"
        >
          {label}
        </label>
      )}

      {feildType == "input" ? (
        <input
          suppressHydrationWarning
          accept={accept}
          id={String(name)}
          type={type}
          placeholder={placeholder}
          readOnly={isReadOnly}
          {...register(name)}
          className={`border ${
            isReadOnly ? "text-gray-300" : "text-gray-700"
          } text-sm block w-full px-3 py-2.5 shadow-xs 
          placeholder:text-gray-500
          ${error ? "border-red-500 outline-red-500" : "border-gray-300"}
          ${isReadOnly && "cursor-not-allowed focus-within:outline-0"}
        `}
        />
      ) : (
        <textarea
          suppressHydrationWarning
          id={String(name)}
          placeholder={placeholder}
          readOnly={isReadOnly}
          {...register(name)}
          className={`border ${
            isReadOnly ? "text-gray-300" : "text-gray-700"
          } text-sm block w-full px-3 py-2.5 shadow-xs 
          placeholder:text-gray-500
          ${error ? "border-red-500 outline-red-500" : "border-gray-300"}
          ${isReadOnly && "cursor-not-allowed focus-within:outline-0"}
        `}
          rows={rows}
        />
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}

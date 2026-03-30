"use client";

import { UseFormRegister, FieldValues, Path } from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: string;
};

export default function InputField<T extends FieldValues>({
  label,
  type,
  placeholder,
  register,
  name,
  error,
}: InputFieldProps<T>) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full border px-3 py-2 rounded ${error ? "border-red-500" : "border-gray-300"}`}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
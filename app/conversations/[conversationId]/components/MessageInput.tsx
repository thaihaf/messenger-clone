"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  placeholder?: string;
  type?: string;
  required?: boolean;
}
export default function MessageInput({
  id,
  register,
  errors,
  placeholder,
  type,
  required,
}: MessageInputProps) {
  return (
    <div className="relative w-full ">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={id}
        {...register(id, { required })}
        className="
      text-black
      font-light
      py-2
      px-4
      bg-neutral-100
      w-full
      rounded-full
      focus:outline-none
      "
      />
    </div>
  );
}

import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {}

export function Input({ className, placeholder, ...props }: InputProps) {
  return (
    <label className={clsx("relative", className)}>
      <input
        className="w-full px-6 py-3 transition-colors bg-white border outline-none peer focus:border-violet-700 rounded-xl disabled:bg-neutral-200"
        placeholder=" "
        {...props}
      />
      <span className="absolute top-0 px-1 text-xs leading-none text-gray-400 transition-all -translate-y-1/2 bg-white peer-focus:text-xs peer-focus:top-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm left-5 peer-focus:text-violet-700 peer-placeholder-shown:bg-transparent peer-focus:bg-white">
        {placeholder}
      </span>
    </label>
  );
}

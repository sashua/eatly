import clsx from "clsx";
import { ComponentPropsWithoutRef, forwardRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  isError?: Boolean;
}

export function Input({
  className,
  placeholder,
  isError,
  ...props
}: InputProps) {
  return (
    <label className={clsx("relative", className)}>
      <input
        className={clsx(
          "w-full px-6 py-3 transition-colors bg-white border outline-none peer rounded-xl disabled:bg-neutral-200",
          isError
            ? "border-red-400 focus:border-red-400"
            : "focus:border-violet-700"
        )}
        placeholder=" "
        {...props}
      />
      <span
        className={clsx(
          "absolute top-0 px-1 text-xs leading-none transition-all -translate-y-1/2 bg-white peer-focus:text-xs peer-focus:top-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm left-5 peer-placeholder-shown:bg-transparent peer-focus:bg-white",
          isError ? "text-red-400" : "text-gray-400 peer-focus:text-violet-700"
        )}
      >
        {placeholder}
      </span>
    </label>
  );
}

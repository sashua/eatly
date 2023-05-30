import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {}

export function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "flex items-center justify-center gap-2 font-semibold rounded-xl py-3 px-6 bg-violet-700 text-white shadow hover:bg-violet-600 active:bg-violet-700 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

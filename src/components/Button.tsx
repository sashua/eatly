import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "solid" | "outline";
}

export function Button({
  className,
  variant = "solid",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-2xl py-3 px-6 shadow-md transition-colors border border-violet-700 hover:border-violet-600 active:border-violet-700 disabled:border-violet-400 disabled:shadow-none",
        {
          "text-white bg-violet-700 hover:bg-violet-600 active:bg-violet-700 disabled:bg-violet-400":
            variant === "solid",
          "text-violet-700 hover:bg-violet-100 active:bg-white disabled:text-violet-400 disabled:bg-white":
            variant === "outline",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

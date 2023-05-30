import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";
import { IconType } from "react-icons";

interface IconButtonProps
  extends Omit<ComponentPropsWithoutRef<"button">, "children"> {
  variant?: "solid" | "outline";
  icon: IconType;
}

export function IconButton({
  className,
  variant = "solid",
  icon: Icon,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={clsx(
        "rounded-xl p-2 shadow transition-colors border border-gray-700 hover:border-gray-600 active:border-gray-700 disabled:border-gray-400 disabled:shadow-none",
        {
          "text-white bg-gray-700 hover:bg-gray-600 active:bg-gray-700 disabled:bg-gray-400":
            variant === "solid",
          "text-gray-700 hover:bg-gray-100 active:bg-white disabled:text-gray-400 disabled:bg-white":
            variant === "outline",
        },
        className
      )}
      {...props}
    >
      <Icon className="w-[1.25em] h-[1.25em]" />
    </button>
  );
}

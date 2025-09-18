
import { cn } from "lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export function Button({
  children,
  className,
  variant = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-2xl font-medium transition cursor-pointer",
        variant === "default" &&
          "bg-blue-600 text-white hover:bg-blue-700 shadow",
        variant === "outline" &&
          "border border-gray-300 text-gray-700 bg-white hover:bg-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

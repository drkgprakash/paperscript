import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm":
              variant === "primary",
            "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary-500":
              variant === "secondary",
            "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500":
              variant === "ghost",
            "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500":
              variant === "outline",
          },
          {
            "text-xs px-3 py-1.5": size === "sm",
            "text-sm px-5 py-2.5": size === "md",
            "text-base px-7 py-3": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };

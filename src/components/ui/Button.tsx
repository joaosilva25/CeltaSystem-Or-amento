"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant = "primary", isLoading, ...props }, ref) => {
    const baseStyles =
      "group relative inline-flex items-center justify-center rounded-xl h-14 px-10 text-base font-medium tracking-wide transition-colors duration-300 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline:
        "bg-transparent text-foreground border border-input hover:bg-accent hover:text-accent-foreground",
      ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-accent",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        disabled={isLoading || props.disabled}
        {...(props as any)}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="opacity-90">Processando...</span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            {children}
            {variant === "primary" && (
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.3}
              />
            )}
          </span>
        )}
      </motion.button>
    );
  },
);

Button.displayName = "Button";

export default Button;

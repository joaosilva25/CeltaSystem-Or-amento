"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className="w-full group">
        {label && (
          <label className="block text-[10px] font-semibold text-muted-foreground mb-2 ml-1 uppercase tracking-wider transition-colors group-focus-within:text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className={`
              block w-full rounded-xl border-0 bg-transparent h-12 px-4 text-foreground shadow-sm ring-1 ring-inset ring-input
              placeholder:text-muted-foreground placeholder:font-normal
              focus:ring-2 focus:ring-inset focus:ring-primary focus:outline-none sm:text-sm sm:leading-6
              transition-all duration-300 ease-out
              hover:ring-accent-foreground/50
              ${error ? "ring-destructive focus:ring-destructive text-destructive placeholder:text-destructive/50" : ""}
              ${isPassword ? "pr-12" : ""}
              ${className}
            `}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" strokeWidth={1.3} />
              ) : (
                <Eye className="h-4 w-4" strokeWidth={1.3} />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-2 ml-1 text-xs font-medium text-destructive flex items-center gap-1 animate-in slide-in-from-top-1 fade-in duration-200">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

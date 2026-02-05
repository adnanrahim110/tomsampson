"use client";

import { cn } from "@/libs/cn";
import { useState } from "react";

export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className,
  inputClassName,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className={cn("relative", className)}>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={isFocused ? placeholder : " "}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "peer w-full px-4 py-3 pt-6 bg-paper border outline-none transition-all duration-300 font-open",
          "border-secondary-300 focus:border-primary-500",
          "focus:bg-cream",
          error && "border-red-500 focus:border-red-500",
          inputClassName,
        )}
        {...props}
      />
      <label
        htmlFor={name}
        className={cn(
          "absolute left-4 transition-all duration-300 pointer-events-none font-crimson",
          "text-secondary-500 peer-focus:text-primary-700",
          isFocused || hasValue
            ? "top-2 text-xs font-medium tracking-wide"
            : "top-1/2 -translate-y-1/2 text-base",
          error && "text-red-500",
        )}
      >
        {label}
        {required && <span className="text-primary-500 ml-0.5">*</span>}
      </label>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

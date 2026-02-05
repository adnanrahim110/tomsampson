"use client";

import { cn } from "@/libs/cn";
import { useState } from "react";

export default function Textarea({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  rows = 4,
  className,
  textareaClassName,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className={cn("relative", className)}>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        placeholder={isFocused ? placeholder : " "}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "peer w-full px-4 py-3 pt-6 bg-paper border outline-none transition-all duration-300 resize-none font-open",
          "border-secondary-300 focus:border-primary-500",
          "focus:bg-cream",
          error && "border-red-500 focus:border-red-500",
          textareaClassName,
        )}
        {...props}
      />
      <label
        htmlFor={name}
        className={cn(
          "absolute left-4 transition-all duration-300 pointer-events-none bg-paper px-1 font-crimson",
          "text-secondary-500 peer-focus:text-primary-700 peer-focus:bg-cream",
          isFocused || hasValue
            ? "top-2 text-xs font-medium tracking-wide"
            : "top-6 text-base",
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

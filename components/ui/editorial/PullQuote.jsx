"use client";

import { cn } from "@/libs/cn";

export default function PullQuote({
  children,
  attribution,
  className,
  variant = "default",
}) {
  return (
    <blockquote
      className={cn(
        "relative my-12 px-8 md:px-12",
        variant === "centered" && "text-center",
        variant === "sidebar" && "border-l-4 border-primary-500 pl-6",
        className,
      )}
    >
      <div
        className={cn(
          "pull-quote text-2xl md:text-3xl lg:text-4xl leading-snug",
          variant === "centered"
            ? "before:left-1/2 before:-translate-x-1/2"
            : "",
        )}
      >
        {children}
      </div>
      {attribution && (
        <footer className="mt-6 font-open text-sm tracking-widest uppercase text-secondary-500">
          — {attribution}
        </footer>
      )}
    </blockquote>
  );
}

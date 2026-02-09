"use client";

import { cn } from "@/libs/cn";

export default function ChapterHeading({
  number,
  title,
  subtitle,
  className,
  align = "left",
  variant = "default",
}) {
  const isDark = variant === "dark";

  return (
    <header
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className,
      )}
    >
      {number && (
        <span
          className={cn(
            "block font-crimson text-sm tracking-[0.3em] uppercase mb-3 font-semibold",
            isDark ? "text-white/80" : "text-primary-500",
          )}
        >
          Chapter {number}
        </span>
      )}
      <h2
        className={cn(
          "font-crimson text-4xl md:text-5xl lg:text-6xl font-bold leading-none",
          isDark ? "text-white" : "text-secondary-900",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 font-crimson text-xl md:text-2xl italic",
            isDark ? "text-white/70" : "text-secondary-500",
          )}
        >
          {subtitle}
        </p>
      )}
      <div
        className="mt-8 flex items-center gap-4"
        style={{
          justifyContent:
            align === "center"
              ? "center"
              : align === "right"
                ? "flex-end"
                : "flex-start",
        }}
      >
        <span
          className={cn(
            "block w-16 h-0.5",
            isDark ? "bg-white/50" : "bg-primary-500",
          )}
        />
        <span
          className={cn(
            "block w-2.5 h-2.5 rotate-45",
            isDark ? "bg-white/70" : "bg-primary-500",
          )}
        />
        <span
          className={cn(
            "block w-16 h-0.5",
            isDark ? "bg-white/50" : "bg-primary-500",
          )}
        />
      </div>
    </header>
  );
}

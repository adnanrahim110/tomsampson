"use client";

import { cn } from "@/libs/cn";

export default function ChapterHeading({
  number,
  title,
  subtitle,
  className,
  align = "left",
}) {
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
        <span className="block font-crimson text-sm tracking-[0.3em] uppercase text-primary-600 mb-3">
          Chapter {number}
        </span>
      )}
      <h2 className="font-crimson text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 leading-none">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 font-crimson text-xl md:text-2xl italic text-secondary-500">
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
        <span className="block w-16 h-px bg-primary-500" />
        <span className="block w-2 h-2 rounded-full bg-primary-500" />
        <span className="block w-16 h-px bg-primary-500" />
      </div>
    </header>
  );
}

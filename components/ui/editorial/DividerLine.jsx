"use client";

import { cn } from "@/libs/cn";

export default function DividerLine({ variant = "simple", className = "" }) {
  if (variant === "simple") {
    return <hr className={cn("rule-line my-12 md:my-16", className)} />;
  }

  if (variant === "thick") {
    return <hr className={cn("rule-line-thick my-12 md:my-16", className)} />;
  }

  if (variant === "double") {
    return <div className={cn("rule-line-double my-12 md:my-16", className)} />;
  }

  if (variant === "stitched") {
    return <div className={cn("stitched-line my-12 md:my-16", className)} />;
  }

  if (variant === "ornament") {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-6 my-12 md:my-16",
          className,
        )}
      >
        <span className="flex-1 h-px bg-secondary-300" />
        <span className="text-primary-400 text-2xl">❧</span>
        <span className="flex-1 h-px bg-secondary-300" />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-3 my-12 md:my-16",
          className,
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-secondary-400" />
        <span className="w-1.5 h-1.5 rounded-full bg-secondary-400" />
        <span className="w-1.5 h-1.5 rounded-full bg-secondary-400" />
      </div>
    );
  }

  return null;
}

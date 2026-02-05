"use client";

import { cn } from "@/libs/cn";

export default function DropCap({ children, className }) {
  return (
    <p
      className={cn(
        "drop-cap text-lg leading-relaxed text-secondary-700",
        className,
      )}
    >
      {children}
    </p>
  );
}

"use client";

import { cn } from "@/libs/cn";

export default function DropCap({ children, className, variant = "default" }) {
  const isDark = variant === "dark";

  return (
    <p
      className={cn(
        isDark ? "drop-cap-dark" : "drop-cap",
        "text-lg leading-relaxed",
        isDark ? "text-white/90" : "text-secondary-700",
        className,
      )}
    >
      {children}
    </p>
  );
}

"use client";

import { cn } from "@/libs/cn";

export default function MarginNote({ children, side = "right", className }) {
  return (
    <aside
      className={cn(
        "hidden lg:block absolute top-0 w-48 font-crimson text-sm italic text-secondary-500 leading-relaxed",
        side === "right"
          ? "right-0 translate-x-full pl-8"
          : "left-0 -translate-x-full pr-8 text-right",
        className,
      )}
    >
      <span
        className="block w-8 h-px bg-secondary-300 mb-3"
        style={{ marginLeft: side === "right" ? 0 : "auto" }}
      />
      {children}
    </aside>
  );
}

"use client";

import { cn } from "@/libs/cn";

export default function ImagePlaceholder({
  className,
  aspectRatio = "square", // "square" | "video" | "portrait" | "wide"
  pattern = "tennis", // "tennis" | "dots" | "lines" | "grid"
  label,
  ...props
}) {
  const aspectRatios = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    wide: "aspect-[16/9]",
    book: "aspect-[2/3]",
  };

  const patterns = {
    tennis: (
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="tennis-pattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="10"
              cy="10"
              r="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <path
              d="M2,10 Q10,2 18,10"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
            />
            <path
              d="M2,10 Q10,18 18,10"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#tennis-pattern)" />
      </svg>
    ),
    dots: (
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="dots-pattern"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="5" cy="5" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#dots-pattern)" />
      </svg>
    ),
    lines: (
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="lines-pattern"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="10"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#lines-pattern)" />
      </svg>
    ),
    grid: (
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="grid-pattern"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid-pattern)" />
      </svg>
    ),
  };

  return (
    <div
      className={cn(
        "relative bg-linear-to-br from-secondary-100 to-secondary-200 rounded-2xl overflow-hidden",
        "flex items-center justify-center text-secondary-400",
        aspectRatios[aspectRatio],
        className,
      )}
      {...props}
    >
      {patterns[pattern]}
      {label && (
        <span className="relative z-10 text-sm font-medium text-secondary-500">
          {label}
        </span>
      )}
    </div>
  );
}

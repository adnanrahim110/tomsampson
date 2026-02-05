"use client";

import { useEffect, useState } from "react";

export default function useInViewport(
  ref,
  { rootMargin = "0px", threshold = 0, initialInView = false } = {},
) {
  const [inView, setInView] = useState(initialInView);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, threshold]);

  return inView;
}

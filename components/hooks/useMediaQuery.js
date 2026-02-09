"use client";

import { useEffect, useState } from "react";

export default function useMediaQuery(
  query,
  { defaultValue = false } = {},
) {
  const [matches, setMatches] = useState(defaultValue);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mql = window.matchMedia(query);

    const onChange = (event) => setMatches(event.matches);

    setMatches(mql.matches);

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }

    // Safari < 14
    // eslint-disable-next-line deprecation/deprecation
    mql.addListener(onChange);
    // eslint-disable-next-line deprecation/deprecation
    return () => mql.removeListener(onChange);
  }, [query]);

  return matches;
}


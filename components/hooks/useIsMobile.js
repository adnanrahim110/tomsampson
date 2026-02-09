"use client";

import useMediaQuery from "./useMediaQuery";

export default function useIsMobile({ breakpointPx = 768 } = {}) {
  return useMediaQuery(`(max-width: ${breakpointPx - 1}px)`);
}


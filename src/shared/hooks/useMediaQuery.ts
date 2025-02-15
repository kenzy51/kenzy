import React from "react";
import { useEffect, useState } from "react";

export const screenSizes: any = {
  moreXl: 1700,
  middleXl: 1400,
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
  exsm: 440,
};

export type screenType =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "exsm"
  | "moreXl"
  | "middleXl";

export default function useMediaQuery(screen: string): boolean {
  const [matches, setMatches] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia(`(max-width: ${screenSizes[screen]}px)`).matches
      : false
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(`(max-width: ${screenSizes[screen]}px)`);
      setMatches(media.matches);

      const updateMatches = (event: MediaQueryListEvent) =>
        setMatches(event.matches);
      media.addEventListener("change", updateMatches);

      return () => media.removeEventListener("change", updateMatches);
    }
  }, [screen]);

  return matches;
}

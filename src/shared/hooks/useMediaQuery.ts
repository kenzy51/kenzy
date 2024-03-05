import React from "react";

export const screenSizes = {
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

export default function useMediaQuery(screen: screenType): boolean | undefined {
  const query = `(max-width: ${screenSizes[screen]}px)`;
  const [matches, setMatches] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const updateMatches = (event: MediaQueryListEvent) =>
      setMatches(event.matches);
    media.addEventListener("change", updateMatches);

    return () => media.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
}

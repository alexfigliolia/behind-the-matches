import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";

export const useWindowSize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const onResize = useCallback(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, []);

  const debouncedResize = useDebounce(onResize, 100);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    onResize();
    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [onResize, debouncedResize]);

  return useMemo(() => [width, height], [width, height]);
};

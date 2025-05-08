import { useCallback, useRef } from "react";

export const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clear = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);
  return useCallback(
    (...args: Parameters<T>) => {
      clear();
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay, clear],
  );
};

import { useCallback, useEffect } from "react";
import { Callback } from "Types/Generics";

export const useEscapeKey = (callback: Callback, active = true) => {
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        callback();
      }
    },
    [callback],
  );

  useEffect(() => {
    if (!active) {
      return;
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, onKeyDown]);
};

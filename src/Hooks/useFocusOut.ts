import { useCallback, useEffect, useRef } from "react";
import { Callback } from "Types/Generics";

export const useFocusOut = <T extends HTMLElement>(
  callback: Callback,
  active = true,
) => {
  const node = useRef<T>(null);

  const onFocusOut = useCallback(
    (e: FocusEvent) => {
      if (!node.current) {
        return;
      }
      const target = e.target as HTMLElement;
      if (!node.current.contains(target) && node.current !== target) {
        callback();
      }
    },
    [callback],
  );

  useEffect(() => {
    if (!active) {
      return;
    }
    document.addEventListener("click", onFocusOut);
    document.addEventListener("focusin", onFocusOut);
    return () => {
      document.removeEventListener("click", onFocusOut);
      document.removeEventListener("focusin", onFocusOut);
    };
  }, [active, onFocusOut]);

  return node;
};

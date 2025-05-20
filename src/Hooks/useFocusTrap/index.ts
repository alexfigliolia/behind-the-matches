import { useCallback, useEffect } from "react";
import { useController } from "@figliolia/react-hooks";
import { FocusTrap } from "./FocusTrap";
import { useTrapStack } from "./useTrapStack";

export const useFocusTrap = <T extends HTMLElement>(
  container: T | null,
  active: boolean,
) => {
  const isActiveTrap = useTrapStack(active);
  const focusTrap = useController(new FocusTrap<T>());

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        focusTrap.shifting = true;
        return;
      }
      if (e.key !== "Tab") {
        return;
      }
      e.preventDefault();
      if (!container) {
        return;
      }
      focusTrap.onTab(container);
    },
    [focusTrap, container],
  );

  const onClick = useCallback(
    (e: MouseEvent) => {
      if (!container || !container.contains(e.target as HTMLElement)) {
        return;
      }
      focusTrap.onClick(container, e.target as HTMLElement);
    },
    [focusTrap, container],
  );

  useEffect(() => {
    if (!isActiveTrap) {
      return;
    }
    document.addEventListener("keyup", focusTrap.onKeyUp);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keyup", focusTrap.onKeyUp);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, [isActiveTrap, onKeyDown, focusTrap, onClick]);
};

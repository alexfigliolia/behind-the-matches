import { useCallback, useEffect, useRef } from "react";

const FOCUSABLE_SELECTORS =
  "a[href], button, input, textarea, select, details, [tabindex]:not([tabindex='-1']";

export const useFocusTrap = <T extends HTMLElement>(
  container: T | null,
  active: boolean,
) => {
  const focusIndex = useRef(0);
  const shifting = useRef(false);

  const getFocusableNodes = useCallback(() => {
    if (!container) {
      return [];
    }
    return [...container.querySelectorAll(FOCUSABLE_SELECTORS)].filter(
      node =>
        node.getAttribute("disabled") !== "true" &&
        node.getAttribute("aria-hidden") !== "true",
    ) as HTMLElement[];
  }, [container]);

  const onKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === "Shift") {
      shifting.current = false;
    }
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        shifting.current = true;
        return;
      }
      if (e.key !== "Tab") {
        return;
      }
      e.preventDefault();
      if (!container) {
        return;
      }
      const nodes = getFocusableNodes();
      let nextIndex: number = focusIndex.current;
      if (shifting.current) {
        nextIndex = nextIndex - 1 < 0 ? nodes.length - 1 : nextIndex - 1;
      } else {
        nextIndex = nextIndex + 1 >= nodes.length ? 0 : nextIndex + 1;
      }
      nodes[nextIndex].focus();
      focusIndex.current = nextIndex;
    },
    [container, getFocusableNodes],
  );

  const onClick = useCallback(
    (e: MouseEvent) => {
      if (!container || !container.contains(e.target as HTMLElement)) {
        return;
      }
      const nodes = getFocusableNodes();
      const idx = nodes.indexOf(e.target as HTMLElement);
      if (idx !== -1) {
        focusIndex.current = idx;
      }
    },
    [container, getFocusableNodes],
  );

  useEffect(() => {
    if (!active) {
      return;
    }
    document.addEventListener("keyup", onKeyUp);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, [active, onKeyDown, onKeyUp, onClick]);

  return container;
};

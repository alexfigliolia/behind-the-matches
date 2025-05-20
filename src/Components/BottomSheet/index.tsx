"use client";
import { useCallback, useState } from "react";
import {
  BottomSheet as BottomSheetImpl,
  IBottomSheetProps,
  ISheetController,
} from "@figliolia/bottom-sheet";
import { useClassNames } from "@figliolia/classnames";
import { Portal } from "Components/Portal";
import { useFocusTrap } from "Hooks/useFocusTrap";
import "./styles.scss";

export const BottomSheet = ({
  children,
  className,
  open,
  ...rest
}: Omit<IBottomSheetProps, "dim" | "notch">) => {
  const classes = useClassNames("btm-bottom-sheet", className);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const cacheNode = useCallback((ctrl: ISheetController | null) => {
    setContainer(ctrl?.scrollView?.current ?? null);
  }, []);

  useFocusTrap(container, open);

  return (
    <Portal>
      <BottomSheetImpl
        dim
        notch
        open={open}
        ref={cacheNode}
        className={classes}
        {...rest}>
        {children}
      </BottomSheetImpl>
    </Portal>
  );
};
